(function() {
	angular.module('healthcafe.intro')
		.controller('IntroController', IntroController );

	IntroController.$inject = [ '$scope', '$http', '$ionicHistory', 'Answers' ];

	function IntroController($scope, $http, $ionicHistory, Answers) {
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

    // Save new data
    vm.share = function() {

      vm.shared = true;

      Answers.listByQuestionnaire('darmklachten').then(function(data) {

        window.alert( data.length )

        $http.post( 'https://humanstudies.tno.nl/healthcafe-server/api/putData/', { 'secret': 'testtesttest' } );
      });

    };

		return this;
	}
})();
