import React from 'react'
import { Item } from '../../components/Item/Item'
import './StocksList.scss'

export class StocksList extends React.Component {
    render () {
        return (
            <div className="peer stocks-list">
                <div className="layers h-100">
                    <div className="bdB layer w-100 pos-r">
                        <input type="text" placeholder="Search contacts..." name="chatSearch"
                               className="form-constrol p-15 bdrs-0 w-100 bdw-0"/>
                        <button type="button" className="btn btn-warning bdrs-50p w-2r p-0 h-2r pos-a r-10 t-10">
                            <i className="ti-plus"/>
                        </button>
                    </div>

                    <div className="layer w-100 fxg-1 scrollable pos-r">
                        <Item title="John Doe" description="Online" descriptionColor="success"/>
                    </div>
                </div>
            </div>
        )
    }
}
