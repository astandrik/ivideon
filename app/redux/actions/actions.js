import * as ac from "./actionCreator";
export const SET_CAMERAS = "SET_CAMERAS";
export const SET_SEED = "SET_SEED";
export const SET_MORE_CAMERAS = "SET_MORE_CAMERAS";
export const SET_FAVORS = "SET_FAVORS";

export const setCameras = ac.Action(SET_CAMERAS);
export const setSeed = ac.Action(SET_SEED);
export const setMoreCameras = ac.Action(SET_MORE_CAMERAS);
export const setFavors = ac.Action(SET_FAVORS);

import {setCookie, getCookie, deleteCookie} from "../../helpers";

export const getCameras = function(seed) {
  var callback = function(dispatch, data, getState) {
    let seed = getState().Cameras.seed;
    dispatch(setFavors({favors: getCookie("favors")}));
    if(data.success) {
      if(seed ===-1) {
        dispatch(setCameras({cameras: data.response.cameras}));
      } else {
        dispatch(setMoreCameras({cameras: data.response.cameras}));
      }
      dispatch(setSeed({seed: data.response.seeds.next}));
    }
  }
  return ac.FetchCorsAsync("http://api.ivideon.com/tv/cameras?limit=5"+(seed ? "&seed="+seed : ""), callback);
}

export const toggleFavor = function(uin) {
  return (dispatch, getState) => {
    let favors = getCookie("favors");
    if(favors) {
      let arr = favors.split(','),
          index = arr.indexOf(uin.toString());
      if(~index) {
        arr.splice(index, 1);
        if(arr.length === 0) {
          deleteCookie("favors");
        } else {
          setCookie("favors", arr.join(','));
        }
      } else {
        arr.push(uin);
        setCookie("favors", arr.join(','));
      }
    } else {
      setCookie("favors", uin.toString());
    }
    dispatch(setFavors({favors: getCookie("favors")}));
  }
}