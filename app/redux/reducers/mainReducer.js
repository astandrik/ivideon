import {SET_CAMERAS, SET_IMAGE, SET_SEED, SET_MORE_CAMERAS, SET_FAVORS} from "../actions/actions";
import {deepCopy, deepAssign} from "../../helpers";

let reducer = {};

reducer.setCameras = function(state=[], action) {
  switch (action.type) {
    case SET_CAMERAS:
      return action.cameras;
      break;
    case SET_MORE_CAMERAS:
      return state.concat(action.cameras);
      break
    default:
      return state;
  }
}

reducer.setSeed = function(state = -1, action) {
  switch (action.type) {
    case SET_SEED:
      return action.seed;
      break;
    default:
      return state;
  }
}

reducer.setFavors = function(state = null, action) {
  switch (action.type) {
    case SET_FAVORS:
      return action.favors;
      break;
    default:
      return state;
  }
}

export default reducer;