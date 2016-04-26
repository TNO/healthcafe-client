(function() {
	angular.module('healthcafe.bodymeasurements')
		.controller('BodyMeasurementsController', BodyMeasurementsController );

		BodyMeasurementsController.$inject = ['$q', '$state', '$ionicHistory', '$ionicPopup', 'BodyWeight', 'BMI', 'BodyFat', 'WaistCircumference'];

  /**
   * Controller to add new body measurements (Weight, BMI, body fat, waist circumference)
   **/
  function BodyMeasurementsController($q, $state, $ionicHistory, $ionicPopup, BodyWeight, BMI, BodyFat, WaistCircumference) {
    var vm = this;

    vm.data = {
      body: {
        weight: null,
        height: null,
        waist: null,
        bodyfat: null
      },
      date: new Date()
    };

    // Save new data, if the user clicks save
    vm.save = function() {
      var saves = [

      ];

      var models = [];
      models.push(BodyWeight);
      models.push(BMI);
      models.push(BodyFat);
      models.push(WaistCircumference);

      for( var i in models ) {
        saves.push(
          models[i].create(vm.data.body, vm.data.date)
            .then(function(data) {
              return models[i].load();
            })
            .catch(function(e) {
              console.log( "Error saving data", models[i].schema, e );
              return e;
            })
        );
      }

      function go() {
        $ionicHistory.nextViewOptions({
          disableBack: true,
        });
        $state.go('app.timeline');
      }
      console.log( "Waiting for saves");

      // If any of the saves failes, raise an error with the user
      $q.all(saves).then(function() {
        go();
      }).catch(function(e) {
        go();
      });
    };

    return vm;
  }

})();
