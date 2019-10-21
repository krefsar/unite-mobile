import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import thunk from 'redux-thunk';

import MainApp from './components/MainApp';
import rootReducer from './redux/reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
  }
}

export default App;