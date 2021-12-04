import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../css/calendar/create.css';

class Create extends Component {
    constructor() {
        super();
        this.state = {
            show : false,
            project: "",
            writer: sessionStorage.getItem("id"),      
            title: "",
            description: "",
            start_date: "",
            end_date: "",
            color: "#7a9acc",
            color_list: [[`#737880`, 0], [`#7a9acc`, 0], [`#99C0FF`, 0], [`#a4e2bd`, 0], [`#FFD4C4`, 0]],
        }
    }

    onClickSubmit = async () => {

        let a = await this.setState({project: this.props.p_id})
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/schedules", {
            project: this.state.project,
            writer: this.state.writer,        
            title: this.state.title,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            color: this.state.color,
        }).then((res) => {
            console.log(res.data);
            if (res.status === 201) {
                document.location.href = `/project/${this.state.project}/calendar`;
            }
            else if (res.status === 210) {
                alert(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    titleChange = (e) => {this.setState({title: e.target.value})};
    descriptionChange = (e) => {this.setState({description: e.target.value})};
    startdateChange = (e) => {this.setState({start_date: e.target.value})};
    enddateChange = (e) => {this.setState({end_date: e.target.value})};

    handleClose = () => {
        this.setState({show: false});
    };

    handleShow = () => {    
        this.setState({show: true});   
        var curr = new Date();
        curr.setDate(curr.getDate());
        var date = curr.toISOString().substr(0,10);
        this.setState({start_date :date, end_date : date})
    };

    deleteColor = () => {
        this.setState({color_list: [[`#737880`, 0], [`#7a9acc`, 0], [`#99C0FF`, 0], [`#B7EDCD`, 0], [`#FFD4C4`, 0]]})
    }

    componentDidMount() {
        }

    render() {
        const show = this.state.show

        let color = this.state.color_list.map(color=>{
            if(color[1] === 0)
            return <button type = "button" key = {color[0]} style = {{background:color[0]}}
            onClick={(e) => {
                this.setState({color: color[0]})
                this.deleteColor()
                color[1] = 1
                console.log(this.state.color_list)
                
            }} className="color_button"/>
            else
            return <button type = "button" key = {color[0]} style = {{background:color[0], border:'3px solid black'}}
            onClick={(e) => {
                this.setState({color: color[0]})
                this.deleteColor()
                color[1] = 1
                console.log(this.state.color_list)
                
            }} className="color_button"/>
        })

        return (
            <div>
                <button type="button" className="C_btm" id="img_btn" onClick={this.handleShow}><img src="/img/plus_black.png" className="C_btm_image" alt = ""></img></button>

                <Modal show={show} onHide={this.handleClose} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>일정 생성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="div-form1_cc" controlId="formProject">
                        <Form.Label className="text"> 제목</Form.Label>
                        <Form.Control className="dataInput-form_pc" placeholder="생성할 일정의 제목을 입력하세요." onChange={this.titleChange}/>
                    </Form.Group>
                
                    <Form.Group className="date1-form_cc">
                        <Form.Label className="text">날짜</Form.Label>
                        <input type="date" className="form-control" onChange={this.startdateChange} defaultValue={this.state.start_date}/>
                    </Form.Group>

                    <Form.Group className="date2-form_cc">
                        <input type="date" className="form-control"  onChange={this.enddateChange} defaultValue={this.state.end_date}/>
                    </Form.Group>
                    
                    <Form.Group className="div-form_cc" controlId="formGridPassword1">
                        <Form.Label className="text">상세 내용</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="일정의 세부내용을 입력해주세요." onChange={this.descriptionChange}/>
                    </Form.Group>  

                    <Form.Group className="div-form_cc" controlId="formGridPassword1">
                        <Form.Label className="text">색상 선택</Form.Label>
                        <div className="form_color">
                            {color}
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
  
export default Create;