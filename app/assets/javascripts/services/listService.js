djello.factory('listService',
  ['Restangular',
  function(Restangular) {

    var listService = {};


    listService.getLists = function(board) {
      return board.lists;
    };


    listService.create = function(board) {
      return Restangular.all('lists').post( { board_id: board.id } )
    };


    listService.findByID = function(board, id) {
      return board.lists.filter( function(list) {
        return (list.id === Number(id))
      })[0];
    };


    return listService;

}]);