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
        snack: '1',
        wandelen: '1',
        fietsen: '1',
        sporten: '1',
        vrolijk: '1',
        geirriteerd: '1',
        moe: '1',
        gestrest: '1',
        ontspannen: '1',
        engergiek: '1',
        gelukkig: '1',
        tevreden: '1',
        leven: '1',
        hongerig: '1'
      };

      var variables = {};

      Answers.listByQuestionnaire('ema').then(function(data) {
        if(data.length > 0) {
          variables['questionnaireCount'] = data.length+1;
        }
        else {
          variables['questionnaireCount'] = 1;
        }
      });

      $scope.questionnaire = 'ema';
      $scope.defaultValues = defaultValues;
      $scope.variables = variables;

      // An alert dialog
      $scope.showTarweInformation = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Tarweproducten',
          template: 'Onder tarweproducten vallen alle tarwebroodproducten, deegwaren zoals pasta of vermicelli, couscous, gebak, muffins, donuts, koek, pannenkoeken, crackers, ontbijtgranen, muesli, witbier en kiemen (zoals voor op brood of door een salade).<br/>Let op: producten op basis van bijvoorbeeld spelt of maïs vallen <u>niet</u> onder de tarweproducten.'
        });
      };

      $scope.showVetInformation = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Vet voedsel',
          template: 'Onder vet voedsel wordt verstaan voedsel met een groot tot zeer groot vetgehalte, zoals bijvoorbeeld gefrituurd voedsel, pizza, room(boter) en melk- en witte chocola.'
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
