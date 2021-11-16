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
        
        let project_list = projects && projects.map(project =>
        <button className = "ProjectBox_pl" id = {project.id}>
            <div className = "Title_pl">
                {project.title}
            </div>
            <button type="button" className="btm_pl" id="img_btn"><img src="img/pencil.png" alt ="" className="btm_image_pl" ></img></button>
            <button type="button" className="btm_pl" id="img_btn"><img src="img/cancel.png" alt ="" className="btm_image_pl" ></img></button>
            <div className = "ImgTeam_pl">
                <div className = "Image_pl">
                    <img src = {project.img_url} className = "Img_pl" alt = "" onError={(e)=>{e.target.onerror = null; e.target.src="img/group.png"}}></img>
                </div>
                <div className = "TeamBox_pl">
                    <div className = "Team_pl">
                        {project.team}
                    </div>
                    <div className="Progress_pl">
                        <progress value="22" max="100" className="ProgressBar_pl"></progress>
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