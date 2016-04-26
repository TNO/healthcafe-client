(function() {
	angular.module('healthcafe.generic')
		.controller('GenericCreateController', GenericCreateController );

		GenericCreateController.$inject = ['$scope', '$state', '$ionicHistory'];

  /**
   * Generic list controller to add a new datapoint
   **/
  function GenericCreateController($scope, $state, $ionicHistory) {
    var vm = this;

    vm.data = {
      body: (typeof $scope.model.defaults != 'undefined') ? $scope.model.defaults() : {},
      date: new Date()
    };

    vm.save = function() {
      $scope.model.create(vm.data.body, vm.data.date)
        .then(function(data) {
          $scope.model.load().then(function() {
            if ($ionicHistory.backView()) {
              $ionicHistory.goBack();
            }
            else {
              $ionicHistory.nextViewOptions({
                disableBack: true
              });
              $state.go('app.timeline');
            }
           });
        })
        .catch(function(e) {
          console.log( "Error saving data: ", e );
        });
    };

    return vm;
  }

})();
