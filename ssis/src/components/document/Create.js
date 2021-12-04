import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../css/document/create.css';
import axios from 'axios';

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
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            project: this.props.id.id,
            writer : sessionStorage.getItem("id"),
            title: "",
            description: "",
            file_name :"",
            file_url :"",
            selectFile : "",
            
            preview : "",
            progress : ""
        }
    }

    onClickSubmit = () => {
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/files", {
            project: this.state.project,
            writer : this.state.writer,
            title: this.state.title,
            description: this.state.description,
            file_name :this.state.file_name,
            file_url :this.state.file_url
        }).then((res) => {
            alert("파일 생성 완료")
            document.location.href = `/project/${this.state.project}/document`;
        }).catch((err) => {
            console.log(err);
        })
    }

    titleChange = (e) => {this.setState({title: e.target.value})};
    descriptionChange = (e) => {this.setState({description: e.target.value})};
    //fileNameChange = (e) => {this.setState({file_name: e.target.files[0]['name']})};
    // fileUrlChange = (e) => {this.setState({file_url: e.target.value})};
    fileUrlChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        const file = e.target.files[0];
        let fileName = encodeURI(file.name)
        this.setState({
            file_url: `https://dgusogongssis.s3.ap-northeast-2.amazonaws.com/${fileName}`,
            selectFile : file,
            file_name: e.target.files[0]['name']
        })

        reader.onloadend = () => {
            this.setState({
                preview : reader.result
            })
        }
        reader.readAsDataURL(file)
    }

    uploadFile = (file) => {
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
    };

    handleShow = () => {    
        this.setState({show: true});
    };
    
    render() {
        const show = this.state.show

        return (
            <span className="todo-create">
                <Button className="add-document-button" onClick={this.handleShow}>
                    <img alt="" src="/img/fileupload.png" className="document-add-img"></img>
                </Button>
                <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>자료 공유</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="docu-div-form">
                        <Form.Label className="text">제목</Form.Label>
                        <Form.Control placeholder="공유할 자료의 제목을 입력하세요." onChange={this.titleChange}/>
                    </Form.Group>
                
                    <Form.Group className="docuu-div-form">
                        <Form.Label className="text">상세 내용</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="자료에 대한 상세 내용을 입력하세요." onChange={this.descriptionChange}/>
                    </Form.Group>

                    <Form.Group className="tdd-div-form">
                        <Form.Label className="text">파일</Form.Label>
                        <Form.Control type="file" size="sm" onChange={this.fileUrlChange}/>
                    </Form.Group>
                </Form> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        취소
                    </Button>
                    <Button className="create-Button" onClick={()=> {this.onClickSubmit(); this.uploadFile(this.state.selectFile)}}>
                        공유
                    </Button>
                </Modal.Footer>
                </Modal>
            </span>
    );
    }
}
  
export default Create;