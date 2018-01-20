import React from 'react';
import PropTypes from 'prop-types';

import {
  Collapse,
  inNavBar,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';


var styles = {
  color:'green',
  fontWeight:'bold'
};

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  // updateUsers(event) {
  //   fetch(url, {
  //     method: 'PUT',
  //     body: JSON.stringify(this.state.username)
  //   })
  //     .then(resp => resp.json())
  //     .then(users => this.setState({ users }))
  //     .catch(console.error);
  // }

  render() {
    return (
      <Navbar color="faded" light expand="md">
        <NavbarBrand>
          <h1>slick-slack</h1>

          <h6 style={styles}>Logged In As: {this.props.username}</h6>
        </NavbarBrand>
        <h3 className="text-center">
          #{this.props.currentWorkSpaceName || 'select a workspace!'}{' '}
        </h3>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu>
                <NavLink href="/login">
                  <DropdownItem>Sign Out</DropdownItem>
                </NavLink>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  currentWorksSpaceName: PropTypes.string,
}
NavBar.defaultProps = {
  currentWorkSpaceName: 'select a workspace!',
}

// onClick={this.updateUsers}
