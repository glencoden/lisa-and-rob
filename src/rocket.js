import React, { Component } from 'react';
import { connect } from 'react-redux';

const style = {
    container: {
        position: 'absolute',
        width: '5.5vw',
        transitionDuration: '8s'
    },
    rocket: {
        position: 'relative',
        width: '5.5vw',
        zIndex: '25',
        transform: 'scale(1.2, 1.2) translateY(-10%)'
    },
    iconContainer: {
        position: 'absolute',
        top: '-1.5vw',
        left: '3.7vw',
        width: '10vw'
    },
    icon: {
        display: 'inline-block',
        width: '3vw',
        padding: '.4vw',
        border: '1px solid rgb(48, 79, 132)',
        borderRadius: '1.5vw',
        margin: '.05vw',
        backgroundColor: 'white'
    },
    fire: {
        position: 'absolute',
        left: '.9vw',
        width: '4vw',
        transform: 'rotate(.5turn)'
    }
}

class Rocket extends Component {
    render() {
        return (
            <div id="rocket_container" style={{ ...style.container, ...this.props.container }}>
                <img id="rocket" src={`${process.env.PUBLIC_URL}/rocket.png`} alt="Rocket" style={style.rocket}></img>
                <div style={style.iconContainer}>
                    {this.props.lisa && <img src={`${process.env.PUBLIC_URL}/lisa.png`} alt="Lisa" style={style.icon}></img>}
                    {this.props.rob && <img src={`${process.env.PUBLIC_URL}/rob.png`} alt="Rob" style={style.icon}></img>}
                    {this.props.star && <img src={`${process.env.PUBLIC_URL}/star.png`} alt="Star" style={style.icon}></img>}
                </div>
                {this.props.lisa && this.props.rob && this.props.star && <img id="rocket_fire" src={`${process.env.PUBLIC_URL}/fire.png`} alt="Fire" style={style.fire}></img>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    if (state.rocket) {
        return {
            container: { ...state.rocket.position },
            lisa: state.rocket.lisa,
            rob: state.rocket.rob,
            star: state.rocket.star
        }
    } else {
        return {}
    }
}

const ConnectedRocket = connect(mapStateToProps)(Rocket);

export default ConnectedRocket;
