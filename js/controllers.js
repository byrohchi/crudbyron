(function (_) {
  angular.module('admincolaborador.controllers', [])
    /* Controlador para la pagina principal (colaboradores.html/colaborador-detalle) */
    .controller('admincolaboradorController', ['$scope', '$rootScope', '$http', 'colaboradorService', function ($scope, $rootScope, $http, colaboradorService) {
      /* Para traer oda la informacion*/
      $http.get("http://dummy.restapiexample.com/api/v1/employees")
      .then(function (response) {
        $rootScope.employee = response.data
      });
      colaboradorService.all().then(function (response) {
        $scope.employees = response.data;
      });
      /* Para borrar (Version para eliminar en pagina principal) */
      $scope.borrarPorId = function(idc,indice) {
        $http({
          method: 'DELETE',
          url: 'http://dummy.restapiexample.com/api/v1/delete/' +idc
        }).then(function successCallback(response) {
          console.log(response.data);
          $scope.employees.splice(indice,1)
          alert("Colaborador Eliminado");
        }, function errorCallback(response) {
          console.log(response);
          alert("Error" + response);
        });
      }
      /*Para crear nuevo (VersionPaginaPrincipal)*/
      $scope.employee_nameActualizar = null;
      $scope.employee_ageActualizar = null;
      $scope.employee_salaryActualizar = null;
      $scope.postdataInicial = function (employee_name, employee_age, employee_salary) {
        var data = {
          employee_name: employee_name,
          employee_age: employee_age,
          employee_salary: employee_salary
        };
        console.log(data)
        $http.post('http://dummy.restapiexample.com/api/v1/create', JSON.stringify(data)).then(function (response) {
          console.log(response)
          $scope.employees.push(response.data.data);
          $scope.employees.splice(indice,1)
        });
      };
      /* Para Actualizar (Version de pantalla de inicio) */
      $scope.idActualizar = null;
      $scope.indexActualizar= null
      $scope.Actualizacion = function(idc,index){
        console.log(idc)
        $scope.idActualizar = idc
        $scope.indexActualizar=index
        console.log($scope.idActualizar)
      };
      $scope.employee_nameActualizar = null;
      $scope.employee_ageActualizar = null;
      $scope.employee_salaryActualizar = null;
      $scope.putdataInicial = function (employee_name, employee_age, employee_salary,idActualizar) {
        var data = {
          employee_name: employee_name,
          employee_age: employee_age,
          employee_salary: employee_salary,
          id: idActualizar
        }
        console.log(data)
        $http.put('http://dummy.restapiexample.com/api/v1/update/'+idActualizar, JSON.stringify(data)).then(function (response) {
          if (response.data)
          console.log(response)
          $scope.employees.splice($scope.indexActualizar,1)
          $scope.employees.push(response.data.data);
        }, function (response) {
          console.log(response)
        });
      }
    }])
    /* Para controlar los Tabuladores */
    .controller('TabsController', function (){
      this.tab = 1;
      this.selectTab = function(tab){
        this.tab=tab;
      }
    })
    /* Controlador de mostrar informacion (colaborador.html/colaborador-vista) */
    .controller('colaboradorController', ['$scope', '$http', '$rootScope', '$routeParams', 'colaboradorService', function ($scope, $http, $rootScope, $routeParams, colaboradorService) {
      /* Para traer la informacion de un unico colaborador */
      var id = $routeParams.id;
      $http.get("http://dummy.restapiexample.com/api/v1/employee/" + id)
      .then(function (response) {
        $rootScope.employee = response.data;
      });      
      colaboradorService.buscar(id).then(function (response) {
        $scope.employees = response.data;
      });
    }])  
    /* Controlador para crear nuevo (Nuevo.html) */
    .controller('nuevoController', function ($scope, $http) {
      /*Para crear nuevo*/
      $scope.employee_name = null;
      $scope.employee_age = null;
      $scope.employee_salary = null;
      $scope.id = null;
      $scope.postdata = function (employee_name, employee_age, employee_salary, id) {
        var data = {
          employee_name: employee_name,
          employee_age: employee_age,
          employee_salary: employee_salary,
          id: id
        };
        console.log(data)
        $http.post('http://dummy.restapiexample.com/api/v1/create', JSON.stringify(data)).then(function (response) {
         console.log(response) 
        });
      };
    })
    /*Controlador de actualizar */
    .controller('actualizarController', ['$scope', '$http', '$rootScope', '$routeParams', 'colaboradorService', function ($scope, $http, $rootScope, $routeParams, colaboradorService) {
      /* Para traer la informacion de un unico colaborador */
      var idc = $routeParams.id;
      $http.get("http://dummy.restapiexample.com/api/v1/employee/" + idc)
      .then(function (response) {
      $rootScope.employee = response.data;
      });
      colaboradorService.buscar(idc).then(function (response) {
        $scope.employee = response.data;
      });
      /*Para actualizarlo*/
      $scope.employee_name = null;
      $scope.employee_age = null;
      $scope.employee_salary = null;
      $scope.id = null;
      $scope.putdata = function (employee_name, employee_age, employee_salary) {
        var data = {
        employee_name: employee_name,
        employee_age: employee_age,
        employee_salary: employee_salary,
        id: idc
      };
      console.log("4")
      $http.put('http://dummy.restapiexample.com/api/v1/update/'+idc, JSON.stringify(data)).then(function (response) {
       if (response.data)
        console.log(response)
      }, function (response) {
        console.log(response)
      });
    };
  }])
   /*Controlador de eliminar */
  .controller('eliminarController', ['$scope', '$http', '$rootScope', '$routeParams', 'colaboradorService', function ($scope, $http, $rootScope, $routeParams, colaboradorService) {
    /* Para traer la informacion de un unico colaborador */
    var idc = $routeParams.id;
    $http.get("http://dummy.restapiexample.com/api/v1/employee/" + idc)
    .then(function (response) {
    $rootScope.employee = response.data;
    });
    /*Para eliminarlo*/
    $scope.borrar = function() {
      $http({
        method: 'DELETE',
        url: 'http://dummy.restapiexample.com/api/v1/delete/' +idc
      }).then(function successCallback(response) {
        console.log(response.data);
        alert("Empleado Eliminado");
      }, function errorCallback(response) {
        console.log(response);
        alert("Error");
      });
    }
  }])  
})(_);
  