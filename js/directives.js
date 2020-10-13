(function () {

  angular.module('admincolaborador.directives', [])
    .directive('colaboradorDetalle', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/colaborador-detalle.html'
      };
    })

    .directive('colaboradorVista', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/colaborador-vista.html'
      };
    })
})();
