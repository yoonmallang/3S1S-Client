import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class Create extends Component {
    constructor() {
        super();
        this.state = {
            show : false,
        }
    }
  
    handleClose = () => {
        this.setState({show: false});
        console.log(this.state.show);
    };

    handleShow = () => {    
        this.setState({show: true});
        console.log(this.state.show);
    };

    render() {
        const show = this.state.show
        return (
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                Launch demo modal
                </Button>
        
                <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                    Save Changes
                    </Button>
                </Modal.Footer>
                </Modal>
            </div>
    );
    }
}
  
export default Create;