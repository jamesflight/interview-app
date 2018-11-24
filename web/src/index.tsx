import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Action } from 'redux';
import { recordingReducer, RecordingState } from './reducers/recordingReducer';
import RecordingControlContainer from './containers/RecordingControlContainer';
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { startRecordingEpic } from './epics/startRecordingEpics';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();

export const rootReducer = combineReducers({
  recording: recordingReducer,
});

export class RootState {
  recording: RecordingState = new RecordingState();
}

export const rootEpic = combineEpics(
  startRecordingEpic,
);

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <RecordingControlContainer />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
 