import React, { Component } from 'react';
import { connect } from 'react-redux';

const style = {
    overlay: {
        position: 'absolute',
        top: '-120vh',
        left: '-72vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '105vw',
        backgroundColor: 'whitesmoke',
        zIndex: '100',
        transitionDuration: '2s'
    },
    img: {
        width: '75vw',
        borderRadius: '5vw'
    }
}

class Cheer extends Component {
    componentDidMount() {
        setTimeout(() => {
            document.getElementById('cheer_kids').play();
            document.getElementById('Cheer').classList.add('show_cheer');
        }, 2000);
        setTimeout(() => {
            document.getElementById('well_done').play();
        }, 6500);
    }
    render() {
        return (
            <section id="Cheer" style={style.overlay}>
                <img src={`${process.env.PUBLIC_URL}/lisa_and_rob.png`} alt="Lisa and Rob" style={style.img}></img>
            </section>
        );
    }
}

const mapStateToProps = state => {}

const ConnectedCheer = connect(mapStateToProps)(Cheer);

export default ConnectedCheer;
