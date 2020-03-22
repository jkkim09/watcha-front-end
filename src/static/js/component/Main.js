import React, { Component } from 'react';
import * as actions from '../../../actions';
import {  connect } from 'react-redux';
import Spinner from '../component/Spinner';
import Header from '../component/Header';
import Set from '../component/Set';
import '../../css/Main.css'
import Game from '../../js/util/game'
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            game: {},
            game_number: this.props.setValue.game_number,
            time_number: this.props.setValue.time_number,
            game_state: this.props.setValue.game_state
        }
        this.userItemClick = this.userItemClick.bind(this)
        this.countCallback = this.countCallback.bind(this)
        this.endGameCallback = this.endGameCallback.bind(this)
        this.nextGameCallback = this.nextGameCallback.bind(this)
        this.selectCallback = this.selectCallback.bind(this)

        this.com_item = React.createRef();
        this.game = new Game()
    }

    /**
     * 설정 화면의 설정 값들이 변경 되었을때 game 의 옵션을 초기화한다.
     * 
     * @param {*} prevProps     화면이 렌더링 된후 변경 된 이전 prop
     */
    componentDidUpdate(prevProps) {
        if (this.props.setValue.game_number !== prevProps.setValue.game_number ||
            this.props.setValue.game_number_set !== prevProps.setValue.game_number_set ||
            this.props.setValue.time_number !== prevProps.setValue.time_number ||
            this.props.setValue.game_state !== prevProps.setValue.game_state) {
                this.game.init({
                    game_number: this.props.setValue.game_number,
                    time_number: this.props.setValue.time_number,
                    game_number_set: this.props.setValue.game_number_set,
                    game_state: this.props.setValue.game_state,
                    countCallback: this.countCallback,
                    endGameCallback: this.endGameCallback,
                    nextGameCallback: this.nextGameCallback,
                    selectCallback: this.selectCallback
                })
                this.setState({time_number: this.props.setValue.time_number})
                switch(this.props.setValue.game_state) {
                    case true:
                        this.game.start()
                        break;
                    default:
                        this.game.stop()
                        break;
                }
        }
    }

    /**
     * 유저가 선택한 item
     * 
     * @param {*} item 1:가위, 2:바위, 3:보
     */
    userItemClick(item) {
        if(this.props.setValue.game_state) {
            this.game.userSet(item)
            this.setState({time_number: this.props.setValue.time_number})
        } else {
            alert('start 후 시작 가능합니다.')
        }
    }

    /**
     * com 이 선택한 item을 callback
     * 화면에 선택한 item을 표현한다.
     * 
     * @param {*} item item 1:가위, 2:바위, 3:보
     */
    selectCallback(item) {
        this.com_item.current.classList.add('game_item' + item)
    }

    /**
     * time 이 있을경우 time_number Set
     * 있을경우 Count를 진행한다.
     * 
     * @param {*} time 
     */
    countCallback(time) {
        if(time) {
            this.setState({time_number: time})
        }else {
            if(this.props.setValue.time_number === this.state.time_number) {
                this.com_item.current.setAttribute('class', '')
            }
            this.setState({time_number: this.state.time_number - 1})
        }
    }

    /**
     * game 최종 종료 callback event
     */
    endGameCallback() {
        this.props.handleGameState({
            game_state: false
        })
        setTimeout(() => {
            alert('게임이 모두 종료 되었습니다')
            this.com_item.current.setAttribute('class', '')
            const score = this.game.checkScore()
            this.props.handleSetScore(score)
        }, 500)
    }

    /**
     * nextGame callbak
     * 다음게임 진행 하기위한 callback
     */
    nextGameCallback() {
        alert('다음 셋트 시작')
        this.com_item.current.setAttribute('class', '')
        this.game.nextGame()
    }

    render () {
        return (
            <div id="main_container" className="route-area">
                <Spinner view={this.state.spinner}/>
                <Header></Header>
                <div id="main_game_container">
                    <Set></Set>
                    <div id="main_game_board">
                        <div id="game_info_area">
                            <div>{this.state.time_number}</div>
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div id="game_user_area">
                                            <div className="game_item1" onClick={() => this.userItemClick(1)}></div>
                                            <div className="game_item2" onClick={() => this.userItemClick(2)}></div>
                                            <div className="game_item3" onClick={() => this.userItemClick(3)}></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div id="vs_item"></div>
                                    </td>
                                    <td>
                                        <div id="com_item" ref={this.com_item}>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        setValue: state.setValue
    }
}

const dispatchToProps = (dispatch) => {
    return {
        handleSetValue: (value) => {
            dispatch(actions.setValue(value))
        },
        handleGameState: (value) => {
            dispatch(actions.gameState(value))
        },
        handleSetScore: (value) => {
            dispatch(actions.setScore(value))
        }
    }
}

export default connect(stateToProps, dispatchToProps)(Main);