(function() {
	angular.module('healthcafe.cholesterol')
		.controller('CholesterolFeedbackController', CholesterolFeedbackController );

		CholesterolFeedbackController.$inject = [ '$scope', '$controller', 'Cholesterol' ];

		function CholesterolFeedbackController( $scope, $controller, Model ) {
		  var vm = this;

      // Save new data
      vm.submit = function() {

        var gender = '';
        var sysbp = 0;

        var count = 0;
        var badCount = 0;
        for(item in vm.data) {

          if (vm.data[item] != null) {
            switch(item) {
              case 'gender':
                gender = vm.data[item];
                break;
              case 't2d':
              case 'cvd':
              case 'smoke':
                if (vm.data[item] == 'yes') {
                  badCount += 1;
                }
                break;
              case 'bmi':
                if (vm.data[item] > 25) {
                  badCount += 1;
                }
                break;
              case 'waist':
                if (gender == 'male' && vm.data[item] > 92) {
                  badCount += 1;
                }
                if (gender == 'female' && vm.data[item] > 84) {
                  badCount += 1;
                }
                break;
              case 'cholesterol':
                if (vm.data[item] > 6.2) {
                  badCount += 1;
                }
                break;
              case 'sysbloodpressure':
                sysbp = vm.data[item];
                break;
              case 'dialoodpressure':
                if (sysbp >= 140 || vm.data[item] >= 90) {
                  badCount += 1;
                }
                break;
              case 'vegetable':
                if (vm.data[item] < 250) {
                  badCount += 1;
                }
                break;
              case 'fruit':
                if (vm.data[item] < 200) {
                  badCount += 1;
                }
                break;
              case 'fat':
                if (gender == 'male' && vm.data[item] > 28) {
                  badCount += 1;
                }
                if (gender == 'female' && vm.data[item] > 22) {
                  badCount += 1;
                }
                break;
              case 'physical':
                if (vm.data[item] < 30) {
                  badCount += 1;
                }
                break;
            }

            count += 1;
          }
        }

        if (count==13) {
          vm.error = null;

          if (badCount >= 4) {
            vm.feedback = 'Higher than average risk on cardiovascular diseases.'
          }
          else {
            vm.feedback = 'Lower than average risk on cardiovascular diseases.'
          }
        }
        else {
          vm.error = 'Please fill out all fields'
        }
      };

		  return vm;
		}
})();
