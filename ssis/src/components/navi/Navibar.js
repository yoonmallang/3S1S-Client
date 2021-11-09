import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/navi/Navibar.css';

class Navibar extends Component {
    constructor() {
        super();
        this.state = {
            isLogin : false
        }
    }

    checkLogin() {
        if (localStorage.getItem('isLogin')) {
            this.setState({isLogin: true});
        }
    }

    logout() {
        console.log("로그아웃")
    }
    
    render() {
        this.checkLogin();
        const isLogin = this.state.isLogin;
        const username = "김동국"

        if (!isLogin) {
            return (
                <div className = "Navigation">
                    <Navbar className="color-nav" variant="dark">
                        <Container>
                            <Navbar.Brand href="/">
                                <img alt="" src="img/logo.png" className="img-logo"/>
                            </Navbar.Brand>
                            <Nav className="me-auto">
                                <Navbar.Brand><img alt="" src="img/alarm.png" className="img-alarm"/></Navbar.Brand>
                                <Navbar.Brand><img alt="" src="img/blank-person.png" className="img-person"/></Navbar.Brand>
                                <NavDropdown title={username} className="user-name-dropdown" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/mypage/1">마이페이지</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={this.logout} href="/login">로그아웃</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Container>
                    </Navbar>
              </div>
            );
        }
        else {
            return (
                <div className = "Navigation">
                    <Navbar className="color-nav" variant="dark">
                        <Container>
                            <Navbar.Brand href="/">
                                <img alt="" src="img/logo.png" className="img-logo"/>
                            </Navbar.Brand>
                        </Container>
                    </Navbar>
              </div>
            );
        }
    }
}

export default Navibar;