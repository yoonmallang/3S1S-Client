import React, { Component } from 'react';
import Middlebar from '../navi/Middlebar'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../css/calendar/list.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'moment';
import Update from "./Update.js"
import Create from "./Create.js"
import axios from 'axios'; 

class List extends Component {
    constructor() {
        super();
        this.state = {
            show : false,
            creator : sessionStorage.getItem("id"),
            projectID: "",
            events : [],
            lists : [],
            flag : [0],
            eventID : "",
            eventWriter : "",
            eventInfo: [],
            isWriter: "",
        }
    }

    loadingData = async () => { 
      try { 
        let a = await this.setState({projectID: this.props.match.params.id})
          console.log(this.props.match.params.id)
          console.log(this.state.projectID)
          const response = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/schedules`,{
            params:{
              project : this.state.projectID
            }
          });            
          console.log(response.data.schedule_list)
          this.setState({events: response.data.schedule_list})
      } catch (e) 
      { console.log(e); }
    };

    loadingList = async () => { 
      try { 
        let a = await this.setState({projectID: this.props.match.params.id})
          console.log(this.props.match.params.id)
          console.log(this.state.projectID)
          const response = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/schedules`,{
            params:{
              project : this.state.projectID,
              type : "list"
            }
          });            
          console.log(response.data.schedule_list)
          this.setState({lists: response.data.schedule_list})
      } catch (e) 
      { console.log(e); }
    };

    confirmModal(id) {
      if (window.confirm("프로젝트를 삭제하시겠습니까?")) {
        this.deleteProject(id);
      } else {
        console.log("취소. 변화 없음");
      }
    }

    deleteProject(id) {
      console.log('You clicked delete.');
      try { 
          axios.delete("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/schedules/" + id);
          window.location.replace(`/project/${this.state.projectID}/calendar`)
      } catch (e) 
      { console.log(e); }
  }

    closeInfo = () => {
      this.setState({flag: [0]})
    };

    componentDidMount() {
      const {loadingData, loadingList} = this;
        loadingData();
        loadingList();
      }

    render() {

        console.log("lists")
        console.log(this.state.lists)
        let calendar_list = this.state.lists && this.state.lists.map(event =>{
              if(this.state.flag[0] === 0){
                if(event.is_end == true)
                {
                  if(event.start_date===event.end_date){
                    return <div className="CalendarEvent">
                    <p className = "EventSpan1_1"> {Moment(event.start_date).format('MM/D')}</p>
                    <p className = "EventSpan2">{event.title}</p>
                    </div>
                  }
                  else{
                    return <div className="CalendarEvent">
                          <p className = "EventSpan1_2"> {Moment(event.start_date).format('MM/D')}~{Moment(event.end_date).format('MM/D')} </p>
                          <p className = "EventSpan2">{event.title}</p>
                  </div>
                  }
                }
              }
              else{
                  if(this.state.eventID == event.id){
                    return <p className="EventSpecific">
                    <span className="EventInfoTitle">제목</span>
                    <span className="EventInfoContent">{event.title}</span>
                    <span className="EventInfoTitle">시작 일자</span>
                    <span className="EventInfoContent">{Moment(event.start_date).format('YYYY/MM/D')}</span>
                    <span className="EventInfoTitle">종료 일자</span>
                    <span className="EventInfoContent">{Moment(event.end_date).format('YYYY/MM/D')}</span>
                    <span className="EventInfoTitle2">내용</span>
                    <span className="EventInfoContent2">
                          {event.description.split("\n").map(line => {
                                    return (<span>{line}<br/></span>)
                              })
                          }</span>
                    </p>
                  }
              }
              }   
          ); 

          let content_title = this.state.flag.map(flag =>{
            if(this.state.flag[0] === 0){
              return <div className = "RightButton_cl">
                    <span className = "C_content"><b><big><big className="Big" id="event_title_right">일정 목록</big></big></b></span>
                    <Create p_id={this.state.projectID}/>
                  </div>
                  }
            else{
              if(this.state.creator == this.state.eventWriter){
                return <div className = "RightButton_cl">
                <span className = "C_content"><b><big><big className="Big" id="event_title_right">일정 세부 내용</big></big></b></span>
                <button type="button" className="P_btm" id="img_btn" onClick={this.closeInfo}><img src="/img/cancel.png" className="P_btm_image" alt = ""></img></button>
                <button type="button" className="P_btm" id="img_btn" onClick={()=>this.confirmModal(this.state.eventID)}><img src="/img/delete.png" className="C_btm_image" alt = ""></img></button>
                <Update id={this.state.eventID} p_id={this.state.projectID}/>
                </div>
              }
              else{
                return <div className = "RightButton_cl">
                    <span className = "C_content"><b><big><big className="Big" id="event_title_right">일정 세부 내용</big></big></b></span>
                    <button type="button" className="P_btm" id="img_btn" onClick={this.closeInfo}><img src="/img/cancel.png" className="P_btm_image" alt = ""></img></button>
                    </div>
              }
            }
          })
          
        return (
        <div className="Outer_cl">
            <Middlebar id={this.props.match.params}/>
            <div className = "Calendar_cl">
                <div className="LeftContent_cl">
                <div className = "fullCalender">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]} //, timeGridPlugin, interactionPlugin
                    initialView="dayGridMonth"
                      events={this.state.events}
                      eventColor="#7a9acc"
                      nowIndicator
                      dateClick={(e) => console.log(e.dateStr)}
                      eventClick={(e) => {
                        this.setState({flag: [1]})
                        this.setState({eventID: e.event.id})
                        this.setState({eventWriter: e.event._def.extendedProps.writer_id})
                      }}
                />
                </div>
                </div>
                <div className="RightContent_cl">
                  {content_title}
                  <div className="CalendarList">
                    {calendar_list}
                  </div>
                </div>
            </div>
        </div>
        );
    }
}

export default List;