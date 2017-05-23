var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
   // remove o # da url
   $locationProvider.html5Mode(true);

   $routeProvider

   // para a rota '/', carregaremos o template home.html e o controller 'HomeCtrl'
   .when('/user', {
      templateUrl : 'app/views/user.html',
      controller     : 'UserController',
   })

   // para a rota '/sobre', carregaremos o template sobre.html e o controller 'SobreCtrl'
   .when('/admin', {
      templateUrl : 'app/views/admin.html',
      controller  : 'AdminController',
   })

   // caso não seja nenhum desses, redirecione para a rota '/'
   .otherwise ({ redirectTo: '/' });
});