import React, { Component } from 'react';
import { connect } from 'react-redux';
import './game.css';

import Lisa from './lisa';
import Rob from './rob';
import Rocket from './rocket';
import Star from './star';

import compileLevel from './levels';
import { createLevel } from './actions';

class Game extends Component {
    constructor(props) {
        super(props);
        this.characters = {};
        this.props.dispatch(createLevel(this.getUserLevel()));
    }
    getUserLevel() {
        // possible db request
        return compileLevel(this.props.match.params.level);
    }
    createGameField(level) {
        this.characters = {};
        const getCoordinates = c => `${c % 10}/${(c - c % 10) / 10}`;
        const gameField = [];
        for (let i = 0; i < 100; i++) {
            let id = getCoordinates(i);
            let classes = [ 'game_field' ];
            this.props[id] && this.props[id].forEach(v => {
                if (v === 'lisa') {
                    this.characters.lisa = true;
                } else if (v === 'rob') {
                    this.characters.rob = true;
                } else if (v === 'rocket') {
                    this.characters.rocket = true;
                    document.getElementById('game_board').classList.add('game_board_shrink');
                } else if (v === 'star') {
                    this.characters.star = true;
                } else {
                    classes.push(v);
                }
            });
            gameField.push(<div key={i} id={id} className={classes.join(' ')}>{id}</div>)
        }
        return gameField;
    }
    render() {
        return (
            <section className="game_section">
                <section id="game_board">
                    <img id="saturn" src={`${process.env.PUBLIC_URL}/saturn.png`} alt="Saturn"></img>
                    {this.props.match.params.level && this.createGameField(this.props.match.params.level)}
                    {this.characters.lisa && <Lisa />}
                    {this.characters.rob && <Rob />}
                    {this.characters.rocket && <Rocket />}
                    {this.characters.star && <Star />}
                </section>
            </section>
        );
    }
}

const mapStateToProps = state => state.gameField || {};

const ConnectedGame = connect(mapStateToProps)(Game);

export default ConnectedGame;
