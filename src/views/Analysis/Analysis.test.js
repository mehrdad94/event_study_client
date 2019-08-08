import React from 'react'
import enzyme from '../../lib/enzyme'
import  'jest-canvas-mock'

import { Analysis, lineChartLineStyle, createLineChartDataSet } from './Analysis'

import { COLORS } from '../../lib/colors'

describe('Event list', function () {
  it('should generate line chart style', function () {
    let type

    type = '0'
    expect(lineChartLineStyle(type)).toEqual({
      backgroundColor: 'rgba(237, 231, 246, 0.5)',
      borderColor: COLORS['grey-500'],
      pointBackgroundColor: COLORS['grey-700'],
      borderWidth: 2,
      label: 'Neutral'
    })

    type = '1'
    expect(lineChartLineStyle(type)).toEqual({
      backgroundColor: 'rgba(237, 231, 246, 0.5)',
      borderColor: COLORS['green-500'],
      pointBackgroundColor: COLORS['green-700'],
      borderWidth: 2,
      label: 'Good News'
    })

    type = '-1'
    expect(lineChartLineStyle(type)).toEqual({
      backgroundColor: 'rgba(237, 231, 246, 0.5)',
      borderColor: COLORS['red-500'],
      pointBackgroundColor: COLORS['red-700'],
      borderWidth: 2,
      label: 'Bad News'
    })
  })

  it('should generate line chart data sets', function () {
    const data = [1, 2]
    expect(createLineChartDataSet(data, 1)).toEqual({
      data,
      ...lineChartLineStyle(1)
    })
  })

  it('should test getChartData method without analysis', function () {
    const wrapper = enzyme.shallow(<Analysis/>)

    expect(wrapper.instance().getChartData()).toEqual({
      labels: [],
      dataSets: [],
      chartLegend: ''
    })
  })

  it('should test getChartData method with one analysis', function () {
    const wrapper = enzyme.shallow(<Analysis/>)

    // get result for one event
    const event = {
      key: '123',
      date: '2019-07-25'
    }

    wrapper.setProps({
      activeEvents: [event]
    })

    const statsPerEvents = {
      [event.key]: {
        abnormalReturn: [1, 1, 1, 1, 1],
        returnDates: ['1', '2', '3', '4', '5'],
        CARS: [1],
        newsType: 1
      }
    }

    wrapper.setState({
      statsPerEvents
    })

    expect(wrapper.instance().getChartData()).toEqual({
      labels: statsPerEvents[event.key].returnDates,
      dataSets: [createLineChartDataSet(statsPerEvents[event.key].CARS, statsPerEvents[event.key].newsType)],
      chartLegend: 'CAR Stats for: ' + event.date
    })
  })

  it('should test getChartData method with more than one analysis', function () {
    const wrapper = enzyme.shallow(<Analysis/>)

    // get result for one event
    const event = {
      key: '123',
      date: '2019-07-25',
      ET2: 2,
      T1E: 2
    }
    const event2 = {
      key: '222',
      date: '2019-07-25'
    }
    const event3 = {
      key: '333',
      date: '2019-07-25'
    }

    wrapper.setProps({
      activeEvents: [event, event2, event3]
    })

    const statsPerEvents = {
      [event.key]: {
        abnormalReturn: [1, 1, 1, 1, 1],
        CARS: [1, 2, 3, 4, 5],
        newsType: 1
      },
      [event2.key]: {
        abnormalReturn: [1, 1, 1, 1, 1],
        CARS: [1],
        newsType: 0
      },
      [event3.key]: {
        abnormalReturn: [1, 1, 1, 1, 1],
        CARS: [1],
        newsType: -1
      }
    }

    wrapper.setState({
      statsPerEvents
    })

    const dataSets = {
      '1': createLineChartDataSet([...statsPerEvents[event.key].CARS], 1),
      '0': createLineChartDataSet([...statsPerEvents[event.key].CARS], 0),
      '-1': createLineChartDataSet([...statsPerEvents[event.key].CARS], -1)
    }

    const labels = [-2, -1, 0, 1]

    const chartLegend = 'CAAR Stats (Cumulative Average Abnormal Return):'

    expect(wrapper.instance().getChartData()).toEqual({
      dataSets: Object.values(dataSets),
      labels,
      chartLegend
    })
  })
})