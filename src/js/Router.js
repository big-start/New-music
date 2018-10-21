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
          route.fullPath = routes[i].path + route.path;
          return resolve(route);
        });
      }
    }
  });
}

function setRoute(routes, route) {
  const pathArr = route.path.split('/').splice(1);
  if (pathArr.length > 1) {
    route = {path: `/${pathArr[pathArr.length - 1]}`}
  }
  findRoute(routes, route).then((route) => {
    useRoute(routes, route);
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

function renderComponent(route) {
  const routerView = document.querySelector('.j-router-view');
  route.component().then((module) => {
    routerView.innerHTML = module.default().template;
    module.default().context();
  });
}
