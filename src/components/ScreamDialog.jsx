import React from "react";
import {
  withStyles,
  Dialog,
  DialogContent,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { getScream } from "../redux/data/data.action";
import MyButton from "../util/MyButton";
import { useState } from "react";
import { UnfoldMore, Close, Chat } from "@material-ui/icons";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { clearError } from "../redux/ui/ui.action";
import { useEffect } from "react";

const styles = (theme) => ({
  ...theme.spreadThis,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

const ScreamDialog = ({
  classes,
  openDialog,
  getScream,
  clearError,
  UI: { loading },
  scrmId,
  scream: {
    screamId,
    body,
    createdAt,
    likeCount,
    commentCount,
    userImage,
    userHandle,
    comments
  },
}) => {
  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState('');
  const [newPath, setNewPath] = useState('');

  useEffect(() => {
    if(openDialog) {
      handleOpen();
    }
  },[])
  const handleOpen = () => {
    let oldPath = window.location.pathname;

    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if(oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);
    setOldPath(oldPath);
    setNewPath(newPath);
    setOpen(true);
    getScream(scrmId);
  }
  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    setOpen(false);
    clearError();
  }

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} />
    </div>
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId}/>
        <span>{likeCount} likes</span>
        <MyButton tip="comments">
          <Chat color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSepartor}/>
      <CommentForm screamId={screamId} />
      <Comments comments={comments}/>
    </Grid>
  );

  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <Close />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  scream: state.data.scream,
});

export default connect(mapStateToProps, { getScream, clearError })(
  withStyles(styles)(ScreamDialog)
);
