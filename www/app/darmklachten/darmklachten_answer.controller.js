(function() {
	angular.module('healthcafe.darmklachten')
		.controller('DarmklachtenAnswerController', DarmklachtenAnswerController );

  DarmklachtenAnswerController.$inject = [ '$scope', '$controller', 'Answers' ];

		function DarmklachtenAnswerController( $scope, $controller, Answers ) {
		  var vm = this;

      var defaultValues = {
        q01: '1',
        q02: '1',
        q03: '1',
        q04: '1',
        q05: 1,
        q06: 1,
        q07: '1',
        q08: '0',
        q09: '1',
        q10: '1',
        q11: '0',
        q12: 1,
      };

      var variables = {};

      Answers.listByQuestionnaire('darmklachten').then(function(data) {
        if(data.length > 0) {
          variables['geslacht'] = data[0]['variables']['geslacht'];
          variables['voedingsgroep1'] = data[0]['variables']['voedingsgroep1'];
          variables['voedingsgroep2'] = data[0]['variables']['voedingsgroep2'];
          variables['questionnaireCount'] = data.length+1;
        }
        else {
          variables['geslacht'] = 'Man';
          variables['questionnaireCount'] = 1;
        }
      });

      $scope.questionnaire = 'darmklachten';
      $scope.defaultValues = defaultValues;
      $scope.variables = variables;

      // Initialize the super class and extend it.
      angular.extend(vm, $controller('GenericAnswerController', {$scope: $scope}));

		  return vm;
		}
})();
