const HyperHTMLElement = require('hyperhtml-element/cjs').default;

module.exports = new Promise((resolve) => {
  class HyperField extends HyperHTMLElement {
    // invoked once the component has been fully upgraded
    // suitable to perform any sort of setup
    // granted to be invoked right before either
    // connectedCallback or attributeChangedCallback
    created() {
      // triggers automatically attributeChangedCallback
      this.render();
    }
    attributeChangedCallback(name, prev, curr) {
      // // when invoked, attributes will be already reflected
      // // through their accessor
      // this.key === curr; // true, and curr === "value"
      // this.getAttribute('key') === this.key; // always true
      this.render();
    }
    render() {
      return this.html`<input type="text" value="" />`;
    }
  }

  HyperField.define('my-field');
  resolve();
});
