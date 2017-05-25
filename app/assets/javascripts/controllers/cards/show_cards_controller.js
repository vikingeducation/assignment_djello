djello.controller('showCardsController', 
  ['$scope', 'close', 'card', 'board', 'cardService', 'userService', '$rootScope', 'cardMembershipService', 'boardMembershipService', 'activityService',
  function($scope, close, card, board, cardService, userService, $rootScope, cardMembershipService, boardMembershipService, activityService) {

    $scope.card = card;

    $scope.members = cardMembershipService.getMembers($scope.card).$object;

    $scope.activities = activityService.getActivities($scope.card.id).$object;

    _addActivity = function(description) {
      activityService.createActivity($scope.card.id, description);
    }

    $scope.addMember = function() {
      cardMembershipService.createMembership($scope.card, $scope.selectedUser).then( function(response) {
                            _addActivity('added member ' + $scope.selectedUser.username);
                            boardMembershipService.createMembership(board, $scope.selectedUser);
                            $scope.members = cardMembershipService.getMembers($scope.card).$object;
                            $scope.selectedUser = {};
                          })
    }

    $scope.removeMember = function(user) {
      var username = user.username
      cardMembershipService.removeMember(user.id, $scope.card)
                       .then( function() {
                          _addActivity('removed member ' + username)
                          $scope.members = cardMembershipService.getMembers($scope.card).$object;
                       })
    }

    $scope.close = function(result) {
      close(result, 500);
    };

    $scope.updateCard = function() {
      cardService.updateCard($scope.card)
                 .then( function(response) {
                    _addActivity('updated card')
                    $scope.editMode = false;
                 })
    };

    $scope.markComplete = function() {
      cardService.markComplete($scope.card)
                 .then( function(response) {
                  _addActivity('marked card complete')
                  $rootScope.$broadcast('cards.update');
                  $scope.close();
                 });
    };

    $scope.users = userService.getAll().$object;
 
  }])