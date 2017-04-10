djello.directive('cardForm', ['cardService', function(cardService) {
  return {
    templateUrl: '/templates/cards/card_form.html',
    restrict: 'A',
    scope: true,
    controller: [
    "$scope", "cardService",
    function($scope, cardService) {

      $scope.createCard = function() {
        $scope.newCard.list_id = $scope.list.id;
        cardService.createCard($scope.newCard) 
                    .then( function(response) {
                      $scope.newCard = {};
                      $scope.$emit($scope.list.id + ".newCard", response);
                    } )
      }

    }]
}}])