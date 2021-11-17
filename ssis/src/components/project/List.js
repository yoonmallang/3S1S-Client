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
                    id : localStorage.getItem("id"),
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
            try { 
                axios.delete("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/projects/" + id);
            } catch (e) 
            { console.log(e); }
        }
        
        let project_list = projects && projects.map(project =>
        <button className = "ProjectBox_pl" id = {project.id} onClick={()=>clickProject(project.id)} key = {project.id}>
            <div className = "Title_pl">
                {project.title}
            </div>
            <button type="button" className="btm_pl" id="img_btn" onClick={()=>confirmModal(project.id)}><img src="/img/cancel.png" alt ="" className="btm_image_pl" ></img></button>
            <div className = "ImgTeam_pl">
                <div className = "Image_pl">
                    <img src = {project.img_url} className = "Img_pl" alt = "" onError={(e)=>{e.target.onerror = null; e.target.src="/img/group.png"}}></img>
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
        ); 

        
        return (
            <div className = "Project_pl">
                <div className = "ProjectContent_pl">
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