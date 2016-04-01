(function() {
	angular.module('healthcafe.darmklachten')
		.controller('DarmklachtenAnswerController', DarmklachtenAnswerController );

  DarmklachtenAnswerController.$inject = [ '$scope', '$controller', 'Answers', '$ionicPopup' ];

		function DarmklachtenAnswerController( $scope, $controller, Answers, $ionicPopup ) {
		  var vm = this;

      var defaultValues = {
        q01: '1',
        q02: '1',
        q03: '1',
        q04: '1',
        q05: '1',
        q06: 1,
        q07: 1,
        q08: '0',
        q09: '1',
        q10: '1',
        q11: '0',
        q12: 1,
        q13: '0',
        q14: '0',
        q15: '0',
        q16: '0',
        q17: '0'
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

      // An alert dialog
      $scope.showVetInformation = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Vet voedsel',
          template: 'Onder vet voedsel wordt verstaan voedsel met een groot tot zeer groot vetgehalte, zoals bijvoorbeeld gefrituurd voedsel, pizza, room(boter) en melk- en witte chocola.'
        });
      };

      $scope.showTarweInformation = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Tarweproducten',
          template: 'Onder tarweproducten vallen alle tarwebroodproducten, deegwaren zoals pasta of vermicelli, couscous, gebak, muffins, donuts, koek, pannenkoeken, crackers, ontbijtgranen, muesli, witbier en kiemen (zoals voor op brood of door een salade).<br/>Let op: producten op basis van bijvoorbeeld spelt of maïs vallen <u>niet</u> onder de tarweproducten.'
        });
      };

      $scope.showZuivelInformation = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Zuivelproducten',
          template: 'Onder zuivelproducten vallen melk, chocolademelk, karnemelk, koffiemelk, vla, yoghurt, kwark, pudding, ontbijtyoghurt, alle soorten kaas, crème fraîche, kookroom, zure room, (slag)room, boter (margarine, halvarine en dergelijke zijn geen zuivelproducten) en ijs.<br/>Let op: het gaat hier om zuivelproducten op basis van koemelk. Producten op basis van schapen- of geitenmelk vallen in dit geval niet onder zuivelproducten.'
        });
      };


      $scope.showKnoflookInformation = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Knoflook, ui en/of kool consumptie',
          template: 'Met ‘weinig’, ‘gemiddeld’ en ‘veel’ bedoelen we <u>voor uw doen</u> weinig, gemiddeld of veel.'
        });
      };

      $scope.showKoffieInformation = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Koffie',
          template: 'Decafé wordt niet gerekend onder koffie.'
        });
      };

      $scope.showBuikpijnInformation = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Buikpijn',
          template: 'Met buikpijn bedoelen we alle vormen van pijn of ongemak in de buik of darmen. Dit kunnen bijvoorbeeld steken, krampen of een voortdurend gevoel van pijn of ongemak zijn.'
        });
      };

      $scope.showOpgeblazenInformation = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Opgeblazen gevoel',
          template: 'Een opgeblazen gevoel betreft het gevoel dat er druk op uw darmen of buik staat, ook wel omschreven als een vol gevoel. Hierbij is de buik niet zichtbaar opgezwollen.'
        });
      };

      $scope.showOpgezwollenInformation = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Opgezwollen buik',
          template: 'Met een opgezwollen buik bedoelen we een zichtbaar opgezwollen buik. Dit kan gepaard gaan met een opgeblazen gevoel.'
        });
      };

      // Initialize the super class and extend it.
      angular.extend(vm, $controller('GenericAnswerController', {$scope: $scope}));

		  return vm;
		}
})();
