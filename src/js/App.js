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
          props: this // use this props as arguments for context
        };
      }
    )();
  }
}