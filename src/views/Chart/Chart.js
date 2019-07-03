import React from 'react'
import { connect } from 'react-redux'
import { LineChart } from '../../components/LineChart/LineChart'

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const dataSets = [[70, 75, 85, 70, 75, 85, 70]]

const props = {
    labels,
    dataSets
}

const News = props => {
    const getIconCLass = type => {
        if (type === 'bad') {
            return 'fa fa-level-down c-red-500'
        } else if (type === 'good') {
            return 'fa fa-level-up c-green-500'
        } else {
            return 'fa fa-level-up c-green-500'
        }
    }

    return (
        <div className="peer fw-600">
            <span className="fsz-def fw-600 mR-10 c-grey-800">
                {props.content}
                <i className={getIconCLass(props.type)}/>
            </span>
                <small className="c-grey-500 fw-600">{props.title}</small>
        </div>
    )
}

export class Chart extends React.Component {
    render () {
        return (
            <div className="bd bgc-white">
                <div className="layers">
                    <div className="layer w-100 pX-20 pT-20">
                        <h6 className="lh-1">CAR Stats</h6>
                    </div>
                    <div className="layer w-100 p-20">
                        <LineChart {...props}/>
                    </div>
                    <div className="layer bdT p-20 w-100">
                        <div className="peers ai-c jc-c gapX-20">
                            <News type="good" content="10% " title="Significant Test"/>
                            <News type="bad" content="22% " title="News Type"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        stats: state.stats
    }
}

export default connect(mapStateToProps)(Chart)
