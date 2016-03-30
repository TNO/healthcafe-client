(function() {
	angular.module('healthcafe.vita16')
    .controller('Vita16Controller', Vita16Controller );

		Vita16Controller.$inject = [ '$scope', '$controller', 'Answers' ];

		function Vita16Controller( $scope, $controller, Answers ) {
		  var vm = this;

      vm.vita16 = []
      Answers.listByQuestionnaire('vita16').then(function(data) {
        vm.vita16 = data;
      });

      $scope.selector = ".vita16-container";

		  return vm;
		}
})();
