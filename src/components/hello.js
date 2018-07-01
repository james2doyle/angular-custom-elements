const HyperHTMLElement = require('hyperhtml-element/cjs').default;

module.exports = new Promise((resolve) => {
  class HyperHello extends HyperHTMLElement {
    // invoked once the component has been fully upgraded
    // suitable to perform any sort of setup
    // granted to be invoked right before either
    // connectedCallback or attributeChangedCallback
    created() {
      // triggers automatically attributeChangedCallback
      this.render();
    }
    // observed attributes are automatically defined as accessors
    static get observedAttributes() {
      return ['name'];
    }
    attributeChangedCallback(name, prev, curr) {
      // when invoked, attributes will be already reflected
      // through their accessor
      // this.key === curr; // true, and curr === "value"
      // this.getAttribute('key') === this.key; // always true
      this.render();
    }
    render() {
      return this.html`<h1>Hello, ${this.getAttribute('name')}</h1>`;
    }
  }

  HyperHello.define('hello-label');
  resolve();
});
