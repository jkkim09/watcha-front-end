import React, {Component} from 'react'
import '../../css/Spinner.css'

class Spinner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view: this.props.view
        }
    }
    
    render() {
        const spinner_el = <div id="spinner-containner">
                                <div></div>
                                <table id="spinner-containner-table">
                                    <tbody>
                                        <tr>
                                            <th>
                                                <div className="sk-cube-grid">
                                                    <div className="sk-cube sk-cube1"></div>
                                                    <div className="sk-cube sk-cube2"></div>
                                                    <div className="sk-cube sk-cube3"></div>
                                                    <div className="sk-cube sk-cube4"></div>
                                                    <div className="sk-cube sk-cube5"></div>
                                                    <div className="sk-cube sk-cube6"></div>
                                                    <div className="sk-cube sk-cube7"></div>
                                                    <div className="sk-cube sk-cube8"></div>
                                                    <div className="sk-cube sk-cube9"></div>
                                                </div>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
        return (
            this.props.view && spinner_el
        )
    }
}

export default Spinner;