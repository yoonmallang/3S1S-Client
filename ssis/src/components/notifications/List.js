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
                    invitee : sessionStorage.getItem('id')
                }
            });
            this.setState({ alarms: res.data.notifications });
        } catch (e) { 
            console.log(e); 
        }
    }

    selectAccept = (proj_id) => {
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/notifications/response", {
            accept: 1,
            project : proj_id,
            user: sessionStorage.getItem('id'),
        }).then((res) => {
            alert(res.data.message)
            this.loadingAlarms();
            document.location.href = '/project'
        }).catch((err) => {
            console.log(err);
        })
    }
    
    confirmReject(proj_id) {
        if (window.confirm("초대를 거절하시겠습니까?")) {
            this.selectReject(proj_id);
        } else {
          console.log("거절 취소");
        }
    }

    selectReject = (proj_id) => {
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/notifications/response", {
            accept: 0,
            project : proj_id,
            user: sessionStorage.getItem('id'),
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
        if (this.state.alarms.length === 0) {
            return (
                <div>
                    <Dropdown align="end" drop="down">
                        <Dropdown.Toggle className="nofi-dropButoon">
                            <img alt="" src="/img/alarm.png" className="img-alarm"/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="nofi-menu">
                            <Dropdown.Item style={{width: '350px', height: 'auto', fontSize:'13px'}}>
                                초대알람이 없습니다.
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Dropdown align="end" drop="down">
                        <Dropdown.Toggle className="nofi-dropButoon">
                            <img alt="" src="/img/alarm1.png" className="img-alarm"/>
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
                                            <Button className="nofi-reject-button" onClick={()=>this.confirmReject(item.project_id)}>
                                                거절
                                            </Button>
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Divider className="nofi-divider"/>
                                </div>
                            )
                        })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            );
        }
    }
    
}

export default List;