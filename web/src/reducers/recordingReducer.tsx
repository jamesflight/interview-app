import { START_RECORDING, STOP_RECORDING, TRANSCRIPTION_READY } from './../constants';
import { assoc } from "ramda";
import { IStartRecording, IStopRecording, ITranscriptionReady } from '../actions';

export class RecordingState {
  isRecording: boolean = false;
  audio: HTMLAudioElement;
}

type RecordingAction = IStartRecording | IStopRecording | ITranscriptionReady;

export function recordingReducer(state: RecordingState = new RecordingState(), action: RecordingAction): RecordingState {
  switch (action.type) {
    case START_RECORDING:
      return assoc("isRecording", true, state);
    case STOP_RECORDING:
      return assoc("isRecording", false, state);
    case TRANSCRIPTION_READY:
      console.log(action);
    default:
      return state;
  }
}