import React from 'react'
import { Grid } from '@material-ui/core'
import { useState } from 'react'
import { useEffect } from 'react';
import Axios from 'axios';
import Scream from '../components/Scream';

const Home = () => {
  const [screams, setScreams] = useState(null);

  const getAsyncScreams = async () => {
    try {
      const res = await Axios.get('/screams');
      console.log(res.data);
      setScreams(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAsyncScreams();
  }, [])


  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {
          screams ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
          ) : (
            <p>Loading...</p>
          )
        }
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile...</p>
      </Grid>
    </Grid>
  )
}

export default Home
