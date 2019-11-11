import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import DeleteIcon from '@material-ui/icons/Delete'


const tradeStyles = {
  display: 'flex',
  justifyContent: 'space-around',
  paddingBottom: 20
}

const tradeIconStyle = {
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 20
}

const deleteIconStyle = {
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 14
}

export default class Trades extends Component {

  render () {
    const { trades, removeTrade } = this.props;

    return (
      <div>
        { trades.map((trade, idx) => (
          <div key={idx} style={tradeStyles}>
            <div style={{flexGrow: 1}}>
              <p style={{marginBottom: 5}}>{trade.playerA.name}</p>
              <p style={{color:'grey', marginTop: 5}}>{trade.playerA.team}</p>
            </div>

            <div style={tradeIconStyle}>
              <SwapHorizIcon />
            </div>

            <div style={{flexGrow: 1}}>
              <p style={{marginBottom: 5}}>{trade.playerB.name}</p>
              <p style={{color:'grey' , marginTop: 5}}>{trade.playerB.team}</p>
            </div>

            <div style={deleteIconStyle}>
              <IconButton color='primary' onClick={() => {removeTrade(trade) }}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
