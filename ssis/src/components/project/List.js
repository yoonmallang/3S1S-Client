import React, { Component } from 'react';
import '../../css/project/project.css';
import { Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class List extends Component {
    constructor() {
        super();
        this.state = {
            isLogin : false,
            needMiddleBar : false
        }
    }
    render() {
        return (
            <div className = "Project">
                <div className = "ProjectContent">
                    
                    <div className = "ProjectBox">
                        <div className = "Title">
                            OSS 공모전
                        </div>
                        <button type="button" class="btm" id="img_btn"><img src="img/pencil.png" class="btm_image" ></img></button>
                        <button type="button" class="btm" id="img_btn"><img src="img/cancel.png" class="btm_image" ></img></button>
                        <div className = "ImgTeam">
                            <div className = "Image">
                                <img src = "img/group.png" className = "Img" alt = "img/group.png"></img>
                            </div>
                            <div className = "Team">
                                3s1s
                            </div>
                        </div>
                        <progress value="22" max="100" className="ProgressBar"></progress>
                    </div>
                    <div className = "ProjectBox">
                        <div className = "Title">
                            소공 플젝
                        </div>
                        <button type="button" class="btm" id="img_btn"><img src="img/pencil.png" class="btm_image" ></img></button>
                        <button type="button" class="btm" id="img_btn"><img src="img/cancel.png" class="btm_image" ></img></button>
                        <div className = "ImgTeam">
                            <div className = "Image">
                                <img src = "img/group.png" className = "Img" alt = "img/group.png"></img>
                            </div>
                            <div className = "Team">
                                SSIS
                            </div>
                        </div>
                        <progress value="22" max="100" className="ProgressBar"></progress>
                    </div>
                    <div className = "ProjectBox">
                        <div className = "Title">
                            쏘공 스터디
                        </div>
                        <button type="button" class="btm" id="img_btn"><img src="img/pencil.png" class="btm_image" ></img></button>
                        <button type="button" class="btm" id="img_btn"><img src="img/cancel.png" class="btm_image" ></img></button>
                        <div className = "ImgTeam">
                            <div className = "Image">
                                <img src = "img/group.png" className = "Img" alt = "img/group.png"></img>
                            </div>
                            <div className = "Team">
                                삼성일식
                            </div>
                        </div>
                        <progress value="22" max="100" className="ProgressBar"></progress>
                    </div>
                    <div className = "ProjectBox">
                        <div className = "Title">
                            알고리즘 스터디
                        </div>
                        <button type="button" class="btm" id="img_btn"><img src="img/pencil.png" class="btm_image" ></img></button>
                        <button type="button" class="btm" id="img_btn"><img src="img/cancel.png" class="btm_image" ></img></button>
                        <div className = "ImgTeam">
                            <div className = "Image">
                                <img src = "img/group.png" className = "Img" alt = "img/group.png"></img>
                            </div>
                            <div className = "Team">
                                삼성일식
                            </div>
                        </div>
                        <progress value="22" max="100" className="ProgressBar"></progress>
                    </div>
                        
                        
                    
                    <div className = "AddProject">
                        <button type="button" class="btm_add" id="img_btn"><img src="img/plus.png" class="btm_image" ></img></button>
                        
                    </div>
                    <p>
                    project list
                    </p>
                </div>
            </div>
        );
    }
}

export default List;