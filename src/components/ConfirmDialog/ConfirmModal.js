import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

export class ConfirmModal extends React.Component {
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
        const { question } = this.props
        return (
            <div className="modal fade" ref='modal'>
                <div className="modal-dialog confirm-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div>
                                <div className="fw-600 question p-15">
                                    {question}
                                </div>
                                <div className="text-right">
                                    <button className="btn cur-p m-5" data-dismiss="modal">No</button>
                                    <button className="btn btn-primary cur-p m-5" onClick={this.onAccept}>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ConfirmModal.propTypes = {
    isActive: PropTypes.bool,
    question: PropTypes.string,
    onModalClose: PropTypes.func,
    onModalOpen: PropTypes.func,
    onAccept: PropTypes.func,
}

ConfirmModal.defaultProps = {
    isActive: false,
    question: '',
    onModalClose: () => {},
    onModalOpen: () => {},
    onAccept: () => {}
}