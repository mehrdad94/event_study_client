import React from 'react'
import PropTypes from 'prop-types'
import './StocksItem.css'
export class StocksItem extends React.Component {
    onDeleteClick = event => {
        event.stopPropagation()
        this.props.onDeleteClick()
    }

    onEditClick = event => {
        event.stopPropagation()
        this.props.onEditClick()
    }

    render () {
        const { title, description, descriptionColor } = this.props

        const color = descriptionColor === 'success' ? 'c-green-500' : 'c-red-500'

        const activeClass = this.props.isActive ? 'bgc-grey-50' : ''

        return (
            <div className={`peers fxw-nw ai-c p-20 bdB bgc-white bgcH-grey-50 cur-p item ${activeClass}`} onClick={this.props.onItemClick}>
                <div className="peer peer-greed">
                    <h6 className="mB-0 fw-400 item-title stock-item-title">{title}</h6>
                    <small className={`lh-1 c-green-500 item-description ${color}`}>{description}</small>
                </div>

                <div className="peers">
                    <div className="peer">
                        <a href="#"
                           className="td-n c-deep-purple-500 cH-blue-500 fsz-md p-5"
                           onClick={this.onEditClick}>
                            <i className="ti-pencil"/>
                        </a>
                    </div>

                    <div className="peer">
                        <a href="#"
                           className="td-n c-red-500 cH-blue-500 fsz-md p-5 item-delete-btn"
                           onClick={this.onDeleteClick}>
                            <i className="ti-trash"/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

StocksItem.propTypes = {
    onDeleteClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onItemClick: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    descriptionColor: PropTypes.string,
    isActive: PropTypes.bool
}

StocksItem.defaultProps = {
    onDeleteClick: () => {},
    onEditClick: () => {},
    onItemClick: () => {},
    title: '',
    description: '',
    descriptionColor: '',
    isActive: false
}
