import {combineReducers, createStore} from "redux";
import reducer from "./reducers/mainReducer";

const Cameras = combineReducers({
  cameras: reducer.setCameras,
  seed: reducer.setSeed,
  favors: reducer.setFavors
});


export default combineReducers({
  Cameras
});