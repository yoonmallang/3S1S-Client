import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../css/calendar/create.css';

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            project: "",
            writer: sessionStorage.getItem("id"),      
            title: "",
            description: "",
            start_date: "",
            end_date: "",
            color: "",
            schedule:[],
            color_list: [`#737880`, `#7a9acc`, `#99C0FF`, `#B7EDCD`, `#FFD4C4`]
        }
    }

    loadingData = async () => { 
        try { 
            console.log(this.props.id.id)
            const id = this.props.id.id;
            const response = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects/${id}`);            
            this.setState({schedule: response.data.schedule_content})
            this.setState({project: this.state.schedule.id})
            this.setState({writer: this.state.schedule.writer})
            this.setState({title: this.state.schedule.title})
            this.setState({description: this.state.schedule.description})
            this.setState({start_date: this.state.schedule.start_date})
            this.setState({end_date: this.state.schedule.end_date})
            this.setState({color: this.state.schedule.color})
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
    };

    handleShow = () => {    
        this.setState({show: true});
    };

    componentDidMount(){ //한번만 실행
        //const {loadingData} = this;
        //loadingData();
    }

    render() {
        const show = this.state.show

        const onChange2 = (e) => {
          const img = e.target.files[0];
          const formData = new FormData();
          formData.append('file', img);
      }

        return (
            <div>
                <button type="button" className="P_btm" id="img_btn" onClick={this.handleShow}><img src="/img/pencil.png" className="P_btm_image" alt = ""></img></button>                
        
                {/* <Modal show={show} onHide={this.handleClose} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>프로젝트 정보 수정</Modal.Title>
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
                            onChange={onChange2}>
                        </input>
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
                    <Button className="create-Button" type="submit" onClick={()=>{this.onClickSubmit()}}>
                        수정
                    </Button>
                </Modal.Footer>
                </Modal> */}
                <Modal show={show} onHide={this.handleClose} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>일정 생성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="div-form1_cc" controlId="formProject">
                        <Form.Label className="text"> 제목</Form.Label>
                        <Form.Control className="dataInput-form_pc" defaultValue={"23"} placeholder="생성할 일정의 제목을 입력하세요." onChange={this.titleChange}/>
                    </Form.Group>
                
                    <Form.Group className="date1-form_cc">
                        <Form.Label className="text">날짜</Form.Label>
                        <input type="date" className="form-control" defaultValue={"23"} onChange={this.startdateChange}/>
                    </Form.Group>

                    <Form.Group className="date2-form_cc">
                        <input type="date" className="form-control"  defaultValue={"23"} onChange={this.enddateChange}/>
                    </Form.Group>
                    
                    <Form.Group className="div-form_cc" controlId="formGridPassword1">
                        <Form.Label className="text">상세 내용</Form.Label>
                        <Form.Control as="textarea" rows={5} defaultValue={"23"} placeholder="일정의 세부내용을 입력해주세요." onChange={this.descriptionChange}/>
                    </Form.Group>  

                    <Form.Group className="div-form_cc" controlId="formGridPassword1">
                        <Form.Label className="text">색상 선택</Form.Label>
                        <div className="form_color">
                            {this.state.color_list.map(color=>(<button type = "button" key = {color} style = {{background:color}} onClick={() => this.setState({color: color})} className="color_button"/>))}
                        </div>
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
  
export default Update;