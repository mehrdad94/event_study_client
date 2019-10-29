import React from 'react'
import $ from 'jquery'
import { Dialog } from '../../components/Dialog/Dialog'
import PropTypes from "prop-types";

export class Help extends React.Component {
  DialogHeader = () => {
    return (
      <h5 className="m-0 dialog-title">How to use</h5>
    )
  }

  DialogBody = () => {
    return (
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h2 className="mb-0">
              <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne"
                      aria-expanded="true" aria-controls="collapseOne">
                Example with custom resources.
              </button>
            </h2>
          </div>

          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
               data-parent="#accordionExample">
            <div className="card-body">
              <p>
                1. Create A Category
              </p>

              <p>
                2. Download
                <a className="px-1"
                   href={process.env.PUBLIC_URL + "/data/price data.zip"}>
                   Apple and S&P500 prices
                </a>
                and unzip it (these data comes from yahoo finance).
              </p>

              <p>
                3. Create An Event: click on big plus icon, then
                copy and paste 2019-01-30 into dates input like the following image:
                <br/>
                <img className="my-3" width="100%" src={process.env.PUBLIC_URL + "/images/dates.png"} alt="dates picture"/>
                <br/>
                click on stock price input and load AAPL.csv from zip folder then load ^GSPC.csv in Market Price input like the the following image:
                <br/>
                <img className="my-3" width="100%" src={process.env.PUBLIC_URL + "/images/price inputs.png"} alt="inputs picture"/>
                <br/>
                finally hit done button and see your analysis results in result section:
                <br/>
                <img className="my-3" width="100%" src={process.env.PUBLIC_URL + "/images/analysis.png"} alt="analysis picture"/>
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h2 className="mb-0">
              <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                      data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Example with online resources.
              </button>
            </h2>
          </div>
          <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div className="card-body">
              <p>
                1. Create A Category
              </p>

              <p>
                2. Get an API key from
                <a href="https://www.alphavantage.co/support/#api-key"
                   className="px-1"
                   target="_blank">
                  Alphavantage website
                </a>
              </p>

              <p>
                3. Create An Event: click on big plus icon, then
                copy and paste 2019-01-30 into dates input like the following image:
                <br/>
                <img className="my-3" width="100%" src={process.env.PUBLIC_URL + "/images/dates.png"} alt="dates picture"/>
                <br/>
                Check external resources checkbox then type AAPL (apple symbol) in stock symbol input then type .INX (S&P500 symbol) in Market symbol input like the the following image:
                <br/>
                <img className="my-3" width="100%" src={process.env.PUBLIC_URL + "/images/external resource.png"} alt="external resource picture"/>
                <br/>
                Copy and paste your API key in Alphavantage Token input:
                <br/>
                <img className="my-3" width="100%" src={process.env.PUBLIC_URL + "/images/alphavantage input.png"} alt="alphavantage input picture"/>
                <br/>
                finally hit done button and see your analysis results in result section:
                <br/>
                <img className="my-3" width="100%" src={process.env.PUBLIC_URL + "/images/analysis.png"} alt="analysis picture"/>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    $('.collapse').collapse()
  }

  render () {
    return (<Dialog header={<this.DialogHeader/>}
                    body={<this.DialogBody/>}
                    isActive={this.props.isActive}
                    onModalClose={this.props.onModalClose}
                    />)
  }
}

Help.propTypes = {
  isActive: PropTypes.bool,
  onModalClose: PropTypes.func
}

Help.defaultProps = {
  isActive: true,
  onModalClose: () => {}
}
