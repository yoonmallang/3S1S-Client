import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../css/project/create.css';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            show : false,
            creator : localStorage.getItem("id"),
            search_name: "kds",
            search_list:[],
            selectedParticipants:[],
        }
    }

    onClickSubmit = () => {
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/notifications", {
            project: this.state.project,
            invitee: this.state.invitee,
            inviter: this.state.inviter,
        }).then((res) => {
            console.log(res.data);
            if (res.status === 201) {
                document.location.href = "/project";
            }
            else if (res.status === 210) {
                alert(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    userChange = (e) => {this.setState({user: e.target.value})};

    handleClose = () => {
        this.setState({show: false});
    };

    handleShow = () => {    
        this.setState({show: true});
    };

    loadingParticipants = async () => { 
        try { 
            const res = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/user/search", {
                params: {
                    user: this.state.search_name,
                }
            });
            console.log("팀원 초대")
            let user = this.state.search_name
            console.log(user)
            console.log(res.data)

            console.log(res.data.search_list)



            this.setState({ search_list: res.data.user });
            console.log(this.state.search_list)
        } catch (e) { 
            console.log(e); 
        }
    }

    handleSelect = (e) => {
        if (!this.state.seletedParticipants.includes(e.target.value)) {
            this.setState({
                seletedParticipants : [...this.state.seletedParticipants, e.target.value]
            })
        }
    }

    removeSelect = (id) => {
        const newArr = this.state.seletedParticipants.filter(info => info !== id);
        this.setState({
            seletedParticipants : newArr
        })
    }

    componentDidMount() { 
        const { loadingParticipants } = this; 
        loadingParticipants(); 
    }

    render() {
        const show = this.state.show

        const onChange = (e) => {
          const img = e.target.files[0];
          const formData = new FormData();
          formData.append('file', img);
      }

        return (
            <div>
                <button type="button" className="P_btm2" id="img_btn" onClick={this.handleShow}><img src="/img/plus2.png" className="P_btm_image" alt = ""></img></button>
                            
                <Modal show={show} onHide={this.handleClose} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>팀원 추가</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <div className = "ImageBox_pc">
                      <div className = "Image_pc">
                          <img src = "/img/group.png" className = "Img_pc" id= "image" alt = "/img/group.png"></img>
                      </div>
                      <div>
                        <input type='file' 
                            accept='image/jpg,impge/png,image/jpeg,image/gif' 
                            name='profile_img' 
                            onChange={onChange}>
                        </input>
                      </div>
                    </div>
                    <Form.Group className="div-form1_pc" controlId="formProject">
                        <Form.Label className="text">프로젝트 제목<span className="spanRed">*</span></Form.Label>
                        <Form.Control className="dataInput-form_pc" placeholder="프로젝트 제목을 입력하세요." onChange={this.titleChange}/>
                    </Form.Group>
                
                    <Form.Group className="div-form1_pc" controlId="formTeam">
                        <Form.Label className="text">팀명<span className="spanRed">*</span></Form.Label>
                        <Form.Control className="dataInput-form_pc" placeholder="팀 이름을 입력하세요." onChange={this.teamChange}/>
                    </Form.Group>
                    
                    <Form.Group className="div-form_pc" controlId="formGridPassword1">
                        <Form.Label className="text">프로젝트 개요<span className="spanRed">*</span></Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="프로젝트 개요를 입력하세요." onChange={this.descriptionChange}/>
                    </Form.Group>
                
                    <div>
                        <Form.Select className="participant-form" onChange={this.handleSelect}>
                            <option value="none" hidden>참여자를 선택하세요.</option>
                            {this.state.search_list.map((item)=> {
                                return (
                                    <option key={item.id} value={item.user_id}>{item.user_id}</option>
                                )
                            })}
                        </Form.Select>
                        <div className="participant-form">
                            {this.state.selectedParticipants.map((item)=> {
                                return (
                                    <div key={item}>
                                        <span>{item}</span>
                                        <button onClick={()=>this.removeSelect(item)} className="cancel-button"><img alt="" src="/img/cancel.png" className="img-cancel"/></button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>  
                </Form>
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        취소
                    </Button>
                    <Button className="create-Button" type="submit" onClick={this.onClickSubmit}>
                        추가
                    </Button>
                </Modal.Footer>
                </Modal>
            </div>
    );
    }
}
  
export default Search;