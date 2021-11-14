import React, { Component } from 'react';
import '../../css/project/project.css';
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
                    id : "kdsvip5",
                }
            });
            this.setState({projects: response.data.project_list})
            
            console.log(`STATUS : ${response.status}`)
            console.log(this.state)
        } catch (e) 
        { console.log(e); }
    };

    componentDidMount(){
        const {loadingData} = this;
        loadingData();
    }
    
    render() {
        const projects = this.state.projects
        
        let project_list = projects && projects.map(project =>
        <button className = "ProjectBox" id = {project.id}>
            <div className = "Title">
                {project.title}
            </div>
            <button type="button" className="btm" id="img_btn"><img src="img/pencil.png" alt ="" className="btm_image" ></img></button>
            <button type="button" className="btm" id="img_btn"><img src="img/cancel.png" alt ="" className="btm_image" ></img></button>
            <div className = "ImgTeam">
                <div className = "Image">
                    <img src = {project.img_url} className = "Img" alt = "" onError={(e)=>{e.target.onerror = null; e.target.src="img/group.png"}}></img>
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
        </button>
        ); 

        
        return (
            <div className = "Project">
                <div className = "ProjectContent">
                    {project_list}   
                    <div className = "AddProject">
                    <Create/>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;