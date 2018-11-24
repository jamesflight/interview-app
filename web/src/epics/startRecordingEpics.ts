import { Epic, ActionsObservable, StateObservable } from "redux-observable";
import { Action, MiddlewareAPI, Dispatch } from "redux";
import { Observable, Subject, empty, fromEvent } from "rxjs";
import { flatMap, filter, map as rxMap, merge, tap } from "rxjs/operators";
import { IStartRecording, IStopRecording, ITranscriptionReady, transcriptionReady } from "./../actions";
import { RootState } from "..";
import { START_RECORDING, STOP_RECORDING } from "../constants";
import { map, join, pipe } from "ramda";

var speechRecogniser = new webkitSpeechRecognition();
speechRecogniser.continuous = true;
speechRecogniser.interimResults = true;
speechRecogniser.lang = 'en-GB';

const $transcription = new Subject();

speechRecogniser.onresult = (e) => {
    $transcription.next(
        pipe(
            map((result: SpeechRecognitionResult) => {
                return result[0].transcript;
            }),
            join(''),
        )(e.results)
    );
}

$transcription.subscribe((s) => {
    console.log(s);
});

export type IStartRecordingEpicAction =
    IStartRecording |
    IStopRecording |
    ITranscriptionReady ;

export const startRecordingEpic: Epic<Action, Action, RootState> = (
    action$: ActionsObservable<IStartRecordingEpicAction>,
    stateMiddleware: StateObservable<RootState>,
) => {
    return action$
        .pipe(
            filter((action: IStartRecordingEpicAction) => {
                return action.type === START_RECORDING
                    || action.type === STOP_RECORDING;
            }),
            tap((action: IStartRecordingEpicAction) => {
                if (action.type === START_RECORDING) {
                    speechRecogniser.start();
                }
                if (action.type === STOP_RECORDING) {
                    speechRecogniser.stop();
                }
                return empty();
            }),
            merge($transcription),
            rxMap((transcription: string) => {
                return transcriptionReady(transcription);
            })
        )
};