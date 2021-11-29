import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button,Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import "../../css/mypage/update.css";


class Update extends Component {
    constructor() {
        super();
        this.state = {
            user : [],
            newName : "",
            newEmail : "",
            newBelong : "",
            newImgUrl : ""
        }
    }

    nameChange = (e) => {this.setState({newName: e.target.value})};
    emailChange = (e) => {this.setState({newEmail: e.target.value})};
    belongChange = (e) => {this.setState({newBelong: e.target.value})};

    loadingUser = async () => { 
        let userId = sessionStorage.getItem('id')
        try {   
            const res = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/mypage/${userId}`);
            this.setState({ 
                user: res.data.information
            });
            this.setState({
                newName : this.state.user.name,
                newEmail : this.state.user.email,
                newBelong : this.state.user.belong,
                newImgUrl : this.state.user.img_url
            })
            
        } catch (e) { 
            console.log(e); 
        }
    }

    
    modifyInfo = () => {
        axios.put(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/mypage/${sessionStorage.getItem('id')}`, {
            email : this.state.newEmail,
            belong : this.state.newBelong,
            img_url : this.state.newImgUrl
        }).then((res) => {
            alert(res.data.message)
            this.loadingUser();
            document.location.href = `/mypage/${sessionStorage.getItem('id')}`
        }).catch((err) => {
            console.log(err);
        })
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
                    <hr style={{width:'200px'}}/>
                    <Form>
                        <Form.Group className="mp-input">
                            <Form.Control type="text" value={this.state.user.name}/>
                        </Form.Group>
                        <Form.Group className="mp-input">
                            <Form.Control type="text" defaultValue={this.state.user.email} onChange={this.emailChange}/>
                        </Form.Group>
                        <Form.Group className="mp-input">
                            <Form.Control type="text" defaultValue={this.state.user.belong} onChange={this.belongChange}/>
                        </Form.Group>
                    </Form>

                    <div style={{marginTop:'30px'}}>
                        <Link to={`/mypage/${sessionStorage.getItem('id')}`} style={{ textDecoration: 'none' }}>
                            <Button className="mpup-cancel-Button" variant="primary" >
                                취소
                            </Button>
                        </Link>
                    
                            <Button className="mpup-update-Button" variant="primary" onClick={this.modifyInfo}>
                                확인
                            </Button>
        
                    </div>
            </div>
        );
    }
}

export default Update;