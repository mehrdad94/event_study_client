import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'
import { COLORS } from '../../lib/colors'

let chart

export class LineChart extends React.Component {
    getChartData = () => {
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

        return {
            labels,
            dataSets
        }
    }

    initChart = () => {
        const lineChartBox = this.refs.lineChart

        const { labels, dataSets } = this.getChartData()

        const lineCtx = lineChartBox.getContext('2d')
        lineChartBox.height = 80

        chart = new Chart(lineCtx, {
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

    updateChart = () => {
        const { labels, dataSets } = this.getChartData()

        chart.data.labels = labels
        chart.data.datasets = dataSets
        chart.update()
    }

    componentDidMount() {
        this.initChart()
    }

    componentDidUpdate (prevProps) {
        if (prevProps.labels !== this.props.labels || prevProps.dataSets !== this.props.dataSets) {
            this.updateChart()
        }
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
