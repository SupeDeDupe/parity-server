import $ from 'jquery';
import _ from 'lodash';
import React, { Component } from 'react';
import Griddle from 'griddle-react';

const columns = [
  'Name',
  'Goals',
  'Assists',
  '2nd Assist',
  'D-Blocks',
  'Catches',
  'Completions',
  'Throwaways',
  'Drops'
];

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      week: 1,
      stats: null
    };
  }

  componentWillMount() {
    this._fetchWeek(this.state.week);
  }

  _fetchWeek(num) {
    $.get(`/weeks/${num}`, (result) => {
      this.setState({ stats: result.stats, loading: false });
    });
  }

  render() {
    if(this.state.loading) return (
      <div>
        Loading ...
      </div>
    );

    let stats = this.state.stats;
    let statsArray = _.map(_.keys(stats), (k) => {
      return { Name: k, ...stats[k] }
    });

    return (
      <Griddle
        results={statsArray}
        resultsPerPage={statsArray.length}
        columns={columns}
        showFilter={true}
        showSettings={true}
        showPager={false}
        filterPlaceholderText={'Search players ...'}
        settingsText={'More stats'}
      />
    );
  }
}
