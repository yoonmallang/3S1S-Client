import React, { Component } from 'react';
import Middlebar from '../navi/Middlebar'
class List extends Component {
    render() {
        return (
            <div>
                <Middlebar id={this.props.match.params}/>
                <p>
                    document list
                </p>
            </div>
        );
    }
}

export default List;