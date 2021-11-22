import React, { Component } from 'react';
import '../../css/todo/list.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Create from './Create.js'
import Middlebar from '../navi/Middlebar'
import Dnd from './Dnd'

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos_0 : [],
            todos_1 : [],
            todos_2 : [],
            project_id : this.props.match.params.id,
            progressValue : 0
        }
    }

    loadingTodos = async () => { 
        try { 
            const res = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/todos", {
                params: {
                    project: this.state.project_id,
                    state: 0,
                }
            });
            this.setState({ todos_0: res.data.todo_list });
        } catch (e) { 
            console.log(e); 
        }

        try { 
            const res = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/todos", {
                params: {
                    project: this.state.project_id,
                    state: 1,
                }
            });
            this.setState({ todos_1: res.data.todo_list });
        } catch (e) { 
            console.log(e); 
        }

        try { 
            const res = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/todos", {
                params: {
                    project: this.state.project_id,
                    state: 2,
                }
            });
            this.setState({ todos_2: res.data.todo_list });
        } catch (e) { 
            console.log(e); 
        }
        
        try {
            const res = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects/${this.state.project_id}/progress_rate`);
            this.setState({ progressValue : res.data.item})
        } catch (e) {
            console.log(e);
        }
    };

    componentDidMount() { 
        const { loadingTodos } = this; 
        loadingTodos(); 
        
    }
    render() {
        const todos_0 = this.state.todos_0
        const todos_1 = this.state.todos_1
        const todos_2 = this.state.todos_2
        
        return (
            <div className = "todo-page">
                <Middlebar id={this.props.match.params}/>
                    <div style={{ width: '1100px', margin: '0px auto', marginTop:'30px'}}>
                        <Create id={this.props.match.params}/>
                        <div style={{ width: '500px',margin: '0px auto'}}>
                        <p style={{ float: 'left', marginBottom:'0px'}}>진행률</p>
                        <p style={{ float: 'right', marginBottom:'0px'}}>5%</p>
                        <progress value = '5' max="100" className="todo-progress"></progress>
                    </div>
                </div>
                <div>
                <Dnd state0={todos_0} state1={todos_1} state2={todos_2}/>
                </div>
            </div>
        );
    }
}
    

export default List;