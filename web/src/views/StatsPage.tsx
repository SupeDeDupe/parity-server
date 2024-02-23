import React from 'react'
import Layout from '../layout'
import Loading from '../components/Loading'
import StatsFilters from '../components/StatsFilters'
import { useLeague } from '../hooks/league'
import { useStats } from '../hooks/stats'
import { Stats } from '../api'
import { map, keys } from 'lodash'

interface IStatsPageComponentProps {
  week: number;
  stats: Stats
}

function StatsPage(props: {component: React.FunctionComponent<IStatsPageComponentProps>}) {
  const [league] = useLeague();
  const [data, loading, changeWeek] = useStats(league);
  const [shouldFilterSubs, setShouldFilterSubs] = React.useState(false);

  const stats = data.stats;
  const statsArray = map(keys(stats), (k) => {
    return {
      ...stats[k],
      name: k,
      holds: stats[k].o_points_for + '/' + (stats[k].o_points_against + stats[k].o_points_for),
      breaks: stats[k].d_points_for + '/' + (stats[k].d_points_against + stats[k].d_points_for)
    }
  });

  const statsWithoutSubs = statsArray.filter((p) => {
    return !p.name.includes("(S)")
  });

  const Main = () => {
    if (loading) return <Loading />;

    return (
      <div style={{height: '100%', minHeight: '100%'}}>
        { props.component({week: data.week, statsArray}) }
      </div>
    );
  }

  return (
    <React.Fragment>
      <Layout>
        <StatsFilters data={data} changeWeek={changeWeek}/>
      </Layout>
      <Main />
    </React.Fragment>
  );
}

export default StatsPage
