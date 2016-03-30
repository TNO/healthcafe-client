(function() {
	angular.module('healthcafe.darmklachten')
    .controller('DarmklachtenController', DarmklachtenController );

		DarmklachtenController.$inject = [ '$scope', '$controller', 'Answers' ];

		function DarmklachtenController( $scope, $controller, Answers ) {
		  var vm = this;

      vm.darmklachten = []
      Answers.listByQuestionnaire('darmklachten').then(function(data) {
        vm.darmklachten = data;
      });

      $scope.selector = ".darmklachten-container";

		  return vm;
		}
})();
