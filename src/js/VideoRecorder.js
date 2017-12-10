import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../css/video-recorder.css';

class VideoRecorder extends Component {
	constructor(props) {
		super(props);
		this.localMediaStream = null;

		this.state = {
		  capture: true,
      rejected: false
    };

		this.init = this.init.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.takeSnapshot = this.takeSnapshot.bind(this);

    this.init();
	}

	componentWillMount() {

  }

	init() {
    if (VideoRecorder.hasGetUserMedia()) {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      navigator.getUserMedia({video: true}, (stream) => {
        let video = document.querySelector('video');
        video.src = window.URL.createObjectURL(stream);
        this.localMediaStream = stream;
      }, this.handleReject);
    } else {
      alert('getUserMedia() is not supported in your browser');
    }
  }

  static hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }

  static createCookie() {
    const cookies = new Cookies();
    cookies.set('authenticated', true, { path: '/' });
  }

  takeSnapshot() {
    const video = this.refs.video;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    if (this.localMediaStream) {
      ctx.drawImage(video, 0, 0);
      this.refs.img.src = canvas.toDataURL('image/webp');
    }

    this.setState({
      capture: false
    });

    // TODO: call to backend instead
    setTimeout(() => {
      VideoRecorder.createCookie();
      window.location.href = '/dashboard';
    }, 9000);
  }

  handleReject(e) {
    this.setState({
      rejected: true
    });
  }

	render() {
		return (
			<div className='video-recorder'>
        { this.state.rejected ?
          <div>
            <p className="reject">
              Our app cannot function properly without access to the camera.
              Please enable webcam on this website and refresh.
            </p>
          </div>
          :
          <div>
            <canvas height='600' width='800' ref='canvas' />
            <img ref='img' />
            <video autoPlay className={this.state.capture ? '' : 'is-hidden'} ref='video' />
            <button className={this.state.capture ? 'send' : 'send is-hidden'} onClick={this.takeSnapshot}/>
            <div className={this.state.capture ? 'is-hidden' : ''}>
              <div className="checking-icon" />
              <h3 className="checking-message">We are checking your identity...</h3>
              <p>Please wait.</p>
            </div>
          </div>
        }

			</div>
		);
	}
}

export default VideoRecorder;
