import React, { Component } from 'react';
import '../../css/project/read.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import Update from "./Update.js"
import Search from "./Search.js"

class Read extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isModalOpen: false,
          show: false,
          setShow: false,
          projectID: "",
          project:[],
          member:[],
          notification_p:[],
          notification_i:[],
          leader: "",
        };
      }

      openModal = () => {
        this.setState({ setShow: true , show: true});
        console.log(this.setShow);
        console.log(this.show);
        
      };
    
      closeModal = () => {
        this.setState({ setShow: false });
      };

      loadingData = async () => { 
        try { 
            const {id} = this.props.match.params;
            const response = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects/${id}`);            
            this.setState({project: response.data.project_content})
        } catch (e) 
        { console.log(e); }
      };

      loadingMember = async () => { 
        try { 
            const id = this.props.match.params;
            console.log(id.id) 
            const response = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/members", {
                params:{
                    project : id.id,
                }
            });         
            this.setState({member: response.data.members})
            console.log(this.state.member)
        } catch (e) 
        { console.log(e); }
      };

      loadingNotification_p = async () => { 
        try { 
            const id = this.props.match.params;
            console.log(id.id) 
            const response = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects/${id.id}/indeadline`);
            console.log(response)
            this.setState({notification_p: response.data.todo_list})
            console.log(this.state.member)
        } catch (e) 
        { console.log(e); }
      };

      loadingNotification_i = async () => { 
        try { 
            const id = this.props.match.params;
            console.log(id.id) 
            const response = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects/${id.id}/mytodos`, {
                params:{
                    user : window.localStorage.getItem("id"),
                }
            });
            console.log(response)
            this.setState({notification_i: response.data.todo_list})
            console.log(this.state.member)
        } catch (e) 
        { console.log(e); }
      };
    
    componentDidMount(){ //한번만 실행
        const {loadingData, loadingMember, loadingNotification_p, loadingNotification_i} = this;
        loadingData();
        loadingMember();
        loadingNotification_p();
        loadingNotification_i();
        console.log("진짜?")
        console.log(window.localStorage.getItem("id"))
        console.log(this.state.member)
    }

    render() {
        localStorage.setItem("description", this.state.project.description)
        let description = localStorage.getItem("description")
        localStorage.removeItem("description")
           
        let member_list = this.state.member && this.state.member.map(member =>{
            if(member.leader === 1)
            return <div className="Memberlist_pr">
                    <span className = "MemberSpan">{member.user_id} <img src = "/img/crown.png" className = "LeaderCrown"></img></span>
                </div>
            else
            return <div className="Memberlist_pr">
                    <span className = "MemberSpan">{member.user_id}</span>
                    
                </div>
                }   
            ); 

        let contribution_list = this.state.member && this.state.member.map(member =>{
            return <div className="MemberContribution">
                    <span className = "ContributionSpan1">{member.user_id}</span>
                    <span className = "ContributionSpan2">{member.contribution_rate}%</span>
            </div>
                }   
            ); 

        let notification_list_p = this.state.notification_p && this.state.notification_p.map(notification =>{
            return <div className="MemberContribution">
                    <span className = "ContributionSpan1">{notification.title}</span>
                    <span className = "ContributionSpan2">{notification.d_day}</span>
            </div>
                }   
            ); 

        let notification_list_i = this.state.notification_i && this.state.notification_i.map(notification =>{
            return <div className="MemberContribution">
                    <span className = "ContributionSpan1">{notification.title}</span>
                    <span className = "ContributionSpan2">{notification.d_day}</span>
            </div>
                }   
            ); 

        return (
            <div className= "Outer_pr">
                <div className = "Read_pr">
                    <div className = "LeftContent_pr">
                        <div className = "ProjectInfo_pr">
                            <div className = "P_Title">
                                {this.state.project.title}
                            </div>
                            <Update id={this.props.match.params}/>
                            <div className = "P_ImgTeam">
                                <img src = "/img/group.png" className = "P_Img" alt = "팀 사진"></img>
                                <p className = "P_teamName">{this.state.project.team}</p>
                            </div>
                            <div className = "P_contentBox">
                                <p className = "P_content"><b><big className="Big">프로젝트 개요</big></b></p>
                                <p className = "P_content1">
                                    {
                                description.split("\n").map(line => {
                                    return (<span>{line}<br/></span>)
                                })
                                }
                                </p>
                            </div>
                            <div className = "P_contentBox1">
                                <p className = "P_content"><b><big className="Big">과목</big></b></p>
                                <p className = "P_content2">{this.state.project.subject}</p>
                            </div>
                            <div className = "P_contentBox1">
                                <p className = "P_content"><b><big className="Big">목적</big></b></p>
                                <p className = "P_content2">{this.state.project.purpose}</p>
                            </div>
                        </div>
                        <div className = "TeamList_pr">
                            <p className = "P_contentName"><b><big className="Big">팀원 리스트</big></b></p>
                            <Search/>
                            {member_list}
                        </div>
                    </div>
                    <div className = "CenterContent_pr">
                        <div className = "Progress_bar_pr">
                            <p className = "P_contentName"><b><big className="Big">진행률</big></b></p>
                            <p className = "P_progressRate"><b><big>{this.state.project.progress_rate}%</big></b></p>
                            <progress value={this.state.project.progress_rate} max="100" className="ProgressBar_pr"></progress>
                        </div>
                        <div className = "Contribution_pr">
                            <p className = "P_contentName"><b><big className="Big">멤버별 기여</big></b></p>
                            {contribution_list}
                        </div>
                        <div className = "Memo_pr">
                            
                        </div>
                    </div>
                    <div className = "RightContent_pr">
                        <div className = "Alarm">
                            <p className = "P_contentName"><b><big className="Big">프로젝트 알림</big></b></p>
                            <p className = "AlertNum"><b><big>{this.state.notification_p.length}</big></b></p>
                            {notification_list_p}
                        </div>
                        <div className = "MyToDo">
                            <p className = "P_contentName"><b><big className="Big">내 할 일 보기</big></b></p>
                            <p className = "AlertNum"><b><big>{this.state.notification_i.length}</big></b></p>
                            {notification_list_i}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Read;