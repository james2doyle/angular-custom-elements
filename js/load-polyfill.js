window.addEventListener('load', function loadCustomElementPolyfill() {
  var event = new Event('customElementsLoaded');
  function customElementsLoaded() {
    // Dispatch the event.
    window.dispatchEvent(event);
    // add a class to trigger any CSS stuff
    return document.body.classList.add('custom-elements-loaded');
  }
  if (window.customElements) {
    document.body.classList.add('custom-elements-native');
    console.info('Not loading custom elements polyfill');
    return customElementsLoaded();
  }
  document.body.classList.add('custom-elements-polyfilled');
  console.info('Loading custom elements polyfill');
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/document-register-element/1.8.1/document-register-element.js';
  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(s, x);
  s.onload = customElementsLoaded;
}, false);