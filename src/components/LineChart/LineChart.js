import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'
import { COLORS } from '../../lib/colors'

export class LineChart extends React.Component {
    initChart = () => {
        const lineChartBox = this.refs.lineChart
        const labels = this.props.labels
        const dataSets = this.props.dataSets.map((data, index) => ({
                label: `Series ${index}`,
                backgroundColor: 'rgba(237, 231, 246, 0.5)',
                borderColor: COLORS['deep-purple-500'],
                pointBackgroundColor: COLORS['deep-purple-700'],
                borderWidth: 2,
                data
            })
        )

        const lineCtx = lineChartBox.getContext('2d')
        lineChartBox.height = 80

        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels,
                datasets: dataSets
            },
            options: {
                legend: {
                    display: false,
                }
            }
        })
    }

    componentDidMount() {
        this.initChart()
    }

    render () {
        return (<canvas className="line-chart" ref="lineChart" height="220"/>)
    }
}

LineChart.propTypes = {
    labels: PropTypes.array,
    dataSets:PropTypes.array
}

LineChart.defaultProps = {
    labels: [],
    dataSets: []
}
