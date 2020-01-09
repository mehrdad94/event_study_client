import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

export class Dialog extends React.Component {
  showModal = () => {
    this.refs.modal.modal('show')
  }

  hideModal = () => {
    this.refs.modal.modal('hide')
  }

  onAccept = () => {
    this.hideModal()
    this.props.onAccept()
  }

  componentDidMount () {
    this.refs.modal = $(this.refs.modal)

    this.refs.modal.on('hidden.bs.modal', e => { this.props.onModalClose(e) })

    this.refs.modal.on('shown.bs.modal', e => { this.props.onModalOpen(e) })

    if (this.props.isActive) this.showModal()
  }

  componentDidUpdate (prevProps) {
    if (this.props.isActive !== prevProps.isActive) {
      this.props.isActive ? this.showModal() : this.hideModal()
    }
  }

  render() {
    return (
      <div className="modal fade" ref='modal'>
        <div className="modal-dialog confirm-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            {
              this.props.header ? (
                <div className="bd p-15">
                  { this.props.header }
                </div>
              ) : null
            }

            {
              this.props.body ? (
                <div className="modal-body">
                  { this.props.body }
                </div>
              ) : null
            }

            {
              this.props.footer ? (
                <div className="text-right modal-footer">
                  { this.props.footer }
                </div>
              ) : null
            }
          </div>
        </div>
      </div>
    )
  }
}

Dialog.propTypes = {
  isActive: PropTypes.bool,
  onModalClose: PropTypes.func,
  onModalOpen: PropTypes.func,
  onAccept: PropTypes.func,
  header: PropTypes.object,
  body: PropTypes.object,
  footer: PropTypes.object
}

Dialog.defaultProps = {
  isActive: false,
  question: '',
  onModalClose: () => {},
  onModalOpen: () => {},
  onAccept: () => {}
}
