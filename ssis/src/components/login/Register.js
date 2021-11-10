import React, { Component } from 'react';
import { postRegiter, checkId } from '../../api/apiClient';
import { Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/login/register.css';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            is_valid: true,
            password: "",
            password_check: "",
            name: "",
            email : "",
            belong : "",
        }
    }

    idChange = (e) => {this.setState({id: e.target.value})};
    pwdChange = (e) => {this.setState({password: e.target.value})};
    pwdCheckChange = (e) => {this.setState({password_check: e.target.value})};
    nameChange = (e) => {this.setState({name: e.target.value})};
    emailChange = (e) => {this.setState({email: e.target.value})};
    belongChange = (e) => {this.setState({belong: e.target.value})};

    onClickSubmit = () => {
        postRegiter({
            id: this.state.id,
            is_valid: this.state.is_valid,
            password: this.state.password,
            password_check: this.state.password_check,
            name: this.state.name,
            email: this.state.email,
            belong: this.state.belong,
        }).then((res) => {
            console.log("ddddd")
            console.log(res.data.status)
            console.log(res.data.message)
            alert("회원가입이 완료되었습니다");
            document.location.href = "/login";
        }).catch((err) => {
            console.log(err);
        })
    }

    onClickCheckId = () => {
        checkId({
            id: this.state.id
        }).then((res) => {
            this.setState({is_valid: true});
            console.log(res)
            if(this.state.is_valid) {
                alert("사용가능한 아이디입니다.")
            }
            else {
                alert("중복된 아이디입니다.")
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
                <div className = "registerForm">
                    <Form>
                        <Form.Group className="div-form" controlId="formGridId">
                            <Form.Label className="text">아이디</Form.Label>
                            <Form.Control className="idInput-form" placeholder="Enter Id" onChange={this.idChange}/>
                        </Form.Group>

                        <Button className="idCheck-Button" variant="primary" onClick={this.onClickSubmit}>
                            중복확인
                        </Button>
                    
                        <Form.Group className="div-form" controlId="formGridPassword1">
                            <Form.Label className="text">비밀번호</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" onChange={this.pwdChange}/>
                        </Form.Group>
                        
                        <Form.Group className="div-form" controlId="formGridPassword2">
                            <Form.Label className="text">비밀번호 재확인</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" onChange={this.pwdCheckChange}/>
                        </Form.Group>

                        <Form.Group className="div-form" controlId="formGridName">
                            <Form.Label className="text">이름</Form.Label>
                            <Form.Control placeholder="Enter Name" onChange={this.nameChange}/>
                        </Form.Group>

                        <Form.Group className="div-form" controlId="formGridAddress">
                            <Form.Label className="text">이메일</Form.Label>
                            <Form.Control placeholder="Enter Email" type="email" onChange={this.emailChange}/>
                        </Form.Group>

                        <Form.Group className="div-form" controlId="formGridBelong">
                            <Form.Label className="text">소속</Form.Label>
                            <Form.Control placeholder="Enter Belong" onChange={this.belongChange}/>
                        </Form.Group>

                        <Button className="register-Button" variant="primary" type="submit" onClick={this.onClickSubmit}>
                            가입하기
                        </Button>
                    </Form>
                </div>
        );
    }
}

export default Register;