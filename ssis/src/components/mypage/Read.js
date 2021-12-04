import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import '../../css/mypage/read.css';

class Read extends Component {
    constructor() {
        super();
        this.state = {
            user : []
        }
    }

    loadingUser = async () => { 
        let userId = sessionStorage.getItem('id')
        try {   
            const res = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/mypage/${userId}`);
            this.setState({ user: res.data.information });
            console.log(this.state.user)
        } catch (e) { 
            console.log(e); 
        }
    }

    componentDidMount() { 
        const { loadingUser } = this; 
        loadingUser(); 
    }

    render() {
        let profileImg = ""
        if (this.state.user.img_url === "") {
            profileImg = "/img/blank-person.png";
        }
        else {
            profileImg = this.state.user.img_url;
        }

        return (
            <div className="mypage-page">
                    <img alt="" src={profileImg} className="mp-profile-img"/>
                    <hr style={{width:'300px'}}/>
                    <p className="mp-text">{this.state.user.name}</p>
                    <p className="mp-text">{this.state.user.email}</p>
                    <p className="mp-text">{this.state.user.belong}</p>
                    <div style={{marginTop:'30px'}}>
                        <Link to={`/mypage/update/${sessionStorage.getItem('id')}`} style={{ textDecoration: 'none' }}><Button className="mp-update-Button" variant="primary" >
                            내정보 수정
                        </Button></Link>
                        <Link to={`/mypage/pwdUpdate/${sessionStorage.getItem('id')}`} style={{ textDecoration: 'none' }}><Button className="mp-pwChange-Button" variant="primary" >
                            비밀번호 변경
                        </Button></Link>
                    </div>
            </div>
        );
    }
}

export default Read;