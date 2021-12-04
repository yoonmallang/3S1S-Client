import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../css/project/search.css';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            show : false,
            creator : sessionStorage.getItem("id"),
            project_id : "",
            search_name: "",
            search_list:[],
            check_name:"",
            validity:[],
            member:[],
            selectedParticipants:[],
            results:[],
        }
    }

    onClickSubmit = async () => {
        console.log("추가")
        console.log(this.props.p_id.id)
        console.log(this.state.selectedParticipants)
        console.log(this.state.creator)
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/notifications", {
            project: this.props.p_id.id,
            invitees: this.state.selectedParticipants,
            inviter: this.state.creator,
        }).then((res) => {
            console.log("res.status")
            console.log(res.status);
            if (res.status === 200) {
                alert("초대를 완료하였습니다.")
            }
            else if (res.status === 210) {
                alert(res.data.message);
            }
            this.handleClose()
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
        this.setState({selectedParticipants: []});
        this.setState({search_name: ""});
        this.setState({search_list: []});
    };

    handleShow = () => {    
        this.setState({show: true});
    };

    loadingParticipants = async () => { 
        try { 
            const res = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/users/search", {
                params: {
                    user: this.state.search_name,
                }
            });
            this.setState({ search_list: res.data.search_list });
        } catch (e) { 
            console.log(e); 
        }
    }

    checkValidity = async () => { 
        try { 
            const id = this.props.p_id.id;
            
            const res = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/members/validcheck", {
                params: {
                    project: id, 
                    user: this.state.check_name,
                }
            });
            this.setState({ validity: res.data });
        } catch (e) { 
            console.log(e); 
        }
    }

    handleSelect = async(e) => {
        let b = await this.setState({ check_name: e.target.value });
        let c = await this.checkValidity();
        if (this.state.validity.is_valid === true)
        {
            if (this.state.selectedParticipants && this.state.selectedParticipants.includes(e.target.value)){
                window.alert("이미 초대할 팀원 리스트에 존재합니다.");
            }
            else if (this.state.selectedParticipants && !this.state.selectedParticipants.includes(e.target.value)){
                this.setState({
                    selectedParticipants : [...this.state.selectedParticipants, e.target.value]
                })
            }
        }
        else
        {
            if (this.state.selectedParticipants && this.state.selectedParticipants.includes(e.target.value)){
                window.alert("이미 초대할 팀원 리스트에 존재합니다.");
            }
            else{
            console.log("출력 결과")
            window.alert(this.state.validity.message)
            }
        }
    }

    removeSelect = async (id) => {
        const newArr = await this.state.selectedParticipants.filter(info => info !== id);
        this.setState({
            selectedParticipants : newArr
        })
    }

    cancelSearch = () => {
        this.setState({search_name : ""})
    };

    componentDidMount() { 
        const { loadingParticipants } = this; 
        loadingParticipants(); 
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