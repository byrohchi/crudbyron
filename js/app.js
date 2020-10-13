(function () {

    var app = angular.module('admincolaborador', [
      'ngRoute',
      'admincolaborador.controllers',
      'admincolaborador.directives',
      'admincolaborador.services',
      'admincolaborador.filters'
    ]);
  
    app.config(['$routeProvider', function ($routeProvider) {
  
      $routeProvider
        .when('/', {
          templateUrl: 'views/colaboradores.html',
          controller: 'admincolaboradorController'
        })
        .when('/nuevo', {
          templateUrl: 'views/nuevo.html',
          controller: 'nuevoController'
        })
        .when('/colaborador/:id', {
          templateUrl: 'views/colaborador.html',
          controller: 'colaboradorController'
        })
        .when('/actualizar/:id', {
          templateUrl: 'views/actualizar.html',
          controller: 'actualizarController'
        })
        .when('/eliminar/:id', {
          templateUrl: 'views/eliminar.html',
          controller: 'eliminarController'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);
  })();