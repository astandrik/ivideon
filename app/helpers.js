export function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


export function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}

export function deepAssign(object1, object2) {
  let newObj = {};
  if((object2 instanceof Array)) {
    return object2.slice();
  }
  if(typeof(object2) !== 'object') {
    return object2;
  }
  for(let e in object1) {
    newObj[e] = deepAssign({},object1[e]);
  }
  for(let e in object2) {
    if(newObj[e] === undefined) {
      newObj[e] = {};
    }
    newObj[e] = deepAssign(newObj[e], object2[e]);
  }
  return newObj;
}

export function deepCopy(obj) {
  return deepAssign({}, obj);
}
