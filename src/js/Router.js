export default function (options) {
  const routes = options.routes;
  
  this.init = (() => setRoute(routes, {path: location.pathname}))();
  
  this.push = (route) => {
    findRoute(routes, route).then((route) => {
      history.pushState({}, '', route.fullPath);
      useRoute(routes, route);
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
  pathArr.forEach((item) => {
    findRoute(routes, {path: `/${item}`}).then((route) => {
      useRoute(routes, route);
    });
  });
}

function useRoute(routes, route) {
  if (route.redirect) {
    history.pushState(route, '', route.redirect.path);
    setRoute(routes, {path: route.redirect.path});
  }
  if (route.component) {
    renderComponent(route);
  }
}

let container = document.createElement('div');
let contextArr = [];
function renderComponent(route) {
  let viewsList;
  let template;
  let isLayout;
  const renderParams = genRenderParams(route);
  const routerView = document.querySelector('.j-router-view');
  const routerViewList = document.querySelectorAll('.j-router-view');

  route.component().then((module) => {
    viewsList = container.querySelectorAll('.j-router-view');
    template = module.default().template;
    isLayout = !viewsList.length;
    
    if (isLayout) {
      container.innerHTML = template;
    } else {
      viewsList[viewsList.length - 1].innerHTML = template;
    }
    contextArr.push(module.default().context);
    if (renderParams.index === renderParams.pathLength - 1) {
      if (isLayout) {
        routerViewList[renderParams.index].innerHTML = template;
      } else {
        routerView.innerHTML = container.innerHTML;
      }
      container = document.createElement('div');
      contextArr.forEach((item) => {
        item();
      })
    }
  });
}

// TODO not delete!!!
// function renderComponent(route) {
//   const renderParams = genRenderParams(route);
//   const routerView = document.querySelectorAll('.j-router-view');
//
//   route.component().then((module) => {
//     routerView[renderParams.index].innerHTML = module.default().template;
//     module.default().context();
//   });
// }

function genRenderParams(route) {
  const pathArr = location.pathname.split('/').splice(1);
  return {
    pathLength: pathArr.length,
    index: pathArr.indexOf(route.path.substring(1))
  }
}
