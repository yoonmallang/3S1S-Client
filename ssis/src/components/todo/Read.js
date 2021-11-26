import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class Read extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : true,
            todoDetail : this.props.detail
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
                    <Modal.Title>ToDo </Modal.Title>
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