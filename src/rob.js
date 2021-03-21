import React, { Component } from 'react';
import { connect } from 'react-redux';

const style = {
    container: {
        position: 'absolute',
        width: '5.5vw',
        transitionDuration: '.5s'
    },
    rob: {
        width: '5.5vw',
        transitionDuration: '.5s'
    },
    icon: {
        position: 'absolute',
        top: '-1.5vw',
        left: '3.7vw',
        width: '3vw',
        padding: '.4vw',
        border: '1px solid rgb(48, 79, 132)',
        borderRadius: '1.5vw',
        margin: '.05vw',
        backgroundColor: 'white'
    }
}

class Rob extends Component {
    render() {
        return (
            <div id="rob_container" style={{ ...style.container, ...this.props.container }}>
                <img id="rob" src={`${process.env.PUBLIC_URL}/rob.png`} alt="Rob" style={{ ...style.rob, ...this.props.rob }}></img>
                {this.props.star && <img src={`${process.env.PUBLIC_URL}/star.png`} alt="Star" style={style.icon}></img>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    if (state.rob) {
        return {
            container: { ...state.rob.position },
            rob: { transform: state.rob.direction.transform },
            star: state.rob.star
        }
    } else {
        return {}
    }
}

const ConnectedRob = connect(mapStateToProps)(Rob);

export default ConnectedRob;
