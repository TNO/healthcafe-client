/**
 * Generic list controller to add a new datapoint
 **/
function GenericCreateController($ionicHistory, Model) {
  var vm = this;

  vm.data = {};

  vm.save = function() {
    Model.create(vm.data).then(function(data) {
      Model.load().then(function() {
        $ionicHistory.goBack();
       });
    });
  };

  return vm;
}