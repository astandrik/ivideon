import 'isomorphic-fetch';

export function Action(type){
  return function(data) {
    return {type, ...data};
  }
}

export function FetchCorsAsync(url, callback) {
  return function(dispatch, getState) {
    let request = {
          method: "GET",
          mode: "cors",
          contentType: "application/json"
        };
    return fetch(url,request)
    .then(r => r.json())
    .then(json => callback(dispatch, json, getState));
  }
}