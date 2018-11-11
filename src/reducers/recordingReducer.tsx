import { START_RECORDING, STOP_RECORDING } from './../constants';
import { assoc } from "ramda";
import { Action } from 'redux';

export class RecordingState {
  isRecording: boolean = false;
}

export function recordingReducer(state: RecordingState = new RecordingState(), action: Action): RecordingState {
  switch (action.type) {
    case START_RECORDING:
      return assoc("isRecording", true, state);
    case STOP_RECORDING:
      return assoc("isRecording", false, state);
    default:
      return state;
  }
}