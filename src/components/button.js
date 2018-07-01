const HyperHTMLElement = require('hyperhtml-element/cjs').default;

module.exports = new Promise((resolve) => {
  class HyperMyButton extends HyperHTMLElement {
    // invoked once the component has been fully upgraded
    // suitable to perform any sort of setup
    // granted to be invoked right before either
    // connectedCallback or attributeChangedCallback
    created() {
      // detect if we are trying to pass an angular expression
      if ((this.getAttribute('data').match(window.ANGULAR_TAG) || []).length > 0) {
        console.log('skip angular tag');
        return;
      }
      this.render();
    }
    // observed attributes are automatically defined as accessors
    static get observedAttributes() {
      return ['data'];
    }
    // define a default state to use whenever this.state is accessed
    // it can create states from observed properties too
    get defaultState() {
      return {
        data: []
      };
    }
    attributeChangedCallback(name, prev, curr) {
      // detect if we are trying to pass an angular expression
      if ((curr.match(window.ANGULAR_TAG) || []).length > 0) {
        return;
      }
      const scope = angular.element(document.querySelector('.ng-scope')).scope();
      scope.$root.$on('something', () => console.log('something called!'));
      this.setState({
        data: JSON.parse(curr)
      })
      this.render();
    }
    render() {
      return this.html`
        <button type="button" class="btn btn-secondary">${this.state.data.join(' ')}</button>
      `;
    }
  }

  HyperMyButton.define('my-button');
  resolve();
});
