import React, { Component } from 'react'
import { Container, Row, Col, Card, CardBody, Form, FormGroup, FormFeedback, Label, Input, Button } from 'reactstrap'
import ValidationErrorMessage from './ValidationErrorMessage'
import { validateSignup } from '../helpers/validateSignup'
import serialize from 'form-serialize'


const isValid = (value) => {
  return value ? false : null
}


class Signup extends Component {
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
    const formErrors = validateSignup(data)
    if (formErrors) {
      this.setState({ feedback: formErrors || {} })
    } else {
      this.setState({ feedback: formErrors || {} },
        this.props.signup(data))
    }
  }

  componentWillReceiveProps(nextP) {
    if (nextP.userError.status === 409) {
      this.setState({
        feedback: {...this.state.feedback,
          email: ['It looks like you\'re already registered with us. Use the link below to sign in instead.']
        }

      })
    }
  }


  render() {
    const { feedback } = this.state

    return (
      <Container>
  <Row className="justify-content-center align-items-center" id="login-box">
    <Col md={8} lg={5} sm={10} >
    <Card className="p-5">
      <CardBody>
				<h1>Djello</h1>
				<h6 className="text-muted">Create an account</h6>
			</CardBody>
      <CardBody>
      <Form onSubmit={this.onSubmit}>
        <FormGroup row>
        <Label for="email" className="sr-only">Email</Label>
        <Col>
        <Input name="email" type="email" placeholder="Email" valid={isValid(feedback['email'])} ></Input>
				<ValidationErrorMessage message={feedback['email']} />
        </Col>
        </FormGroup>
        <FormGroup row>
        <Label for="first_name" className="sr-only">Email</Label>
        <Col>
        <Input name="first_name" type="first_name" placeholder="First Name" valid={isValid(feedback['first_name'])} ></Input>
				<ValidationErrorMessage message={feedback['first_name']} />
        </Col>
        </FormGroup>
        <FormGroup row>
        <Label for="last_name" className="sr-only">Email</Label>
        <Col>
        <Input name="last_name" type="last_name" placeholder="Last Name (optional)" valid={isValid(feedback['last_name'])} ></Input>
				<ValidationErrorMessage message={feedback['last_name']} />
        </Col>
        </FormGroup>
          <FormGroup row>
        <Label for="password"className="sr-only">Email</Label>
        <Col>
       <Input name="password" type="password" placeholder="Password" valid={isValid(feedback['password'])}></Input>
				<ValidationErrorMessage message={feedback['password']}></ValidationErrorMessage>
        </Col>
        </FormGroup> 
        <FormGroup row>
        <Label for="password_confirmation" className="sr-only">Password Confirmation</Label>
        <Col>
       <Input name="password_confirmation" type="password" placeholder="Re-enter Password" valid={isValid(feedback['password_confirmation'])}></Input>
		<ValidationErrorMessage message={feedback['password_confirmation']}></ValidationErrorMessage>
        </Col>
        </FormGroup>
        <Button color="primary" size="sm" className="text-center" block>Sign Up</Button>
      </Form>
       <Button className="float-right" size="sm" color="link" onClick={this.props.toggle}>Already registered? Sign in</Button>
      </CardBody>
    </Card>   </Col>  
  </Row>
</Container>
    )
  }
}

export default Signup