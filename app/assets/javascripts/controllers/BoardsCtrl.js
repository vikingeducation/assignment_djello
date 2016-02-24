djello.controller('BoardsCtrl',
  ['$scope', '$window', 'boards', 'users', 'Restangular', '$state', '$stateParams', '$timeout', 'boardService', 'cardService', 'flashService', 'listService', 'ModalService', 'userService',
  function($scope, $window, boards, users, Restangular, $state, $stateParams, $timeout, boardService, cardService, flashService, listService, ModalService, userService) {

    boardService.setBoards(boards);
    userService.setUsers(users);
    $scope.flash = '';

    $scope.initVariables = function(board) {
      $scope.boards = boardService.boards;
      var firstBoard = boardService.first();

      if (!!board) {
        $scope.setSelected(board);
      } else if (!!firstBoard) {
        $scope.board = firstBoard;
        $scope.setSelected(firstBoard);
      } else {
        $scope.createBoard();
      };
    };

    $scope.setSelected = function(board) {
      $scope.board = board;
      $scope.selected = boardService.setSelected(board.id);
      $scope.editorEnabled = false;
    };

    $scope.createBoard = function() {
      Restangular.all('boards').post()
        .then( function(response) {
          boardService.add(response);
          $scope.boards = boardService.boards;
          $scope.setSelected(boardService.findByID(response.id));
          $scope.setFlash('Board', 'create', true);
        });
    };

    $scope.destroy = function(board) {
      board.remove().then( function() {
        boardService.remove(board);
        if (!!boardService.first()) {
          $scope.initVariables();
        } else {
          $scope.createBoard();
        };
        $scope.setFlash('Board', 'destroy', true);
      }, $scope.setFlash('Board', 'destroy', false) );
    };

    $scope.findBoard = function(selected) {
      $scope.initVariables( boardService.findByID($scope.selected) );
    };

    $scope.createList = function() {
      listService.create($scope.board)
        .then( function(response) {
          boardService.addList(response);
          $scope.setFlash('List', 'create', true);
        }, $scope.setFlash('List', 'create', false) );
    };

    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
    };

    $scope.saveEditor = function() {
      $scope.editorEnabled = false;
    };

    $scope.deleteList = function(list) {
      if ($window.confirm('Do you want to delete this list?')) {
        Restangular.one('lists', list.id).remove()
          .then( function() {
            $scope.lists = boardService.removeList(list);
            $scope.setFlash('List', 'destroy', true);
          }, $scope.setFlash('List', 'destroy', false) );
      };
    };

    $scope.createCard = function(list) {
      cardService.create(list)
        .then( function(response) {
          boardService.addCard(response, $scope.board.id);
          $scope.setFlash('Card', 'create', true);
        }, $scope.setFlash('Card', 'create', false) );
    };

    $scope.boardOwner = function() {
      if (!!$scope.board) {
        return (userService.current_user.id === $scope.board.owner_id)
      };
    };

    $scope.setFlash = function(obj, actionType, bool) {
      $scope.flash = flashService.updateFlash(obj, actionType, bool);
      $timeout(function() {
        $scope.flash = '';
      }, 3500, true);
    };

    $scope.showFlash = function() {
      return !!($scope.flash);
    };

    $scope.initVariables();

  }]);