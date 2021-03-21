import React, { Component } from 'react';
import { connect } from 'react-redux';

const style = {
    container: {
        position: 'absolute',
        width: '5.5vw',
        transitionDuration: '1s'
    },
    lisa: {
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

class Lisa extends Component {
    render() {
        return (
            <div id="lisa_container" style={{ ...style.container, ...this.props.container }}>
                <img id="lisa" src={`${process.env.PUBLIC_URL}/lisa.png`} alt="Lisa" style={{ ...style.lisa, ...this.props.lisa }}></img>
                {this.props.star && <img src={`${process.env.PUBLIC_URL}/star.png`} alt="Star" style={style.icon}></img>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        container: { ...state.lisa.position },
        lisa: { transform: state.lisa.direction.transform },
        star: state.lisa.star
    }
}

const ConnectedLisa = connect(mapStateToProps)(Lisa);

export default ConnectedLisa;
