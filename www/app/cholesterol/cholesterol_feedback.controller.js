(function() {
	angular.module('healthcafe.cholesterol')
		.controller('CholesterolFeedbackController', CholesterolFeedbackController );

  CholesterolFeedbackController.$inject = [ '$q', 'BMI', 'WaistCircumference', 'Cholesterol', 'BloodPressure', 'Gender', 'Datapoints' ];

  function CholesterolFeedbackController( $q, BMI, WaistCircumference,  Cholesterol, BloodPressure, Gender, Datapoints ) {
    var vm = this;

    vm.loadingData = false;
    vm.data = { gender: null, bmi: null, waistcircumference: null, cholesterol: { total: null }, bloodpressure: { systolic: null, diastolic: null } };

    vm.useLastStoredDatapoints = function useLastStoredDatapoints() {

      vm.loadingData = true;

      // Load all measurements
      var models = [BMI, WaistCircumference, Cholesterol, BloodPressure];

      $q.all( models.map(function(model) { return model.list() } ) ).then(function(data) {
        for (var i = 0; i < data.length; i++) {

          var dataPoints = Datapoints.sortByDate(data[i]);

          if (dataPoints.length != 0) {
            var lastDataPoint = dataPoints[0];

            switch (lastDataPoint.header.schema_id.name) {
              case 'body-mass-index':
                vm.data.bmi = lastDataPoint.body.body_mass_index.value;
                break;
              case 'waist-circumference':
                vm.data.waistcircumference = lastDataPoint.body.waist_circumference.value;
                break;
              case 'cholesterol':
                vm.data.cholesterol.total = lastDataPoint.body.blood_total_cholesterol.value;
                break;
              case 'blood-pressure':
                vm.data.bloodpressure.systolic = lastDataPoint.body.systolic_blood_pressure.value;
                vm.data.bloodpressure.diastolic = lastDataPoint.body.diastolic_blood_pressure.value;
                break;
            }
          }
        }
      });

      Gender.get().then(function(datapoint) {  vm.data.gender = datapoint.body.gender; });

      vm.loadingData = false;
    }

    vm.getFeedback = function getFeedback() {

      var totalCount = 0;
      var badCount = 0;
      var badList = [];
      var gender = '';

      for(item in vm.data) {

        if (vm.data[item] != null) {

          // Add 1 to total parameter count
          // can still be revised if sub value is null.
          // (e.g. bloodpressure.systolic)
          totalCount += 1;

          switch(item) {
            case 'gender':
              gender = vm.data[item];
              break;
            case 't2d':
            case 'cvd':
            case 'smoke':
              if (vm.data[item] == 'yes') {
                badList.push(item);
                badCount += 1;
              }
              break;
            case 'bmi':
              if (vm.data[item] > 25) {
                badList.push(item);
                badCount += 1;
              }
              break;
            case 'waistcircumference':
              if (gender == 'male' && vm.data[item] > 92) {
                badList.push(item);
                badCount += 1;
              }
              if (gender == 'female' && vm.data[item] > 84) {
                badList.push(item);
                badCount += 1;
              }
              break;
            case 'cholesterol':

              var total = vm.data[item].total;

              if (total == null) {
                totalCount -= 1
              }

              if (total > 6.2) {
                badList.push(item);
                badCount += 1;
              }
              break;
            case 'bloodpressure':
              var sysbp = vm.data[item].systolic;
              var diabp = vm.data[item].diastolic;

              if (sysbp == null || diabp == null) {
                totalCount -= 1
              }

              if (sysbp >= 140 || diabp >= 90) {
                badList.push(item);
                badCount += 1;
              }
              break;
            case 'vegetable':
              if (vm.data[item] < 250) {
                badList.push(item);
                badCount += 1;
              }
              break;
            case 'fruit':
              if (vm.data[item] < 200) {
                badList.push(item);
                badCount += 1;
              }
              break;
            case 'fat':
              if (gender == 'male' && vm.data[item] > 28) {
                badList.push(item);
                badCount += 1;
              }
              if (gender == 'female' && vm.data[item] > 22) {
                badList.push(item);
                badCount += 1;
              }
              break;
            case 'physical':
              if (vm.data[item] < 30) {
                badList.push(item);
                badCount += 1;
              }
              break;
          }
        }
      }

      if (totalCount == 12 ) {
        vm.error = null;

        if (badCount >= 4) {
          vm.feedback = 'Uw risico op cardioasculaire ziektes is hoger dan gemiddeld.'
        }
        else {
          vm.feedback = 'Uw risico op cardioasculaire ziektes is gemiddeld.'
        }
      }
      else {
        vm.error = 'Please fill out all fields'
      }
    }

    return vm;
  }
})();
