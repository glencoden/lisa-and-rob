import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './play.css';

import Game from './game';
import Code from './code';

const style = {
    link: {
        textDecoration: 'none',
        fontSize: '3vw',
        padding: '0 1vw',
        border: '.2vw solid whitesmoke',
        borderRadius: '1vw',
        color: 'whitesmoke',
        backgroundColor: 'rgba(255, 255, 255, .2)'
    }
}

class Play extends Component {
    render() {
        document.getElementById('lisa_and_rob') && document.getElementById('lisa_and_rob').pause();
        return (
          <div className="Play">
              <Link className="quit" to={`${process.env.PUBLIC_URL}/welcome`} onClick={() => document.getElementById('lisa_and_rob').play()} style={style.link}>Quit</Link>
              <Game match={this.props.match} />
              <Code />
              <audio id="show_way" src={`${process.env.PUBLIC_URL}/sound/show_way.mp3`} autoPlay></audio>
              <audio id="break_asteroid" src={`${process.env.PUBLIC_URL}/sound/break_asteroid.mp3`}></audio>
              <audio id="empty_swing" src={`${process.env.PUBLIC_URL}/sound/empty_swing.mp3`}></audio>
              <audio id="lisa_walk" src={`${process.env.PUBLIC_URL}/sound/lisa_walk.mp3`} loop="true"></audio>
              <audio id="rob_walk" src={`${process.env.PUBLIC_URL}/sound/rob_walk.mp3`} loop="true"></audio>
              <audio id="lisa_jump" src={`${process.env.PUBLIC_URL}/sound/lisa_jump.mp3`}></audio>
              <audio id="click_1" src={`${process.env.PUBLIC_URL}/sound/click_1.mp3`}></audio>
              <audio id="click_2" src={`${process.env.PUBLIC_URL}/sound/click_2.mp3`}></audio>
              <audio id="cash_star" src={`${process.env.PUBLIC_URL}/sound/cash_star.mp3`}></audio>
              <audio id="close_rocket" src={`${process.env.PUBLIC_URL}/sound/close_rocket.mp3`}></audio>
              <audio id="launch_rocket" src={`${process.env.PUBLIC_URL}/sound/launch_rocket.mp3`}></audio>
              <audio id="turn" src={`${process.env.PUBLIC_URL}/sound/turn.mp3`}></audio>
              <audio id="rewind" src={`${process.env.PUBLIC_URL}/sound/rewind.mp3`}></audio>
              <audio id="try_again" src={`${process.env.PUBLIC_URL}/sound/try_again.mp3`}></audio>
              <audio id="steps_buttons" src={`${process.env.PUBLIC_URL}/sound/steps_buttons.mp3`}></audio>
              <audio id="shoot_button" src={`${process.env.PUBLIC_URL}/sound/shoot_button.mp3`}></audio>
              <audio id="lets_go" src={`${process.env.PUBLIC_URL}/sound/lets_go.mp3`}></audio>
              <audio id="cheer_kids" src={`${process.env.PUBLIC_URL}/sound/cheer.mp3`}></audio>
              <audio id="well_done" src={`${process.env.PUBLIC_URL}/sound/well_done.mp3`}></audio>
          </div>
        );
    }
}

export default Play;
