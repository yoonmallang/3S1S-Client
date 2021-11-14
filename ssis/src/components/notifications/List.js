import React, { Component } from 'react';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
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

    componentDidMount() { 
        const { loadingAlarms } = this; 
        loadingAlarms(); 
    }
    
    render() {
        const alarms = this.state.alarms;

        return (
            <div>
                <Dropdown align="end" drop="down">
                    <Dropdown.Toggle className="nofi-dropButoon">
                        <img alt="" src="img/alarm.png" className="img-alarm"/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    {alarms.map((item) => {
                        return (
                            <div>
                                
                                <Dropdown.Item className="nofi-navDrop">
                                    <div className="nofi-text-area">
                                        {item.inviter_id}님께서 회원님을<br/>
                                        {item.project_id}에 초대했습니다.
                                    </div>
                                    <div className="nofi-button-area">
                                        <Button className="nofi-accept-button">
                                            수락
                                        </Button>
                                        <Button className="nofi-reject-button">
                                            거절
                                        </Button>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Divider />
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