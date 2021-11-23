import React, { Component } from 'react';
import Middlebar from '../navi/Middlebar'
import '../../css/calendar/list.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 

class List extends Component {
    render() {
        return (
        <div className="Outer_cl">
            <Middlebar id={this.props.match.params}/>
            <div className = "Calendar_cl">
                <div className="LeftContent_cl">
                </div>
                <div className="RightContent_cl">
                </div>
            </div>
        </div>
        );
    }
}

export default List;