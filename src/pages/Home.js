import React from 'react'
import { Grid } from '@material-ui/core'
import Scream from '../components/Scream';
import Profile from '../components/Profile';
import { connect } from 'react-redux';
import { getScreams } from '../redux/data/data.action';
import { useEffect } from 'react';
import ScreamSkeleton from '../util/ScreamSkeleton';

const Home = ({ getScreams, data: { screams, loading } }) => {
  useEffect(() => {
    getScreams();
  },[getScreams])

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {
          !loading ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
          ) : (
            <ScreamSkeleton />
          )
        }
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile/>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, {getScreams})(Home)
