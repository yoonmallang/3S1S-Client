import React, { Component } from 'react';
import { Modal,Button, Form  } from 'react-bootstrap';
import '../../css/todo/read.css';
import axios from "axios"

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : true,
            todoDetail : this.props.detail,

            participants : [],

            modifytodo : false,
            modifiedTitle : this.props.detail['title'],
            modifiedDesription : this.props.detail['description'],
            modifiedStartDate : this.props.detail['start_date'],
            modifiedEndDate : this.props.detail['end_date'],
            modifiedParticipants : []
        }
    }

    titleChange = (e) => {this.setState({modifiedTitle: e.target.value})};
    descriptionChange = (e) => {this.setState({modifiedDesription: e.target.value})};
    startDateChange = (e) => {this.setState({modifiedStartDate: e.target.value})};
    endDateChange = (e) => {this.setState({modifiedEndDate: e.target.value})};

    handleClose = () => {
        this.setState({show: false});
        this.setState({modifiedParticipants: []});
        this.props.handleClose();
        this.props.handleLoding();
    };

    handleSelect = (e) => {
        if (!this.state.modifiedParticipants.includes(e.target.value)) {
            this.setState({
                modifiedParticipants : [...this.state.modifiedParticipants, e.target.value]
            })
        }
    }

    removeSelect = (id) => {
        let newArr = this.state.modifiedParticipants.filter(info => info !== id);
        this.setState({
            modifiedParticipants : newArr
        })
    }


    loadingParticipants = async () => { 
        try { 
            const res = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/members", {
                params: {
                    project: this.state.todoDetail.project,
                    showname : true
                }
            });
            this.setState({ participants: res.data.members });
            let participantArray = []
            this.props.detail['participants'].forEach(function (n) 
            { 
                participantArray.push(n.name_id); 
            });
            this.setState({modifiedParticipants : participantArray})
        } catch (e) { 
            console.log(e); 
        }
    }

    modifyTodo = (todoId) => {
        console.log(todoId)
        axios.put(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/todos/${todoId}`, {
            title : this.state.modifiedTitle,
            description : this.state.modifiedDesription, 
            start_date: this.state.modifiedStartDate,
            end_date: this.state.modifiedEndDate,
            participants: this.state.modifiedParticipants
        }).then((res) => {
            console.log(res)
            this.handleClose();
        }).catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() { 
        const { loadingParticipants } = this; 
        loadingParticipants(); 


    }
    

    render() {
        const show = this.state.show
        const participants = this.state.participants
        const modifiedParticipants = this.state.modifiedParticipants
        return (
        <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>ToDo 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="td-div-form">
                    <Form.Label className="text">제목</Form.Label>
                    <Form.Control defaultValue={this.state.modifiedTitle} onChange={this.titleChange}/>
                </Form.Group>
            
                <Form.Group className="tdd-div-form">
                    <Form.Label className="text">상세 내용</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue={this.state.modifiedDesription} onChange={this.descriptionChange}/>
                </Form.Group>
            
                <div>
                    <Form.Group className="date1-form">
                        <Form.Label className="text">시작 일시</Form.Label>
                        <input type="date" className="form-control" onChange={this.startDateChange} defaultValue={this.state.modifiedStartDate}/>
                    </Form.Group>

                    <Form.Group className="date2-form">
                        <Form.Label className="text">종료 일시</Form.Label>
                        <input type="date" className="form-control"  onChange={this.endDateChange} defaultValue={this.state.modifiedEndDate}/>
                    </Form.Group>
                </div>
                
                <div>
                    <Form.Select className="participant-form" onChange={this.handleSelect}>
                        <option value="none" hidden>참여자를 선택하세요.</option>
                        {participants.map((item)=> {
                            return (
                                <option key={item.id} value={item.name}>{item.name}</option>
                            )
                        })}
                    </Form.Select>
                    <div className="participant-form">
                        {modifiedParticipants.map((item)=> {
                            return (
                                <div>
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
                <Button className="create-Button" type="submit" onClick={()=>this.modifyTodo(this.state.todoDetail['id'])}>
                    수정
                </Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default Update;