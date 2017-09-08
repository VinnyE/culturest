import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store'
import './styles/index.css';
import App from './components/App';
import { unregister } from './registerServiceWorker';

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <App history={history}/>
        </div>
      </ConnectedRouter>
    </Provider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));


unregister();
