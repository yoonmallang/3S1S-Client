import React, { Component, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../css/project/create.css';

class Create extends Component {
    constructor() {
        super();
        this.state = {
            show : false,
            creator : sessionStorage.getItem("id"),
            title: "",
            team: "",
            description: "",
            subject: "",
            purpose: "",
            img_url: "",
        }
    }

    onClickSubmit = () => {
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects", {
            title: this.state.title,
            team: this.state.team,
            description: this.state.description,
            subject: this.state.subject,
            purpose: this.state.purpose,
            img_url: this.state.img_url,
            creator: this.state.creator,
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

    titleChange = (e) => {this.setState({title: e.target.value})};
    teamChange = (e) => {this.setState({team: e.target.value})};
    descriptionChange = (e) => {this.setState({description: e.target.value})};
    subjectChange = (e) => {this.setState({subject: e.target.value})};
    purposeChange = (e) => {this.setState({purpose: e.target.value})};
    img_urlChange = (e) => {this.setState({img_url: e.target.value})};

    handleClose = () => {
        this.setState({show: false});
        this.setState({img_url: ""});
    };

    handleShow = () => {    
        this.setState({show: true});
    };

    render() {
        const show = this.state.show

        const onChange = (e) => {
          const img = e.target.files[0];
          const imgURL = URL.createObjectURL(img)
          this.setState({img_url: imgURL})
      }

        return (
            <div>
                <button type="button" className="btm_add_pc" id="img_btn" variant="primary" onClick={this.handleShow}><img alt="" src="/img/plus.png" className="btm_image_pl" ></img></button>
        
                <Modal show={show} onHide={this.handleClose} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>프로젝트 생성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <div className = "ImageBox_pc">
                      <div className = "Image_pc1">
                          <img src = {this.state.img_url} className = "Img_pc1" id="image" alt = "" onError={(e)=>{e.target.onerror = null; e.target.src="/img/teamwork.png"}}></img>
                      </div>
                      <div>
                          <input type='file' 
                            accept='image/jpg,impge/png,image/jpeg,image/gif' 
                            name='profile_img' 
                            id="uploadImage"
                            placeholder = ''
                            className = "uploadImage"
                            onChange={onChange}/>
                            <label for="uploadImage" className="selectfile"><span className="imageLabel">이미지 첨부</span></label>
                      </div>
                    </div>
                    <Form.Group className="div-form1_pc" controlId="formProject">
                        <Form.Label className="text">프로젝트 제목<span className="spanRed">*</span></Form.Label>
                        <Form.Control className="dataInput-form_pc" placeholder="프로젝트 제목을 입력하세요." onChange={this.titleChange}/>
                    </Form.Group>
                
                    <Form.Group className="div-form1_pc1" controlId="formTeam">
                        <Form.Label className="text">팀명<span className="spanRed">*</span></Form.Label>
                        <Form.Control className="dataInput-form_pc" placeholder="팀 이름을 입력하세요." onChange={this.teamChange}/>
                    </Form.Group>
                    
                    <Form.Group className="div-form_pc1" controlId="formGridPassword1">
                        <Form.Label className="text">프로젝트 개요<span className="spanRed">*</span></Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="프로젝트 개요를 입력하세요." onChange={this.descriptionChange}/>
                    </Form.Group>
                
                    <Form.Group className="div-form_pc1" controlId="formGridPassword1">
                        <Form.Label className="text">과목</Form.Label>
                        <Form.Control className="dataInput-form_pc" placeholder="프로젝트 과목을 입력하세요." onChange={this.subjectChange}/>
                    </Form.Group>

                    <Form.Group className="div-form_pc1" controlId="formGridPassword1">
                        <Form.Label className="text">목적</Form.Label>
                        <Form.Control className="dataInput-form_pc" placeholder="프로젝트 목적을 입력하세요." onChange={this.purposeChange}/>
                    </Form.Group>    
                </Form>
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        취소
                    </Button>
                    <Button className="create-Button" type="submit" onClick={this.onClickSubmit}>
                        생성
                    </Button>
                </Modal.Footer>
                </Modal>
            </div>
    );
    }
}
  
export default Create;