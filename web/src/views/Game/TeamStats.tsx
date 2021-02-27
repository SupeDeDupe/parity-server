import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { flatten, filter, includes, map } from 'lodash'
import { Point } from '../../api'

interface TeamStatsProps {
  score: number;
  players: string[];
  points: Point[];
}

export default function TeamStats(props: TeamStatsProps) {
  const { score, players, points } = props

  const events = flatten(map(points, (p) => p.events))
  const teamEvents = filter(events, (ev) => {
    return includes(players, ev.firstActor)
  })

  const defenseEvents = filter(teamEvents, (ev) => ev.type === 'DEFENSE')
  const passEvents = filter(teamEvents, (ev) => ev.type === 'PASS')
  const throwAwayEvents = filter(teamEvents, (ev) => ev.type === 'THROWAWAY')
  const dropEvents = filter(teamEvents, (ev) => ev.type === 'DROP')
  const completions = passEvents.length - dropEvents.length

  const renderStat = (name: string, value: number) => (
    <TableRow hover>
      <TableCell>
        {name}
      </TableCell>
      <TableCell>
        {value}
      </TableCell>
    </TableRow>
  )

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

            { renderStat('Defense', defenseEvents.length) }
            { renderStat('Completions', completions) }
            { renderStat('Throw Aways', throwAwayEvents.length) }
            { renderStat('Drops', dropEvents.length) }
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  )
}
