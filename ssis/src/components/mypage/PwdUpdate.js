import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import "../../css/mypage/pwdUpdate.css";

class PwdUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pwd : "",
          newPwd : "",
          newPwd2 : ""
        }
    }

    pwdChange = (e) => {this.setState({pwd: e.target.value})};
    newPwdChange = (e) => {this.setState({newPwd: e.target.value})};
    newPwd2Change = (e) => {this.setState({newPwd2: e.target.value})};
    
    modifyPw = () => {
        axios.put(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/users/changepw`, {
            id : sessionStorage.getItem('id'),
            password : this.state.pwd,
            password_change : this.state.newPwd,
            password_check : this.state.newPwd2
        }).then((res) => {
            if (res.status === 200) {
                alert(res.data.message)
                document.location.href = `/mypage/${sessionStorage.getItem('id')}`
            } else {
                alert(res.data.message)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="pc-div">
                <p className="pc-title"><b>비밀번호 변경</b></p>
                <p className="pc-guide" style={{marginBottom : '5px'}}>- 안전한 비밀번호로 내정보를 보호하세요</p>
                <p className="pc-guide">- 다른 사이트에서 사용한 적 없는 비밀번호가 안전합니다</p>

                <div className="pc-ddiv">
                    <div className="pc-line" style={{marginBottom : '40px'}}>
                        <span className="pc-span">현재 비밀번호</span>
                        <input type="password" className="pc-input" onChange={this.pwdChange}></input>
                    </div>
                    <div className="pc-line">
                        <span className="pc-span">새 비밀번호</span>
                        <input type="password" className="pc-input" onChange={this.newPwdChange}></input>
                    </div>
                    <div className="pc-line">
                        <span className="pc-span">새 비밀번호 확인</span>
                        <input type="password" className="pc-input" onChange={this.newPwd2Change}></input>
                    </div>
                </div>
                <p className="pc-guide" style={{marginBottom : '20px'}}>영문, 숫자, 특수문자를 혼용하시면 보다 안전한 비밀번호를 만들 수 있습니다.</p>
                <div> 
                    <Link to={`/mypage/${sessionStorage.getItem('id')}`} style={{ textDecoration: 'none' }}>
                        <Button className="pc-cancel-Button" variant="primary" >
                            취소
                        </Button>
                    </Link>
                    <Button className="pc-confirm-Button" variant="primary" onClick={this.modifyPw}>
                        확인
                    </Button>
                </div>
            </div>
        );
    }
}

export default PwdUpdate;