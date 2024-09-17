import React, { Component } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import PropTypes from 'prop-types'


export default class Navigation extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }

    this.logout = this.logout.bind(this)
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }


  logout(e) {
    e.preventDefault()
    this.props.logout();
  }
  render() {

    const { user, logout } = this.props

    return (

      <Navbar color='light' expand="md" className="mb-2">
          <h1 className="navbar-text text-dark h4 m-0">Djello</h1>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
               <span className="navbar-text text-dark">Welcome, {user.name || user.email}</span>
              </NavItem>
              <NavItem>

                <NavLink onClick={logout} href="#">Sign Out</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    )
  }
}


Navigation.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}