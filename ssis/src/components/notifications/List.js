import React, { Component } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import '../../css/notifications/list.css';

class List extends Component {
    constructor() {
        super();
        this.state = {
            alarms : [],
        }
    }

    loadingAlarms = async () => { 
        try { 
            const res = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/notifications	", {
                params: {
                    invitee : localStorage.getItem('id')
                }
            });
            this.setState({ alarms: res.data.data });
            console.log(this.state.alarms)
        } catch (e) { 
            console.log(e); 
        }
    }

    selectAccept = (proj_id) => {
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/notifications/response", {
            accept: 1,
            project : proj_id,
            user: localStorage.getItem('id'),
        }).then((res) => {
            alert(res.data.message)
            this.loadingAlarms();
        }).catch((err) => {
            console.log(err);
        })
    }

    selectReject = (proj_id) => {
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/notifications/response", {
            accept: 0,
            project : proj_id,
            user: localStorage.getItem('id'),
        }).then((res) => {  
            alert(res.data.message)
            this.loadingAlarms();
        }).catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() { 
        const { loadingAlarms } = this; 
        loadingAlarms(); 
    }
    
    render() {
        return (
            <div>
                <Dropdown align="end" drop="down">
                    <Dropdown.Toggle className="nofi-dropButoon">
                        <img alt="" src="/img/alarm.png" className="img-alarm"/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="nofi-menu">
                    {this.state.alarms.map((item) => {
                        return (
                            <div key={item.id}>
                                <Dropdown.Item className="nofi-navDrop">
                                    <div className="nofi-text-area">
                                        <b>{item.inviter_name}</b>님께서 회원님을<br/>
                                        <b>{item.project_title}</b>에 초대했습니다.
                                    </div>
                                    <div className="nofi-button-area">
                                        <Button className="nofi-accept-button" onClick={()=>this.selectAccept(item.project_id)}>
                                            수락
                                        </Button>
                                        <Button className="nofi-reject-button" onClick={()=>this.selectReject(item.project_id)}>
                                            거절
                                        </Button>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Divider/>
                            </div>
                        )
                    })}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

export default List;