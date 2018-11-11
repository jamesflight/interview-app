import * as actions from '../actions';
import { RootState } from "./../index";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as React from 'react';

interface IRecordingControlsContainerStateProps {
    isRecording: boolean;
}

interface IRecordingControlsContainerDispatchProps {
    start: () => void;
    stop: () => void;
}

interface IRecordingControlsContainer extends IRecordingControlsContainerStateProps, IRecordingControlsContainerDispatchProps {};

export function mapStateToProps(state: RootState): IRecordingControlsContainerStateProps {
  return {
    isRecording: state.recording.isRecording,
  };
}

export function mapDispatchToProps(dispatch: Dispatch): IRecordingControlsContainerDispatchProps {
  return {
    start: () => dispatch(actions.startRecording()),
    stop: () => dispatch(actions.stopRecording()),
  };
}

export class RecordingControlContainer extends React.Component<IRecordingControlsContainer, {}> {
    public render() {
        return (
            <div className="card recording-container">
                <div className="card-body">
                    {
                        ! this.props.isRecording &&
                            <button onClick={this.props.start} type="button" className="btn btn-danger"><i className="fas fa-circle"></i></button>
                    }
                    {
                        this.props.isRecording &&
                            <button onClick={this.props.stop} type="button" className="btn btn-info"><i className="fas fa-square"></i></button>
                    }
                   
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordingControlContainer);