import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/navi/Middlebar.css';

class Middlebar extends Component {
    render() {
        const menu = [
            {   
                id : 1,
                title: '프로젝트이름',
                url: '/project/:id?',
                cName: 'menu-link'
            },
            
            {
                id : 2,
                title: '캘린더',
                url: '/calendar',
                cName: 'menu-link'
            },
        
            {
                id : 3,
                title: 'ToDo',
                url: '/todo',
                cName: 'menu-link'
            },
        
            {
                id : 4,
                title: '자료실',
                url: '/document',
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