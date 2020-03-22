class Config {
    constructor(options) {
        if(options) {
            this.conf = options
        }
        this.count = 0
        this.com = 0
        this.user = 0
        this.checkSetIndex = {}
    }

    /**
     * game init options 설정
     * 
     * @param {*} options   game inti options
     */
    set(options) {
        this.conf = options
    }

    /**
     * get init option
     */
    get() {
        return this.conf
    }

    /**
     * init option 값을 key로 가져온다
     * 
     * @param {*} key init option ket value set
     */
    getKey(key) {
        return this.conf[key]
    }

    /**
     * count를 정한다
     * 
     * @param {*} value count value
     */
    setCount(value) {
        this.count = value
    }

    /**
     * count값을 가져온다
     */
    getCount() {
        return this.count
    }
    
    /**
     * com item setting
     * 
     * @param {*} value com set item
     */
    setCom(value) {
        this.com = value
    }

    /**
     * get com item
     */
    getCom() {
        return this.com
    }

    /**
     * user item setting
     * @param {*} value user set item
     */
    setUser(value) {
        this.user = value
    }

    /**
     * get user item
     */
    getUser() {
        return this.user
    }

    getGameSetIndex() {
        return this.checkSetIndex
    }

    /**
     * 현재 game set의 결과를 저장한다.
     * @param {*} value 결과 값
     * @param {*} index game 셋트 값
     */
    setGameSetIndex(value, index) {
        if(!this.checkSetIndex[index]){
            this.checkSetIndex[index] = []
            this.checkSetIndex[index].push(value)
        }else {
            this.checkSetIndex[index].push(value)
        }
    }

    clearGameSetIndex() {
        this.checkSetIndex = {}
    }
}

export default Config