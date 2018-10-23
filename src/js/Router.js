export default function (options) {
  const routes = options.routes;
  
  this.init = (() => setRoute(routes, {path: location.pathname}))();
  
  this.push = (route) => {
    findRoute(routes, {path: route}).then((route) => {
      if (route.fullPath !== location.pathname) {
        pushRoute(routes, route);
      }
    });
  };
};

function findRoute(routes, route) {
  return new Promise((resolve) => {
    for (let i = 0, max = routes.length; i < max; i+=1) {
      if (routes[i].path === route.path) {
        routes[i].fullPath = routes[i].path;
        return resolve(routes[i]);
      }
      if (routes[i].children && routes[i].children.length) {
        findRoute(routes[i].children, route).then((route) => {
          // TODO level 3+ nested function
          route.fullPath = routes[i].path + route.path;
          return resolve(route);
        });
      }
    }
  });
}

function setRoute(routes, route) {
  const pathArr = route.path.split('/').splice(1);
  let contArr = [];
  let tempArr = [];
  let renderQueue = [];
  pathArr.forEach((path) => {
    const promise = findRoute(routes, {path: `/${path}`}).then((route) => {
      return new Promise((resolve) => {
        if (route.component) {
          route.component().then((module) => {
            contArr.push(module.default().context);
            tempArr.push(module.default().template);
            resolve();
          })
        }
        if (route.redirect) {
          pushRoute(routes, route);
          resolve();
        }
      });
    });
    renderQueue.push(promise);
  });
  Promise.all(renderQueue).then(() => {
    if (contArr.length && tempArr.length) {
      renderAfterReload(contArr, tempArr);
    }
  });
  
  console.log('popstate fff', window.onpopstate);
  window.addEventListener('popstate', function(e){
    console.log(e.state.route);
    setRoute(routes, {path: e.state.route});
  }, false);
}

function renderAfterReload(contArr, tempArr) {
  console.log('render');
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
  })
}

function pushRoute(routes, route) {
  history.pushState({route: route.fullPath}, '', route.fullPath);
  if (route.redirect) {
    history.pushState({route: route.redirect.path}, '', route.redirect.path);
    setRoute(routes, {path: route.redirect.path});
  }
  if (route.component) {
    renderComponent(route);
  }
}

function renderComponent(route) {
  const renderParams = genRenderParams(route);
  const routerView = document.querySelectorAll('.j-router-view');

  route.component().then((module) => {
    routerView[renderParams.index].innerHTML = module.default().template;
    module.default().context();
  });
}

function genRenderParams(route) {
  const pathArr = location.pathname.split('/').splice(1);
  return {
    pathLength: pathArr.length,
    index: pathArr.indexOf(route.path.substring(1))
  }
}

// window.addEventListener('popstate', function(e){
//   console.log('chane');
//   console.log(e.state.route);
//   setRoute(routes, {path: e.state.route});
// }, false);
