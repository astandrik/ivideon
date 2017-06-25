import React from "react";
import "./CameraBlock.less";
import ReactSVG from "react-svg";

class Camera{
  constructor(obj) {
    this.uin = obj.uin;
    this.misc = {description: obj.description};
    this.camera_name = obj.camera_name;
    this.width = obj.width;
    this.height = obj.height;
    this.total_views = obj.total_views;
    this.camera = obj.camera;
    this.server = obj.server;
  }
}

export default class CameraBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: -1,
      error: false
    }
  }
  open() {
    let interval = setInterval(() => {
      this.forceUpdate();
    }, 5000);
    this.setState({
      interval: interval
    });
    this.props.makeFull(this.props.uin);
  }
  close() {
    this.setState({
      error: false
    });
    clearInterval(this.state.interval);
    this.props.close();
  }
  handleError() {
    this.setState({
      error: true
    })
    clearInterval(this.state.interval);
  }
  force() {
    this.setState({
      error: false
    });
    this.forceUpdate();
  }
  toggleFavourite(uin) {
    this.props.favor(uin);
  }
  render() {
    let props = this.props;
    let obj = new Camera(props.obj);
    let imageBlock = null,
        infoBlock = null,
        starBlock = (<div onClick={this.toggleFavourite.bind(this,obj)}>
          <ReactSVG
            path="app/src/Icons/pentagon-made-of-stars.svg"
            className={"pentagon " + (props.favourited ? "favour" : "non-favour")}
          /></div>);

    if(this.state.error) {
      let imageStyle = {
        width: props.width+"px",
        height: props.height+"px"
      };
      imageBlock = (
        <div className="full-image-block error" style={imageStyle}>
          <div onClick={this.close.bind(this)}>
            <ReactSVG
              path="app/src/Icons/cancel.svg"
              className="close-sign"
            />
          </div>
          <div className="offline-area">
            <span> Camera is offline </span>
            <div className="refresh-button" onClick={this.force.bind(this)}>Обновить</div>
          </div>
        </div>
      )
    } else if(props.isActive) {

      imageBlock = (<div className="full-image-block">
          <div onClick={this.close.bind(this)}>
            <ReactSVG
              path="app/src/Icons/cancel.svg"
              className="close-sign"
            />
          </div>
          <img onError={this.handleError.bind(this)}
          src={`https://streaming.ivideon.com/preview/live?server=${props.server}&camera=${props.camera}&cachebreaker=${(new Date()).getTime()}`}/>
        </div>);
      infoBlock = (
        <div className="info-block">
          <div className="upper">
            <span> {props.name} </span>
            {starBlock}
          </div>
          <span> {props.description} </span>
          <div className="lower">
            <span> TOTAL VIEWS: {props.views} </span>
          </div>
        </div>
      )
    } else {
      imageBlock = (
        <div className="image-block" onClick={this.open.bind(this)} >
          <img src={`https://streaming.ivideon.com/preview/live?server=${props.server}&camera=${props.camera}`}/>
        </div>
      )
      infoBlock = (
        <div className="info-block">
          <div className="upper">
            <span> {props.name} </span>
            {starBlock}
          </div>
          <div className="lower">
            <span> TOTAL VIEWS: {props.views} </span>
          </div>
        </div>
      )
    }

    return (
      <div className={"camera-block " + (props.isActive ? "full" : "")}>
        {imageBlock}
        {infoBlock}
      </div>
    )
  }
}