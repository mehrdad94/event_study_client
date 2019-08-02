import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export class FormFile extends React.Component {
  handleChange = event => {
    if (this.props.onChange) this.props.onChange(event)
  }

  render () {
    return (
      <Fragment>
        <label className="fw-500"
               htmlFor={this.props.identifier}>{this.props.inputLabel}</label>

        <input type="file"
               accept={ this.props.accept }
               onClick={e => { e.target.value = null }}
               onChange={this.handleChange}
               className={"form-control-file bdc-grey-200" + (this.props.invalidFeedback ? ' is-invalid' : '') }
               id={this.props.identifier}/>

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

FormFile.propTypes = {
  inputLabel: PropTypes.string,
  invalidFeedback: PropTypes.string,
  onChange: PropTypes.func,
  accept: PropTypes.string,
  identifier: PropTypes.string
}

export default FormFile
