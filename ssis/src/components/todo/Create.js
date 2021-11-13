import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../css/todo/create.css';
import axios from 'axios';

class Create extends Component {
    constructor() {
        super();
        this.state = {
            show : false,
            project: 1,
            writer : localStorage.getItem("id"),
            title: "",
            description: "",
            start_date: "",
            end_date: "",
            participants: [],
            seletedParticipants : []
        }
    }

    onClickSubmit = () => {
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/todos", {
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

    loadingParticipants = async () => { 
        try { 
            const res = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/members", {
                params: {
                    project: this.state.project,
                }
            });
            this.setState({ participants: res.data.data });
            console.log(this.state.participants)
        } catch (e) { 
            console.log(e); 
        }
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

    handleSelect = (e) => {
        this.setState({
            seletedParticipants : [...this.state.seletedParticipants, e.target.value]
        })
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
        const participants = this.state.participants
        const selectedParticipants = this.state.seletedParticipants

        return (
            <div>
                <Button className="add-todo-button" onClick={this.handleShow}>
                    투두추가
                </Button>
        
                <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ToDo 생성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="div-form" controlId="formGridId">
                        <Form.Label className="text">제목</Form.Label>
                        <Form.Control className="idInput-form" placeholder="생성할 ToDo의 제목을 입력하세요," onChange={this.titleChange}/>
                    </Form.Group>
                
                    <Form.Group className="div-form" controlId="formGridPassword1">
                        <Form.Label className="text">상세 내용</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="ToDo의 상세내용을 입력하세요." onChange={this.descriptionChange}/>
                    </Form.Group>
                
                    <div>
                        <Form.Group className="date-form" controlId="formGridPassword1">
                            <Form.Label className="text">시작 일시</Form.Label>
                            <input type="date" className="form-control" onChange={this.startDateChange}/>
                        </Form.Group>

                        <Form.Group className="date-form" controlId="formGridPassword1">
                            <Form.Label className="text">종료 일시</Form.Label>
                            <input type="date" className="form-control"  onChange={this.endDateChange}/>
                        </Form.Group>
                    </div>
                    
                    <div>
                        <Form.Select className="participant-form" onChange={this.handleSelect} id="inlineFormCustomSelect">
                            <option value="none" hidden>참여자를 선택하세요.</option>
                            {participants.map((item)=> {
                                return (
                                    <option key={item.id} value={item.user_id}>{item.user_id}</option>
                                )
                            })}
                        </Form.Select>
                        <div className="participant-form">
                            {selectedParticipants.map((item)=> {
                                return (
                                    <div>
                                        <span>{item}</span>
                                        <button onClick={()=>this.removeSelect(item)} className="cancel-button"><img alt="" src="img/cancel.png" className="img-cancel"/></button>
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
                    <Button className="add-todo-Button" type="submit" onClick={this.onClickSubmit}>
                        생성
                    </Button>
                </Modal.Footer>
                </Modal>
            </div>
    );
    }
}
  
export default Create;