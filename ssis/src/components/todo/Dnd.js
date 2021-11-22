import axios from "axios";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/todo/list.css';

function Dnd(props) {
  const [columns, setColumns] = useState({
    "0": {
      name: "시작2전",
      items: props.state0,
      state : 0
    },
    "1": {
      name: "진행중",
      items: props.state1,
      state : 1
    },
    "2": {
      name: "완료",
      items: props.state2,
      state : 2
    }
  });

  const onDragEnd = (result, columns, setColumns) => {
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

      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } 
    else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };
  
  const titleClassName = ['p1', 'p2', 'p3']
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
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
                                  }}>
                                    <Card.Body>
                                        <div className ="one-line">
                                            <Card.Title className = "todo-title">{item.title}</Card.Title>
                                            <span className = "todo-dday">{item.d_day}</span>
                                        </div>
                                        <div className ="participants">
                                            {
                                                item.participants.map((member)=> {
                                                    return (
                                                        <Card.Text key={member} className ="participant">{member}</Card.Text>
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
  );
}

export default Dnd;
