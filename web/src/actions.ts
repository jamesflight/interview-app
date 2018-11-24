import * as constants from './constants';
import { Dispatch } from 'redux';
import * as actions from './actions';

declare var MediaRecorder: any;
var mediaRecorder: any = null;

export interface IStartRecording {
    type: constants.START_RECORDING;
}

export function startRecording(): IStartRecording {
    return {
        type: constants.START_RECORDING
    };
}

export interface IStopRecording {
    type: constants.STOP_RECORDING;
}

export function stopRecording(): IStopRecording {
    return {
        type: constants.STOP_RECORDING
    };
}

export interface ITranscriptionReady {
    type: constants.TRANSCRIPTION_READY;
    transcription: string;
}

export function transcriptionReady(transcription: string): ITranscriptionReady {
    return {
        type: constants.TRANSCRIPTION_READY,
        transcription,
    };
}