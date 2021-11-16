import React, { Component } from 'react';
import '../../css/project/read.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 

class Read extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         projects: [
    //         ],
    //     }
    // }
    constructor(props) {
        super(props);
        this.state = {
          isModalOpen: false,
          show: false,
          setShow: false,
        };
      }

      openModal = () => {
        this.setState({ setShow: true , show: true});
        console.log("hi");
        console.log(this.setShow);
        console.log(this.show);
        
      };
    
      closeModal = () => {
        this.setState({ setShow: false });
      };

    loadingData = async () => { 
        try { 
            const response = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/project"); 
            console.log(`STATUS : ${response.status}`)
            this.setState({ projects: response.data.data, });
            console.log(this.state)
        } catch (e) 
        { console.log(e); }
    };

    
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
        
        let team_list = t_list.map(project =>
        <div className = "ProjectBox" id = {project.id}>
            <div className = "Title">
                {project.title}
            </div>
            <button type="button" className="btm" id="img_btn"><img src="img/pencil.png" className="btm_image" alt = ""></img></button>
            <button type="button" className="btm" id="img_btn"><img src="img/cancel.png" className="btm_image" alt = "" ></img></button>
            <div className = "ImgTeam">
                <div className = "Image">
                    <img src = "img/group.png" className = "Img" alt = "img/group.png"></img>
                </div>
                <div className = "TeamBox">
                    <div className = "Team">
                        {project.team}
                    </div>
                    <div className="Progress">
                        <progress value="22" max="100" className="ProgressBar"></progress>
                    </div>
                </div>
            </div>  
        </div>
        ); 

        
        return (
            <div className = "Read_pr">
                <div className = "LeftContent_pr">
                    <div className = "ProjectInfo_pr">
                        <div className = "P_Title">
                            프로젝트 제목
                        </div>
                        <button type="button" className="P_btm" id="img_btn"><img src="img/pencil.png" className="P_btm_image" alt = ""></img></button>
                        <button type="button" className="P_btm" id="img_btn"><img src="img/cancel.png" className="P_btm_image" alt = ""></img></button>
                        <div className = "P_ImgTeam">
                            <div className = "P_Image">
                                <img src = "img/group.png" className = "P_Img" alt = "img/group.png"></img>
                            </div>
                            <div className = "P_TeamBox">
                                <div className = "P_Team">
                                    팀명
                                </div>
                            </div>
                        </div>
                        <div className = "P_Abstract">프로젝트 개요</div>
                        <div className = "P_Subject">과목</div>
                        <div className = "P_Purpose">목적</div>
                    </div>
                    <div className = "TeamList_pr">
                        <div className = "list">
                            팀원 리스트
                        </div>
                        {team_list}
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
        );
    }
}

export default Read;