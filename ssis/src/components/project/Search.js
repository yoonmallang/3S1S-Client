import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../css/project/search.css';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            show : false,
            creator : localStorage.getItem("id"),
            project_id : "",
            search_name: "",
            search_list:[],
            member:[],
            selectedParticipants:[],
            results:[],
        }
    }

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

    onClickSubmit = () => {
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/notifications", {
            project: this.state.project_id,
            invitee: this.state.selectedParticipants,
            inviter: this.state.creator,
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

    userChange = async(e) => {
        let a = await this.setState({search_name: e.target.value})
        this.loadingParticipants();         
    };

    handleClose = () => {
        this.setState({show: false});
    };

    handleShow = () => {    
        this.setState({show: true});
    };

    loadingParticipants = async () => { 
        try { 
            const res = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/user/search", {
                params: {
                    user: this.state.search_name,
                }
            });
            this.setState({ search_list: res.data.search_list });
            console.log(this.state.search_list)
        } catch (e) { 
            console.log(e); 
        }
    }

    handleSelect = (e) => {
        if (this.state.selectedParticipants && !this.state.selectedParticipants.includes(e.target.value)) {
            this.setState({
                selectedParticipants : [...this.state.selectedParticipants, e.target.value]
            })
        }
    }

    removeSelect = (id) => {
        const newArr = this.state.seletedParticipants.filter(info => info !== id);
        this.setState({
            seletedParticipants : newArr
        })
    }

    cancelSearch = () => {
        this.setState({search_name : ""})
    };

    componentDidMount() { 
        const { loadingParticipants, loadingMember } = this; 
        loadingParticipants(); 
        loadingMember();
    }

    render() {
        const show = this.state.show
        let select_list2 = ""
      
      if (this.state.selectedParticipants.length!==0)
      {
        select_list2 = this.state.selectedParticipants && this.state.selectedParticipants.map(item=> {
        return <div key={item} className = "Searched_list_div">
                <span className = "Searched_list_span">{item}</span>
                <button onClick={()=>this.removeSelect(item)}  className="Searched_list_button"><img className = "Searched_list_img" alt="" src="/img/cancel.png"/></button>
            </div>
        }
        );
      }
      else
      {
        select_list2 = <div></div>
      }

      console.log("길이")
      console.log(this.state.search_name.length)
      console.log("선택리스트 길이")
      console.log(select_list2)
      console.log(this.select_list2)
      console.log("배열")
      console.log(this.state.seletedParticipants)
      console.log(localStorage.getItem("id"))
      
//{`${this.state.search_name.length > 0 ? "visible" : "hidden" }`}
/* <Form.Select className="participant-form_s" onChange={this.handleSelect}>
{this.state.search_list.map((item)=> {
    return (
        <option className="SearchOption" key={item.id} value={item.id}>{item.id}</option>
    )
})} */
//</Form.Select>
    return (
            <div>
                <button type="button" className="P_btm2" id="img_btn" onClick={this.handleShow}><img src="/img/plus2.png" className="P_btm_image" alt = ""></img></button>
                            
                <Modal show={show} onHide={this.handleClose} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>팀원 추가</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form.Group className="div-form_ps" controlId="formProject">
                        <Form.Label className="text">팀원 초대<span className="spanRed">*</span></Form.Label>
                        <Form.Control className="dataInput-form_pc" placeholder="초대할 팀원의 아이디를 입력하세요." onChange={this.userChange}/>
                        <button onClick={() => this.cancelSearch()}> x </button>
                    </Form.Group> */}
                    <div className="div-form_ps_s">
                        <input className="dataInput-form_pc_s" placeholder="초대할 팀원의 아이디를 입력하세요." onChange={this.userChange} value={this.state.search_name}/>
                    </div>

                    <div className="participant-form_s">
                        {console.log("enter")}
                        {console.log(this.state.search_name)}
                        {console.log(this.state.search_list)}
                        {this.state.search_list.map((item)=> {
                            return (
                                <button className="SearchOption" key={item.id} value={item.id} onClick={this.handleSelect}>{item.id}</button>
                            )
                        })}
                    </div>
  
                    <div className="participantList-form">
                        <p className="text_s"><b>초대할 팀원 리스트</b></p>
                        {select_list2}
                    </div>
   
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        취소
                    </Button>
                    <Button className="create-Button" type="submit" onClick={this.onClickSubmit}>
                        추가
                    </Button>
                </Modal.Footer>
                </Modal>
            </div>
    );
    }
}
  
export default Search;