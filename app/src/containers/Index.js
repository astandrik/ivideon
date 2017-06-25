import React from "react";
import {connect} from "react-redux";
import "./CamerasList.less";
import {getCameras, toggleFavor} from  "../../redux/actions/actions";
import CameraBlock from "../components/CameraBlock";

let CamerasList = (props) => {
  return (
    <div className="cameras-container">
      <div className="favourite-header" id="header">
        <span> Favorite Cameras </span>
      </div>
      {props.cameras}
      <div className="favourite-footer">
        <div className="up-button">
          <a href="/#header">Наверх</a>
        </div>
        <div className="more-button" onClick={props.moreCameras}>
          Ещё
        </div>
      </div>
    </div>
  )
}



class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCamera: -1
    }
    this.makeFull = this.makeFull.bind(this);
    this.closeCamera = this.closeCamera.bind(this);
    this.more = this.more.bind(this);
    this.favor = this.favor.bind(this);
  }
  makeFull(uin) {
    this.setState({
      activeCamera: uin
    })
  }
  closeCamera() {
    this.setState({
      activeCamera: -1
    })
  }
  favor(uin) {
    this.props.favor(uin);
  }
  more() {
    this.props.more();
  }
  render() {
    let props = this.props;
    let favs = [];
    if(props.favors) {
      favs = props.favors;
    }
    if(props.cameras.length === 0) return null;
    let cameras = props.cameras.map(x => <CameraBlock
      isActive={this.state.activeCamera === x.uin}
      favourited={favs.filter(y => y.uin === x.uin).length ===1 }
      key={x.uin}
      favor={this.favor}
      makeFull={this.makeFull}
      close={this.closeCamera}
      description={x.misc.description}
      camera={x.camera}
      views={x.total_views}
      server={x.server}
      uin={x.uin}
      width={x.width} height={x.height}
      obj={x}
      name={x.camera_name}/>);
    return <CamerasList cameras={cameras} moreCameras={this.more}/>
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    cameras: state.Cameras.cameras,
    favors: state.Cameras.favors
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    more: function() {
      dispatch(getCameras());
    },
    favor: function(uin) {
      dispatch(toggleFavor(uin));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);