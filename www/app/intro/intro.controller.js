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

        window.alert( data.length );

        // $http({
        //   method: 'POST',
        //   url: 'https://humanstudies.tno.nl/healthcafe-server/api/putData/',
        //   data: { 'secret': 'testtesttest' },
        //   // headers: {'Content-Type': 'application/json;charset=utf-8'}
        //   headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
        // })

        $http({
          method: 'POST',
          url: 'http://localhost:8080/healthcafe-server/api/putData/',
          data: { 'secret': '88bc6a3e-73c1-46f0-b40a-cf855880e9aa', 'questionnaires': data },
          // headers: {'Content-Type': 'application/json;charset=utf-8'}
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
        })
      });

    };

		return this;
	}
})();
