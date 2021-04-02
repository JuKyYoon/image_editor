import React, { Component } from 'react';
import i18next from "../../locale/i18n";
import { withTranslation } from "react-i18next";
import '../../css/ui/Object.scss';
import { ObjectIcon } from '../const/consts';

export default withTranslation()(class Objects extends Component {
  // constructor(props){
  //   super(props);
  // }

  componentDidMount() {
    // console.log('Object UI Mount');
    this.documentUpdate();
  }
  componentDidUpdate() {
    // console.log('Object UI Update');
    this.documentUpdate();
  }
  componentWillUnmount() {
    // console.log('Object UI Unmount');
  }

  documentUpdate = () => {
    document.getElementById("lockScale").checked = this.props.getLockScale();
  }

  handleScaleXChange = (event) => {
    this.props.scaleXChange(event.target.value);
  }

  handleScaleYChange = (event) => {
    this.props.scaleYChange(event.target.value);
  }

  flipObject = (event) => {
    let option = event.target.getAttribute('flip');
    this.props.flipObject(option);
  }

  render() {
    return (
      <div className="sub">
        <div className="sub-title">
          {i18next.t('ui/object.Object')} ( {this.props.object.type} )
        </div>
        <div className="sub-objmenu">
          <div className="option-title"> {i18next.t('ui/object.Order')}</div>
          <div className="obj-order">
            <svg onClick={this.props.bringToFront} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d={ObjectIcon.bringToFront}/>
            </svg>
            <svg onClick={this.props.sendToBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d={ObjectIcon.sendToBack}/>
            </svg>
            <svg onClick={this.props.bringForward} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d={ObjectIcon.bringForward}/>
            </svg>
            <svg onClick={this.props.sendBackwards} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d={ObjectIcon.sendBackwards}/>
            </svg>
          </div>
          <div className="flip-delete">
            <div className="obj-flip">
              <div className="option-title">{i18next.t('ui/object.Flip')}</div>
              <div className="flip-button">
                <svg onClick={this.flipObject} flip="X" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                  <path flip="X" d={ObjectIcon.flipX} overflow="visible" fontFamily="Bitstream Vera Sans" />
                </svg>
                <svg onClick={this.flipObject} flip="Y" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                  <path flip="Y" d={ObjectIcon.flipY} overflow="visible" fontFamily="Bitstream Vera Sans" />
                </svg>
              </div>
            </div>
            <div className="obj-delete">
              <div className="option-title">{i18next.t('ui/object.Delete')}</div>
              <div className="delete-button">
                <svg onClick={this.props.deleteObject} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <path d={ObjectIcon.deleteObject}/>
                </svg>
                <svg onClick={this.props.deleteAllObject} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <path d={ObjectIcon.deleteAllObject}/>
                </svg>
              </div>
            </div>
          </div>
          <div className="option-title">{i18next.t('ui/object.Group')}</div>
          <div className="obj-group">
            <svg onClick={this.props.makeGroup} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d={ObjectIcon.makeGroup}/>
            </svg>
            <svg onClick={this.props.unGroup} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d={ObjectIcon.unGroup}/>
            </svg>
          </div>
          <div className="option-title">{i18next.t('ui/object.Change Scale')}</div>
          <div className="obj-zoom">
            <div className="zoom-box">
              <div className="keep-ratio">
                <label className="mycheckbox path">
                  <input type="checkbox" id="lockScale" onClick={this.props.lockScaleRatio} disabled={this.props.object.type === 'not active' || this.props.object.type === 'path' ? true : false} />
                  <svg viewBox="0 0 21 21">
                    <path d={ObjectIcon.checkbox}></path>
                  </svg>
                </label>
                <div>{i18next.t('ui/object.Lock Ratio')}</div>
              </div>
              <input
                type='range'
                name='scaleX'
                min='1'
                max='200'
                step='1'
                disabled={this.props.object.type === 'not active' || this.props.object.type === 'path' ? true : false}
                value={this.props.object.scaleX * 100}
                onChange={this.handleScaleXChange}
              />
              <label>{this.props.object.scaleX * 100}%</label>
              <input
                type='range'
                name='scaleY'
                min='1'
                max='200'
                step='1'
                disabled={this.props.object.type === 'not active' || this.props.object.type === 'path' ? true : false}
                value={this.props.object.scaleY * 100}
                onChange={this.handleScaleYChange}
              />
              <label>{this.props.object.scaleY * 100}%</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
})