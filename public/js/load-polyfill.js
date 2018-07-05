window.addEventListener('load', () => {
    const scripts = {
        customElements: 'https://cdnjs.cloudflare.com/ajax/libs/document-register-element/1.8.1/document-register-element.js',
        Promise: 'https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js',
        fetch: 'https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.4/fetch.min.js',
        Event: 'https://cdnjs.cloudflare.com/ajax/libs/dom4/3.0.0/dom4.js',
    };

    function loadScript(src) {
        return new Promise((resolve) => {
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = src;
            const x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.onload = resolve;
        });
    }

    const queuedPolyfills = [];

    Object.keys(scripts)
        .filter((name) => {
            return typeof window[name] === 'undefined';
        })
        .forEach((name) => {
            queuedPolyfills.push(loadScript(scripts[name]));
            console.log('Loading polyfill for', name);
        });

    Promise.all(queuedPolyfills)
        .then(() => {
            const event = new Event('customElementsLoaded');
            window.dispatchEvent(event);
            // add a class to trigger any CSS stuff
            return document.body.classList.add('custom-elements-loaded');
        });
}, false);
