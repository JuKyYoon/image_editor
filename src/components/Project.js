import React, { Component } from 'react';
import {fabric} from 'fabric';
import { Link } from 'react-router-dom';
import i18next from "../locale/i18n";
import { withTranslation } from "react-i18next";
import '../css/Project.scss';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      projects : [],
    }
    this.canvas = null;
  }

  componentDidMount(){
    this.initCanvas();
  }

  getProjects = () => {
    if(this.props.id === '') { return; }
    fetch('/content/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id : this.props.id, count : 10})
    })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      if(data.success){
        this.setState({projects : data.result});
      }
      else{
        alert(i18next.t('Project.Error'));
      }
    })
    .catch(() => {
      alert(i18next.t('Project.Error'));
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.getProjects();
  }

  handleSearchChange = (event) => {
    let change_state = {};
    change_state[event.target.name] = event.target.value;
    this.setState(change_state);
  }

  initCanvas = () => {
    this.canvas = new fabric.Canvas('c');
    this.getProjects();
  }

  fromJsontoPng = (json, idx) => {
    this.canvas.loadFromJSON(json, () => {
      // this.canvas.renderAll();
      // console.log(idx , document.getElementById(idx))
      // console.log(this.canvas.backgroundImage); // 밖에다 두면 backgrounImage를 null로 인식함... 이유? 콜백함수라서 img 태그가 다 load되고 나서 불러와지기 때문
      if(document.getElementById(idx)){
        document.getElementById(idx).src = this.canvas.toDataURL({format : 'png'});
      }
    })
    return this.canvas.toDataURL({format : 'png'});
  }

  showProjects = () => {
    if(this.props.login){
      let listitem = null;
      if(this.state.projects.length > 0) {
        listitem = this.state.projects.map((prj) =>
          <div className="project-div" key={prj.idx}>
            <div className="project-img">
              <Link 
              to={{
                pathname: '/edit',
                save : true,
                project_data : prj.project_data,
                project_idx : prj.idx,
                state: {
                  width: 500,
                  height: 400,
                }
              }}><img className="project-thumb" id={prj.idx} src = {this.fromJsontoPng(prj.project_data, prj.idx)} width="auto" height="200px" alt="none" onClick = {this.openProject}/>
              </Link>
            </div>
            <div className="project-title">
              <p>{prj.title}</p>
              <button idx= {prj.idx} onClick={this.deleteProject}>X</button>
            </div>
          </div>
        );
      }
      return(
        <div id="project-list">
          {listitem}  
        </div>
      );
    }
    else{
      return(
        <div id="project-list">
          <div className="project-div">
            {i18next.t('Project.PlzSignin')}
          </div>
        </div>
      )
    }
  }

  deleteProject = (event) => {
    if(this.props.id === '') { return; }
    fetch('/content/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id : this.props.id, prj_idx : event.target.getAttribute('idx')})
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if(data.success){
        this.getProjects();
      }
      else{
        alert(i18next.t('Project.Error'));
      }
    })
    .catch(() => {
      alert(i18next.t('Project.Error'));
    })
  }
 
  render() {
    return (
      <div>
        <h2>{i18next.t('Project.Project')}</h2>
        <div className="project-search">
          <div className="project-search-form">
            <form onSubmit={this.handleSubmit}>
              {i18next.t('Project.Title')} <input name="search" value={this.state.search} onChange={this.handleSearchChange} />
              <input type="submit" value="Submit" />
            </form>
          </div>
          {/* <div>
            {this.props.id} {i18next.t('Project.User')}
            <p className="project-search-data">{i18next.t('Project.Search')} : {this.state.search}</p>
          </div> */}
        </div>
        {this.showProjects()}
      </div>
    )
  }
}

export default withTranslation()(Project);