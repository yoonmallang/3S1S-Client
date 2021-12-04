import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../css/calendar/create.css';

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            project: "",
            writer: sessionStorage.getItem("id"),   
            title: "",
            description: "",
            start_date: "",
            end_date: "",
            color: "",
            schedule:[],
            color_list: [`#737880`, `#7a9acc`, `#99C0FF`, `#B7EDCD`, `#FFD4C4`]
        }
    }

    loadingData = async () => { 
        try { 
            console.log("this.props.id")
            console.log(this.props.id)
            const id = this.props.id;
            const response = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/schedules/${id}`);           
            console.log(response.data.schedule_content) 
            this.setState({schedule: response.data.schedule_content})
            this.setState({project: this.state.schedule.id})
            this.setState({writer: this.state.schedule.writer})
            this.setState({title: this.state.schedule.title})
            this.setState({description: this.state.schedule.description})
            this.setState({start_date: this.state.schedule.start_date})
            this.setState({end_date: this.state.schedule.end_date})
            this.setState({color: this.state.schedule.color})
        } catch (e) 
        { console.log(e); }
      };


    onClickSubmit = async() => {
        const id = this.props.id;
        let a = await this.setState({project: this.props.p_id});
        console.log(id);
        console.log(this.state.title);
        console.log(this.state.description);
        console.log(this.state.start_date);
        console.log(this.state.end_date);
        console.log(this.state.color);
        axios.put(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/schedules/${id}`, {
            title: this.state.title,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            color : this.state.color,
        }).then((res) => {
            console.log(res.data);
            if (res.status === 200) {
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

    handleShow = async () => {  
        let b = await this.loadingData();  
        this.setState({show: true});
    };

    componentDidMount(){ //한번만 실행
        
    }

    render() {
        const show = this.state.show

        return (
            <div>
                <button type="button" className="P_btm" id="img_btn" onClick={this.handleShow}><img src="/img/pencil.png" className="P_btm_image" alt = ""></img></button>                
        
                <Modal show={show} onHide={this.handleClose} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>일정 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="div-form1_cc" controlId="formProject">
                        <Form.Label className="text"> 제목</Form.Label>
                        <Form.Control className="dataInput-form_pc" defaultValue={this.state.title} placeholder="생성할 일정의 제목을 입력하세요." onChange={this.titleChange}/>
                    </Form.Group>
                
                    <Form.Group className="date1-form_cc">
                        <Form.Label className="text">날짜</Form.Label>
                        <input type="date" className="form-control" defaultValue={this.state.start_date} onChange={this.startdateChange}/>
                    </Form.Group>

                    <Form.Group className="date2-form_cc">
                        <input type="date" className="form-control"  defaultValue={this.state.end_date} onChange={this.enddateChange}/>
                    </Form.Group>
                    
                    <Form.Group className="div-form_cc" controlId="formGridPassword1">
                        <Form.Label className="text">상세 내용</Form.Label>
                        <Form.Control as="textarea" rows={5} defaultValue={this.state.description} placeholder="일정의 세부내용을 입력해주세요." onChange={this.descriptionChange}/>
                    </Form.Group>  

                    <Form.Group className="div-form_cc" controlId="formGridPassword1">
                        <Form.Label className="text">색상 선택</Form.Label>
                        <div className="form_color">
                            {this.state.color_list.map(color=>(<button type = "button" key = {color} style = {{background:color}} onClick={() => this.setState({color: color})} className="color_button"/>))}
                        </div>
                    </Form.Group>  
                </Form>
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        취소
                    </Button>
                    <Button className="create-Button" type="submit" onClick={this.onClickSubmit}>
                        수정
                    </Button>
                </Modal.Footer>
                </Modal>
            </div>
    );
    }
}
  
export default Update;