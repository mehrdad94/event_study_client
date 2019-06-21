import React from 'react'
import PropTypes from 'prop-types'

export class Item extends React.Component {
    render () {
        const { onDeleteClick, onEditClick, title, description, descriptionColor } = this.props

        const color = descriptionColor === 'success' ? 'c-green-500' : 'c-red-500'

        return (
            <div className="peers fxw-nw ai-c p-20 bdB bgc-white bgcH-grey-50 cur-p">
                <div className="peer peer-greed">
                    <h6 className="mB-0 lh-1 fw-400 item-title">{title}</h6>
                    <small className={`lh-1 c-green-500 item-description ${color}`}>{description}</small>
                </div>

                <div className="peers">
                    <div className="peer">
                        <a href="#"
                           className="td-n c-deep-purple-500 cH-blue-500 fsz-md p-5 item-edit-btn"
                           onClick={onEditClick}>
                            <i className="ti-pencil"/>
                        </a>
                    </div>
                    <div className="peer">
                        <a href="#"
                           className="td-n c-red-500 cH-blue-500 fsz-md p-5 item-delete-btn"
                           onClick={onDeleteClick}>
                            <i className="ti-trash"/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

Item.propTypes = {
    onDeleteClick: PropTypes.func,
    onEditClick: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    descriptionColor: PropTypes.string
}

Item.defaultProps = {
    onDeleteClick: () => {},
    onEditClick: () => {},
    title: '',
    description: '',
    descriptionColor: ''
}
