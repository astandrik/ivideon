import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader'
import Index from "./src/containers/Index";
import {getCameras} from  "./redux/actions/actions";

store.dispatch(getCameras());

const render = Component => {
  ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
          <Component/>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Index);

if (module.hot) {
  module.hot.accept("./src/containers/Index", () => { render(Index) })
}