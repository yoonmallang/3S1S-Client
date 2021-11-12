import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';

import Navbar from './components/navi/Navibar';
import findIdPwd from './components/login/FindIdPwd'
import login from './components/login/Login'
import register from './components/login/Register';

import pwdUpdate from './components/mypage/PwdUpdate';
import mypageRead from './components/mypage/Read'
import mypageUpdate from './components/mypage/Update'

import calendarList from './components/calendar/List'
import documentList from './components/document/List'
import documentRead from './components/document/Read'
import projectList from './components/project/List'
import projectRead from './components/project/Read'
import todoList from './components/todo/List'
import todoRead from './components/todo/Read'

class  App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
            <Switch>
              <Route exact path="/" component={login}/>
              <Route exact path="/register" component={register}/>
              <Route exact path="/findIdPwd" component={findIdPwd}/>

              <Route exact path="/mypage/:id?" component={mypageRead}/>
              <Route exact path="/mypage/update/:id?" component={mypageUpdate}/>
              <Route exact path="/mypage/pwdUpdate/:id?" component={pwdUpdate}/>
              
              <Route exact path="/calendar" component={calendarList}/>
              <Route exact path="/project" component={projectList}/>
              <Route exact path="/project/:id?" component={projectRead}/>
              <Route exact path="/todo" component={todoList}/>
              <Route exact path="/todo/:id?" component={todoRead}/>
              <Route exact path="/document" component={documentList}/>
              <Route exact path="/document/:id?" component={documentRead}/>
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
