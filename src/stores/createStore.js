import { createStore as _createStore, applyMiddleware } from 'redux';
import { syncHistory } from 'react-router-redux';
import createMiddleware from '../middleware/clientMiddleware';
import reducers from '../reducers'

export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = syncHistory(history);
  const middleware = [createMiddleware(client), reduxRouterMiddleware];
  let finalCreateStore = applyMiddleware(...middleware)(_createStore);
  const store = finalCreateStore(reducers, data);

  reduxRouterMiddleware.listenForReplays(store);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }
  return store;
}
