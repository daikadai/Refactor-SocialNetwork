import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Scream from "../components/Scream";
import StaticProfile from "../components/StaticProfile";
import { getUserData } from "../redux/data/data.action";
import ProfileSkeleton from "../util/ProfileSkeleton";
import ScreamSkeleton from "../util/ScreamSkeleton";



const User = ({ getUserData, data: { screams, loading  }, match }) => {
  const [profile, setProfile] = useState(null);
  const [screamIdParam, setScreamIdParam] = useState(null);
  console.log(match.params);
  const getProfile = async () => {
    if(match.params.handle) {
      const user = await getUserData(match.params.handle);
      setProfile(user); 
    }
  }

  useEffect(() => {
    getProfile();
    if(match.params.screamId) {
      setScreamIdParam(match.params.screamId)
    }
    // eslint-disable-next-line
  },[])

  const screamMarkup = loading ? (
    <ScreamSkeleton />
  ) : screams.length === 0 ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
  ) : (
    screams.map(scream => {
      if(scream.screamId !== screamIdParam) {
        return <Scream  key={scream.screamId} scream={scream} />
      } else {
        return <Scream key={scream.screamId} scream={scream} openDialog/>
      }
    })
  )

  return (
   <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screamMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile}/>
        )}
      </Grid>
   </Grid>
  );
};

const mapStateToProps = state => ({
  data : state.data
})

export default connect(mapStateToProps, { getUserData })(User)
;
