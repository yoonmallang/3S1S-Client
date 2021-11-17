import React, { Component } from 'react';
import '../../css/project/read.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 

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
            this.setState({project: response.data.Project_content})
        } catch (e) 
        { console.log(e); }
      };

      loadingMember = async () => { 
        try { 
            const id = this.props.match.params;
             
            console.log(id) 
            const response = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/members", {
                params:{
                    project : id.id,
                }
            });       
            console.log("hi")  
            console.log(id.id)   
            this.setState({member: response.data.data})
            console.log(this.state.member)
        } catch (e) 
        { console.log(e); }
      };

    
    componentDidMount(){ //한번만 실행
        const {loadingData,loadingMember} = this;
        loadingData();
        loadingMember();
        console.log("진짜?")
        console.log(this.state.member)
    }

    render() {
        let t_list = [
            {
                "id": 1,
                "title": "asdf",
                "team": "!23",
                "description": "!234",
                "subject": "1234",
                "purpose": "1234",
                "progress_rate": null
            }
        ]
           
        let member_list = this.state.member && this.state.member.map(member =>
            <div className="Memberlist_pr">
                {member.user_id}
            </div>
            ); 


        return (
            <div className= "Outer_pr">
                <div className = "Read_pr">
                    <div className = "LeftContent_pr">
                        <div className = "ProjectInfo_pr">
                            <div className = "P_Title">
                                {this.state.project.title}
                            </div>
                            <button type="button" className="P_btm" id="img_btn"><img src="/img/pencil.png" className="P_btm_image" alt = ""></img></button>
                            <div className = "P_ImgTeam">
                                <img src = "/img/group.png" className = "P_Img"></img>
                                <p className = "P_teamName">{this.state.project.team}</p>
                            </div>
                            <div className = "P_contentBox">
                                <p className = "P_content"><b><big className="Big">프로젝트 개요</big></b></p>
                                <p className = "P_content1">{this.state.project.description}</p>
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
                            <div className = "TeamList_pr1">
                                <span className="TeamList_pr2">팀원 리스트</span>
                                {member_list}
                            </div>
                        </div>
                    </div>
                    <div className = "CenterContent_pr">
                        <div className = "Progress_bar_pr">
                            hi
                        </div>
                        <div className = "Contribution_pr">
                            hello
                        </div>
                        <div className = "Memo_pr">
                            buy
                        </div>
                    </div>
                    <div className = "RightContent_pr">
                        <div className = "Alarm">
                            hi
                        </div>
                        <div className = "MyToDo">
                            hi
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Read;