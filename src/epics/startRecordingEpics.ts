import { Epic, ActionsObservable, StateObservable } from "redux-observable";
import { Action, MiddlewareAPI, Dispatch } from "redux";
import { Observable, pipe, Subject, empty } from "rxjs";
import { flatMap, filter, map, merge, tap } from "rxjs/operators";
import { IStartRecording, IStopRecording, audioReady, IAudioReady } from "./../actions";
import { RootState } from "..";
import { START_RECORDING, STOP_RECORDING, AUDIO_READY } from "../constants";

declare var MediaRecorder: any;
var mediaRecorder: any = null;
var audioReadySubject = new Subject();

interface IAudioReadyCallback {
    type: "AUDIO_READY_CALLBACK",
    audio: HTMLAudioElement,
}

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        

        const audioChunks: any = [];
        mediaRecorder.addEventListener("dataavailable", (event: any) => {
            audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audioReadySubject.next({
                type: "AUDIO_READY_CALLBACK",
                audio,
            });
        });
});

export type IStartRecordingEpicAction =
    IStartRecording |
    IStopRecording |
    IAudioReady |
    IAudioReadyCallback;

export const startRecordingEpic: Epic<Action, Action, RootState> = (
    action$: ActionsObservable<IStartRecordingEpicAction>,
    stateMiddleware: StateObservable<RootState>,
) => {
    return action$
        .pipe(
            merge(audioReadySubject),
            tap((action: IStartRecordingEpicAction) => {
                if (action.type === START_RECORDING) {
                    mediaRecorder.start();
                }
                if (action.type === STOP_RECORDING) {
                    mediaRecorder.stop();
                }
                return action;
            }),
            filter((action: IStartRecordingEpicAction) => {
                return action.type === "AUDIO_READY_CALLBACK";
            }),
            map((action: IAudioReadyCallback) => {
                return audioReady(action.audio);
            })
        )
};