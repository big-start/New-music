/* Router js library:
*
* use <div class="j-router-view"></div> - to show route component
* use <a class="j-router-link" data-href="/author">route-link</a> - to push new route state
*
* important class names: .j-router-link, .j-router-view
* */

export default function (options) {
  const routes = options.routes;
  const helper = createHelper({routes});

  this.init = (() => helper.setRoute({path: location.pathname}))();

  this.push = (route) => {
    helper.findRoute(routes, {path: route}).then((route) => {
      if (route.fullPath !== location.pathname) {
        helper.pushRoute(route);
      }
    });
  };

  window.addEventListener('popstate', function(e){
    if (e.state.route) {
      helper.setRoute({path: e.state.route});
    }
  }, false);
}


/*
* Private function context
* */
function createHelper(props) {
  const routesArr = [];
  return {
    // Properties
    routes: props.routes,
    routesArr: (function genRoutesArr(routes) {
      genRoutesArr.routesArr = genRoutesArr.routesArr || [];
      routes.forEach((route) => {
        if (routesArr.indexOf(route.path) === -1) {
          genRoutesArr.routesArr.push(route.path);
          if (route.children && route.children.length) {
            genRoutesArr(route.children);
          }
        }
      });
      return genRoutesArr.routesArr;
    }(props.routes)),

    // Methods
    findRoute(routes, route) {
      if (this.isRouteExist(route)) {
        return new Promise((resolve) => {
          for (let i = 0, max = routes.length; i < max; i+=1) {
            if (routes[i].path === route.path) {
              routes[i].fullPath = routes[i].path;
              return resolve(routes[i]);
            }
            if (routes[i].children && routes[i].children.length) {
              this.findRoute(routes[i].children, route).then((route) => {
                // TODO level 3+ nested function
                route.fullPath = routes[i].path + route.path;
                return resolve(route);
              });
            }
          }
        });
      } else {
        return new Promise((resolve) => {
          for (let i = 0, max = routes.length; i < max; i+=1) {
            if (routes[i].path === '*') {
              routes[i].fullPath = route.path;
              return resolve(routes[i]);
            }
          }
        });
      }
    },
    isRouteExist(route) {
      return this.routesArr.indexOf(route.path) !== -1;
    },
    setRoute(route) {
      const pathArr = route.path.split('/').splice(1);
      let contArr = [];
      let tempArr = [];
      let have404 = false;
      let renderQueue = [];
      pathArr.forEach((path) => {
        const promise = this.findRoute(this.routes, {path: `/${path}`}).then((route) => {
          return new Promise((resolve) => {
            if (have404) resolve();
            if (route.component && route.path === '*') {
              have404 = true;
              route.component().then((module) => {
                contArr = [module.default().context];
                tempArr = [module.default().template];
                resolve();
              });
            }
            if (route.component && !have404) {
              route.component().then((module) => {
                contArr.push(module.default().context);
                tempArr.push(module.default().template);
                resolve();
              });
            }
            if (route.redirect) {
              this.pushRoute(route);
              resolve();
            }
          });
        });
        renderQueue.push(promise);
      });
      Promise.all(renderQueue).then(() => {
        if (contArr.length && tempArr.length) {
          this.renderAfterReload(contArr, tempArr);
        }
      });
    },
    renderAfterReload(contArr, tempArr) {
      const routerView = document.querySelector('.j-router-view');
      let container = document.createElement('div');
      tempArr.forEach((template) => {
        const routerViewList = container.querySelectorAll('.j-router-view');
        if (!routerViewList.length) {
          container.innerHTML = template;
        } else {
          routerViewList[routerViewList.length - 1].innerHTML = template;
        }
      });

      routerView.innerHTML = container.innerHTML;

      contArr.forEach((context) => {
        context();
      });
    },
    pushRoute(route) {
      history.pushState({route: route.fullPath}, '', route.fullPath);
      if (route.redirect) {
        history.pushState({route: route.redirect.path}, '', route.redirect.path);
        this.setRoute({path: route.redirect.path});
      }
      if (route.component) {
        this.renderComponent(route);
      }
    },
    renderComponent(route) {
      const renderParams = this.genRenderParams(route);
      const routerView = document.querySelectorAll('.j-router-view');
      if (route.path === '*') {
        renderParams.index = 0;
      }
      route.component().then((module) => {
        routerView[renderParams.index].innerHTML = module.default().template;
        module.default().context();
      });
    },
    genRenderParams(route) {
      const pathArr = location.pathname.split('/').splice(1);
      return {
        pathLength: pathArr.length,
        index: pathArr.indexOf(route.path.substring(1))
      };
    }
  };
}
