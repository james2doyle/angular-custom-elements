// a custom event that either waits for the polyfill or triggers immediately
window.addEventListener('customElementsLoaded', () => {
  const components = require('./components');
  const angular = require('angular');
  window.ANGULAR_TAG = /^\{\{\s?.*\}\}$/;

  components
  .then(() => {
    console.log('components loaded');
  })
  .then(() => {
    const setupRoutes = ($stateProvider) => {
      $stateProvider
        .state('home', {
          url: '/',
          controllerAs: '$ctrl',
          controller: function () {
            this.something = 'Sarah';
          },
          templateUrl: '/template/layout.html'
        })
        .state('functions', {
          url: '/functions',
          controllerAs: '$ctrl',
          controller: function () {
            this.data = ['An', 'array', 'of', 'items'];
            this.fn = function () {
              window.alert('WHAT?! I am an Angular function being called from a web component!!');
            }
          },
          templateUrl: '/template/layout-functions.html'
        })
        .state('directives', {
          url: '/directives',
          templateUrl: '/template/layout-directives.html'
        })
        .state('events', {
          url: '/events',
          controllerAs: '$ctrl',
          controller: function ($scope) {
            $scope.$root.$on('customHandlerInAngular', function () {
              window.alert('WHAT?! A custom element called me!');
            });
          },
          templateUrl: '/template/layout-events.html'
        })
        .state('looping', {
          url: '/looping',
          controllerAs: '$ctrl',
          resolve: {
            mockData: function ($http) {
              // $http returns a promise for the url data
              return $http({method: 'GET', url: '/mock-data.json'});
            }
          },
          controller: function ($scope, mockData) {
            this.people = mockData.data;
          },
          templateUrl: '/template/layout-looping.html'
        });
    };

    const enableHtml5Mode = ($locationProvider) => {
      $locationProvider.html5Mode({enabled: true});
    };

    angular.module('ngCustomElements', [
      require('angular-ui-router')
    ])
    .config(enableHtml5Mode)
    .config(setupRoutes)
    .directive('focusInput', ['$timeout', function ($timeout) {
      return {
        scope: {
          trigger: '@focusInput'
        },
        link: (scope, element) => {
          scope.$watch('trigger', (value) => {
            if(value === "true") {
              $timeout(() => {
                console.log('angular directive triggered on', element);
                // before: element[0].focus();
                element.find('input')[0].focus();
              });
            }
          });
        }
      };
    }])
    .run(($rootScope, $state, $stateParams) => {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    });
    console.log('angular loaded');
  });
}, false);