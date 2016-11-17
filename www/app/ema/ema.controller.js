(function() {
	angular.module('healthcafe.ema')
    .controller('EmaController', EmaController );

		EmaController.$inject = [ '$state', '$scope', '$controller', 'Answers', 'Gender' ];

		function EmaController( $state, $scope, $controller, Answers, Gender ) {
		  var vm = this;

      vm.genderSet = false;
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

      Gender.get().then(function(datapoint) { vm.genderSet = datapoint.body.gender != null; });

      $scope.selector = ".ema-container";

		  return vm;
		}
})();
