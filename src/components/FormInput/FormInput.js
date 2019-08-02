import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export class FormInput extends React.Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }

  componentDidUpdate (prevProps) {
    // @todo check before update
    this.inputRef.current.value = this.props.inputValue
  }

  render () {
    return (
      <Fragment>
        <label className="fw-500">{this.props.inputLabel}</label>

        <input className={"form-control bdc-grey-200" + (this.props.invalidFeedback ? ' is-invalid' : '') }
               onChange={this.props.onChange}
               ref={this.inputRef}
               defaultValue={this.props.inputValue}/>

        {
          this.props.invalidFeedback ? (
            <div className="invalid-feedback">
              {this.props.invalidFeedback}
            </div>
          ) : null
        }
      </Fragment>
    )
  }
}

FormInput.propTypes = {
  inputValue: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  inputLabel: PropTypes.string,
  invalidFeedback: PropTypes.string,
  onChange: PropTypes.func
}

export default FormInput
