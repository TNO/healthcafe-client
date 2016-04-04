(function() {
	angular.module('healthcafe.generic')
		.controller('GenericAnswerController', GenericAnswerController );

		GenericAnswerController.$inject = ['$scope', '$ionicHistory', 'Answers', '$location']

  /**
   * Generic list controller to add a new datapoint
   **/
  function GenericAnswerController($scope, $ionicHistory, Answers, $location) {
    var vm = this;

    vm.data = {
      body: {
        questionnaire: $scope.questionnaire,
        answers: $scope.defaultValues,
        variables: $scope.variables
      }
    };

    vm.save = function() {
      Answers.create(vm.data.body)
        .then(function(data) {
          $ionicHistory.nextViewOptions({
            disableBack: true
          });

          $location.path('/intro');
        })
        .catch(function(e) {
          console.log( "Error saving data: ", e );
        });
    };

    return vm;
  }

})();
