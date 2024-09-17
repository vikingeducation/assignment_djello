# ☑︎ Djello
![](https://user-images.githubusercontent.com/22121223/33110355-3769d06c-cf82-11e7-827f-249ee6fb7258.png)

## Djello
Djello is a simple, clean, [Trello](http://trello.com) clone built with Rails 5 and React.

### Features:
- Sort cards within lists using drag-and-drop
- Edit text in-place
- User registration
- CRUD boards, cards, lists


## Live Demo
Give Djello a whirl at [yxlau.github.io/project_djello_react](yxlau.github.io/project_djello_react). 

Sign in using any of the following emails: `foo0@bar.com`, `foo1@bar.com`, `foo2@bar.com`.   
Password: `password!`

Alternatively, create your own account on the site.

## Getting Started
To run Djello in your local environment, first clone this repo and follow the steps below:

### Setting up the back end
From the root directory:

1. Run `bundle install` to install the required gems
2. Set up the database with `rails db:migrate`
3. Seed the database with `rails db:seed`
4. Allow CORS by setting the environment variable `CORS_ORIGINS` to *`http://yourclientorigin.com`*
5. Start up the Rails server with `rails s` 

### Setting up the front end

From the `/client` folder:  

1. Run `npm i` to install node modules
2. Start up the dev server with `npm start`
3. Visit `http://localhost:4000` and log in with the same credentials used in the live demo

## Testing
Run `guard` to launch the test suite.

## Built With
- **Rails**: Back end
- **React**: Front end
- [**React-sortable-hoc**](https://github.com/clauderic/react-sortable-hoc): Card sorting
- [**reactstrap**](https://github.com/reactstrap/reactstrap): Bootstrap 4 components
- **PostgreSQL**: Database
- **Heroku**: Server 
- **[Knock](https://github.com/nsarno/knock)**: JWT authentication
- **Rspec**: Testing

## Possible Enhancements
- [ ] Alerts for errors
- [ ] Allow users to access a board with URL

## Authors
- yxlau ([https://github.com/yxlau](https://github.com/yxlau))


