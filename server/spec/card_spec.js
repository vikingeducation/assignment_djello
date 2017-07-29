const app = require("../");
const rp = require("request-promise");
const mongoose = require("mongoose");
const models = require("../models");
const User = models.User;
const Board = models.Board;
const List = models.List;
const Card = models.Card;
const Activity = models.Activity;
const helpers = require("./helpers");

describe("Card", () => {
  const { baseUrl, apiUrl, getJSON, log } = helpers;

  let server;
  let user;
  let board;
  let list;
  let token;

  /*  ===============
    Manage Server
  ================ */
  beforeAll(done => {
    server = app.listen(8888, () => {
      done();
    });
  });

  afterAll(done => {
    server.close();
    server = null;
    done();
  });

  /*  ===============
    Create Resources
  ================ */

  beforeEach(done => {
    User.create({
      email: "foobar@gmail.com",
      password: "password"
    }).then(result => {
      user = result;
      done();
    });
  });

  beforeEach(done => {
    Board.create({
      title: "Test Board",
      lists: [],
      users: [user.id]
    })
      .then(result => {
        board = result;
        return User.findByIdAndUpdate(user.id, {
          $addToSet: { boards: board.id }
        });
      })
      .then(() => {
        done();
      });
  });

  beforeEach(done => {
    List.create({
      title: "Test List Title",
      description: "Test List Description",
      board: board.id,
      cards: []
    })
      .then(result => {
        list = result;
        return Board.findByIdAndUpdate(board.id, {
          $addToSet: { lists: list.id }
        });
      })
      .then(() => {
        done();
      });
  });

  beforeEach(done => {
    let loginOpts = {
      method: "POST",
      uri: `${baseUrl}/sessions`,
      form: {
        email: "foobar@gmail.com",
        password: "password"
      },
      json: true
    };

    rp(loginOpts).then(result => {
      token = result.token;
      done();
    });
  });

  /*  ===============
    User Tests
  ================ */
  describe("API", () => {
    let card;

    beforeEach(done => {
      Card.create({
        title: "Test Original Card Title",
        description: "Test Original Card Description",
        list: list.id,
        members: [user.id],
        activities: []
      })
        .then(result => {
          card = result;
          return List.findByIdAndUpdate(list.id, {
            $addToSet: { cards: card.id }
          });
        })
        .then(() => {
          done();
        });
    });

    it("successfully creates a card", done => {
      Card.findById(card.id)
        .then(results => {
          expect(results.title).toBe("Test Original Card Title");
          done();
        })
        .catch(error => {
          expect(error).toBe(null);
          done();
        });
    });

    it("creates a card through the api", done => {
      let options = {
        method: "POST",
        uri: `${apiUrl}/lists/${list.id}/cards`,
        auth: {
          bearer: token
        },
        form: {
          title: "Test New Card Title",
          description: "Test New Card Description"
        },
        json: true,
        resolveWithFullResponse: true
      };

      rp(options)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.data.title).toBe("Test New Card Title");
          expect(res.body.data.description).toBe("Test New Card Description");
          return Card.findById(res.body.data.id);
        })
        .then(result => {
          expect(result).toBeDefined();
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    it("gets a card", done => {
      let options = {
        method: "GET",
        uri: `${apiUrl}/cards/${card.id}`,
        auth: {
          bearer: token
        },
        json: true,
        resolveWithFullResponse: true
      };

      rp(options)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.data.title).toBe("Test Original Card Title");
          expect(res.body.data.description).toBe(
            "Test Original Card Description"
          );
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    it("updates list after creating card", done => {
      let options = {
        method: "POST",
        uri: `${apiUrl}/lists/${list.id}/cards`,
        auth: {
          bearer: token
        },
        form: {
          title: "Test New Card Title",
          description: "Test New Card Description"
        },
        json: true,
        resolveWithFullResponse: true
      };

      rp(options)
        .then(res => {
          expect(res.statusCode).toBe(200);
          return List.findById(list.id);
        })
        .then(list => {
          expect(list.cards.length).toBe(2);
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    it("updates a card title", done => {
      let options = {
        method: "PUT",
        uri: `${apiUrl}/cards/${card.id}`,
        auth: {
          bearer: token
        },
        form: {
          title: "Changed Card Title"
        },
        json: true,
        resolveWithFullResponse: true
      };

      rp(options)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.data.title).toBe("Changed Card Title");
          expect(res.body.data.description).toBe(
            "Test Original Card Description"
          );
          return Card.findById(card.id);
        })
        .then(result => {
          expect(result.title).toBe("Changed Card Title");
          expect(result.description).toBe("Test Original Card Description");
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    it("updates a card description", done => {
      let options = {
        method: "PUT",
        uri: `${apiUrl}/cards/${card.id}`,
        auth: {
          bearer: token
        },
        form: {
          description: "Changed Card Description"
        },
        json: true,
        resolveWithFullResponse: true
      };

      rp(options)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.data.title).toBe("Test Original Card Title");
          expect(res.body.data.description).toBe("Changed Card Description");
          return Card.findById(card.id);
        })
        .then(result => {
          expect(result.title).toBe("Test Original Card Title");
          expect(result.description).toBe("Changed Card Description");
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    it("creates the correct activity when card title is changed", done => {
      let options = {
        method: "PUT",
        uri: `${apiUrl}/cards/${card.id}`,
        auth: {
          bearer: token
        },
        form: {
          title: "Changed Card Title"
        },
        json: true,
        resolveWithFullResponse: true
      };

      rp(options)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.data.title).toBe("Changed Card Title");
          expect(res.body.data.description).toBe(
            "Test Original Card Description"
          );
          return Activity.findById(res.body.data.activities[0]);
        })
        .then(result => {
          expect(result.description).toBe(
            'Changed title to "Changed Card Title".'
          );
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    it("creates the correct activity when card description is changed", done => {
      let options = {
        method: "PUT",
        uri: `${apiUrl}/cards/${card.id}`,
        auth: {
          bearer: token
        },
        form: {
          description: "Changed Card Description"
        },
        json: true,
        resolveWithFullResponse: true
      };

      rp(options)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.data.title).toBe("Test Original Card Title");
          expect(res.body.data.description).toBe("Changed Card Description");
          return Activity.findById(res.body.data.activities[0]);
        })
        .then(result => {
          expect(result.description).toBe(
            'Changed description to "Changed Card Description".'
          );
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    it("deletes a card", done => {
      let options = {
        method: "DELETE",
        uri: `${apiUrl}/cards/${card.id}`,
        auth: {
          bearer: token
        },
        json: true,
        resolveWithFullResponse: true
      };

      rp(options)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.message).toBe("Resource successfully removed.");
          return Card.findById(card.id);
        })
        .then(result => {
          expect(result).toEqual(null);
          return List.findById(list.id);
        })
        .then(list => {
          expect(list.cards.length).toBe(0);
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    describe("User", () => {
      let secondUser;
      beforeEach(done => {
        User.create({
          email: "foobar2@gmail.com",
          password: "password"
        }).then(result => {
          secondUser = result;
          done();
        });
      });

      it("adds a member to a card", done => {
        let options = {
          method: "POST",
          uri: `${apiUrl}/cards/${card.id}/users/${secondUser.id}`,
          auth: {
            bearer: token
          },
          json: true,
          resolveWithFullResponse: true
        };

        rp(options)
          .then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.body.data.members.length).toBe(2);
            return Card.findById(card.id);
          })
          .then(result => {
            expect(result.members.length).toBe(2);
            done();
          })
          .catch(error => {
            expect(error).toEqual(null);
            done();
          });
      });

      it("removes a member from a card", done => {
        let options = {
          method: "DELETE",
          uri: `${apiUrl}/cards/${card.id}/users/${user.id}`,
          auth: {
            bearer: token
          },
          json: true,
          resolveWithFullResponse: true
        };

        rp(options)
          .then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.body.data.members.length).toBe(0);
            return Card.findById(card.id);
          })
          .then(result => {
            expect(result.members.length).toBe(0);
            done();
          })
          .catch(error => {
            expect(error).toEqual(null);
            done();
          });
      });

      it("adds user to board when a member is added to card", done => {
        let options = {
          method: "POST",
          uri: `${apiUrl}/cards/${card.id}/users/${secondUser.id}`,
          auth: {
            bearer: token
          },
          json: true,
          resolveWithFullResponse: true
        };

        rp(options)
          .then(res => {
            expect(res.statusCode).toBe(200);
            return Board.findById(board.id);
          })
          .then(result => {
            expect(result.users.length).toBe(2);
            done();
          })
          .catch(error => {
            expect(error).toEqual(null);
            done();
          });
      });

      it("adds board to user when a member is added to card", done => {
        let options = {
          method: "POST",
          uri: `${apiUrl}/cards/${card.id}/users/${secondUser.id}`,
          auth: {
            bearer: token
          },
          json: true,
          resolveWithFullResponse: true
        };

        rp(options)
          .then(res => {
            expect(res.statusCode).toBe(200);
            return User.findById(secondUser.id);
          })
          .then(result => {
            expect(result.boards.length).toBe(1);
            done();
          })
          .catch(error => {
            expect(error).toEqual(null);
            done();
          });
      });
    });
  });
});
