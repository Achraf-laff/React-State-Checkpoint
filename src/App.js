import './App.css';
import React, { Component } from 'react';
class App extends Component {
  constructor() {
    super();
    this.state = {
      person: {
        fullName: 'John Doe',
        bio: 'I am a passionate software developer.',
        imgSrc: 'https://img.freepik.com/premium-photo/portrait-man-with-blue-lights-visual-effects-ultra-hd-realistic-generative-ai_947227-933.jpg?w=360',
        profession: 'Software Engineer'
      },
      shows: false,
      mountedTime: 0
    };
    this.timer = null;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  startTimer = () => {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.setState(prevState => ({
          mountedTime: prevState.mountedTime + 1
        }));
      }, 1000);
    }
  };

  clearTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  };

  toggleShow = () => {
    this.setState(
      prevState => {
        if (prevState.shows) {
          this.clearTimer(); // Stop the timer when hiding the profile
          return { shows: false, mountedTime: 0 }; // Reset the counter to 0
        } else {
          return { shows: true }; // Show the profile
        }
      },
      () => {
        if (this.state.shows) {
          this.startTimer(); // Start the timer when showing the profile
        }
      }
    );
  };

  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <button onClick={this.toggleShow}>
          {this.state.shows ? 'Hide Profile' : 'Show Profile'}
        </button>

        {this.state.shows && (
          <div className="card">
            <img src={this.state.person.imgSrc} alt="Profile" />
            <h2>{this.state.person.fullName}</h2>
            <p>{this.state.person.bio}</p>
            <h4>{this.state.person.profession}</h4>
            <p>Component mounted since: {this.state.mountedTime} seconds</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;