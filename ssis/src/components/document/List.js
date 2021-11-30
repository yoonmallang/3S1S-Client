import React, { Component } from 'react';
import Middlebar from '../navi/Middlebar'
import axios from 'axios';
import Create from './Create.js'
import '../../css/document/list.css';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Read from './Read.js'

class List extends Component {
        constructor(props) {
            super(props);
            this.state = {
                project_id : this.props.match.params.id,
                fileDetail : [],
                file : [],
                showFileDetail : false 
            }
        }
    
        loadingFiles = async () => { 
            try { 
                const res = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/files", {
                    params: {
                        project : this.state.project_id
                    }
                });
                this.setState({ file: res.data.file });
            } catch (e) { 
                console.log(e); 
            }
        }

        showDetail = async (fileId) => {
            try {
                const res = await axios.get(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/files/${fileId}`);
                this.setState({fileDetail : res.data.file, showFileDetail : true})
        } catch (e) {
            console.log(e);
            }
        }

        distinguishFiles = (filename) => {
            if (filename.includes('.png') || filename.includes('.jpg')  || filename.includes('.jpeg')) {
                return '/img/imgFile.png'
            }
            else if (filename.includes('.xls') || filename.includes('.xlsx') ) {
                return '/img/excel.png'
            }
            else if (filename.includes('.docx') || filename.includes('.doc')) {
                return '/img/word.png'
            }
            else if (filename.includes('txt')) {
                return '/img/notepad.png'
            }
            else if (filename.includes('.pdf')) {
                return '/img/pdf.png'
            }
            else {
                return '/img/etc.png'
            }
        }

        modalClose = () => {
            this.setState({fileDetail : [], showFileDetail : false})
        }

        componentDidMount() { 
            const { loadingFiles } = this; 
            loadingFiles(); 
        }

        render() {
            return (
                <>
                <Middlebar id={this.props.match.params}/>
                <div className="document-page">
                    <Create id={this.props.match.params}/>
                    <br/>
                    <br/>   
                    {this.state.file.map((item) => {
                            return (
                                <div onClick={() => this.showDetail(item.id)}>
                                    <Card className="fileCard">
                                        <Card.Body>
                                        <img alt="" src={this.distinguishFiles(item.file_name)} className="document-img"></img>
                                        <Card.Title style={{fontSize:'14px'}}>{item.title}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })}
                </div>
                { this.state.showFileDetail === true
                    ? <Read detail={this.state.fileDetail} handleClose={this.modalClose} handleLoding={this.loadingFiles}/> 
                    : null
                }
                </>
            );
    }
}

export default List;