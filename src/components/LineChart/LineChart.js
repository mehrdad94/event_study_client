import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'

let chart

export class LineChart extends React.Component {
    getChartData = () => {
        const labels = this.props.labels
        const dataSets = this.props.dataSets

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
                    display: true
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
