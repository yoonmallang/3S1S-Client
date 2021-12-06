import React, { Component } from 'react';
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

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            creator : sessionStorage.getItem("id"),
            title: "",
            team: "",
            description: "",
            subject: "",
            purpose: "",
            img_url: "",
            project:[],

            selectImg : "",
            previewImg : "",
        }
    }

    loadingData = async () => { 
        try { 
            console.log(this.props.id.id)
            const id = this.props.id.id;
            const response = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects/${id}`);            
            this.setState({project: response.data.project_content})
            this.setState({title: this.state.project.title})
            this.setState({team: this.state.project.team})
            this.setState({description: this.state.project.description})
            this.setState({subject: this.state.project.subject})
            this.setState({purpose: this.state.project.purpose})
            this.setState({img_url: this.state.project.img_url})
        } catch (e) 
        { console.log(e); }
      };


    onClickSubmit = () => {
        const id = this.props.id.id;
        console.log(id);
        axios.put(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects/${id}`, {
            title: this.state.title,
            team: this.state.team,
            description: this.state.description,
            subject: this.state.subject,
            purpose: this.state.purpose,
            img_url: this.state.img_url,
        }).then((res) => {
            console.log(res.data);
            if (res.status === 200) {
                alert(res.data.message);
                document.location.href = `/project/${id}`;
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

    componentDidMount(){ //한번만 실행
        const {loadingData} = this;
        loadingData();
    }

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
                <button type="button" className="P_btm" id="img_btn" onClick={this.handleShow}><img src="/img/pencil.png" className="P_btm_image" alt = ""></img></button>                
        
                <Modal show={show} onHide={this.handleClose} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>프로젝트 정보 수정</Modal.Title>
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
                        <Form.Control className="dataInput-form_pc" onChange={this.titleChange} defaultValue={this.state.project.title} placeholder="프로젝트 제목을 입력하세요."/>
                    </Form.Group>
                
                    <Form.Group className="div-form1_pc" controlId="formTeam">
                        <Form.Label className="text">팀명<span className="spanRed">*</span></Form.Label>
                        <Form.Control className="dataInput-form_pc" onChange={this.teamChange} defaultValue={this.state.project.team} placeholder="팀 이름을 입력하세요."/>
                    </Form.Group>
                    
                    <Form.Group className="div-form_pc" controlId="formGridPassword1">
                        <Form.Label className="text">프로젝트 개요<span className="spanRed">*</span></Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={this.descriptionChange} defaultValue={this.state.project.description} placeholder="프로젝트 개요를 입력하세요."/>
                    </Form.Group>
                
                    <Form.Group className="div-form_pc" controlId="formGridPassword1">
                        <Form.Label className="text">과목</Form.Label>
                        <Form.Control className="dataInput-form_pc" onChange={this.subjectChange} defaultValue={this.state.project.subject} placeholder="프로젝트 과목을 입력하세요."/>
                    </Form.Group>

                    <Form.Group className="div-form_pc" controlId="formGridPassword1">
                        <Form.Label className="text">목적</Form.Label>
                        <Form.Control className="dataInput-form_pc" onChange={this.purposeChange} defaultValue={this.state.project.purpose} placeholder="프로젝트 목적을 입력하세요."/>
                    </Form.Group>    
                </Form>
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        취소
                    </Button>
                    <Button className="create-Button" type="submit" onClick={()=>{this.onClickSubmit(); this.uploadImg(this.state.selectImg)}}>
                        수정
                    </Button>
                </Modal.Footer>
                </Modal>
            </div>
    );
    }
}
  
export default Update;