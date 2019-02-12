export default class App {
  constructor(options) {
    if (typeof options === 'object' && !Array.isArray(options)) {
      for (let key in options) {
        if (options.hasOwnProperty(key)) {
          this[key] = options[key];
        }
      }
    }
  }

  createComponent(options) {
    return (() => {
      return {
        ...options,
        props: {...this.$libs, ...this} // use this props as arguments for context
      };
    })();
  }

  render({template, selector}) {
    return new Promise((resolve, reject) => {
      if (!template) reject('Template is required');
      if (selector) {
        document.querySelector(selector).innerHTML = template;
        resolve();
      }
      if (this.$router && this.$router.routerViewClass) {
        const content = this.$router.routerViewClass;
        const routerView = document.querySelectorAll(content);
        routerView[routerView.length - 1].innerHTML = template;
        resolve();
      }
      reject('Can\'t be rendered');
    });
  }
}