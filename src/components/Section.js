export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
    renderItems() {
      this._items.forEach((item) => this._renderer(item, 'initial'));
    }
  
    appendItem(element) {
      this._container.append(element);
    }
  
    prependItem(element) {
      this._container.prepend(element);
    }
  
    addItem(element, mode = 'prepend') {
      if (mode === 'initial') {
        this.appendItem(element);
      } else {
        this.prependItem(element);
      }
    }
  }