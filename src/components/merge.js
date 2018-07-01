const HyperHTMLElement = require('hyperhtml-element/cjs').default;

module.exports = new Promise((resolve) => {
  class HyperMerge extends HyperHTMLElement {
    // invoked once the component has been fully upgraded
    // suitable to perform any sort of setup
    // granted to be invoked right before either
    // connectedCallback or attributeChangedCallback
    created() {
      // detect if we are trying to pass an angular expression
      if ((this.getAttribute('person').match(window.ANGULAR_TAG) || []).length > 0) {
        console.log('skip angular tag');
        return;
      }
      // triggers automatically attributeChangedCallback
      this.render();
    }
    // observed attributes are automatically defined as accessors
    static get observedAttributes() {
      return ['person'];
    }
    attributeChangedCallback(name, prev, curr) {
      // when invoked, attributes will be already reflected
      // through their accessor
      // this.key === curr; // true, and curr === "value"
      // this.getAttribute('key') === this.key; // always true
      // detect if we are trying to pass an angular expression
      if ((curr.match(window.ANGULAR_TAG) || []).length > 0) {
        console.log('skip angular tag');
        return;
      }
      this.render();
    }
    render() {
      try {
        const person = JSON.parse(this.getAttribute('person'));
        return this.html`
        <div class="Box Box--condensed mt-3" id="${person.id}">
          <div class="Box-header d-flex flex-items-center">
            <h3 class="Box-title overflow-hidden flex-auto">
              ${person.first_name} ${person.last_name}
            </h3>
            <a href="${'mailto:' + person.email}" target="_blank" class="btn btn-primary btn-sm">
              ${person.email}
            </a>
          </div>
          <div class="Box-body">
            ${person.message}
          </div>
        </div>`;
      } catch(e) {
        console.error(e); // error in the above parse
        console.log('Tag with error:', this);
        return this.html`
          <span class="State State--red State--small">Error: could not parse JSON for person</span>
          <pre class="d-none">${this.getAttribute('person')}</pre>
        `;
      }
    }
  }

  HyperMerge.define('merge-label');
  resolve();
});
