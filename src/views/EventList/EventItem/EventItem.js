import React from 'react'

export class EventItem extends React.Component {
    render() {
        const { title, description, date } = this.props
        return (
            <li className="bdB peers ai-c jc-sb fxw-nw">
                <a href="javascript:void(0);"
                   data-toggle="modal"
                   className="td-n p-20 peers fxw-nw mR-20 peer-greed c-grey-900">
                    <div className="peer">
                        <span className="fw-600 eventItemTitle">{title}</span>
                        <div className="c-grey-600">
                            <span className="c-grey-700 eventItemDate">{date} - </span>
                            <i className="eventItemDescription">{description}</i>
                        </div>
                    </div>
                </a>
                <div className="peers mR-15">
                    <div className="peer">
                        <a href="#" className="td-n c-deep-purple-500 cH-blue-500 fsz-md p-5">
                            <i className="ti-pencil"/>
                        </a>
                    </div>
                    <div className="peer">
                        <a href="#" className="td-n c-red-500 cH-blue-500 fsz-md p-5">
                            <i className="ti-trash"/>
                        </a>
                    </div>
                </div>
            </li>
        )
    }
}
