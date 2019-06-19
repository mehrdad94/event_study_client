import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

let jqueryModalRef

export class ConfirmModal extends React.Component {
    static showModal () {
        jqueryModalRef.modal('show')
    }

    static hideModal () {
        jqueryModalRef.modal('hide')
    }

    componentDidMount () {
        jqueryModalRef = $(this.refs.modal)

        jqueryModalRef.on('hidden.bs.modal', e => { this.props.onModalClose(e) })

        jqueryModalRef.on('shown.bs.modal', e => { this.props.onModalOpen(e) })

        if (this.props.isActive) ConfirmModal.showModal()
    }

    componentDidUpdate (prevProps) {
        if (this.props.isActive !== prevProps.isActive) {
            this.props.isActive ? ConfirmModal.showModal() : ConfirmModal.hideModal()
        }
    }

    render() {
        const { question } = this.props
        return (
            <div className="modal fade" ref='modal'>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <form>
                                <div className="fw-600 question p-15">
                                    {question}
                                </div>
                                <div className="text-right">
                                    <button className="btn cur-p m-5" data-dismiss="modal">No</button>
                                    <button className="btn btn-primary cur-p m-5" data-dismiss="modal">Yes</button>
                                </div>
                            </form>
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
    onModalOpen: PropTypes.func
}

ConfirmModal.defaultProps = {
    isActive: false,
    question: '',
    onModalClose: () => {},
    onModalOpen: () => {}
}