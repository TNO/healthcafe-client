(function() {
	angular.module('healthcafe.ema')
    .controller('EmaController', EmaController );

		EmaController.$inject = [ '$state', '$scope', '$controller', 'Answers' ];

		function EmaController( $state, $scope, $controller, Answers ) {
		  var vm = this;

      vm.answeredToday = false;
      Answers.listByQuestionnaire('ema').then(function(data) {
        var answerCount = data.length;

        for (var i = 0; i < answerCount; i++) {
          var date = data[i]['date_time'];
          var currentDate = new Date();

          if (date.getUTCDate() == currentDate.getUTCDate() && date.getUTCMonth() == currentDate.getUTCMonth() && date.getUTCFullYear() == currentDate.getUTCFullYear() ) {
            vm.answeredToday = true;
          }
        }

        vm.answerCount = answerCount;
      });

      $scope.selector = ".ema-container";

		  return vm;
		}
})();
