(function() {
	angular.module('healthcafe.intro')
		.controller('IntroController', IntroController );

	IntroController.$inject = [ '$scope', '$ionicHistory', 'Answers' ];

	function IntroController($scope, $ionicHistory, Answers) {
	  var vm = this;

    // Retrieve previous entered questionnaires
    vm.darmklachten = [];
    vm.answeredToday = false;
    Answers.listByQuestionnaire('darmklachten').then(function(data) {

      for (var i = 0; i < data.length; i++) {
        var date = data[i]['date_time'];
        var currentDate = new Date();

        if (date.getUTCDate() == currentDate.getUTCDate() && date.getUTCMonth() == currentDate.getUTCMonth() && date.getUTCFullYear() == currentDate.getUTCFullYear() ) {
          vm.answeredToday = true;
        }
      }

      vm.darmklachten = data;
    });

		return this;
	}
})();
