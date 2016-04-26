(function() {
	angular.module('healthcafe.feedback')
		.controller('FeedbackController', FeedbackController );

		FeedbackController.$inject = [ '$http', '$q', '$indexedDB', 'BMI', 'WaistCircumference', 'BloodPressure', 'BloodGlucose', 'Cholesterol', 'Gender' ];

		function FeedbackController( $http, $q, $indexedDB, BMI, WaistCircumference, BloodPressure, BloodGlucose, Cholesterol, Gender ) {
      var vm = this;

      // Use service locally
      var baseUri = 'http://msb2.hex.tno.nl/pdas/en/advices.json';
      var staticParams = '?snp.FTO=TT&generic.Age=45&physical.Physical+activity=120';

      var url = baseUri+staticParams;

      Gender.get().then(function(data) {
        url += '&generic.Gender='+data.body.gender;
      });

      // Load all measurements
      var models = [BMI, WaistCircumference, BloodPressure, BloodGlucose, Cholesterol];
      $q.all( models.map(function(model) { return model.list() } ) ).then(function(data) {

        for (var i = 0; i < data.length; i++) {

          var dataPoints = sort(data[i]);

          if ( dataPoints.length != 0) {
            var lastDataPoint = dataPoints[0];

            switch(lastDataPoint.header.schema_id.name) {
              case 'body-mass-index':
                url += '&physical.BMI='+lastDataPoint.body.body_mass_index.value;
                break;

              case 'waist-circumference':
                // The service requires waist circumference in cm
                if (lastDataPoint.body.waist_circumference.unit == 'm') {
                  url += '&physical.Waist+circumference='+lastDataPoint.body.waist_circumference.value*100
                }
                else {
                  url += '&physical.Waist+circumference='+lastDataPoint.body.waist_circumference.value
                }
                break;

              case 'blood-pressure':
                url += '&biomarker.Systolic+blood+pressure='+lastDataPoint.body.systolic_blood_pressure.value;
                url += '&biomarker.Diastolic+blood+pressure='+lastDataPoint.body.diastolic_blood_pressure.value;
                break;

              case 'blood-glucose':
                for (var j = 0; j < dataPoints.length; j++) {
                  lastDataPoint = dataPoints[j];

                  if (lastDataPoint.body.temporal_relationship_to_meal == 'fasting') {
                    url += '&biomarker.Fasting+glucose='+lastDataPoint.body.blood_glucose.value;
                    break;
                  }
                }
                break;

              case 'cholesterol':
                url += '&biomarker.Cholesterol='+lastDataPoint.body.blood_total_cholesterol.value;
                url += '&biomarker.Triglycerides='+lastDataPoint.body.blood_triglycerides.value;
                url += '&biomarker.HDL='+lastDataPoint.body.blood_ldl_cholesterol.value;
                break;
            }
          }
        }

        $http({
          method: 'GET',
          url: url,
          headers: {'Accept': 'application/hal+json','user_key': 'f24e20ecdb59062c31ca111d4c3cac0a'}
        }).then(function successCallback(response) {
          vm.pdas = response.data;
        }, function errorCallback(response) {
          window.alert(response.status);
        });

      });

      function sort( datapoints ) {

        var length = datapoints.length;

        for (var i = 0; i < length-1; i++) { //Number of passes
          var min = i; //min holds the current minimum number position for each pass; i holds the Initial min number

          for (var j = i+1; j < length; j++) { //Note that j = i + 1 as we only need to go through unsorted array
            var datapoint1 = datapoints[j];
            var date1;
            if( datapoint1.body.effective_time_frame && datapoint1.body.effective_time_frame.date_time ) {
              date1 = datapoint1.body.effective_time_frame.date_time;
            } else {
              date1 = datapoint1.header.creation_date_time;
            }

            var datapoint2 = datapoints[min];
            var date2;
            if( datapoint2.body.effective_time_frame && datapoint2.body.effective_time_frame.date_time ) {
              date2 = datapoint2.body.effective_time_frame.date_time;
            } else {
              date2 = datapoint2.header.creation_date_time;
            }

            if(date1 > date2) { //Compare the numbers
              min = j; //Change the current min number position if a smaller num is found
            }
          }
          if(min != i) { //After each pass, if the current min num != initial min num, exchange the position.
            //Swap the numbers
            var tmp = datapoints[i];
            datapoints[i] = datapoints[min];
            datapoints[min] = tmp;
          }
        }

        return datapoints
      }

      return vm;
		}
})();
