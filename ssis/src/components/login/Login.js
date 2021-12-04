import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/login/login.css";
// import { postSignIn } from '../../api/apiClient';
import axios from "axios";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      password: ""
    };
  }

  idChange = (e) => {
    this.setState({ id: e.target.value });
  };
  pwdChange = (e) => {
    this.setState({ password: e.target.value });
  };

  onClickSubmit = () => {
    axios
      .post(
        "http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/signin",
        {
          id: this.state.id,
          password: this.state.password
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          document.location.href = "/project";
          sessionStorage.setItem("isLogin", true);
          sessionStorage.setItem("id", res.data.id);
          sessionStorage.setItem("name", res.data.name);
        } else if (res.status === 210) {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.onClickSubmit();
    }
  };

  componentDidMount() {
    sessionStorage.clear();
  }

  render() {
    const idStyle = {
      backgroundImage: 'url("/img/human.png")',
      backgroundPosition: "5px center",
      backgroundSize: "30px",
      backgroundRepeat: "no-repeat",
      paddingLeft: "50px",
      border: "1px solid black",
      width: "100%",
      height: "40px",
      boxSizing: "border-box",
      outline: "none",
      borderRadius: "3px"
    };

    const pwStyle = {
      backgroundImage: 'url("/img/key.png")',
      backgroundPosition: "5px center",
      backgroundSize: "30px",
      backgroundRepeat: "no-repeat",
      paddingLeft: "50px",
      border: "1px solid black",
      width: "100%",
      height: "40px",
      boxSizing: "border-box",
      outline: "none",
      borderRadius: "3px"
    };

    return (
      <div className="loginForm">
        <img alt="" src="/img/logo.png" className="login-img-logo" />
        <Form>
          <Form.Group className="lg-input">
            <Form.Control
              style={idStyle}
              placeholder="아이디"
              onChange={this.idChange}
            />
          </Form.Group>
          <Form.Group className="lg-input">
            <Form.Control
              style={pwStyle}
              type="password"
              onKeyPress={this.handleKeyPress}
              placeholder="비밀번호"
              onChange={this.pwdChange}
            />
          </Form.Group>
        </Form>

        <Button
          className="lg-login-Button"
          variant="primary"
          type="submit"
          onClick={this.onClickSubmit}
        >
          로그인
        </Button>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button className="lg-register-Button" variant="primary">
          회원가입
          </Button>
        </Link>
        <Link to="/findIdPwd" style={{ textDecoration: "none" }}>
          <Button className="lg-find-Button" variant="primary">
          ID/PW 분실
          </Button>
        </Link>
      </div>
    );
  }
}

export default Login;
