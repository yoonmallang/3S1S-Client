import React, { Component } from 'react';
import { Dropdown} from 'react-bootstrap';
import '../../css/project/read.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import Update from "./Update.js"
import Search from "./Search.js"
import Middlebar from '../navi/Middlebar'

class Read extends Component {
    constructor(props) {
        super(props);
        this.state = {
          myID: sessionStorage.getItem("id"),
          isModalOpen: false,
          show: false,
          setShow: false,
          projectID: this.props.match.params,
          project:[],
          member:[],
          notification_p:[],
          notification_i:[],
          leader: "kdsvip123",
          delMember: "",
          memo: "",
          showMenu: false,

        };
      }

      openModal = () => {
        this.setState({ setShow: true , show: true});
        
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
            const response = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/members", {
                params:{
                    project : id.id,
                }
            });         
            this.setState({member: response.data.members})
        } catch (e) 
        { console.log(e); }
      };

      loadingNotification_p = async () => { 
        try { 
            const id = this.props.match.params;
            const response = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects/${id.id}/indeadline`);
            this.setState({notification_p: response.data.todo_list})
        } catch (e) 
        { console.log(e); }
      };

      loadingNotification_i = async () => { 
        try { 
            const id = this.props.match.params;
            const response = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects/${id.id}/mytodos`, {
                params:{
                    user : sessionStorage.getItem("id"),
                }
            });
            this.setState({notification_i: response.data.todo_list})
        } catch (e) 
        { console.log(e); }
      };

      memoChange = (e) => {this.setState({memo: e.target.value})};

      onClickMemoSubmit = () => {
        const id = this.props.match.params.id;
        console.log("memo")
        console.log(`${id}`)
        axios.put(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects/${id}`, {
            memo: this.state.memo,
        }).then((res) => {
            console.log(res.data);
            if (res.status === 201) {
                document.location.href = "/project";
            }
            else if (res.status === 210) {
                alert(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
        })
      }

      getmemo = async () => { 
        try { 
            const id = this.props.match.params.id;
            const response = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects/${id}/memo`);         
            this.setState({memo: response.data.item})
        } catch (e) 
        { console.log(e); }
      };

      authLeader = () => {
        const id = this.props.match.params.id;
        axios.put(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/members/authleader`, {
            project: id,
            leader: this.state.leader,
        }).then((res) => {
            console.log(res.data);
            if (res.status === 200) {
                document.location.href = `/project/${id}`;
            }
            else if (res.status === 210) {
                alert(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
        })
      }

      deleteMember = () => {
        const id = this.props.match.params.id;
        axios.post(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/members/delete`, {
            project: id,
            user: this.state.delMember,
        }).then((res) => {
            console.log(res.data);
            if (res.status === 200) {
                document.location.href = `/project/${id}`;
            }
            else if (res.status === 210) {
                alert(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
        })
      }

      confirmAuthModal() {
        if (window.confirm("해당 팀원에게 팀장을 위임하시겠습니까?")) {
          this.authLeader();
        } else {
          console.log("취소. 변화 없음");
        }
      }

      confirmDeleteModal() {
        if (window.confirm("해당 팀원을 방출하시겠습니까?")) {
          this.deleteMember();
        } else {
          console.log("취소. 변화 없음");
        }
      }
    
    componentDidMount(){ //한번만 실행
        const {loadingData, loadingMember, loadingNotification_p, loadingNotification_i, getmemo} = this;
        loadingData();
        loadingMember();
        loadingNotification_p();
        loadingNotification_i();
        getmemo();
    }

    render() {
        sessionStorage.setItem("description", this.state.project.description)
        let description = sessionStorage.getItem("description")
        sessionStorage.removeItem("description")           
        
        let member_list = this.state.member && this.state.member.map(member =>{
            if(member.leader === 1)
            return <div className="Memberlist_pr">
                    <img src = {member.profile_img} className = "memberImage" alt = "" onError={(e)=>{e.target.onerror = null; e.target.src="/img/blank-person.png"}}></img>
                    <span className = "MemberSpan">
                        {member.name}         
                    </span>
                    <img src = "/img/crown.png" className = "LeaderCrown"/> 
                </div>
            else
            {
                if(this.state.myID == this.state.project.leader){
                    return <div className="Memberlist_pr">
                        <img src = {member.profile_img} className = "memberImage" alt = "" onError={(e)=>{e.target.onerror = null; e.target.src="/img/blank-person.png"}}></img>
                        <span className = "MemberSpan">{member.name}</span>
                        <Dropdown className="MoreButton">
                            <Dropdown.Toggle className="more_dropButton">
                                <div className="more_button">
                                    <img src = "/img/more.png" className = "MemberMore"/>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="more_menu">
                                <Dropdown.Item onClick={async () => {
                                    let a = await this.setState({leader: member.user_id})
                                    this.confirmAuthModal()
                                }
                                }>팀장 위임</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={async () => {
                                    let a = await this.setState({delMember: member.user_id})
                                    this.confirmDeleteModal()
                                }}>팀원 방출</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                }
                else{
                    return <div className="Memberlist_pr">
                    <img src = {member.profile_img} className = "memberImage" alt = "" onError={(e)=>{e.target.onerror = null; e.target.src="/img/blank-person.png"}}></img>
                    <span className = "MemberSpan">{member.name}</span>
                    </div>
                }
                }
                }   
            ); 

        let contribution_list = this.state.member && this.state.member.map(member =>{
            return <div className="MemberContribution">
                        <img src = {member.profile_img} className = "memberImage" alt = "" onError={(e)=>{e.target.onerror = null; e.target.src="/img/blank-person.png"}}></img>
                        <span className = "ContributionSpan1">{member.name}</span>
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
                <Middlebar id={this.props.match.params}/>
                <div className = "Read_pr">
                    <div className = "LeftContent_pr">
                        <div className = "ProjectInfo_pr">
                            <div className = "P_Title">
                                {this.state.project.title}
                            </div>
                            {   
                                this.state.myID === this.state.project.leader
                                ? <Update id={this.props.match.params}/>
                                : null
                            }
                            <div className = "P_ImgTeam">
                                <img src = {this.state.project.img_url} className = "P_Img" alt = "팀 사진" onError={(e)=>{e.target.onerror = null; e.target.src="/img/teamwork.png"}}></img>
                                <p className = "P_teamName">{this.state.project.team}</p>
                            </div>
                            <div className = "P_contentBox">
                                <p className = "P_content"><big className="Big">프로젝트 개요</big></p>
                                <p className = "P_content1">
                                    {
                                description.split("\n").map(line => {
                                    return (<span>{line}<br/></span>)
                                })
                                }
                                </p>
                            </div>
                            <div className = "P_contentBox1">
                                <p className = "P_content"><big className="Big">과목</big></p>
                                <p className = "P_content2">{this.state.project.subject}</p>
                            </div>
                            <div className = "P_contentBox1">
                                <p className = "P_content"><big className="Big">목적</big></p>
                                <p className = "P_content2">{this.state.project.purpose}</p>
                            </div>
                        </div>
                        <div className = "TeamList_pr">
                            <p className = "P_contentName"><big className="Big">팀원 리스트</big></p>
                            {   
                                this.state.myID === this.state.project.leader
                                ? <Search p_id={this.state.projectID}/>
                                : null
                            }
                            <div className = "TeamScroll">
                                {member_list}
                            </div>
                        </div>
                    </div>
                    <div className = "CenterContent_pr">
                        <div className = "Progress_bar_pr">
                            <p className = "P_contentName"><big className="Big">진행률</big></p>
                            <p className = "P_progressRate"><big>{this.state.project.progress_rate}%</big></p>
                            <progress value={this.state.project.progress_rate} max="100" className="ProgressBar_pr"></progress>
                        </div>
                        <div className = "Contribution_pr">
                            <p className = "P_contentName"><big className="Big">멤버별 기여</big></p>
                            <div className = "ContributionScroll">
                                {contribution_list}
                            </div>
                        </div>
                        <div className = "Memo_pr">
                            <p className = "P_contentName"><big className="Big">프로젝트 메모장</big></p>
                            <button className="Memobutton" id="img_btn" onClick={this.onClickMemoSubmit}><img src="/img/check.png" className="P_btm_image_memo" alt = ""></img></button>
                            <textarea type = "text" className = "MemoPage" defaultValue={this.state.memo} onChange={this.memoChange}/>
                        </div>
                    </div>
                    <div className = "RightContent_pr">
                        <div className = "Alarm">
                            <p className = "P_contentName"><big className="Big">프로젝트 알림</big></p>
                            <p className = "AlertNum"><b><big>{this.state.notification_p.length}</big></b></p>
                            <div className="AlarmScroll">
                                {notification_list_p}
                            </div>
                        </div>
                        <div className = "MyToDo">
                            <p className = "P_contentName"><big className="Big">내 할 일 보기</big></p>
                            <p className = "AlertNum"><b><big>{this.state.notification_i.length}</big></b></p>
                            <div className="MyToDoScroll">
                                {notification_list_i}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Read;