import React, { Component } from "react";
import axios from "axios";
import "../../css/login/FindIdPwd.css";

class FindIdPwd extends Component {
  constructor() {
    super();
    this.state = {
      name_id: "",
      email_id: "",
      id_pw: "",
      name_pw: "",
      email_pw: "",

      finded_id : ""
    };
  }

  nameChange_id = (e) => {this.setState({ name_id: e.target.value });};
  emailChange_id = (e) => {this.setState({ email_id: e.target.value });};
  idChange_pw = (e) => {this.setState({ id_pw: e.target.value });};
  nameChange_pw = (e) => {this.setState({ name_pw: e.target.value });};
  emailChange_pw = (e) => {this.setState({ email_pw: e.target.value });};

  onClickIdFind = () => {
    axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/users/findid",
        {
          params: {
            name: this.state.name_id,
            email: this.state.email_id
          }
        }
      ).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.setState({finded_id: res.data.id})
        } else {
          alert(res.data.message);
          document.location.href = "/findIdPwd";
        }
      }).catch((err) => {
        console.log(err);
      });
  };

  onClickPwFind = () => {
    axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/users/changepw`,
        {
          params: {
            id : this.state.id_pw,
            name: this.state.name_pw,
            email: this.state.email_pw
          }
        }
      ).then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          document.location.href = "/"
        } else {
          alert(res.data.message);
          document.location.href = "/findIdPwd";
        }
      }).catch((err) => {
        console.log(err);
      });
  };

  handleIdKeyPress = (e) => {
    if (e.key === "Enter") {
      this.onClickIdFind();
    }
  };

  handlePwKeyPress = (e) => {
    if (e.key === "Enter") {
      this.onClickPwFind();
    }
  };

  render() {
    return (
      <div className="container--layout">
        <div className="container__find">
          {
            this.state.finded_id === ""
            ?<div className="container__find--id">
                <span className="title__find--id">아이디 찾기</span>
                <form className="form__findId">
                  <div className="div__content">
                    <span className="span__content">이름</span>
                    <input className="input__find" onChange={this.nameChange_id} onKeyPress={this.handleIdKeyPress}></input>
                  </div>
                  <div className="div__content">
                    <span className="span__content">이메일</span>
                    <input className="input__find" onChange={this.emailChange_id} onKeyPress={this.handleIdKeyPress}></input>
                  </div>
                </form>
                <button type="submit" className="btn__find--id" onClick={this.onClickIdFind}>
                  확인
                </button>
            </div>
          : <div className="container__find--id">
              <span className="title__find--id">아이디 찾기</span>
              <p className="find__id">{this.state.name_id}님의 아이디는 <b>{this.state.finded_id}</b> 입니다.</p>
            </div>
          }

          <div className="container__find--pw ">
            <span className="title__find--pw">임시 비밀번호 발급</span>
            <form className="form__findPw">
              <div className="div__content">
                <span className="span__content">아이디</span>
                <input className="input__find" onChange={this.idChange_pw} onKeyPress={this.handlePwKeyPress}></input>
              </div>
              <div className="div__content">
                <span className="span__content">이름</span>
                <input className="input__find" onChange={this.nameChange_pw} onKeyPress={this.handlePwKeyPress} ></input>
              </div>
              <div className="div__content">
                <span className="span__content">이메일</span>
                <input className="input__find" onChange={this.emailChange_pw} onKeyPress={this.handlePwKeyPress}></input>
              </div>
            </form>
            <button type="submit" className="btn__find--pw" onClick={this.onClickPwFind}>
              확인
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FindIdPwd;
