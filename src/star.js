import React from 'react';
import { connect } from 'react-redux';

const style = {
    position: 'absolute',
    width: '5.5vw'
}

const star = props => <img id="star" src={`${process.env.PUBLIC_URL}/star.png`} alt="Star" style={{ ...style, ...props }}></img>;

const mapStateToProps = state => {
    let left, top;
    Object.keys(state.gameField)
          .forEach(v => {
              if (state.gameField[v].some(v => v === 'star')) {
                  left = v.slice(0, 1) * 10 + '%';
                  top = v.slice(2, 3) * 10 + '%';
              }
          });
    return {
        left,
        top
    }
};

const ConnectedStar = connect(mapStateToProps)(star);

export default ConnectedStar;
