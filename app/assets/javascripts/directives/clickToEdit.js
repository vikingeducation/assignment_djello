djello.directive('clickToEdit', function() {
  return {
    restrict: "A",
    // replace element with editor
    replace: true,
    templateUrl: '/templates/shared/clickToEdit.html',

    scope: {
      value: "=clickToEdit",
      id: '=',
      model: '@',
      attribute: '@'
    },

    controller: ['$scope', 'Restangular', function($scope, Restangular) {
      $scope.view = {
        editableValue: $scope.value,
        editorEnabled: false
      };

      $scope.enableEditor = function() {
        $scope.view.editorEnabled = true;
        $scope.view.editableValue = $scope.value;
      };

      $scope.disableEditor = function() {
        $scope.view.editorEnabled = false;
      };

      $scope.save = function() {
        $scope.value = $scope.view.editableValue;
        $scope.disableEditor();

        // able to grab different models and patch the chosen attribute
        // save on submit
        var obj = {};
        obj[$scope.attribute] = $scope.value;
        Restangular.one($scope.model, $scope.id).patch( obj );
      };

      // cancel on blur
      $scope.cancel = function() {
        $scope.disableEditor();
      };
      
    }]
  }
});