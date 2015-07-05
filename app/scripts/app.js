'use strict';

/**
 * @ngdoc overview
 * @name garageApp
 * @description
 * # garageApp
 *
 * Main module of the application.
 */
angular
  .module('garageApp', [
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
