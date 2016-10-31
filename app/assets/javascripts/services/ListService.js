djello.factory('ListService', ['Restangular', 'CardService', '$state', function(Restangular, CardService, $state) {
  
  var listService = {};

  listService.createList = function(params){
    return Restangular.all('lists').post({
      boardId: params.boardId,
      title: params.title,
      description: params.description
    });
  }

  Restangular.extendModel('lists', function(model){
    model.createCard = function(boardId){
      return CardService.createCard(model.id, boardId)
      .then(function(response){
        model.cards.push(response);
        return response;
      });
    };
    return model;
  })


  listService.changeBoard = function(list_id, boardId) {
    return Restangular.one('lists', list_id).patch({
      board_id: boardId
    })
  }



  return listService;

}]);