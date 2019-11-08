import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

export default class TeamTable extends Component {
  state = {
    playerB: ''
  }

  render () {
    const { players, playerA, playerB } = this.props;
    const playerNames = players.map(p => p.name)

    return (
      <Dialog
          open={this.props.open}
          onClose={this.props.onClose}
          maxWidth="sm"
          fullWidth
        >
        { this.props.open &&
          <React.Fragment>
            <DialogTitle>Trade {playerA} </DialogTitle>
            <DialogContent style={{minHeight: 200}}>
              <DialogContentText>
                Trade {playerA} for:
              </DialogContentText>
              <Autocomplete
                value={playerB}
                options={playerNames}
                onChange={this.props.playerBChanged}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField {...params} variant="outlined" fullWidth />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.onClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.props.submitTrade} color="primary">
                Trade
              </Button>
            </DialogActions>
          </React.Fragment>
        }
      </Dialog>
    )
  }
}
