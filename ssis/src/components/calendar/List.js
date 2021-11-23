import React, { Component } from 'react';
import Middlebar from '../navi/Middlebar'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../css/calendar/list.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 

class List extends Component {
    constructor() {
        super();
        this.state = {
            show : false,
            creator : localStorage.getItem("id"),
            project_id : "",
            events : [],
        }
    }

    

    render() {
        this.state.events = [
            {
              id: 1,
              title: 'event 1',
              start: '2021-06-14T10:00:00',
              end: '2021-06-14T12:00:00',
            },
            {
              id: 2,
              title: 'event 2',
              start: '2021-06-16T13:00:00',
              end: '2021-06-16T18:00:00',
            },
            { id: 3, title: 'event 3', start: '2021-06-17', end: '2021-06-20' },
          ];

        return (
        <div className="Outer_cl">
            <Middlebar id={this.props.match.params}/>
            <div className = "Calendar_cl">
                <div className="LeftContent_cl">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                      center: 'new',
                      }}
                      customButtons={{
                        new: {
                          text: 'new',
                          click: () => console.log('new event'),
                        },
                      }}
                      events={this.state.events}
                      eventColor="red"
                      nowIndicator
                      dateClick={(e) => console.log(e.dateStr)}
                      eventClick={(e) => console.log(e.event.id)}
                />
                </div>
                <div className="RightContent_cl">
                </div>
            </div>
        </div>
        );
    }
}

export default List;