import React, { Component } from 'react';
import { Navbar, Container, Nav, Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/navi/Navibar.css';
import List from '../notifications/List.js'

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
        if (sessionStorage.getItem('isLogin')) {
            this.setState({isLogin: true});
            this.setState({loginedName: sessionStorage.getItem("name")});
        }
    }

    checkMiddleBar = () => {
        if(sessionStorage.getItem('needMiddlebar')) {
            this.setState({needMiddleBar: true})
        }
    }

    componentDidMount() {
        const { checkLogin, checkMiddleBar } = this;
        checkLogin();
        checkMiddleBar();
    }

    logout() {
        sessionStorage.removeItem("isLogin")
        sessionStorage.removeItem("id")
        console.log("로그아웃")
    }
    
    render() {
        const isLogin = this.state.isLogin;
        let username;

        if (isLogin) {
            username = this.state.loginedName;
        }

        if (isLogin) {
            return (
                <div className = "Navigation">
                    <Navbar className="color-nav" variant="dark">
                        <Container className="contanier">
                            <Navbar.Brand href="/project">
                                <img alt="" src="/img/logo.png" className="img-logo"/>
                            </Navbar.Brand>
                            <Nav className="nav-profile">
                                <List/>
                                <Dropdown className="user-name-dropdown">
                                    <Dropdown.Toggle className="person-dropButoon">
                                        <div className="navi-person">
                                            <span className="text-person">{username} 님</span>
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href={`/mypage/${sessionStorage.getItem('id')}`}>마이페이지</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={this.logout} href="/">로그아웃</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
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
                                <img alt="" src="/img/logo.png" className="img-logo"/>
                            </Navbar.Brand>
                        </Container>
                    </Navbar>
              </div>
            );
        }
    }
}

export default Navibar;
