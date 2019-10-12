import React from 'react'
import { Dialog } from '../../components/Dialog/Dialog'

export class Help extends React.Component {
  DialogHeader = () => {
    return (
      <h5 className="m-0 dialog-title">How to use</h5>
    )
  }

  DialogBody = () => {
    return (
      <h4 className="c-grey-900 mB-20">
        
      </h4>
    )
  }

  render () {
    return (<Dialog header={this.DialogHeader}/>)
  }
}