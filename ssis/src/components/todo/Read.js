import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../../css/todo/read.css';

class Read extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : true,
            todoDetail : this.props.detail,
            stateArray : ["시작전", "진행중" , "완료"],
            stateCL : ["td-state0", "td-state1", "td-state2"]
        }
        console.log(this.state.todoDetail)
    }

    handleClose = () => {
        this.setState({show: false});
        this.setState({seletedParticipants: []});
        this.props.handleClose();
    };

    handleShow = () => {    
        this.setState({show: true});
    };

    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><b>{this.state.todoDetail.title} </b></Modal.Title>
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
                                        <span className="td-Info-participants" key={item}>{item}</span>
                                    )
                                })}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
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
                <Modal.Footer>
                    <div className="td-infomations">
                        <div className= "left">
                            <p className="td-kinds">댓글</p>
                        </div>
                        <div className= "right">
                            {/* 댓글 */}
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Read;