import React, { Component } from 'react';
import { Modal,Button, Form  } from 'react-bootstrap';
import '../../css/todo/read.css';
import List from '../comment/List'
import axios from "axios"
import Update from './Update'

class Read extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : true,
            todoDetail : this.props.detail,
            stateArray : ["시작전", "진행중" , "완료"],
            stateCL : ["td-state0", "td-state1", "td-state2"],
            modifytodo:  false,
        }
    }

    handleClose = () => {
        this.setState({show: false});
        this.setState({modifiedParticipants: []});
        this.props.handleClose();
        this.props.handleLoding();
    };

    modifyButton = () => {
        this.setState({ modifytodo: true });
    }

    handleShow = () => {    
        this.setState({show: true});
    }

    deleteTodo = (todoId) => {
        axios.delete(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/todos/${todoId}`)
        .then((res) => {
            console.log(res)
            this.handleClose();
            document.location.href=`/project/${this.state.todoDetail.project}/todo`
        }).catch((err) => {
            console.log(err);
        })
    }
    
    render() {
        if(!this.state.modifytodo) {
            return (
                <Modal  show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <div style={{width:"100%"}}>
                        <Modal.Title>
                            <b style={{float:'left'}}>{this.state.todoDetail.title} </b>
                            {
                                this.state.todoDetail.writer === sessionStorage.getItem('id')
                                ?   <div className="td-buttons">
                                        <Button className="td-modify-button" onClick={()=>this.modifyButton()}>
                                            <img alt="" src="/img/pencil.png" className="td-modify-img"></img>
                                        </Button>
                                        <Button className="td-delete-button" onClick={()=>this.deleteTodo(this.state.todoDetail.id)}>
                                            <img alt="" src="/img/delete.png" className="td-delete-img"></img>
                                        </Button>
                                    </div>
                                : null
                            }                        
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
                                            <div className="tdd-participant-line">
                                                 <img alt="" src={item.profile_img} className="tdd-participant-img"/>
                                                <span className="td-Info-participants" key={item.user_id}>{item.name}</span>
                                            </div>
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
        else {
            return (
                <Update detail={this.state.todoDetail} handleClose={this.handleClose} handleLoding={this.props.handleLoding()}/>
            );
        }
    }
}

export default Read;