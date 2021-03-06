(function() {
	angular.module('healthcafe.personal')
		.controller('PersonalController', PersonalController );

		PersonalController.$inject = ['$q', '$state', '$ionicHistory', 'DateOfBirth', 'Gender', 'BodyHeight']

  /**
   * Controller to add/view static personal data (DOB, gender, height)
   **/
  function PersonalController($q, $state, $ionicHistory, DateOfBirth, Gender, BodyHeight) {
    var vm = this;

    vm.data = {
      body: {
        dob: null,
        gender: null,
        height: null
      },
      date: new Date()
    };

    // Load existing data
    DateOfBirth.get().then(function(datapoint) { vm.data.body.dob = datapoint.body.date_of_birth; });
    Gender.get().then(function(datapoint) { vm.data.body.gender = datapoint.body.gender; });
    BodyHeight.get().then(function(datapoint) { vm.data.body.height = datapoint.body.body_height.value; });

    // Save new data
    vm.save = function() {
      var saves = [
        DateOfBirth.set(vm.data.body),
        Gender.set(vm.data.body),
        BodyHeight.set(vm.data.body)
      ];

      function reload() {
        DateOfBirth.load();
        Gender.load();
        BodyHeight.load();
      }
      function go() {
        $ionicHistory.nextViewOptions({
          disableBack: true,
        });

        //Is not working, gender is read from cache when returning to ema. Only works after manual refresh (reload does not work)
        //Now giving gender and height as $stateParam, when fixed also see 'params' @ questionnaire routes and workaround in ema controller
        if ($ionicHistory.backView().stateId.startsWith('app.ema')) {
          $state.go('app.ema', { gender: vm.data.body.gender, height: vm.data.body.height });
          return
        }

        $state.go('app.timeline');
      }

      $q.all(saves).then(function() {
        reload();
        go();
      }).catch(function(e) {
        reload();
        go();
      });
    };

    return vm;
  }

})();
