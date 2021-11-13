import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/login/login.css';
// import { postSignIn } from '../../api/apiClient';
import axios from 'axios';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            password: "",
        }
    }

    idChange = (e) => {this.setState({id: e.target.value})};
    pwdChange = (e) => {this.setState({password: e.target.value})};
    
    onClickSubmit = () => {
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/signin", {
            id: this.state.id,
            password: this.state.password,
        }).then((res) => {
            console.log(res.data);
            if (res.status === 200) {
                document.location.href = "/project";
                localStorage.setItem("isLogin", true)
                localStorage.setItem("id", res.data.id)
                localStorage.setItem("name", res.data.name)
            }
            else if (res.status === 210) {
                alert(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onClickSubmit();
        }
    };

    render() {
        return (
            <div className = "loginForm">
                <img alt="" src="img/logo.png" className="login-img-logo"/>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control placeholder="user id" onChange={this.idChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Control type="password"  onKeyPress={this.handleKeyPress} placeholder="****" onChange={this.pwdChange}/>
                    </Form.Group>
                </Form>
                <Button className="in-login-Button" variant="primary" type="submit" onClick={this.onClickSubmit}>
                            로그인
                </Button>
                <Link to="/register" style={{ textDecoration: 'none' }}><Button className="in-login-Button" variant="primary" >
                    회원가입
                </Button></Link>
                <Link to="/findIdPwd" style={{ textDecoration: 'none' }}><Button className="in-login-Button" variant="primary" >
                    Id/Pw 찾기
                </Button></Link>
            </div>
        );
    }
}

export default Login;