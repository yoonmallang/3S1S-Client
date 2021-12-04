import React, { Component } from 'react';
import '../../css/project/list.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import Create from "./Create.js"

class List extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
        }
    }

    loadingData = async () => { 
        try { 
            const response = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects", {
                params:{
                    id : sessionStorage.getItem("id"),
                }
            });
            this.setState({projects: response.data.project_list})
            
            console.log(`STATUS : ${response.status}`)
            console.log(this.state)
        } catch (e) 
        { console.log(e); }
    };

    componentDidMount(){ //한번만 실행
        const {loadingData} = this;
        loadingData();
    }
    
    render() { //계속 업데이트
        const projects = this.state.projects
        console.log(this.state.projects)

        function confirmModal(id) {
            if (window.confirm("프로젝트를 삭제하시겠습니까?")) {
              deleteProject(id);
            } else {
              console.log("취소. 변화 없음");
            }
          }

        function clickProject(id) {
            console.log('You clicked project.');
            window.location.href = "/project/" + id;
        }

        function deleteProject(id) {
            console.log('You clicked delete.');
            console.log(sessionStorage.getItem("id"))
            try { 
                axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/members/delete",{
                    "project": id,
                    "user": sessionStorage.getItem("id")
                })
                .then((res) => {
                    console.log("res.data");
                    console.log(res.data);
                    if (res.status === 210) {
                        alert(res.data.message);
                    }
                    else if(res.status === 210) {
                        alert("200왔어요");
                    }
                });
                window.location.replace("/project")
            } catch (e) 
            { console.log(e); }
        }
        
        let project_list = projects && projects.map(project =>
        <div className = "ProjectBox_pl" id = {project.id}  key = {project.id}>
            <button type="button" className="btm_pl" id="img_btn" onClick={()=>confirmModal(project.id)}><img src="/img/cancel.png" alt ="" className="btm_image_pl" ></img></button>
            <button onClick={()=>clickProject(project.id)} className= "ProjectButton">
                <div className = "Title_pl">
                    {project.title}
                </div>
                <div className = "ImgTeam_pl">
                    <div className = "Image_pl">
                        <img src = {project.img_url} className = "Img_pl" alt = "" onError={(e)=>{e.target.onerror = null; e.target.src="/img/teamwork.png"}}></img>
                    </div>
                    <div className = "TeamBox_pl">
                        <div className = "Team_pl">
                            {project.team}
                        </div>
                        <div className="Progress_pl">
                            <progress value={project.progress_rate} max="100" className="ProgressBar_pl"></progress>
                        </div>
                    </div>
                </div>
            </button>  
        </div>
        ); 

        
        return (
            <div className = "Project_pl">
                <div className = "ProjectContent_pl">
                    <p className = "P_contentName_Title"><b><big className="Big">내 프로젝트</big></b></p>       
                    {project_list}   
                    <div className = "AddProject_pl">
                    <Create/>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;