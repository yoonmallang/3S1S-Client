import React, { Component } from 'react';
import axios from "axios";
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/comment/list.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments : [],
            content : "",
            modifiedComment: "",
            modifyCommentId : ""
        }
    }

    loadingComments = async () => { 
        try { 
            const res = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/comments", {
                params: {
                    todo : this.props.todoId
                }
            });
            this.setState({ comments: res.data.comments });
            console.log(this.state.comments)
        } catch (e) { 
            console.log(e); 
        }
    }

    writeComment = () => {
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/comments", {
            todo: this.props.todoId,
            writer : sessionStorage.getItem("id"),
            content: this.state.content,
        }).then((res) => {
            console.log(res)
            this.loadingComments();
            this.setState({ content : ""})
            document.getElementById("cm-textarea").value ='';
        }).catch((err) => {
            console.log(err);
        })
    }

    modifyButton = (commentId) => {
        this.setState({ modifyCommentId: commentId });
    }

    modfiedIdClear = () => {
        this.setState({ modifiedComment: "", modifyCommentId: ""});
    }

    modifyComment = (commentId) => {
        axios.put(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/comments/${commentId}`, {
            content : this.state.modifiedComment
        }).then((res) => {
            console.log(res)
            this.modfiedIdClear();
            this.loadingComments(); 
        }).catch((err) => {
            console.log(err);
        })
    }

    deleteComment = (commentId) => {
        axios.delete(`http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/comments/${commentId}`)
        .then((res) => {
            console.log(res)
            this.loadingComments(); 
        }).catch((err) => {
            console.log(err);
        })
    }

    commentChange = (e) => {this.setState({content: e.target.value})};
    modifiedCommentChange = (e) => {this.setState({modifiedComment : e.target.value})};

    componentDidMount() { 
        const { loadingComments } = this; 
        loadingComments(); 
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Control id="cm-textarea" style={{fontSize:"12px"}}as="textarea" rows={3} placeholder="댓글을 입력하세요." onChange={this.commentChange}/>
                </Form>
                <button type="submit" className="comment-add-button" onClick={this.writeComment}>
                    댓글 작성
                </button>
                <br/>
                <br/>
                {this.state.comments.map((item) => {
                    if(this.state.modifyCommentId === item.id) {
                            return (
                                <div className="comments">
                                    <div>
                                        <span className="cm-left">{item.writer_name}</span>
                                        <span className="cm-right">{item.create_at}</span>
                                    </div>
                                    <br/>
                                    <Form>
                                        <Form.Control id="cm-textarea" style={{fontSize:"12px"}}as="textarea" rows={3} defaultValue={item.content} onChange={this.modifiedCommentChange}/>
                                    </Form>
                                    
                                    <button  style={{display:'inline-block'}} type="submit" className="comment-add-button"onClick={()=>this.modifyComment(item.id)}>
                                        댓글 수정
                                    </button>
                                </div>
                            )
                        }
                    else {
                        return (
                            <div className="comments">
                                
                                <div className="cm-left">{item.writer_name}</div>
                                <div className="cm-right">
                                    <span>{item.create_at}</span>
                                    {
                                        sessionStorage.getItem("id") === item.writer_id
                                        ?   <>
                                                <button style={{marginLeft:'10px'}} type="button" className="cm-cancel-button" onClick={()=>this.deleteComment(item.id)}>
                                                    <img alt="" src="/img/cancel.png" className="img-cancel"/>
                                                </button>
                                                <button style={{marginLeft:'5px'}} type="button" onClick={()=>this.modifyButton(item.id)} className="cm-cancel-button">
                                                    <img alt="" src="/img/pencil.png" className="img-cancel"/>
                                                </button>
                                            </>
                                        : null
                                    }
                                           
                                </div>
                                <br/>
                            
                                <div style={{marginTop:'5px'}}>
                                    {
                                        item.content.split("\n").map(line => {
                                            return (<span className="cm-content">{line}<br/></span>)
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                    })}
            </div>
        );
    }
}

export default List;