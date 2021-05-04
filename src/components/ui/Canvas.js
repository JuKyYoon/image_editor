import React, { Component } from 'react';
import i18next from "../../locale/i18n";
import '../../css/ui/Canvas.scss';
import { withTranslation } from "react-i18next";
import { HEXtoRGBA } from '../helper/ConverRGB';

export default withTranslation()(class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cropCanvasSize: { width: 0, height: 0 },
      displayCropCanvas: false,
      color: {
        r: '255',
        g: '255',
        b: '255',
        a: '1',
      },
      hexcolor : '#ffffff'
    };
  }

  componentDidMount() {
    // console.log('Canvas UI Mount');
    this.canvasUpdate();
  }
  componentDidUpdate() {
    // console.log('Canvas UI Update');
    this.canvasUpdate();
  }
  componentWillUnmount() {
    this.props.cropEndCanvas();
    // console.log('Canvas UI Unmount');
  }

  canvasUpdate = () => {
    document.getElementById("grid-show").checked = this.props.gridOn;
    document.getElementById("grid-snap").checked = this.props.snapOn;
    document.getElementById("object-snap").checked = this.props.objectSnapOn;
  }

  handleChange = (event) => {
    new Promise((resolve) => {
      this.setState({ cropCanvasSize: this.props.setCropCanvasSize(this.state.cropCanvasSize, event.target.name, event.target.value, this.props.object) });
      resolve();
    })
      .then(() => {
        this.props.handleCropCanvasSizeChange(this.state.cropCanvasSize);
      })
  }

  cropCanvas = () => {
    this.setState({displayCropCanvas: true});
    this.props.cropCanvas(this.offdisplayCropCanvas);
  }

  cropEndCanvas = () => {
    this.setState({displayCropCanvas: false});
    this.props.cropEndCanvas(document.getElementById("cropfit").checked);
  }

  offdisplayCropCanvas = () => {
    this.setState({displayCropCanvas: false});
  }

  handleColorChange = (event) => {
    new Promise((resolve) => {
      let color = HEXtoRGBA(event.target.value, this.state.color.a)
      this.setState({ color : color, hexcolor : event.target.value});
      resolve(color);
    })
    .then((color) => {
      console.log(color)
      this.props.changeBackgroundColor(color);
    })
  }

  handleOpacityChange = (event) => {
    let change = this.state.color;
    change.a = event.target.value;
    this.setState({ color : change });
    this.props.changeBackgroundColor(change);
  }

  openHiddenMenu = () => {
    document.getElementById("hidden-menu").style = null;

  }

  closeHiddenMenu = () => {
    document.getElementById("hidden-menu").style.setProperty("display", "none");
  }
  
  render() {
    return (
      <div className="sub">
        <div className="sub-title">
          {i18next.t('ui/canvas.Canvas')} ( {this.props.object.type} )
        </div>
        <div className="canvas-menu">
          <div className="canvas-reset">
              <button onClick={this.props.resetCanvas}> {i18next.t('ui/canvas.ResetCanvas')} </button>
          </div>
          <div className="option-title">{i18next.t('ui/canvas.CropCanvas')}</div>
          <div className="canvas-crop">
            <button onClick={this.cropCanvas}>{i18next.t('ui/canvas.CropCanvas')}</button>
            {this.state.displayCropCanvas ?
              <div className="crop-box">
                <div className="crop-size-input">
                  <input
                    type='number'
                    onChange={this.handleChange}
                    name='width'
                    min='1'
                    max={this.props.canvas.width}
                    value={this.state.cropCanvasSize.width}
                  />
                  <div>x</div>
                  <input
                    type='number'
                    onChange={this.handleChange}
                    name='height'
                    min='1'
                    max={this.props.canvas.height}
                    value={this.state.cropCanvasSize.height}
                  />
                </div>
                <button onClick={this.cropEndCanvas}>{i18next.t('ui/canvas.CropEndCanvas')}</button>
                <input type="checkbox" id="cropfit" /><label htmlFor="cropfit">이미지 줄이기(번역할거)</label>
              </div>
              : null
            }
          </div>
          <div className="option-title">{i18next.t('ui/canvas.CanvasColor')}</div>
          <div className="color-picker">            
            <input type="color" id="colorSource" value={this.state.hexcolor} onChange = { this.handleColorChange}/>
            <input type="range" value = {this.state.color.a} min='0' max='1' step='0.01' onChange = {this.handleOpacityChange} />
          </div>

          <div>
            <button onClick={this.props.exportCanvas}> {i18next.t('ui/canvas.CanvasExport')} </button>
            <div className="file-input-group">
              <label className="input-file-button" htmlFor="_file">{i18next.t('ui/canvas.CanvasImport')}</label>
              <input name="file" type='file' id='_file' onChange={this.props.localImportCanvas} accept=".json" style={{ display: 'none' }}></input>
            </div>
          </div>
          <div>
            {i18next.t('ui/canvas.Beta')}
            <input id="grid-snap" type="checkbox" onClick={this.props.onClickSnap}/><label htmlFor = "grid-snap">{i18next.t('ui/canvas.GridSnap')}</label>
            <input id="grid-show" type="checkbox" onClick={this.props.onClickGrid}/><label  htmlFor = "grid-show">{i18next.t('ui/canvas.GridShow')}</label>
            <input id="object-snap" type="checkbox" onClick={this.props.onClickObjectSnap}/><label  htmlFor ="object-snap"> {i18next.t('ui/canvas.ObjectSnap')}</label>
          </div>

          <div>
            <button onClick = {this.openHiddenMenu}>히든 메뉴 열기</button>
            <button onClick = {this.closeHiddenMenu}>히든 메뉴 닫기</button>

          </div>

        </div>
      </div>
    );
  }
})