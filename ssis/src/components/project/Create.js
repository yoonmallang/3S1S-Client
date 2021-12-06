import React, { Component, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../css/project/create.css';

import AWS from 'aws-sdk';

const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
const REGION = process.env.REACT_APP_REGION;


AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
  });
  
const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
});

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

            selectImg : "",
            previewImg : "",
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
                alert(res.data.message);
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

    img_urlChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        const file = e.target.files[0];
        let fileName = encodeURI(file.name)
        this.setState({
            img_url: `https://dgusogongssis.s3.ap-northeast-2.amazonaws.com/${fileName}`,
            selectImg : file
        })
        reader.onloadend = () => {
            this.setState({
                previewImg : reader.result
            })
        }

        reader.readAsDataURL(file)
    }

    uploadImg = (file) => {
        const params = {
          ACL: 'public-read',
          Body: file,
          Bucket: S3_BUCKET,
          Key: file.name
        };
        
        myBucket.putObject(params)
          .on('httpUploadProgress', (evt) => {
            this.setState({progress : Math.round((evt.loaded / evt.total) * 100)})
          })
          .send((err) => {
            if (err) console.log(err)
          })
      }

    
    handleClose = () => {
        this.setState({show: false});
        this.setState({img_url: ""});
    };

    handleShow = () => {    
        this.setState({show: true});
    };

    render() {
        const show = this.state.show
        let profileImg = "";

      if (this.state.previewImg !== "") {
        profileImg = this.state.previewImg;
        }
        else if (this.state.img_url === "") {
            profileImg = "/img/teamwork.png";
        }
        else {
            profileImg = this.state.img_url;
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
                          <img src = {profileImg} className = "Img_pc1" id="image" alt = "" onError={(e)=>{e.target.onerror = null; e.target.src="/img/teamwork.png"}}></img>
                      </div>
                      <div>
                          <input type='file' 
                            accept='image/*' 
                            name='profile_img' 
                            id="uploadImage"
                            placeholder = ''
                            className = "uploadImage"
                            onChange={this.img_urlChange}/>
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
                    <Button className="create-Button" type="submit" onClick={()=>{this.onClickSubmit(); this.uploadImg(this.state.selectImg)}}>
                        생성
                    </Button>
                </Modal.Footer>
                </Modal>
            </div>
    );
    }
}
  
export default Create;