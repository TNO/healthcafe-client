(function() {
	angular.module('healthcafe.sleep')
    .controller('SleepController', SleepController );

		SleepController.$inject = [ '$scope', '$controller', 'Answers' ];

		function SleepController( $scope, $controller, Answers ) {
		  var vm = this;

      vm.sleep = []
      Answers.listByQuestionnaire('sleep').then(function(data) {
        vm.sleep = data;
      });

      $scope.selector = "sleep-container";

		  return vm;
		}
})();
