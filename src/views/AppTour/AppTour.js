import React from 'react'
import { connect } from 'react-redux'
import Tour from 'reactour'
import { setIsFirstTimeVisit } from '../../redux/actions'

const steps = [
  {
    selector: '.category-name-input',
    content: 'Specify name of your category first, for example, "Apple Net Incomes" it\'s just for organizing events better.',
  },
  {
    selector: '.category-add-btn',
    content: 'Add that Category',
  },
  {
    selector: '.open-setting-btn',
    content: 'Set your defaults...'
  },
  {
    selector: '.header-export-btn',
    content: 'Save and download your data.'
  },
  {
    selector: '.header-import-btn',
    content: 'Load your saved data sets.'
  }
]

export class AppTour extends React.Component {
  closeTour = () => {
    this.props.setIsFirstTimeVisit(false)
  }

  render() {
    return (
      <Tour isOpen={this.props.isFirstTimeVisit}
            steps={steps}
            rounded={4}
            onRequestClose={this.closeTour}/>
    )
  }
}

const mapStateToProps = state => {
  return {
    isFirstTimeVisit: state.application.isFirstTimeVisit
  }
}

const actionCreator = {
  setIsFirstTimeVisit
}

export default connect(mapStateToProps, actionCreator)(AppTour)
