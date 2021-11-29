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
      email_pw: ""
    };
  }

  nameChange_id = (e) => {
    console.log(e.data);
    this.setState({ name_id: e.target.value });
  };
  emailChange_id = (e) => {
    console.log(e);
    this.setState({ email_id: e.target.value });
  };
  idChange_pw = (e) => {
    console.log(e);
    this.setState({ id_pw: e.target.value });
  };
  nameChange_pw = (e) => {
    console.log(e.data);
    this.setState({ name_pw: e.target.value });
  };
  emailChange_pw = (e) => {
    console.log(e);
    this.setState({ email_pw: e.target.value });
  };

  onClickSubmit = () => {
    axios
      .get(
        "http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/users/findid",
        {
          params: {
            name: this.state.name_id,
            email: this.state.email_id
          }
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data.message);
          alert(res.data.message);
        } else {
          console.log(res.data);
          alert(res.data.message);
          document.location.href = "/findIdPwd";
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

  render() {
    return (
      <div className="container--layout">
        <div className="container__find">
          <div className="container__find--id">
            <span className="title__find--id">아이디 찾기</span>
            <form className="form__findId">
              <div className="div__content">
                <span className="span__content">이름</span>
                <input
                  className="input__find"
                  onChange={this.nameChange_id}
                ></input>
              </div>
              <div className="div__content">
                <span className="span__content">이메일</span>
                <input
                  className="input__find"
                  onChange={this.emailChange_id}
                ></input>
              </div>
            </form>
            <button
              type="submit"
              className="btn__find--id"
              onClick={this.onClickSubmit}
            >
              확인
            </button>
          </div>

          <div className="container__find--pw ">
            <span className="title__find--pw">비밀번호 찾기</span>
            <form className="form__findPw">
              <div className="div__content">
                <span className="span__content">아이디</span>
                <input
                  className="input__find"
                  onChange={this.idChange_pw}
                ></input>
              </div>
              <div className="div__content">
                <span className="span__content">이름</span>
                <input
                  className="input__find"
                  onChange={this.nameChange_pw}
                ></input>
              </div>
              <div className="div__content">
                <span className="span__content">이메일</span>
                <input
                  className="input__find"
                  onChange={this.emailChange_pw}
                ></input>
              </div>
            </form>
            <button type="submit" className="btn__find--pw">
              확인
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FindIdPwd;
