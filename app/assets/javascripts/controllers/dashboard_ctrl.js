Djello.controller('DashboardCtrl', ['$scope', 'Auth', 'boards', 'BoardService', '$state',
  function($scope, Auth, boards, BoardService, $state) {
    Auth.currentUser()
      .then(function(user) {
        $scope.currentUser = user;
        console.log(user);
      }, function(response) {
        console.log(response);
      });

    $scope.boards = boards;
    $scope.currentBoard = $scope.boards[0];

    $scope.deleteBoard = function(board) {
      if (!board) return;
      BoardService.deleteBoard(board).then( function() {
                    BoardService.getBoards().then( function(boards) {
                      angular.copy(boards,$scope.boards);
                      $scope.currentBoard =  $scope.boards[0];
                      $scope.boardChanged($scope.currentBoard);
                    })
                  })
    }

    $scope.createBoard = function() {
      params = { title: "New Board", user_id: $scope.currentUser.id }
      BoardService.createBoard(params).then( function(createdBoard) {
                    BoardService.getBoards().then( function(boards) {
                      angular.copy(boards,$scope.boards);
                      $scope.currentBoard =  $scope.boards[0];
                      $scope.boardChanged($scope.currentBoard);
                    })
      })
    }

    $scope.changeBoard = function(board, title) {
      params = {title: title};
      BoardService.updateBoard(board, params);
    }

    $scope.boardChanged = function(board) {
      $state.go('dashboard.show', {"id": board.id});
    }

    $state.go('dashboard.show', {"id": boards[0].id});
}]);