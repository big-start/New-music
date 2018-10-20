export default function (options) {
  const routes = options.routes;
  
  this.init = (() => useRoute(routes))();
  
  this.push = (route) => {
    findRoute(routes, route).then((route) => {
      history.pushState({}, '', route.path);
      useRoute(routes);
    });
  };
};

function findRoute(routes, route) {
  return new Promise((resolve) => {
    for (let i = 0, max = routes.length; i < max; i+=1) {
      if (routes[i].path === route.path) return resolve(routes[i]);
    }
  });
}

function useRoute (routes) {
  findRoute(routes, {path: location.pathname}).then((route) => {
    if (route.redirect) {
      history.pushState({}, '', route.redirect.path);
      useRoute(routes);
    }
    if (route.component) {
      route.component().then((module) => {
        module.default();
      });
    }
  });
}
