import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import format from 'date-fns/format'
import Event from './Event'
import { last, includes } from 'lodash'
import { Button } from '@material-ui/core'

export default class Points extends Component {
  state = {
    expanded: []
  }

  expandAll = () => {
    const game = this.props.game
    const points = game.points
    const expanded = points.map((p, idx) => idx)
    this.setState({expanded})
  }

  collapseAll = () => {
    this.setState({expanded: []})
  }

  handleClick = (expanded, idx) => {
    if (expanded) {
      this.setState({
        expanded:  this.state.expanded.filter(x => x !== idx)
      })
    } else {
      this.setState({
        expanded: [...this.state.expanded, idx]
      })
    }
  }

  render () {
    const game = this.props.game
    const points = game.points

    let homeScore = 0
    let awayScore = 0

    return (
      <React.Fragment>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant="h5" style={{marginTop: 15}}>
            Points
          </Typography>
          { this.renderButton() }
        </div>
        <List>
          { points.map((point, idx) => {
            const result = this.renderPoint(point, homeScore, awayScore, idx)
            homeScore = result.homeScore
            awayScore = result.awayScore
            return result.jsx
          })}
        </List>
      </React.Fragment>
    )
  }

  renderButton () {
    const game = this.props.game
    const points = game.points

    if (points.length === this.state.expanded.length) {
      return (
        <Button onClick={this.collapseAll}>
          Collapse All <ExpandLess />
        </Button>
      )
    } else {
      return (
        <Button onClick={this.expandAll}>
          Expand All <ExpandMore />
        </Button>
      )
    }
  }

  renderPoint (point, homeScore, awayScore, idx) {
    const game = this.props.game

    const events = point.events;
    const firstEvent = events[0]
    const lastEvent = last(events)
    const secondLastEvent = events[events.length - 2]

    const receiver = lastEvent.firstActor

    const thrower = secondLastEvent.type === 'PASS'
      ? secondLastEvent.firstActor
      : null

    const homeScored = includes(game.homeRoster, receiver)
    const teamName = homeScored
      ? game.homeTeam
      : game.awayTeam

    const homeColor = '#98abc5'
    const awayColor = '#ff8c00'
    const teamColor = homeScored
      ? homeColor
      : awayColor

    const teamJsx = <strong style={{color: teamColor}}>{teamName}</strong>

    const breakPoint = includes(point.defensePlayers, receiver)

    const whatCopy = breakPoint
      ? 'Break Point'
      : 'Point'

    const iconJsx = breakPoint
      ? (<FontAwesomeIcon icon={faBolt}/>)
      : null

    const whoCopy = thrower
      ? `${thrower} to ${receiver}`
      : receiver

    const startTime = new Date(firstEvent.timestamp)
    const endTime = new Date(lastEvent.timestamp)

    const duration = format(endTime - startTime, "m:ss")
    const durationCopy = `(${duration} minutes)`

    if (homeScored) {
      homeScore = homeScore + 1
    } else {
      awayScore = awayScore + 1
    }

    const scoreCopy = `${homeScore} - ${awayScore}`

    const expanded = includes(this.state.expanded, idx)

    const pointsJsx = (
      <React.Fragment key={idx}>
        <ListItem button onClick={() => this.handleClick(expanded, idx)}>
          <ListItemText>
            <div style={{display: 'flex', flex: 1, justifyContent: 'space-between'}}>
              <span>{iconJsx} {whatCopy} {teamJsx} {whoCopy} {durationCopy}</span>
              <span style={{minWidth: 44}}>{scoreCopy}</span>
            </div>
          </ListItemText>
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List style={{paddingLeft: 20}}>
            { point.events.map((ev, idx) => <Event key={idx} event={ev} />) }
          </List>
        </Collapse>
      </React.Fragment>
    )

    return {
      homeScore,
      awayScore,
      jsx: pointsJsx
    }
  }
}