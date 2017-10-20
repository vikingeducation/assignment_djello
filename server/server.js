const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const { User, Board, List, Card } = require("./models");

const morgan = require("morgan");
const morganToolkit = require("morgan-toolkit")(morgan);

app.use(morganToolkit());

// Session

app.use(
	session({
		secret: "ia ia cthulhu fhtagn",
		resave: false,
		saveUninitialized: false
	})
);

// Body parser

app.use(bodyParser.json());

// Passport authentication

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require("passport-local").Strategy;

passport.use(
	new LocalStrategy({ usernameField: "email" }, function(
		email,
		password,
		done
	) {
		User.find({
			where: {
				email: email
			}
		}).then(user => {
			if (!user || !user.validatePassword(password)) {
				return done(null, false);
			}
			return done(null, user);
		});
	})
);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id).then(user => {
		done(null, user);
	});
});

const loggedInOnly = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.end();
	}
};

// Login/Logout routes

app.get("/login", loggedInOnly, async (req, res) => {
	const boards = await Board.findAll({
		where: { userId: req.user.id },
		include: [{ model: List, include: [{ model: Card }] }],
		order: [
			["updatedAt", "DESC"],
			["title"],
			[List, "boardIndex"],
			[List, Card, "listIndex"]
		]
	});

	res.json({
		user: {
			id: req.user.id,
			username: req.user.username,
			email: req.user.email
		},
		boards: boards
	});
});

app.post("/login", passport.authenticate("local"), async (req, res) => {
	const boards = await Board.findAll({
		where: { userId: req.user.id },
		include: [
			{ model: List, include: [{ model: Card, where: { completed: false } }] }
		],
		order: [
			["updatedAt", "DESC"],
			["title"],
			[List, "boardIndex"],
			[List, Card, "listIndex"]
		]
	});

	res.json({
		user: {
			id: req.user.id,
			username: req.user.username,
			email: req.user.email
		},
		boards: boards
	});
});

app.delete("/logout", loggedInOnly, (req, res) => {
	req.logout();
	res.end();
});

// API routes
const api = require("./routes/api");

app.use("/api", loggedInOnly, api);

// app.post("/api/boards/new", loggedInOnly, async (req, res) => {
// 	const newBoard = await Board.create({
// 		title: "Untitled Board",
// 		userId: req.body.userId
// 	});
// 	res.json(newBoard);
// });

// app.patch("/api/boards", loggedInOnly, async (req, res) => {
// 	await Board.update({ title: req.body.title }, { where: { id: req.body.id } });
// 	res.end();
// });

// app.delete("/api/boards", loggedInOnly, async (req, res) => {
// 	await Board.destroy({ where: { id: req.body.id } });
// 	res.end();
// });

// app.post("/api/lists/new", loggedInOnly, async (req, res) => {
// 	const newList = await List.create({
// 		title: "Untitled List",
// 		description: "Your description here",
// 		boardId: req.body.boardId,
// 		boardIndex: req.body.boardIndex
// 	});

// 	res.json(newList);
// });

// app.patch("/api/lists/", loggedInOnly, async (req, res) => {
// 	const updateObj = {};
// 	updateObj[req.body.field] = req.body.data;

// 	await List.update(updateObj, {
// 		where: { id: req.body.id }
// 	});

// 	const updatedList = await List.findById(req.body.id, {
// 		include: [{ model: Card }],
// 		order: [[Card, "listIndex"]]
// 	});
// 	res.json(updatedList);
// });

// app.delete("/api/lists", loggedInOnly, async (req, res) => {
// 	await List.destroy({ where: { id: req.body.id } });
// 	res.end();
// });

// app.post("/api/cards/new", loggedInOnly, async (req, res) => {
// 	const newCard = await Card.create({
// 		title: "Untitled Card",
// 		description: "Your description here",
// 		listId: req.body.listId,
// 		listIndex: req.body.listIndex,
// 		completed: false
// 	});

// 	res.json(newCard);
// });

// app.post("/api/cards", loggedInOnly, async (req, res) => {
// 	await Card.update({ completed: true }, { where: { id: req.body.id } });
// 	res.end();
// });

// app.put("/api/cards", loggedInOnly, async (req, res) => {
// 	const updatedCard = await Card.update(
// 		{ title: req.body.data.title, description: req.body.data.description },
// 		{ where: { id: req.body.id }, returning: true }
// 	);

// 	res.json(updatedCard[1][0]);
// });

// app.delete("/api/cards", loggedInOnly, async (req, res) => {
// 	await Card.destroy({ where: { id: req.body.id } });
// 	res.end();
// });

app.listen(3001, () => {
	console.log("Now listening...");
});
