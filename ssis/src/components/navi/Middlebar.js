import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/navi/Middlebar.css';
import axios from "axios"

class Middlebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projId : this.props.id.id,
            title : "",
        }
    }

    getTitle = async () => { 
        try { 
            const response = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects/${this.state.projId}/title`);         
            this.setState({title: response.data.item})
        } catch (e) 
        { console.log(e); }
      };

    componentDidMount(){ //한번만 실행
        const {getTitle} = this;
        getTitle();
    }

    render() { 
        const menu = [
            {   
                id : 1,
                title:`${this.state.title}`,
                url: `/project/${this.state.projId}`,
                cName: 'menu-link'
            },
            
            {
                id : 2,
                title: '캘린더',
                url: `/project/${this.state.projId}/calendar/`,
                cName: 'menu-link'
            },
        
            {
                id : 3,
                title: 'ToDo',
                url: `/project/${this.state.projId}/todo`,
                cName: 'menu-link'
            },
        
            {
                id : 4,
                title: '자료실',
                url: `/project/${this.state.projId}/document`,
                cName: 'menu-link'
            }
        ]
        return (
            <div className = "middle-Navigation">
                <hr className = "hr1"/>
                    <div className = "menu">
                        {menu.map((item) => {
                            return (
                                <Link to={item.url} key={item.id} className={item.cName}>{item.title}</Link>
                            )
                        })}
                    </div>
                <hr className = "hr2"/>
            </div>
        );
    }
}

export default Middlebar;