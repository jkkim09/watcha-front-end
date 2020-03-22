import React, { Component } from 'react'
import * as actions from '../../../actions';
import {  connect } from 'react-redux';
import '../../css/Set.css'

class Set extends Component {
    constructor(props) {
        super(props)
        this.state = {
            game_number: 1,
            game_number_set: 1,
            time_number: 5,
            game_state: false,
            score_value: [],
            result: ''
        }
        this.setClick = this.setClick.bind(this)
        this.setStart = this.setStart.bind(this)
        this.setChange = this.setChange.bind(this)
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.setValue.game_state !== prevProps.setValue.game_state) {
            this.setState({game_state: this.props.setValue.game_state})
        }

        if (this.props.setScore !== prevProps.setScore) {
            this.setState({
                score_value: this.props.setScore.score.returnScore,
                result: this.props.setScore.score.result
            })
        }
    }

    /**
     * 설정버튼
     */
    setClick() {
        if(!this.state.game_state) {
            this.props.handleSetValue({
                game_number: parseInt(this.state.game_number),
                time_number: parseInt(this.state.time_number),
                game_number_set: parseInt(this.state.game_number_set)
            })
            alert('설정 완료')
        }
    }

    /**
     * game start 버튼
     */
    setStart() {
        this.setState({game_state: !this.state.game_state})
        this.props.handleGameState({
            game_state: !this.state.game_state
        })
    }

    /** 
     * input 설정 내용 변경시 onChange event
     * 
     * @param {*} e change event 
     */
    setChange(e) {
        const set = {}
        set[e.target.name] = e.target.value
        this.setState(set)
    }

    render() {
        return (
            <div id="set_container">
                <div>
                    <div className="set_title">세트당 게임 횟수</div>
                    <input type="number" min="1" className="set_input"
                    name="game_number"
                    placeholder="1세트 게임 횟수 입력" value={this.state.game_number}
                    onChange={this.setChange}></input>
                    <div className="set_line"></div>

                    <div className="set_title m-t-20">새트수</div>
                    <input type="number" min="1" className="set_input"
                    name="game_number_set"
                    placeholder="새트수 입력" value={this.state.game_number_set}
                    onChange={this.setChange}></input>
                    <div className="set_line"></div>

                    <div className="set_title m-t-20">제한시간</div>
                    <input type="number" min="1" className="set_input"
                    name="time_number"
                    placeholder="선택 제한시간 입력" value={this.state.time_number}
                    onChange={this.setChange}></input>
                    <div className="set_line"></div>
                    <div className="set_button" onClick={this.setClick}>설정</div>
                    <div className="set_button" onClick={this.setStart}>
                        {!this.state.game_state?'START':"STOP"}
                    </div>
                    <div id="score_area">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Set</td>
                                    <td>승</td>
                                    <td>폐</td>
                                    <td>무</td>
                                    <td>승/폐</td>
                                </tr>
                                {this.state.score_value.map((item, index) => 
                                    <tr key={index}>
                                        <td>{index + 1 + '세트'}</td>
                                        <td>{!item['20']? 0 : item['20']}</td>
                                        <td>{!item['30']? 0 : item['30']}</td>
                                        <td>{!item['10']? 0 : item['10']}</td>
                                        <td>{item['40'] === 10 ? '무' : item['40'] === 20 ? '승' : '폐'}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div id="result_area">
                        {this.state.result ?('최종적으로 ' + this.state.result + ' 하였습니다.'): ''}
                    </div>
                </div>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        setValue: state.setValue,
        setScore: state.setScore
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

export default connect(stateToProps, dispatchToProps)(Set)