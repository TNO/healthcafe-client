(function() {
	angular.module('healthcafe.ema')
    .controller('EmaController', EmaController );

		EmaController.$inject = [ '$q', '$stateParams', '$scope', 'Answers', 'Gender', 'BodyHeight', 'BodyWeight', 'Datapoints' ];

		function EmaController( $q, $stateParams, $scope, Answers, Gender, BodyHeight, BodyWeight, Datapoints ) {
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

      // // Load static datapoint Gender
      // Gender.get().then(function(dataPoint) {
      //   vm.gender = dataPoint.body.gender;
      // });
      //
      // // Load static datapoint BodyHeight
      // BodyHeight.get().then(function(dataPoint) {
      //   vm.bodyHeight = dataPoint.body.body_height.value;
      // });
      //
      //
      // // Workaround: static datapoints can not be loaded on page after submit, see personal controller.
      // if (!vm.gender) {
      //   vm.gender = $stateParams.gender;
      // }
      //
      // if (!vm.bodyHeight) {
      //   vm.bodyHeight = $stateParams.height;
      // }
      //
      // // Load last datapoint BodyWeight
      // var models = [BodyWeight];
      //
      // $q.all( models.map(function(model) { return model.list() } ) ).then(function(data) {
      //   for (var i = 0; i < data.length; i++) {
      //
      //     var dataPoints = Datapoints.sortByDate(data[i]);
      //
      //     if (dataPoints.length != 0) {
      //       var lastDataPoint = dataPoints[0];
      //       vm.bodyWeight = lastDataPoint.body.body_weight.value;
      //     }
      //   }
      // });

      $scope.selector = ".ema-container";

		  return vm;
		}
})();
