import React, { Component } from 'react';
import { connect } from 'react-redux';

import { continueGame } from './actions';

const style = {
    overlay: {
        position: 'absolute',
        top: '0',
        left: '-70vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '70vw',
        backgroundColor: 'rgba(255, 255, 255, .5)',
        zIndex: '100',
        transitionDuration: '.5s'
    },
    infoBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        width: '60vw',
        borderRadius: '4vw',
        backgroundColor: 'rgb(48, 79, 132)'
    },
    lisa: {
        width: '10vw'
    },
    h1: {
        fontSize: '4vw',
        margin: '.5vw 0 1vw 0',
        color: 'white'
    },
    continue_btn: {
        cursor: 'pointer',
        justifySelf: 'center',
        alignSelf: 'center',
        width: '8vw',
        padding: '.5vw',
        border: '.5vw solid gold',
        borderRadius: '.5vw',
        backgroundColor: 'whitesmoke'
    }
}

class Help extends Component {
    render() {
        setTimeout(() => {
            document.getElementById('try_again').play();
        }, 800);
        return (
            <section style={style.overlay}>
                <section className="info_box" style={style.infoBox}>
                    <img id="lisa" src={`${process.env.PUBLIC_URL}/lisa.png`} alt="Lisa" style={style.lisa}></img>
                    <h1 style={style.h1}>{this.props.message}</h1>
                    <img id="continue_btn" onClick={() => this.props.dispatch(continueGame())} src={`${process.env.PUBLIC_URL}/shoot.png`} alt="Launch Btn" style={style.continue_btn}></img>
                </section>
                <audio id="error" src={`${process.env.PUBLIC_URL}/sound/error.mp3`} autoPlay></audio>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        message: state.wrongMove
    }
}

const ConnectedHelp = connect(mapStateToProps)(Help);

export default ConnectedHelp;
