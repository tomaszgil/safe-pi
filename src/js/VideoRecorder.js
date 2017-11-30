import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../css/video-recorder.css';

class VideoRecorder extends Component {
	constructor(props) {
		super(props);
		this.localMediaStream = null;

		this.state = {
		  capture: true
    };

		this.init = this.init.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.takeSnapshot = this.takeSnapshot.bind(this);

    this.init();
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

        video.onloadedmetadata = function(e) {
          // Ready to go. Do some stuff.
        };
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

    // call to backend instead
    setTimeout(() => {
      VideoRecorder.createCookie();
      window.location.href = '/dashboard';
    }, 5000);
  }

  handleReject(e) {
    console.log('Reeeejected!', e);
  }

	render() {
		return (
			<div className='video-recorder'>
        <video autoPlay className={this.state.capture ? '' : 'is-hidden'} ref='video' />
        <canvas ref='canvas' height='600' width='800' />
        <img className={this.state.capture ? 'is-hidden' : ''} ref='img' />
        <button className={this.state.capture ? 'send' : 'send is-hidden'} onClick={this.takeSnapshot}/>
			</div>
		);
	}
}

export default VideoRecorder;
