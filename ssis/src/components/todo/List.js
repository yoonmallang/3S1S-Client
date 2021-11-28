import React, { Component } from 'react';
import '../../css/todo/list.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Create from './Create.js'
import Read from './Read.js'
import Middlebar from '../navi/Middlebar'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Card } from 'react-bootstrap';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos_0 : [],
            todos_1 : [],
            todos_2 : [],
            project_id : this.props.match.params.id,
            progressValue : 0,
            columns : [],
            todoDetail : [],
            showTodoDetail : false 
        }
        this.showDetail= this.showDetail.bind(this)
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

        this.setState({columns : {
            "0": {
              name: "시작전",
              items: this.state.todos_0,
              state : 0
            },
            "1": {
              name: "진행중",
              items: this.state.todos_1,
              state : 1
            },
            "2": {
              name: "완료",
              items: this.state.todos_2,
              state : 2
            }
          }})
    };

    loadingProgress = async () => { 
        try {
            const res = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects/${this.state.project_id}/progress_rate`);
            this.setState({ progressValue : res.data.item})
        } catch (e) {
            console.log(e);
        }
    }

    showDetail = async (todoId) => {
      try {
        console.log(todoId)
        const res = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/todos/${todoId}`);
        this.setState({todoDetail : res.data.todo_content, showTodoDetail : true})
    } catch (e) {
        console.log(e);
      }
    }

    
    modalClose = () => {
      this.setState({todoDetail : [], showTodoDetail : false})
      console.log(this.state.showTodoDetail)
    }

    onDragEnd = (result, columns) => {
        if (!result.destination) return;
        const { source, destination } = result;
      
        if (source.droppableId !== destination.droppableId) { 
          const sourceColumn = columns[source.droppableId];
          const destColumn = columns[destination.droppableId];
          const sourceItems = [...sourceColumn.items];
          const destItems = [...destColumn.items];
          const [removed] = sourceItems.splice(source.index, 1);
    
          axios.post('http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/todos/change',{
            'todo' : [removed][0]['id'],
            'state' : destColumn['state']
          })
          
          this.loadingProgress()
          destItems.splice(destination.index, 0, removed);
          this.setState({
            columns : {
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destItems
            }
            }
        });
        } 
        else {
          const column = columns[source.droppableId];
          const copiedItems = [...column.items];
          const [removed] = copiedItems.splice(source.index, 1);
          copiedItems.splice(destination.index, 0, removed);
          this.setState({
            columns : {
            ...columns,
            [source.droppableId]: {
              ...column,
              items: copiedItems
            }}
          });
        }
      };

    componentDidMount() { 
        const { loadingTodos, loadingProgress } = this; 
        loadingTodos(); 
        loadingProgress();
    }

    render() {
        const titleClassName = ['p1', 'p2', 'p3'];
        let pgValues = this.state.progressValue;

        return (
           
            <div className = "todo-page">
                <Middlebar id={this.props.match.params}/>
                    <div style={{ width: '1100px', margin: '0px auto', marginTop:'30px'}}>
                        <Create id={this.props.match.params}/>
                        <div style={{ width: '500px',margin: '0px auto'}}>
                        <p style={{ float: 'left', marginBottom:'0px'}}>진행률</p>
                        <p style={{ float: 'right', marginBottom:'0px'}}>{pgValues}%</p>
                        <progress value = {pgValues} max="100" className="todo-progress"></progress>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext onDragEnd={result => this.onDragEnd(result, this.state.columns)}>
        {Object.entries(this.state.columns).map(([columnId, column], index) => {
          return (
            <div  style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }} key={columnId}>
              <span className={titleClassName[index]}>{column.name}</span>
              <div style={{ marginLeft : 70, marginRight :70, marginTop:30}}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div style={{
                        padding: 4,
                        width: 280,
                        minHeight:'300px'
                      }}{...provided.droppableProps} ref={provided.innerRef}> 
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}  
                                  style={{
                                    userSelect: "none",
                                    padding: 2,
                                    margin: "0 0 12px 0",
                                    minHeight: "130px",  
                                    ...provided.draggableProps.style
                                  }}
                                  onClick={() => this.showDetail(item.id)}>
                                    <Card.Body>
                                        <div className ="one-line">
                                            <Card.Title className = "todo-title">{item.title}</Card.Title>
                                            <span className = "todo-dday">{item.d_day}</span>
                                        </div>
                                        <div className ="participants">
                                            {
                                                item.participants.map((member)=> {
                                                    return (
                                                        <Card.Text key={member.user_id} className ="participant">{member.name}</Card.Text>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Card.Body>
                                  </Card>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>  
      { this.state.showTodoDetail === true
        ? <Read detail={this.state.todoDetail} handleClose={this.modalClose} handleLoding={this.loadingTodos}/> 
        : null
      }
    </div>
        );
    }
}
    

export default List;