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

let splitter = "|3.1413|";

export const getCameras = function(seed) {
  var callback = function(dispatch, data, getState) {
    let seed = getState().Cameras.seed;
    let favors =  getCookie("favors");
    if(favors) {
      favors = favors.split(splitter).map(JSON.parse);
    }
    dispatch(setFavors({favors: favors}));
    if(data.success) {
      if(seed ===-1) {
        if(favors) {
          dispatch(setCameras({cameras: favors.concat(data.response.cameras)}));
        } else {
          dispatch(setCameras({cameras: data.response.cameras}));
        }
      } else {
        dispatch(setMoreCameras({cameras: data.response.cameras}));
      }
      dispatch(setSeed({seed: data.response.seeds.next}));
    }
  }
  return ac.FetchCorsAsync("http://api.ivideon.com/tv/cameras?limit=5"+(seed ? "&seed="+seed : ""), callback);
}

export const toggleFavor = function(x) {
  return (dispatch, getState) => {
    let favors = getCookie("favors");
    if(favors) {
      let arr = favors.split(splitter).map(JSON.parse),
          index = -1;
      for(let i = 0; i < arr.length; i++) {
        if(arr[i].uin === x.uin) {
          index = i;
          break;
        }
      }
      if(~index) {
        arr.splice(index, 1);
        if(arr.length === 0) {
          deleteCookie("favors");
          favors = [];
        } else {
          setCookie("favors", arr.map(JSON.stringify).join(splitter));
          favors = arr;
        }
      } else {
        arr.push(x);
        setCookie("favors", arr.map(JSON.stringify).join(splitter));
        favors = arr;
      }
    } else {
      setCookie("favors", JSON.stringify(x));
      favors = [x];
    }
    dispatch(setFavors({favors: favors}));
  }
}