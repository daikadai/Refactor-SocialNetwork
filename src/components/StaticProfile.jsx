import { Paper, Typography, withStyles } from "@material-ui/core";
import { CalendarToday, LocationOn } from "@material-ui/icons";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/icons/Link";
import React from "react";
import dayjs from "dayjs";

const styles = (theme) => ({
  ...theme.spreadThis
});

const StaticProfile = ({
  classes,
  profile: { handle, createdAt, imageUrl, bio, website, location },
}) => {
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <Typography
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </Typography>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </>
          )}
          {website && (
            <>
              <MuiLink color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(StaticProfile);
