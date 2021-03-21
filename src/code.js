import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './code.css';

import Help from './help';
import Cheer from './cheer';

import { backupState, wrongMove, walk, turnLeft, turnRight, jump, hammer, ignite } from './actions';

const pace = 1000;

class Code extends Component {
    constructor(props) {
        super(props);
        this.icons = [
            <img key="lisa_btn" id="0" className="button object" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/lisa.png`} alt="Lisa Btn"></img>,
            <img key="rob_btn" id="1" className="button object" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/rob.png`} alt="Rob Btn"></img>,
            <img key="rocket_btn" id="2" className="button object" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/rocket.png`} alt="Rocket Btn"></img>,
            <img key="walk_btn" id="3" className="button function" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/walk.png`} alt="Walk Btn"></img>,
            <img key="left_btn" id="4" className="button function" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/left.png`} alt="Walk Btn"></img>,
            <img key="right_btn" id="5" className="button function" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/right.png`} alt="Walk Btn"></img>,
            <img key="jump_btn" id="6" className="button function" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/jump.png`} alt="Walk Btn"></img>,
            <img key="hammer_btn" id="7" className="button function" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/hammer.png`} alt="Walk Btn"></img>,
            <img key="fire_btn" id="8" className="button function" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/fire.png`} alt="Walk Btn"></img>,
            <img key="1_btn" id="9" className="button number" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/1.png`} alt="1 Btn"></img>,
            <img key="2_btn" id="10" className="button number" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/2.png`} alt="2 Btn"></img>,
            <img key="3_btn" id="11" className="button number" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/3.png`} alt="3 Btn"></img>,
            <img key="4_btn" id="12" className="button number" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/4.png`} alt="4 Btn"></img>,
            <img key="5_btn" id="13" className="button number" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/5.png`} alt="5 Btn"></img>,
            <img key="6_btn" id="14" className="button number" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/6.png`} alt="6 Btn"></img>,
            <img key="7_btn" id="15" className="button number" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/7.png`} alt="7 Btn"></img>,
            <img key="8_btn" id="16" className="button number" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/8.png`} alt="8 Btn"></img>,
            <img key="9_btn" id="17" className="button number" onClick={e => this.writeCode(e)} src={`${process.env.PUBLIC_URL}/9.png`} alt="9 Btn"></img>
        ];
        if (this.props.rob && this.props.rocket) {
            this.state = {
                codeLines: [],
                inputButtons: [ this.icons[0], this.icons[1], this.icons[2] ]
            };
        } else if (this.props.rob) {
            this.state = {
                codeLines: [],
                inputButtons: [ this.icons[0], this.icons[1] ]
            };
        } else if (this.props.rocket) {
            this.state = {
                codeLines: [],
                inputButtons: [ this.icons[0], this.icons[2] ]
            };
        } else {
            this.state = {
                codeLines: [],
                inputButtons: [ this.icons[0] ]
            };
        }
        this.code = [];
        this.shotsLeft = [ 1, 2, 3, 4 ];
        this.resetCode = this.resetCode.bind(this);
    }
    nextInputButtons(btn_id) {
        if (btn_id === '0') {
            return [ this.icons[3], this.icons[6], this.icons[4], this.icons[5] ]
        } else if (btn_id === '1') {
            return [ this.icons[3], this.icons[7], this.icons[4], this.icons[5] ]
        } else if (btn_id === '2') {
            return [ this.icons[8] ]
        } else if (btn_id === '3') {
            return [ this.icons[9], this.icons[10], this.icons[11], this.icons[12], this.icons[13], this.icons[14], this.icons[15], this.icons[16], this.icons[17] ]
        } else {
            if (this.props.rob && this.props.rocket) {
                return [ this.icons[0], this.icons[1], this.icons[2] ];
            } else if (this.props.rob) {
                return [ this.icons[0], this.icons[1] ];
            } else if (this.props.rocket) {
                return [ this.icons[0], this.icons[2] ];
            } else {
                return [ this.icons[0] ];
            }
        }
    }
    writeCode(e) {
        this.props.dispatch(backupState());
        document.getElementById('click_1').play();
        this.code.push(e.target.id);
        this.setState({
            codeLines: this.getCodeLines(this.code),
            inputButtons: this.nextInputButtons(e.target.id)
        });
    }
    deleteCode() {
        document.getElementById('click_1').play();
        this.code.pop();
        this.setState({
            codeLines: this.getCodeLines(this.code),
            inputButtons: this.nextInputButtons(this.code[this.code.length - 1])
        });
    }
    getCodeLines(code) {
        const codeLines = [];
        code.forEach(v => v < 3 ? codeLines.push([v]) : codeLines[codeLines.length - 1].push(v));
        return codeLines;
    }
    sendCode() {
        document.getElementById('click_2').play();
        if (this.shotsLeft.length === 0) {
            return this.props.dispatch(wrongMove(`Unfortunately you're out of shooting stars...`));
        } else {
            this.shotsLeft.pop();
            this.runCode();
        }
    }
    resetCode() {
        this.code = [];
        this.shotsLeft.push(Number(this.shotsLeft[this.shotsLeft.length - 1]) + 1);
    }
    runCode() {
        if (this.state.codeLines.length > 0) {
            const newCodeLines = [ ...this.state.codeLines ]
            const v = newCodeLines.shift();
            this.setState({
                ...this.state,
                codeLines: newCodeLines
            });
            if (v[0] === '0') {
                if (v[1] === '3') {
                    if (v[2]) {
                        this.walkingSteps('lisa', Number(v[2]) - 8);
                    } else {
                        return this.props.dispatch(wrongMove(`code component's Lisa's walk`));
                    }
                } else if (v[1] === '4') {
                    this.props.dispatch(turnLeft(this.props.lisa));
                    setTimeout(() => {
                        this.runCode();
                    }, pace);
                } else if (v[1] === '5') {
                    this.props.dispatch(turnRight(this.props.lisa));
                    setTimeout(() => {
                        this.runCode();
                    }, pace);
                } else if (v[1] === '6') {
                    this.props.dispatch(jump(this.props.lisa, this.props.gameField));
                    setTimeout(() => {
                        this.runCode();
                    }, pace);
                }
            } else if (v[0] === '1') {
                if (v[1] === '3') {
                    if (v[2]) {
                        this.walkingSteps('rob', Number(v[2]) - 8);
                    } else {
                        this.props.dispatch(wrongMove(`code component's Rob's walk`));
                    }
                } else if (v[1] === '4') {
                    this.props.dispatch(turnLeft(this.props.rob));
                    setTimeout(() => {
                        this.runCode();
                    }, pace);
                } else if (v[1] === '5') {
                    this.props.dispatch(turnRight(this.props.rob));
                    setTimeout(() => {
                        this.runCode();
                    }, pace);
                } else if (v[1] === '7') {
                    this.props.dispatch(hammer(this.props.rob, this.props.gameField));
                    setTimeout(() => {
                        this.runCode();
                    }, pace);
                }
            } else if (v[0] === '2') {
                if (v[1] === '8') {
                    this.props.dispatch(ignite(this.props.rocket));
                }
            }
        } else {
            this.setState({
                codeLines: [],
                inputButtons: [ this.icons[0], this.icons[1], this.icons[2] ]
            });
            this.code = [];
        }
    }
    walkingSteps(robot, c) {
        if (c > 0 && !this.props.wrongMove) {
            this.props.dispatch(walk(this.props[robot], this.props.gameField));
            setTimeout(() => {
                this.walkingSteps(robot, --c);
            }, pace);
        } else if (c === 0 && !this.props.wrongMove) {
            document.getElementById(`${robot}_walk`) && document.getElementById(`${robot}_walk`).pause();
            document.getElementById(`${robot}_container`) && document.getElementById(`${robot}_container`).classList.remove('walk');
            this.runCode();
        } else {
            document.getElementById(`${robot}_walk`) && document.getElementById(`${robot}_walk`).pause();
            document.getElementById(`${robot}_container`) && document.getElementById(`${robot}_container`).classList.remove('walk');
        }
    }
    helpSteps() {
        this.setState({ helpSteps: true });
        document.getElementById('steps_buttons').play();
        setTimeout(() => {
            this.setState({ helpSteps: false });
        }, 3500);
    }
    helpShoot() {
        this.setState({ helpShoot: true });
        document.getElementById('shoot_button').play();
        setTimeout(() => {
            document.getElementById('lets_go').play();
            setTimeout(() => {
                this.setState({ helpShoot: false });
            }, 1000);
        }, 6000);
    }
    render() {
        this.props.wrongMove && this.resetCode();
        return (
            <section className="code_section">
                {((!this.props.rocket && this.props.lisa.star) || this.props.win) && <Link to={`${process.env.PUBLIC_URL}/welcome`}><Cheer /></Link>}
                {this.props.wrongMove && <Help />}
                {this.state.helpSteps && <img id="help_steps_lisa" src={`${process.env.PUBLIC_URL}/lisa.png`} alt="Lisa"></img>}
                {this.state.helpShoot && <img id="help_shoot_lisa" src={`${process.env.PUBLIC_URL}/lisa.png`} alt="Lisa"></img>}
                <span id="help_steps" onClick={() => this.state.helpSteps || this.helpSteps()} >?</span>
                <span id="help_shoot" onClick={() => this.state.helpShoot || this.helpShoot()} >?</span>
                <section className="script">
                    {this.state.codeLines.map(v => <div>{v.map(v => [<span className="code_spacer"></span>, this.icons[v]])}</div>)}
                    <img key="back_btn" id="back_btn" className="control_button" onClick={() => this.deleteCode()} src={`${process.env.PUBLIC_URL}/back.png`} alt="Back Btn"></img>
                </section>
                <section className="input">
                    {this.state.inputButtons}
                </section>
                <section className="shoot">
                    {this.shotsLeft.map(v => <img key={v} className="control_button" onClick={() => this.sendCode()} src={`${process.env.PUBLIC_URL}/shoot.png`} alt="Shot left"></img>)}
                </section>
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedCode = connect(mapStateToProps)(Code);

export default ConnectedCode;
