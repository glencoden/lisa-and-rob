import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './welcome.css';

const style = {
    sound_btn: {
        cursor: 'pointer',
        position: 'fixed',
        top: '92vh',
        left: '1vw',
        width: '3.5vw'
    },
    introLink: {
        marginLeft: '2vw'
    },
    link: {
        display: 'inline-block',
        textDecoration: 'none',
        fontSize: '4vw',
        padding: '0 1vw',
        border: '.2vw solid whitesmoke',
        borderRadius: '1vw',
        margin: '.5vw 0',
        color: 'whitesmoke',
        backgroundColor: 'rgba(255, 255, 255, .2)'
    }
}

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
          <div className="Welcome">
              {this.state.mute || <img id="sound_off" src={`${process.env.PUBLIC_URL}/sound_off.png`} onClick={() => {
                      document.getElementById('lisa_and_rob').pause();
                      this.setState({ mute: true });
                  }} alt="Sound Button" style={style.sound_btn} />}
              {this.state.mute && <img id="sound_on" src={`${process.env.PUBLIC_URL}/sound_on.png`} onClick={() => {
                      document.getElementById('lisa_and_rob').play();
                      this.setState({ mute: false });
                  }} alt="Sound Button" style={style.sound_btn} />}
              <Link to={`${process.env.PUBLIC_URL}/intro`} style={{ ...style.link, ...style.introLink }}>Introduction</Link>
              <div className="link_container">
                  <Link to={`${process.env.PUBLIC_URL}/play/0`} style={style.link}>Level 1</Link>
                  <Link to={`${process.env.PUBLIC_URL}/play/1`} style={style.link}>Level 42</Link>
              </div>
              <audio id="lisa_and_rob" src={`${process.env.PUBLIC_URL}/sound/Lisa_and_Rob.mp3`} autoPlay loop></audio>
          </div>
        );
    }
}

export default Welcome;
