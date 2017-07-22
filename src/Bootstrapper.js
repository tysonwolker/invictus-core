class Bootstrapper {
  constructor(widgets = {}, instances = {}) {
    this.widgets = widgets;
    this.instances = instances;
    this.currentInstanceId = 0;

    this.register = this.register.bind(this);
    this.bootstrap = this.bootstrap.bind(this);
  }

  register(name, widget) {
    this.widgets = Object.assign({}, this.widgets, {[name]: widget});
  }

  bootstrap(name, element, configuration) {
    const Widget = this.widgets[name];
    const instance = new Widget(element, configuration);

    instance.renderer();
    this.instances[this.currentInstanceId] = instance;
    element.setAttribute('data-widget-id', this.currentInstanceId);
    element.setAttribute('data-widget-props', JSON.stringify(configuration));
    this.currentInstanceId++;
  }
}

export default new Bootstrapper();
