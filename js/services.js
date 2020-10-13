(function () {

    angular.module('admincolaborador.services', [])
  
      .factory('colaboradorService', ['$http', '$q', '$window', function ($http, $q, $window) {
  
        function all() {
          var deferred = $q.defer();
          $http.get('http://dummy.restapiexample.com/api/v1/employees')
            .success(function (data) {
              deferred.resolve(data);
          });
          return deferred.promise;
        }

        function buscar(id) {
          var deferred = $q.defer();
          console.log(id) 
          $http.get('http://dummy.restapiexample.com/api/v1/employee/'+ id)
            .success(function (data) {
              deferred.resolve(data);
          });
  
          return deferred.promise;
        }
  
        function byName(employee_name) {
          var deferred = $q.defer();
  
          all().then(function (data) {
            var results = data.filter(function (employee) {
              return employee.employee_name === employee_name;
            });
            if (results.length > 0) {
              deferred.resolve(results[0]);
            } else {
              deferred.reject();
            }
          }); 
          return deferred.promise;
        }

        function byId(id) {
          var deferred = $q.defer();
          console.log(id + " es el id")
          all().then(function (data) {
            var results = data.filter(function (employee) {
              return employee.id === id;
            });
  
            if (results.length > 0) {
              deferred.resolve(results[0]);
            } else {
              deferred.reject();
            }
          }); 
          return deferred.promise;
        }

        function crear(employee){
          console.log("Pasaste por aqui");
          $http.post("http://dummy.restapiexample.com/api/v1/create",employee).success(function(data){
            return data;
          })
          .error(function(err){
            console.log(err)
          })
        }

        function actualizar(employee){
          console.log("Pasaste por aqui");
          $http.PUT("http://dummy.restapiexample.com/api/v1/update/ + employee").success(function(data){
            return data;
          })
          .error(function(err){
            console.log(err)
          })
        }
        
        function eliminar(id) {
          var deferred = $q.defer();
          console.log(id) 
          $http.get('http://dummy.restapiexample.com/api/v1/delete/'+ id)
            .success(function (data) {
              deferred.resolve(data);
          });
  
          return deferred.promise;
        }
  
        return {
          all: all,
          byName: byName,
          byId: byId,
          buscar:buscar,
          crear: crear,
          actualizar: actualizar,
          eliminar:eliminar
        };
  
      }]);
  
  })();
  