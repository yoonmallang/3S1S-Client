import React, { Component } from 'react';
import { Modal,Button  } from 'react-bootstrap';
import '../../css/todo/read.css';
import List from '../comment/List'
import axios from "axios"

class Read extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : true,
            todoDetail : this.props.detail,
            stateArray : ["시작전", "진행중" , "완료"],
            stateCL : ["td-state0", "td-state1", "td-state2"],

            modifytodo : false,
            modifiedTitle : this.props.detail.title,
            modifiedDesription : this.props.detail.description,
            modifiedStartDate : this.props.detail.start_date,
            modifiedEndDate : this.props.detail.end_data,
            modifiedParticipants : this.props.detail.participants
        }
    }

    titleChange = (e) => {this.setState({modifiedTitle: e.target.value})};
    descriptionChange = (e) => {this.setState({modifiedDesription: e.target.value})};
    startDateChange = (e) => {this.setState({modifiedStartDate: e.target.value})};
    endDateChange = (e) => {this.setState({modifiedParticipants: e.target.value})};

    handleClose = () => {
        this.setState({show: false});
        this.setState({seletedParticipants: []});
        this.props.handleClose();
        this.props.handleLoding();
    };

    modifyButton = () => {
        this.setState({ modifytodo: true });
    }

    handleShow = () => {    
        this.setState({show: true});
    };

    modifyTodo = (todoId) => {
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

    deleteTodo = (todoId) => {
        axios.delete(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/todos/${todoId}`)
        .then((res) => {
            console.log(res)
            this.handleClose();
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <Modal  show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <div style={{width:"100%"}}>
                    <Modal.Title>
                        <b style={{float:'left'}}>{this.state.todoDetail.title} </b>
                            <div className="td-buttons">
                                <Button className="td-modify-button" onClick={()=>this.modifyButton()}>
                                    <img alt="" src="/img/pencil.png" className="td-modify-img"></img>
                                </Button>
                                <Button className="td-delete-button" onClick={()=>this.deleteTodo(this.state.todoDetail.id)}>
                                    <img alt="" src="/img/delete.png" className="td-delete-img"></img>
                                </Button>
                        </div>
                    </Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="td-infomations">
                        <div className="left">
                            <p className="td-kinds">시작 일시</p>
                            <p className="td-kinds">종료 일시</p>
                            <p className="td-kinds">상태</p>
                            <p className="td-kinds">담당자</p>
                        </div>
                        <div className="right">
                            <p className="td-Info">{this.state.todoDetail.start_date}</p>
                            <p className="td-Info">{this.state.todoDetail.end_date}</p>
                            <span className={this.state.stateCL[this.state.todoDetail.state]}>{this.state.stateArray[this.state.todoDetail.state]}</span>
                            <br/>
                            {this.state.todoDetail.participants.map((item)=> {
                                    return (
                                        <span className="td-Info-participants" key={item.user_id}>{item.name}</span>
                                    )
                                })}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{paddingLeft:'6px', paddingRight:'15px'}}>
                <div className="td-infomations">
                    <div className= "left">
                        <p className="td-kinds">세부내용</p>
                    </div>
                    <div className= "right">
                        {
                        this.state.todoDetail.description.split("\n").map(line => {
                            return (<span>{line}<br/></span>)
                        })
                        }
                    </div>
                </div>
                </Modal.Footer>
                <Modal.Footer style={{paddingLeft:'6px', paddingRight:'15px'}}>
                    <div className="td-infomations">
                        <div className= "left">
                            <p className="td-kinds">댓글</p>
                        </div>
                        <div className= "right">
                            <List todoId={this.state.todoDetail.id}/>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Read;