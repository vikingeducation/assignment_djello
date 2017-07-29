const express = require("express");
const router = express.Router();
const models = require("./../../models");
const User = models.User;
const Board = models.Board;
const List = models.List;
const { checkUserBoardPermissions, apiMessages } = require("./../../helpers");

/*  ===============
  Read Board
================ */
router.get("/:id", (req, res, next) => {
  const boardId = req.params.id;
  Board.findById(boardId)
    .populate({
      path: "lists",
      populate: {
        path: "cards",
        populate: {
          path: "members"
        }
      }
    })
    .then(board => {
      if (!board) {
        throw new Error(apiMessages.doesNotExist("Board"));
      }

      let canCurrentUserGet = checkUserBoardPermissions(board, req.user.id);
      if (!canCurrentUserGet) {
        throw new Error(apiMessages.failedAuth);
      }

      res.json({
        data: board
      });
    })
    .catch(error => next(error));
});

/*  ===============
  Update Board
================ */
router.put("/:id", (req, res, next) => {
  const boardId = req.params.id;
  let newTitle = req.body.title;

  Board.findById(boardId)
    .then(board => {
      if (!board) {
        throw new Error(apiMessages.doesNotExist("Board"));
      }

      let canCurrentUserEdit = checkUserBoardPermissions(board, req.user.id);
      if (!canCurrentUserEdit) {
        throw new Error(apiMessages.failedAuth);
      }

      // Change the board's title
      return Board.findByIdAndUpdate(
        boardId,
        {
          title: newTitle
        },
        { new: true }
      );
    })
    .then(result => {
      res.json({
        message: apiMessages.successfulPut,
        data: result
      });
    })
    .catch(error => next(error));
});

/*  ===============
  Add User to Board
================ */
router.post("/:id/users/:userId", (req, res, next) => {
  const boardId = req.params.id;
  const userToAdd = req.params.userId;
  let updatedBoard;

  Board.findById(boardId)
    .then(board => {
      if (!board) {
        throw new Error(apiMessages.doesNotExist("Board"));
      }
      let canCurrentUserEdit = checkUserBoardPermissions(board, req.user.id);

      if (!canCurrentUserEdit) {
        throw new Error(apiMessages.failedAuth);
      }

      // Add the user to the board's array
      return Board.findByIdAndUpdate(
        boardId,
        {
          $addToSet: { users: userToAdd }
        },
        { new: true }
      );
    })
    .then(result => {
      updatedBoard = result;

      // Then update corresponding user
      return User.findByIdAndUpdate(
        userToAdd,
        {
          $addToSet: { boards: updatedBoard }
        },
        { new: true }
      );
    })
    .then(result => {
      res.json({
        message: apiMessages.successfulPut,
        data: {
          board: updatedBoard,
          user: result
        }
      });
    })
    .catch(error => next(error));
});

/*  ===============
  Remove User from Board
================ */
router.delete("/:id/users/:userId", (req, res, next) => {
  const boardId = req.params.id;
  const userToRemove = req.params.userId;
  let updatedBoard;

  Board.findById(boardId)
    .then(board => {
      if (!board) {
        throw new Error(apiMessages.doesNotExist("Board"));
      }
      let canCurrentUserEdit = checkUserBoardPermissions(board, req.user.id);

      if (!canCurrentUserEdit) {
        throw new Error(apiMessages.failedAuth);
      }

      // Remove the user from the board's array
      return Board.findByIdAndUpdate(
        boardId,
        {
          $pop: { users: userToRemove }
        },
        { new: true }
      );
    })
    .then(result => {
      updatedBoard = result;

      // Then remove the board from the user's array
      return User.findByIdAndUpdate(
        userToRemove,
        {
          $pop: { boards: updatedBoard }
        },
        { new: true }
      );
    })
    .then(result => {
      res.json({
        message: apiMessages.successfulPut,
        data: {
          board: updatedBoard,
          user: result
        }
      });
    })
    .catch(error => next(error));
});

/*  ===============
  Create List
================ */
router.post("/:id/lists", (req, res, next) => {
  const boardId = req.params.id;
  const { title, description } = req.body;
  let newList;
  Board.findById(boardId)
    .then(board => {
      if (!board) {
        throw new Error(apiMessages.doesNotExist("Board"));
      }
      let canCurrentUserCreate = checkUserBoardPermissions(board, req.user.id);

      if (!canCurrentUserCreate) {
        throw new Error(apiMessages.failedAuth);
      }

      return List.create({
        title: title || "New List",
        description: description || "Enter a description here",
        cards: [],
        board: boardId
      });
    })
    .then(result => {
      newList = result;
      return Board.findByIdAndUpdate(boardId, {
        $addToSet: { lists: result.id }
      });
    })
    .then(() => {
      res.json({
        message: apiMessages.successfulPost,
        data: newList
      });
    })
    .catch(error => next(error));
});

/*  ===============
  Get All Lists
================ */
router.get("/:id/lists", (req, res, next) => {
  const boardId = req.params.id;
  Board.findById(boardId)
    .populate({
      path: "lists",
      populate: {
        path: "cards",
        populate: {
          path: "members"
        }
      }
    })
    .then(board => {
      if (!board) {
        throw new Error(apiMessages.doesNotExist("Board"));
      }

      let canCurrentUserGet = checkUserBoardPermissions(board, req.user.id);
      if (!canCurrentUserGet) {
        throw new Error(apiMessages.failedAuth);
      }

      res.json({
        data: board.lists
      });
    })
    .catch(error => next(error));
});

/*  ===============
  Delete Board
================ */
router.delete("/:id", (req, res, next) => {
  const boardId = req.params.id;
  let deletedBoard;

  Board.findById(boardId)
    .then(board => {
      if (!board) {
        throw new Error(apiMessages.doesNotExist("Board"));
      }
      let canCurrentUserDelete = checkUserBoardPermissions(board, req.user.id);
      if (!canCurrentUserDelete) {
        throw new Error(apiMessages.failedAuth);
      }

      return Board.findByIdAndRemove(boardId);
    })
    .then(result => {
      deletedBoard = result;
      return User.update(
        { boards: { $in: [deletedBoard.id] } },
        {
          $pull: { boards: deletedBoard.id }
        },
        { multi: true }
      );
    })
    .then(() => {
      res.json({
        message: apiMessages.successfulDelete,
        data: {
          deletedResource: deletedBoard
        }
      });
    })
    .catch(error => next(error));
});

module.exports = router;
