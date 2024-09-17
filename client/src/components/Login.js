import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Card, CardBody, Form, FormGroup, FormFeedback, Label, Input, Button } from 'reactstrap'
import PropTypes from 'prop-types';
import ValidationErrorMessage from './ValidationErrorMessage'
import { validateLogin } from '../helpers/validateLogin'
import serialize from 'form-serialize'

const isValid = (value) => {
  return value ? false : null
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feedback: {},
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = serialize(form, { hash: true })
    const formErrors = validateLogin(data)
    if (formErrors) {
      this.setState({ feedback: formErrors || {} })
    } else {
      this.setState({ feedback: formErrors || {} },
        this.props.login(data))
    }
  }


  render() {

    const { feedback } = this.state
    const invalidLogin = this.props.authError ?
      (<p className="text-danger">Sorry, we couldn't sign you in: The email and/or password is incorrect. Please try again</p>) :
      ''


    return (
      <Container>
	<Row className="justify-content-center align-items-center" id="login-box">
		<Col md={8} lg={5} sm={10} >
		<Card className="p-5">
			<CardBody>
				<h1>Djello</h1>
				<h6 className="text-muted">Sign In</h6>
			</CardBody>
			<CardBody>
		{invalidLogin}
			<Form onSubmit={this.onSubmit} >
				<FormGroup row>
				<Label for="email" className="sr-only">Email</Label>
				<Col>
				<Input name="email" type="email" placeholder="Email" valid={isValid(feedback['email'])} ></Input>
				<ValidationErrorMessage message={feedback['email']} />
				</Col>
				</FormGroup>
					<FormGroup row>
				<Label for="password"className="sr-only">Email</Label>
				<Col>
				<Input name="password" type="password" placeholder="Password" valid={isValid(feedback['password'])}></Input>
				<ValidationErrorMessage message={feedback['password']}></ValidationErrorMessage>
				</Col>
				</FormGroup>
				<Button color="primary" size="sm" block>Sign In</Button>
			</Form>
    <Button className="float-right" size="sm" color="link" onClick={this.props.toggle}>Don't have an account? Sign up</Button>
			</CardBody>
		</Card>		</Col>	
	</Row>
</Container>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func,
  feedback: PropTypes.object
};

export default Login