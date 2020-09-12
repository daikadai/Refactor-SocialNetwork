import React from "react";
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/data/data.action";
import MyButton from "../util/MyButton";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  likedcolor: {
    color: theme.palette.primary.red
  }
})

const LikeButton = ({ classes, user: { authenticated,likes }, likeScream, unlikeScream, screamId }) => {
  const likedScream = () => {
    if (likes && likes.find((like) => like.screamId === screamId)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    authenticated ? (
      likedScream() ? (
        <MyButton tip="Undo Like" onClick={() => unlikeScream(screamId)}>
          <Favorite className={classes.likedcolor} />
        </MyButton>
      ) : (
        <MyButton tip="Like" onClick={() => likeScream(screamId)}>
          <FavoriteBorder color="primary" />
        </MyButton>
      )
    ) : (
      <MyButton tip="like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    )
  )
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { likeScream, unlikeScream })(
  withStyles(styles)(LikeButton)
);
