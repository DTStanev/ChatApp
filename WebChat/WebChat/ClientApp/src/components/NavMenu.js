import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import './NavMenu.css';
import * as constants from './Common/ComponentConstants';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            dropdownOpen: false,
            isAuth: false
        };
    }

    componentDidMount() {
        let token = localStorage.getItem(constants.TOKEN);

        if (token) {
            this.setState({
                isAuth: true
            })
        }
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    logout = () => {
        localStorage.removeItem(constants.TOKEN);
        localStorage.removeItem(constants.USERNAME);

        this.setState({
            isAuth: false
        })
    }

    render() {

        let userToken = localStorage.getItem(constants.TOKEN);
        let login = userToken ? '' : < NavItem >
            <NavLink tag={Link} className="text-dark ml-4" to="/login">Login</NavLink>
        </NavItem>

        let userinfo = userToken ? <UncontrolledDropdown nav inNavbar className='ml-5'>
            <DropdownToggle nav caret>
                Wellcome, User
                </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                    <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.logout}>
                    Logout
                  </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown> : ''

        let chatRoom = userToken ? <NavItem>
            <NavLink tag={Link} id='chat-room' className="text-dark" to="/chat-room">ChatRoom</NavLink>
        </NavItem> : ''


        return (
            <header>
                <Navbar color="light" light expand="md" className='navbar' >
                    <NavbarBrand >WebChat</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                            </NavItem>
                            {chatRoom}
                            {login}
                            {userinfo}
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
