(function() {
	angular.module('healthcafe.pdas')
		.controller('PdasFeedbackController', PdasFeedbackController );

		PdasFeedbackController.$inject = [ '$http', '$q', 'BMI', 'WaistCircumference', 'BloodPressure', 'BloodGlucose', 'Cholesterol', 'Gender', 'Datapoints' ];

		function PdasFeedbackController( $http, $q, BMI, WaistCircumference, BloodPressure, BloodGlucose, Cholesterol, Gender, Datapoints ) {
      var vm = this;

      var missingData = [];
      var feedback = [];

      // Use service locally
      var baseUri = 'http://msb2.hex.tno.nl/pdas/en/advices.json';
      var staticParams = '?snp.FTO=TT&generic.Age=45&physical.Physical+activity=120';

      var url = baseUri+staticParams;

      var gender = null;
      Gender.get().then(function(data) {
        gender = data.body.gender;
      });

      if ( gender != null ) {
        url += '&generic.Gender='+gender;
      }
      else {
        missingData.push({ 'name':'Geslacht', 'url':'personal_data' });
      }

      // Load all measurements
      var models = [BMI, WaistCircumference, BloodPressure, BloodGlucose, Cholesterol];

      $q.all( models.map(function(model) { return model.list() } ) ).then(function(data) {
        for (var i = 0; i < data.length; i++) {

          var dataPoints = Datapoints.sortByDate(data[i]);

          var validDataPoint = false;
          if ( dataPoints.length != 0) {
            var lastDataPoint = dataPoints[0];

            switch(lastDataPoint.header.schema_id.name) {
              case 'body-mass-index':
                url += '&physical.BMI='+lastDataPoint.body.body_mass_index.value;
                validDataPoint = true;
                break;

              case 'waist-circumference':
                // The service requires waist circumference in cm
                if (lastDataPoint.body.waist_circumference.unit == 'm') {
                  url += '&physical.Waist+circumference='+lastDataPoint.body.waist_circumference.value*100
                }
                else {
                  url += '&physical.Waist+circumference='+lastDataPoint.body.waist_circumference.value
                }
                validDataPoint = true;
                break;

              case 'blood-pressure':
                url += '&biomarker.Systolic+blood+pressure='+lastDataPoint.body.systolic_blood_pressure.value;
                url += '&biomarker.Diastolic+blood+pressure='+lastDataPoint.body.diastolic_blood_pressure.value;
                validDataPoint = true;
                break;

              case 'blood-glucose':

                var found = false;

                var j = 0;
                while ( !found && j < dataPoints.length ) {
                  lastDataPoint = dataPoints[j];

                  if (lastDataPoint.body.temporal_relationship_to_meal == 'fasting') {
                    url += '&biomarker.Fasting+glucose='+lastDataPoint.body.blood_glucose.value;
                    validDataPoint = true;
                    found = true;
                  }

                  j++
                }
                break;

              case 'cholesterol':
                url += '&biomarker.Cholesterol='+lastDataPoint.body.blood_total_cholesterol.value;
                url += '&biomarker.Triglycerides='+lastDataPoint.body.blood_triglycerides.value;
                url += '&biomarker.HDL='+lastDataPoint.body.blood_ldl_cholesterol.value;
                validDataPoint = true;
                break;
            }
          }

          if ( !validDataPoint ) {
            var model = models[i];

            switch(model) {
              case BMI:
                missingData.push({ 'name':'BMI', 'url':'bmi/add' });
                break;
              case WaistCircumference:
                missingData.push({ 'name':'Waist circumference', 'url':'waistcircumference/add' });
                break;
              case BloodPressure:
                missingData.push({ 'name':'Blood pressure', 'url':'bloodpressure/add' });
                break;
              case BloodGlucose:
                missingData.push({ 'name':'Fasting blood glucose', 'url':'bloodglucose/add' });
                break;
              case Cholesterol:
                missingData.push({ 'name':'Cholesterol', 'url':'cholesterol/add' });
                break;
            }
          }
        }

        if ( missingData.length == 0 ) {
          $http({
            method: 'GET',
            url: url,
            headers: {'Accept': 'application/hal+json','user_key': 'f24e20ecdb59062c31ca111d4c3cac0a'}
          }).then(function successCallback(response) {
            feedback = response.data;
          }, function errorCallback(response) {
            vm.error = "Could not reach PDAS, status: "+response.status;
          });
        }

      });

      vm.feedback = feedback;
      vm.missing = missingData;

      return vm;
		}
})();
