import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button, CircularProgress, withStyles } from '@material-ui/core'
import MyButton from '../../util/MyButton'
import { connect } from 'react-redux';
import { postScream } from '../../redux/data/data.action';
import { Close } from '@material-ui/icons';

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: '91%',
    top: '6%'
  },
});

const PostDialog = ({
  classes,
  handleClose,
  open,
  postScream,
  UI
}) => {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(UI.errors) {
      setErrors(UI.errors)
    } else {
      setErrors({})
    }
    if(!UI.errors && !UI.loading) {
      setBody('');
      handleClose();
    }
    // eslint-disable-next-line
  },[UI.errors, UI.loading])

  const handleSubmit = (e) => {
    e.preventDefault();

    postScream({ body });
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <Close />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!!"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={(e) => setBody(e.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={UI.loading}
            >
              Submit
              {UI.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
  )
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps,  {postScream})(withStyles(styles)(PostDialog))
