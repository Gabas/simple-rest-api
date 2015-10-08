module.exports = function(app) {
  app.directive('arrayInfo', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/directives/array_info_template.html',
      scope: {
        array: '=',
        length: '='
      },
      controller: ['$scope', function($scope) {
        $scope.findAllFields = function(obj) {
          var fields = [];
          for (name in obj[0]) {
            fields.push(name);
          }
          $scope.fieldsString = fields.toString();
          $scope.length = obj.length;
        };
      }],
      link: function(scope, iElement, iAttrs, ctrl) {
        scope.$watch('array', function() {
          scope.findAllFields(scope.array);
          scope.length = scope.array.length;
        }, true);
      }
    };
  });
};