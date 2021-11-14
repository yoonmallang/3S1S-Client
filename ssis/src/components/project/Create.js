import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../css/project/create.css';

class Create extends Component {
    constructor() {
        super();
        this.state = {
            show : false,
            project: 1,
            writer : localStorage.getItem("id"),
            title: "",
            description: "",
        }
    }

    onClickSubmit = () => {
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/", {
            project: 1,
            writer : this.state.writer,
            title: this.state.title,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            participants: this.state.seletedParticipants,
        }).then((res) => {
            console.log(res.data);
            if (res.status === 201) {
                document.location.href = "/todo";
            }
            else if (res.status === 210) {
                alert(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    titleChange = (e) => {this.setState({title: e.target.value})};
    descriptionChange = (e) => {this.setState({description: e.target.value})};
    startDateChange = (e) => {this.setState({start_date: e.target.value})};
    endDateChange = (e) => {this.setState({end_date: e.target.value})};

    handleClose = () => {
        this.setState({show: false});
    };

    handleShow = () => {    
        this.setState({show: true});
    };

    render() {
        const show = this.state.show

        const onChange = (e) => {
          const img = e.target.files[0];
          const formData = new FormData();
          formData.append('file', img);
      }

        return (
            <div>
                <button type="button" className="btm_add" id="img_btn" variant="primary" onClick={this.handleShow}><img src="img/plus.png" className="btm_image" ></img></button>
                
        
                <Modal show={show} onHide={this.handleClose} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>프로젝트 생성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <div className = "ImageBox">
                      <div className = "Image_c">
                          <img src = "img/group.png" className = "Img_c" id= "image" alt = "img/group.png"></img>
                      </div>
                      <div>
                        <input type='file' 
                            accept='image/jpg,impge/png,image/jpeg,image/gif' 
                            name='profile_img' 
                            onChange={onChange}>
                        </input>
                      </div>
                    </div>
                    <Form.Group className="div-form1" controlId="formProject">
                        <Form.Label className="text">프로젝트 제목*</Form.Label>
                        <Form.Control className="idInput-form" placeholder="프로젝트 제목을 입력하세요." onChange={this.titleChange}/>
                    </Form.Group>
                
                    <Form.Group className="div-form1" controlId="formTeam">
                        <Form.Label className="text">팀명*</Form.Label>
                        <Form.Control className="idInput-form" placeholder="팀 이름을 입력하세요." onChange={this.descriptionChange}/>
                    </Form.Group>
                    
                    <Form.Group className="div-form" controlId="formGridPassword1">
                        <Form.Label className="text">프로젝트 개요*</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="프로젝트 개요를 입력하세요." onChange={this.descriptionChange}/>
                    </Form.Group>
                
                    <Form.Group className="div-form_subject" controlId="formGridPassword1">
                        <Form.Label className="text">과목</Form.Label>
                        <Form.Control className="idInput-form" placeholder="프로젝트 과목을 입력하세요." onChange={this.descriptionChange}/>
                    </Form.Group>

                    <Form.Group className="div-form_purpose" controlId="formGridPassword1">
                        <Form.Label className="text">목적</Form.Label>
                        <Form.Control className="idInput-form" placeholder="프로젝트 목적을 입력하세요." onChange={this.descriptionChange}/>
                    </Form.Group>    
                </Form>
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      취소
                    </Button>
                    <Button className="register-Button" variant="primary" type="submit" onClick={this.onClickSubmit}>
                      생성
                </Button>
                </Modal.Footer>
                </Modal>
            </div>
    );
    }
}
  
export default Create;