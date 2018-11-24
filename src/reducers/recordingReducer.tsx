import { START_RECORDING, STOP_RECORDING, AUDIO_READY } from './../constants';
import { assoc } from "ramda";
import { IStartRecording, IStopRecording, IAudioReady } from '../actions';

export class RecordingState {
  isRecording: boolean = false;
  audio: HTMLAudioElement;
}

type RecordingAction = IStartRecording | IStopRecording | IAudioReady;

export function recordingReducer(state: RecordingState = new RecordingState(), action: RecordingAction): RecordingState {
  switch (action.type) {
    case START_RECORDING:
      return assoc("isRecording", true, state);
    case STOP_RECORDING:
      return assoc("isRecording", false, state);
    case AUDIO_READY:
     return assoc("audio", action.audio, state);
    default:
      return state;
  }
}