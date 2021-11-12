import React, { Component } from 'react';
import '../../css/todo/list.css';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class List extends Component {
    constructor() {
        super();
        this.state = {
            todos_0 : [],
            todos_1 : [],
            todos_2 : [],
            project_id : 1,
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
    };

    componentDidMount() { 
        const { loadingTodos } = this; 
        loadingTodos(); 
    }

    render() {
        const todos_0 = this.state.todos_0
        console.log(todos_0)
        const todos_1 = this.state.todos_1
        const todos_2 = this.state.todos_2

        return (
            <div className = "todo-page">
                <div className = "todoList">
                    <div className = "state left">
                        <span className="p1">시작전</span>
                        {todos_0.map((item)=> {
                            return (
                                <Card className = "todo-card" key = {item.id} style={{ width: '18rem'}}>
                                    <Card.Body>
                                        <div className ="one-line">
                                            <Card.Title className = "todo-title">{item.title}</Card.Title>
                                            <span className = "todo-dday">{item.d_day}</span>
                                        </div>
                                        <div className ="participants">
                                            {
                                                item.participants.map((member)=> {
                                                    return (
                                                        <Card.Text className ="participant">{member}</Card.Text>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </div>
                    <div className = "state center">
                        <span className="p2">진행중</span>
                        {todos_1.map((item)=> {
                                return (
                                    <Card className = "todo-card" key = {item.id} style={{ width: '18rem'}}>
                                        <Card.Body>
                                            <div className ="one-line">
                                                <Card.Title className = "todo-title">{item.title}</Card.Title>
                                                <span className = "todo-dday">{item.d_day}</span>
                                            </div>
                                            <div className ="participants">
                                                {
                                                    item.participants.map((member)=> {
                                                        return (
                                                            <Card.Text className ="participant">{member}</Card.Text>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Card.Body>
                                    </Card>
                                )
                            })} 
                    </div>
                    <div className = "state right">
                        <span className="p3">완료</span>
                        {todos_2.map((item)=> {
                                return (
                                    <Card className = "todo-card" key = {item.id} style={{ width: '18rem'}}>
                                        <Card.Body>
                                            <div className ="one-line">
                                                <Card.Title className = "todo-title">{item.title}</Card.Title>
                                                <span className = "todo-dday">{item.d_day}</span>
                                            </div>
                                            <div className ="participants">
                                                {
                                                    item.participants.map((member)=> {
                                                        return (
                                                            <Card.Text className ="participant">{member}</Card.Text>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                    </div>
                </div>    
            </div>
        );
    }
}

export default List;