(function() {
	angular.module('healthcafe.sleep')
		.controller('SleepAnswerController', SleepAnswerController );

  SleepAnswerController.$inject = [ '$scope', '$controller' ];

		function SleepAnswerController( $scope, $controller ) {
		  var vm = this;

      var defaultValues = {
        q01: null,
        q02: null,
        q03: null,
        q04: null,
        q05: '0',
        q06: '0',
        q07: '0',
        q08: '0',
        q09: '0',
        q10: '0',
        q11: '0',
        q12: '0',
        q13: '0',
        q14: '0',
        q15: null,
        q16: '0',
        q17: '0',
        q18: '0',
        q19: '0',
        q20: '0',
        q21: '0',
        q22: '0',
        q23: '0',
        q24: '0',
        q25: '0',
        q26: null
      };

      $scope.questionnaire = 'sleep';
      $scope.defaultValues = defaultValues;

      // Initialize the super class and extend it.
      angular.extend(vm, $controller('GenericAnswerController', {$scope: $scope}));

		  return vm;
		}
})();
