import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

class Read extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : true,
            todoId: this.props.todoId,
            todoDetail : []
        }
        console.log(this.state.todoId)
    }

    // loadingTodoDetail = async () => { 
    //     try { 
    //         const res = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/todos/${this.state.todoId}`);
    //         this.setState({ todoDetail: res.data.notifications });
    //         console.log(this.state.todoDetail)
    //     } catch (e) { 
    //         console.log(e); 
    //     }
    // }

    handleClose = () => {
        this.setState({show: false});
        this.setState({seletedParticipants: []});
    };

    handleShow = () => {    
        this.setState({show: true});
    };

    // componentDidMount() { 
    //     const { loadingTodoDetail } = this; 
    //     loadingTodoDetail(); 
    // }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ToDo {this.state.todoId}</Modal.Title>
                    <Button variant="secondary" onClick={this.handleClose}>
                        취소
                    </Button>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    
                    <Button className="create-Button" type="submit" onClick={this.onClickSubmit}>
                        생성
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Read;