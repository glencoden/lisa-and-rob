import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './intro.css';

const style = {
    link: {
        position: 'absolute',
        top: '-50vh',
        left: '42vw',
        padding: '2vw',
        border: '.2vw solid whitesmoke',
        borderRadius: '1vw',
        backgroundColor: 'rgba(255, 255, 255, .2)',
        zIndex: '75',
        transitionDuration: '2s'
    },
    continue_btn: {
        width: '10vw'
    },
    lisa: {
        top: '-50vh',
        left: '27vw',
        width: '25vw',
        transitionDuration: '1s'
    },
    rob: {
        top: '-50vh',
        left: '47vw',
        width: '23vw',
        transitionDuration: '1s'
    },
}

class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        setTimeout(() => {
            document.getElementById('introduction').play();
            document.getElementById('lisa').classList.add('show_lisa');
            setTimeout(() => {
                document.getElementById('rob').classList.add('show_rob');
                setTimeout(() => {
                    document.getElementById('monster_overlay').classList.add('show_monster_overlay');
                    document.getElementById('monster').classList.add('show_monster');
                    setTimeout(() => {
                        document.getElementById('button').classList.add('show_button');
                    }, 12000);
                }, 13700);
            }, 2000);
        }, 1000);
    }
    render() {
        return (
          <div className="Intro">
              <div className="background"></div>
              <div id="monster_overlay"></div>
              <Link id="button" to={`${process.env.PUBLIC_URL}/play/0`} style={style.link}><img id="continue_btn" src={`${process.env.PUBLIC_URL}/shoot.png`} alt="Launch Btn" style={style.continue_btn}></img></Link>
              <img id="monster" src={`${process.env.PUBLIC_URL}/monster.png`} alt="Monster"></img>
              <img id="lisa" className="character" src={`${process.env.PUBLIC_URL}/lisa.png`} alt="Lisa" style={style.lisa}></img>
              <img id="rob" className="character" src={`${process.env.PUBLIC_URL}/rob.png`} alt="Rob" style={style.rob}></img>
              <img className="star one" src={`${process.env.PUBLIC_URL}/star.png`} alt="Star"></img>
              <img className="star two" src={`${process.env.PUBLIC_URL}/star.png`} alt="Star"></img>
              <img className="star three" src={`${process.env.PUBLIC_URL}/star.png`} alt="Star"></img>
              <img className="star four" src={`${process.env.PUBLIC_URL}/star.png`} alt="Star"></img>
              <img className="star five" src={`${process.env.PUBLIC_URL}/star.png`} alt="Star"></img>
              <img className="star six" src={`${process.env.PUBLIC_URL}/star.png`} alt="Star"></img>
              <img className="star seven" src={`${process.env.PUBLIC_URL}/star.png`} alt="Star"></img>
              <img className="star eight" src={`${process.env.PUBLIC_URL}/star.png`} alt="Star"></img>
              <img className="star nine" src={`${process.env.PUBLIC_URL}/star.png`} alt="Star"></img>
              <img className="star ten" src={`${process.env.PUBLIC_URL}/star.png`} alt="Star"></img>
              <img className="star eleven" src={`${process.env.PUBLIC_URL}/star.png`} alt="Star"></img>
              <audio id="introduction" src={`${process.env.PUBLIC_URL}/sound/introduction.mp3`} volume="0.8"></audio>
          </div>
        );
    }
}

export default Intro;
