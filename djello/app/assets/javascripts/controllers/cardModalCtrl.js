
djello.controller('cardModalCtrl', [
  '$scope', '$element', 'Restangular', 'card', 'list', 'users', 'idxInList', 'close',
  function($scope, $element, Restangular, card, list, users, idxInList, close) {


  $scope.card = card;
  $scope.list = list;
  $scope.editCardEnabled = {};

  //get users for adding members
  // Restangular.all('users').getList().then(function(result){
  //   console.log(result);
  //   $scope.users = result;
  // });
  $scope.users = users;


  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({
      // not needed to send info back b/c databinding
      // card: $scope.card
    }, 500); // close, but give 500ms for bootstrap to animate
    console.log('close method ran');
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {

    //  Manually hide the modal.
    $element.modal('hide');

    //  Now call close, returning control to the caller.
    close({
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  //=================card editing methods==================

  // to populate editable data in modal
  var setEditData = function(){
    $scope.oldCard = { id: card.id,
                    title: card.title,
              description: card.description,
                  list_id: card.list_id };
  };

  setEditData(); // running fn when modal opens

  var getRectangularObj = function(){
    return Restangular.one('lists', card.list_id)
                                    .one('cards', card.id);
  };

  $scope.editCard = function(field, save){
    if (save && $scope.editCardEnabled[field]){
      updateCard(field);
    } else {
      setEditData();
    }
    if (Object.keys($scope.editCardEnabled)[0] != field){
      $scope.editCardEnabled = {};
    }
    $scope.editCardEnabled[field]  = !$scope.editCardEnabled[field];
  };

  var updateCard = function(field){
    var updatingCard = getRectangularObj();
    // set restangular obj properties with updated data
    updatingCard[field] = $scope.oldCard[field];
    updatingCard.put().then( function(result){
      $scope.card[field] = result[field];
    } );
  };

  $scope.cardComplete = function(){
    getRectangularObj().remove().then(function(){
      $scope.list.cards.splice(idxInList, 1);
    });
    $scope.cancel();
  };

  //=============member methods=============
  $scope.addMember = function(){
    var userId = $scope.memberID;
    var idx;
    for(var i =0; i<$scope.users.length; i++){
      if($scope.users[i].id == userId) return idx = i;
    }
    $scope.card.members.push($scope.users[idx]);

    //also use restangular to add into db
  };

  var findMemberIdx= function(userId){
    for(var i =0; i<$scope.card.members.length; i++){
      if($scope.card.members[i].id == userId) return i;
    }
  };

  $scope.removeMember = function(index){
    // Restangular.one('card_memberships', ).remove().then(function(){
    //   $scope.card.members.splice(idx, 1);
    // });
  }

}]);