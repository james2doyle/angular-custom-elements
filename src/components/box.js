const HyperHTMLElement = require('hyperhtml-element/cjs').default;

module.exports = new Promise((resolve) => {
  class HyperBox extends HyperHTMLElement {
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
      return ['customhandler'];
    }
    handleMouseOver() {
      // grab the angular scope by unsing the page app element
      const scope = angular.element(document.querySelector('.ng-scope')).scope();
      scope.$root.$emit(this.customhandler);
    }
    render() {
      return this.html`<div onmouseout="${this.handleMouseOver}" style="width: 100px; height: 100px; background: rgba(0,0,0,0.2)"></div>`;
    }
  }

  HyperBox.define('my-box');
  resolve();
});
