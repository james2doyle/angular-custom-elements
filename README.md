# AngularJS 1.x with HTML Custom Elements

> This is an example app demonstrating a AngularJS (v1.x) working with HTML Custom Elements.

You can use this technique as an approach for upgrading an Angular app to something more modern. You can move large UI components to [HTML Custom Elements](https://github.com/w3c/webcomponents/).

These elements are compabilty with most frameworks (React, Vue, and the like) as they are implemented at the browser level. When your dependency on Angular is low enough, you can begin converting/migrating on the page and route level knowing that the UI components work across both frameworks simultaneously.

**Side Note:** I used [hyperHTML-Element](https://github.com/WebReflection/hyperHTML-Element) as a base for the Custom Elements as they provide some helpers for common functionality.

### Running

Build project:

```bash
$ git clone git@github.com:james2doyle/angular-custom-elements.git
$ npm install
$ gulp watch
```
