import React from 'react'
import PropTypes from 'prop-types'

export class PriceTable extends React.Component {
    renderHeaders = () => {
        return this.props.headers.map((header, index) => (
            <th className="bdwT-0" key={index}>
                { header }
            </th>
        ))
    }

    renderCells = row => {
        return Object.values(row).map((value, index) => (
            <td key={index}>{value}</td>
        ))
    }

    renderRows = () => {
        return this.props.rows.map((row, index) => (
            <tr key={index}>
                {this.renderCells(row)}
            </tr>
        ))
    }

    render () {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            {this.renderHeaders()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

PriceTable.propTypes = {
    headers: PropTypes.array,
    rows: PropTypes.array
}

PriceTable.defaultProps = {
    headers: [],
    rows: []
}
