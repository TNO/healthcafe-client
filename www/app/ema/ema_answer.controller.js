(function() {
	angular.module('healthcafe.ema')
		.controller('EmaAnswerController', EmaAnswerController );

  EmaAnswerController.$inject = [ '$scope', '$controller', '$ionicPopup', 'Answers' ];

		function EmaAnswerController( $scope, $controller, $ionicPopup, Answers ) {
      var vm = this;

      var defaultValues = {
        fruit: '1',
        sap: '1',
        groenten: '1',
        sla: '1',
        activiteit: '1',
        geirriteerd: '1',
        moe: '1',
        ontspannen: '1',
        energiek: '1',
        gelukkig: '1',
        tevreden: '1',
        leven: '1',
        hongerig: '1'
      };

      var variables = {};

      Answers.listByQuestionnaire('ema').then(function(data) {

        var answerCount = data.length;

        vm.answerCount = answerCount;

        if(data.length > 0) {
          variables['questionnaireCount'] = answerCount+1;
          vm.baselineAnswered=true;
        }
        else {
          variables['questionnaireCount'] = 1;
          vm.baselineAnswered=false;

          //baseLine defaultValues
          variables['carotenoidecode'] = '';
          variables['blfruit'] = '0';
          variables['blfruitportie'] = '0';
          variables['blgroente'] = '0';
          variables['blgroenteportie'] = '0';
        }
      });

      $scope.questionnaire = 'ema';
      $scope.defaultValues = defaultValues;
      $scope.variables = variables;

      // An alert dialog
      $scope.showFruitPortieInformation = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Porties fruit',
          template: 'Voorbeelden van één portie fruit zijn: 1 appel, 1 banaan, 1 perzik, 1 kiwi, 2 mandarijnen, 2 pruimen, een handje met druiven, kersen of aarbeien'
        });
      };

      $scope.showSnackInformation = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Koude warme snacks',
          template: 'Warme snacks zijn bijvoorbeeld patat, koude snacks bijvoorbeeld een handje chips'
        });
      };

      $scope.showCarotenoidenCodeInformation = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Code',
          template: 'Deze code van zes letters staat op je kaartje waarop je bloeddruppel wordt opgevangen. Deze code wordt gebruikt om je resulaten anoniem naar je App te laden. Tip, maak ook een foto van deze code'
        });
      };

      $scope.showGroenteInformation = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Groente',
          template: 'Een opscheplepel is ongeveer 50 gram '
        });
      };

      $scope.showSapInformation = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Sap',
          template: 'Let op: sap uit pak telt hier niet mee'
        });
      };

      // Initialize the super class and extend it.
      angular.extend(vm, $controller('GenericAnswerController', {$scope: $scope}));

      return vm;
		}
})();
