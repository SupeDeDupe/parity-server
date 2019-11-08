import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Roster from './Roster'
import { flatten, filter, includes, map } from 'lodash'

export default class Team extends Component {
  render () {
    const { score, players, game } = this.props

    const events = flatten(map(game.points, (p) => p.events))
    const teamEvents = filter(events, (ev) => {
      return includes(players, ev.firstActor)
    })

    const defenseEvents = filter(teamEvents, (ev) => ev.type === 'DEFENSE')
    const passEvents = filter(teamEvents, (ev) => ev.type === 'PASS')
    const throwAwayEvents = filter(teamEvents, (ev) => ev.type === 'THROWAWAY')
    const dropEvents = filter(teamEvents, (ev) => ev.type === 'DROP')

    return (
      <React.Fragment>
        <Paper style={{marginBottom: 20}}>
          <Table size="small">
            <TableBody>
              <TableRow hover>
                <TableCell>
                  <strong>Points</strong>
                </TableCell>
                <TableCell>
                  <strong>{score}</strong>
                </TableCell>
              </TableRow>

              { this.renderStat('Defense', defenseEvents.length) }
              { this.renderStat('Completions', passEvents.length) }
              { this.renderStat('Throw Aways', throwAwayEvents.length) }
              { this.renderStat('Drops', dropEvents.length) }
            </TableBody>
          </Table>
        </Paper>

        <Paper>
          <Roster players={players} />
        </Paper>
      </React.Fragment>
    )
  }

  renderStat(name, value) {
    return (
      <TableRow hover>
        <TableCell>
          {name}
        </TableCell>
        <TableCell>
          {value}
        </TableCell>
      </TableRow>
    )
  }
}