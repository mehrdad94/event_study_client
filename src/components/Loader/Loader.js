import React from 'react'
import './Loader.scss'

export class Loader extends React.Component {
    loaderClassName = () => {
        return this.props.active ? '' : 'fadeOut' // show or hide Loader
    }
    render() {
        return (
            <div id="loader"
                 className={this.loaderClassName()}>
                <div className="spinner"/>
            </div>
        )
    }
}