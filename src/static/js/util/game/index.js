import Config from './config'

class Game {
    constructor(options) {
        this.config = new Config(options)
        this.countInter = {}
        this.game_number = 1
        this.game_number_set = 1
    }

    /**
     * 게임 초기화 옵션
     * 
     * @param {*} options  game 초기화 options
     */
    init(options) {
        this.config.set(options)
    }


    getGameNumber() {
        return this.game_number
    }

    setGameNumber(value) {
        this.game_number = value
    }

    getGameNumberSet() {
        return this.game_number_set
    }

    setGameNumberSet(value) {
        this.game_number_set = value
    }

    getComSelect() {
        return this.config.getCom()
    }

    start() {
        this.config.clearGameSetIndex()
        this.nextGame()
    }

    /**
     * 게임을 정지한다
     * 
     * gmae stop function
     */
    stop() {
        clearInterval(this.countInter)
        this.config.setCount(0)
        this.getGameNumberSet(1)
    }

    /**
     * 다음 게임을 설정한다
     * 
     * next game function
     */
    nextGame() {
        this.config.setCount(0)
        this.config.setCom(this.computerSet())
        this.counterStart(this.config.get());
    }

    /**
     * 세임 회차회 set를 확인하여 nextGame 여부를 확인하여 
     * 진행한다
     */
    nextGameCheck() {
        const nextGameCallback = this.config.getKey('nextGameCallback')
        const getConfig = this.config.get();
        this.setGameNumber(this.getGameNumber() + 1)
        if(getConfig.game_number < this.getGameNumber()) {
            this.setGameNumber(1)
            this.setGameNumberSet(this.getGameNumberSet() + 1)
            if(getConfig.game_number_set < this.getGameNumberSet()) {
                this.setGameNumberSet(1)
                const endGameCallback = this.config.getKey('endGameCallback')
                endGameCallback.call(this)
            }else {
                nextGameCallback.call(this);
            }
        } else {
            this.nextGame();
        }
    }

    computerSet() {
        //1 가위, 2 바위, 3 보
        const number = Math.floor(Math.random() * 3) + 1
        return number
    }

    userSet(item) {
        this.config.setUser(item)
        clearInterval(this.countInter)
        this.currentGameCheck(item, this.config.getCom())
        
        setTimeout(()=> {
            this.nextGameCheck()
        }, 500)
    }

    /**
     * count 를 실행한다.
     * 
     * @param {*} options   count options+
     */
    counterStart(options) {
        const countCallback = this.config.getKey('countCallback')
        this.countInter = setInterval(() => {
            const count = this.config.getCount() + 1
            this.config.setCount(count)
            countCallback.call(this)
            if(options.time_number === count) {
                clearInterval(this.countInter)
                this.config.setCount(0)
                //10 무승부, 20 유저승리, 30 컴 승리
                this.config.setGameSetIndex(30, this.getGameNumberSet())
                this.nextGameCheck()
                countCallback.call(this, options.time_number)
            }
        }, 1000)
    }

    /**
     * 현재 게임의 결과 확인
     * 
     * @param {*} user  user 선택 item
     * @param {*} com   com 선택 item
     */
    currentGameCheck(user, com) {
        let state = 10;
        //1 가위, 2 바위, 3 보
        //10무승부, 20 유저승, 30 com승
        if(user !== com) {
            if((user === 1 && com === 3) || (user === 2 && com === 1) || (user === 3 && com === 2)) {
                state = 20  
            } else {
                state = 30
            }
        }
        const selectCallback = this.config.getKey('selectCallback')
        selectCallback.call(this, com)

        this.config.setGameSetIndex(state, this.getGameNumberSet())
    }

    /**
     * 최종 Score를 계산.
     */
    checkScore() {
        //10무승부, 20 유저승, 30 com승
        const returnScore = []
        let totalScore = {}
        let result
        let win = 0
        let lose = 0
        let draw = 0
        const scoreList = this.config.getGameSetIndex()
        for (const i in scoreList) {
            const obj = {}
            const item = scoreList[i]
            for(const i in item) {
                const index_item = item[i]
                if(!obj[index_item]) {
                    obj[index_item] = 1
                }else {
                    obj[index_item] = obj[index_item] + 1
                }
            }

            if ((obj['20'] || 0)> (obj['30'] || 0)) {
                win += 1
                obj['40'] = 20
            }else if((obj['20'] || 0) < (obj['30'] || 0)) {
                lose += 1
                obj['40'] = 30
            }else {
                draw += 1
                obj['40'] = 10
            }
            returnScore.push(obj)
        }

        if (win > lose) {
            result = 'Win'
        } else if(win < lose) {
            result= 'Lose'
        } else {
            result = 'Draw'
        }
        return {
            returnScore: returnScore,
            result: result
        }
    }
}

export default Game;