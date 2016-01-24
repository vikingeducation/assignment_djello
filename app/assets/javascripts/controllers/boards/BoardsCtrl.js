djello.controller('BoardsCtrl',
  ['$scope', '$window', 'boards', 'users', 'Restangular', 'boardService', 'listService', 'cardService', 'userService',
  function($scope, $window, boards, users, Restangular, boardService, listService, cardService, userService) {

    boardService.setBoards(boards);
    userService.setUsers(users);


    $scope.setVariables = function(board) {
      $scope.boards = boardService.boards;

      if (board) {
        $scope.board = board;
      } else {
        $scope.board = boardService.first();
      };

      $scope.selected = boardService.setSelected($scope.board.id);
      $scope.editorEnabled = false;
      boardService.needsRefresh = false;
    };


    $scope.boardOwner = function() {
      return (userService.current_user.id === $scope.board.owner.id)
    }


    $scope.createBoard = function() {
      Restangular.all('boards').post()
        .then( function(response) {
          boardService.add(response);
          $scope.setVariables(response);
      });
    };


    $scope.destroy = function(board) {
      board.remove().then( function() {

        $scope.boards = $scope.boards.filter( function(obj) {
          return obj.id !== board.id
        });

        boardService.remove(board);
        $scope.setVariables();
      })
    };


    $scope.goTo = function(selected) {
      $scope.setVariables( boardService.findByID($scope.selected) );
    };


    $scope.createList = function() {
      listService.create($scope.board)
        .then( function(response) {
          boardService.addList(response);
      });
    }


    $scope.deleteList = function(list) {
      if ($window.confirm("Delete this list?")) {
        Restangular.one('lists', list.id).remove()
          .then( function() {
            // should be able to get rid of this
            $scope.lists = boardService.removeList(list);
        })
      };
    }


    $scope.createCard = function(list) {
      cardService.create(list)
        .then( function(response) {
          boardService.addCard(response, $scope.board.id);
      });
    }



    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
    }


    $scope.saveEditor = function() {
      $scope.editorEnabled = false;
    }


    $scope.dataService = boardService;
    $scope.$watch('dataService.needsRefresh', $scope.setVariables($scope.board) );


    $scope.setVariables();

}]);