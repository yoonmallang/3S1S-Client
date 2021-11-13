import React, { Component } from 'react';
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/navi/Navibar.css';
import Middlebar from './Middlebar'

class Navibar extends Component {
    constructor() {
        super();
        this.state = {
            isLogin : false,
            needMiddleBar : true,
            loginedName : "",
        }
    }

    checkLogin = () => {
        if (localStorage.getItem('isLogin')) {
            this.setState({isLogin: true});
            this.setState({loginedName: localStorage.getItem("name")});
        }
    }

    checkMiddleBar = () => {
        if(localStorage.getItem('needMiddlebar')) {
            this.setState({needMiddleBar: true})
        }
    }

    componentDidMount() {
        const { checkLogin, checkMiddleBar } = this;
        checkLogin();
        checkMiddleBar();
    }

    logout() {
        localStorage.removeItem("isLogin")
        localStorage.removeItem("id")
        console.log("로그아웃")
    }
    
    render() {
        const isLogin = this.state.isLogin;
        const needMiddleBar = this.state.needMiddleBar;
        let username;
        let profile;
        let middelbar;
        if (isLogin) {
            username = this.state.loginedName;
            profile = "img/blank-person.png";
        }
        else {
            username = "xxx";
            profile = "img/blank-person.png";
        }

        if(needMiddleBar) {
            middelbar = <Middlebar/>
        }

        if (isLogin) {
            return (
                <div className = "Navigation">
                    <Navbar className="color-nav" variant="dark">
                        <Container className="contanier">
                            <Navbar.Brand href="/project">
                                <img alt="" src="img/logo.png" className="img-logo"/>
                            </Navbar.Brand>
                            <Nav className="nav-profile">
                                <Navbar.Brand><img alt="" src="img/alarm.png" className="img-alarm"/></Navbar.Brand>
                                <Navbar.Brand><img alt="" src={profile} className="img-person"/></Navbar.Brand>
                                <NavDropdown title={username} className="user-name-dropdown" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/mypage/1">마이페이지</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={this.logout} href="/">로그아웃</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Container>
                    </Navbar>
                    {middelbar}
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