import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../css/todo/create.css';
import axios from 'axios';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            project: this.props.id.id,
            writer : sessionStorage.getItem("id"),
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
            project: this.state.project,
            writer : this.state.writer,
            title: this.state.title,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            participants: this.state.seletedParticipants,
        }).then((res) => {
            console.log(res.data);
            if (res.status === 201) {
                document.location.href = `/project/${this.state.project}/todo`;
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
                    showname : true
                }
            });
            this.setState({ participants: res.data.members });
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
        this.setState({seletedParticipants: []});
    };

    handleShow = () => {    
        this.setState({show: true});
        var curr = new Date();
        curr.setDate(curr.getDate());
        var date = curr.toISOString().substr(0,10);
        this.setState({start_date :date, end_date : date})
    };

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
        const participants = this.state.participants
        const selectedParticipants = this.state.seletedParticipants
        return (
            <span className="todo-create">
                <Button className="add-todo-button" onClick={this.handleShow}>
                    <img alt="" src="/img/plus2.png" className="todo-add-img"></img>
                </Button>
        
                <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ToDo 생성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="td-div-form">
                        <Form.Label className="text">제목</Form.Label>
                        <Form.Control placeholder="생성할 ToDo의 제목을 입력하세요," onChange={this.titleChange}/>
                    </Form.Group>
                
                    <Form.Group className="tdd-div-form">
                        <Form.Label className="text">상세 내용</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="ToDo의 상세내용을 입력하세요." onChange={this.descriptionChange}/>
                    </Form.Group>
                
                    <div>
                        <Form.Group className="date1-form">
                            <Form.Label className="text">시작 일시</Form.Label>
                            <input type="date" className="form-control" onChange={this.startDateChange} defaultValue={this.state.start_date}/>
                        </Form.Group>

                        <Form.Group className="date2-form">
                            <Form.Label className="text">종료 일시</Form.Label>
                            <input type="date" className="form-control"  onChange={this.endDateChange} defaultValue={this.state.end_date}/>
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
                            {selectedParticipants.map((item)=> {
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
                        생성
                    </Button>
                </Modal.Footer>
                </Modal>
            </span>
    );
    }
}
  
export default Create;