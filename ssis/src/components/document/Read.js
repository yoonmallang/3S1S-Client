import React, { Component } from 'react';
import { Modal, Button,Form } from 'react-bootstrap';
import '../../css/document/read.css';
import axios from "axios";

class Read extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : true,
            documentDetail : this.props.detail,

            modifydocument : false,
            modifiedTitle : this.props.detail.title,
            modifiedDesription : this.props.detail.description,
            modifiedFileName : this.props.detail.description.file_name
        }
    }

    titleChange = (e) => {this.setState({modifiedTitle: e.target.value})};
    descriptionChange = (e) => {this.setState({modifiedDesription: e.target.value})};
    fileNameChange = (e) => {this.setState({modifiedFileName: e.target.files[0]['name']})};
    
    handleClose = () => {
        this.setState({show: false});
        this.props.handleClose();
        this.props.handleLoding();
    };

    modifyButton = () => {
        this.setState({ modifydocument: true });
        console.log(this.state.modifiedTitle)
    }

    modfiedIdClear = () => {
        this.setState({ modifydocument: false, modifiedTitle: "", modifiedDesription: "", modifiedFileName: ""});
    }

    modifyComment = (fileId) => {
        axios.put(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/files/${fileId}`, {
            title : this.state.modifiedTitle,
            description : this.state.modifiedDesription,
            file_name : this.state.modifiedFileName,
            file_url : "newUrl",
        }).then((res) => {
            console.log(res)
            this.modfiedIdClear();
            this.handleClose();
        }).catch((err) => {
            console.log(err);
        })
    }

    deleteComment = (fileId) => {
        axios.delete(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/files/${fileId}`)
        .then((res) => {
            console.log(res)
            this.handleClose();
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        if(!this.state.modifydocument) {
            return (
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <div style={{width:"100%"}}>
                        <Modal.Title>
                            <b style={{float:'left'}}>{this.state.documentDetail.title} </b>
                            <div className="document-buttons">
                                <Button className="document-modify-button" onClick={()=>this.modifyButton()}>
                                    <img alt="" src="/img/pencil.png" className="document-modify-img"></img>
                                </Button>
                                <Button className="document-delete-button" onClick={()=>this.deleteComment(this.state.documentDetail.id)}>
                                    <img alt="" src="/img/delete.png" className="document-delete-img"></img>
                                </Button>
                            </div>
                        </Modal.Title>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="docu-infomations">
                            <div className="left">
                                <p className="docu-kinds">작성 일시</p>
                                <p className="docu-kinds">게시자</p>
                                <p className="docu-kinds">내용</p>
                            </div>
                            <div className="right">
                                <p className="docu-Info">{this.state.documentDetail.create_at}</p>
                                <p className="docu-Info">{this.state.documentDetail.writer_name_only}</p>
                                {
                                    this.state.documentDetail.description.split("\n").map(line => {
                                        return (<span>{line}<br/></span>)
                                    })
                                }
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.documentDetail.file_name}
                    </Modal.Footer>
                </Modal>
            );
        }
        else {
            return (
                <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>자료 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="docu-div-form">
                        <Form.Label className="text">제목</Form.Label>
                        <Form.Control placeholder="공유할 자료의 제목을 입력하세요." defaultValue={this.state.documentDetail.title} onChange={this.titleChange}/>
                    </Form.Group>

                    <Form.Group className="docuu-div-form">
                        <Form.Label className="text">상세 내용</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="자료에 대한 상세 내용을 입력하세요." defaultValue={this.state.documentDetail.description} onChange={this.descriptionChange}/>
                    </Form.Group>

                    <Form.Group className="tdd-div-form">
                        <Form.Label className="text">파일</Form.Label>
                        <Form.Control type="file" size="sm" onChange={this.fileNameChange}/>
                    </Form.Group>
                </Form> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        취소
                    </Button>
                    <Button className="create-Button" type="submit" onClick={()=>this.modifyComment(this.state.documentDetail.id)}>
                        수정
                    </Button>
                </Modal.Footer>
                </Modal>
            )
        }
    }
}

export default Read;