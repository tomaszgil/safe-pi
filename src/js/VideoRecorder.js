import React, { Component } from 'react';

class VideoRecorder extends Component {
	constructor() {
		super();
		this.state = {
			granted: false,
			rejectedReason: '',
			recording: false,
			paused: false
		};

		this.handleGranted = this.handleGranted.bind(this);
		this.handleDenied = this.handleDenied.bind(this);
		this.handleStart = this.handleStart.bind(this);
		this.handleStop = this.handleStop.bind(this);
		this.handlePause = this.handlePause.bind(this);
		this.handleResume = this.handleResume.bind(this);
		this.setStreamToVideo = this.setStreamToVideo.bind(this);
		this.releaseStreamFromVideo = this.releaseStreamFromVideo.bind(this);
		this.downloadVideo = this.downloadVideo.bind(this);
	}
	handleGranted() {
		this.setState({ granted: true });
		console.log('Permission Granted!');
	}
	handleDenied(err) {
		this.setState({ rejectedReason: err.name });
		console.log('Permission Denied!', err);
	}
	handleStart(stream) {
		this.setState({
			recording: true
		});

		this.setStreamToVideo(stream);
		console.log('Recording Started.');
	}
	handleStop(blob) {
		this.setState({
			recording: false
		});

		this.releaseStreamFromVideo();

		console.log('Recording Stopped.');
		this.downloadVideo(blob);
	}

	handlePause() {
		this.releaseStreamFromVideo();

		this.setState({
			paused: true
		});
	}

	handleResume(stream) {
		this.setStreamToVideo(stream);

		this.setState({
			paused: false
		});
	}

	handleError(err) {
		console.log(err);
	}

	setStreamToVideo(stream) {
		let video = this.refs.app.querySelector('video');

		if(window.URL) {
			video.src = window.URL.createObjectURL(stream);
		}
		else {
			video.src = stream;
		}
	}
	releaseStreamFromVideo() {
		this.refs.app.querySelector('video').src = '';
	}
	downloadVideo(blob) {
		let url = URL.createObjectURL(blob);
		let a = document.createElement('a');
		a.style.display = 'none';
		a.href = url;
		a.target = '_blank';
		document.body.appendChild(a);

		a.click();
	}
	render() {
		const granted = this.state.granted;
		const rejectedReason = this.state.rejectedReason;
		const recording = this.state.recording;
		const paused = this.state.paused;

		return (
			<div ref="app">
				<h3>Video Recorder</h3>
			</div>
		);
	}
}

export default VideoRecorder;
