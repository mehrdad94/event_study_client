import React from 'react'
import PropTypes from 'prop-types'
import Tour from 'reactour'

const steps = [
  {
    selector: '.event-dialog-title-input',
    content: 'Specify title of your event, for example "CEO died".'
  },
  {
    selector: '.event-dialog-date-input',
    content: 'Specify date of the event. attention, the date format must match with data source date format.'
  },
  {
    selector: '.event-dialog-external-resource-checkbox',
    content: 'By checking this check box data source will be downloaded from external api.'
  },
  {
    selector: '.event-dialog-analysis-model-checkbox',
    content: 'When checkbox is checked we use market model as analysis model, in otherwise we use constant mean model as analysis model.'
  },
  {
    selector: '.event-dialog-alphavantage-token-input',
    content: 'For using external resources you need to sign up in alphavantage website, then import your token here.'
  }
]

export class EventDialogTour extends React.Component {
  state = {
    isOpen: this.props.isOpen
  }

  closeTour = () => {
    this.props.onRequestClose()
  }

  render() {
    return (
      <Tour isOpen={this.props.isOpen}
            steps={steps}
            rounded={4}
            onRequestClose={this.closeTour}/>
    )
  }
}

EventDialogTour.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func
}

EventDialogTour.defaultProps = {
  isOpen: false,
  onRequestClose: () => {}
}

export default EventDialogTour
