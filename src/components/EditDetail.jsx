import React from 'react'
import { useState } from 'react'
import { editUserDetails } from '../redux/user/user.action';
import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core"
import { useEffect } from 'react';
import { connect } from 'react-redux';
import MyButton from '../util/MyButton';
import { Edit } from '@material-ui/icons';

const styles = theme => ({
  ...theme.spreadThis,
  button: {
    float: 'right'
  }
})

const EditDetail = ({credentials, editUserDetails, classes }) => {
  const [formData, setFormData] = useState({
    bio: "",
    website: "",
    location: "",
  })

  const { bio, website, location } = formData;
  const [open, setOpen] = useState(false);

  const mapUserDetailsToState = credentials => {
    setFormData({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : '',
    })
  }

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    mapUserDetailsToState(credentials)
  },[credentials])

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    editUserDetails(formData);
    handleClose();
  }

  return (
    <>
      <MyButton tip="Edit Details" onClick={handleOpen} btnClassName={classes.button}>
          <Edit color="primary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="bio"
              type="text"
              label="bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={handleChange}
              fullWidth
            /><TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal/professional website"
              className={classes.textField}
              value={website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
              Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const mapStateToProps  = state => ({
  credentials: state.user.credentials
})

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetail))
