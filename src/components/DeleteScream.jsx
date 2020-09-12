import React from 'react'
import { withStyles, Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core'
import { useState } from 'react'
import { connect } from 'react-redux'
import { deleteScream } from '../redux/data/data.action'
import MyButton from '../util/MyButton'
import { DeleteOutline } from '@material-ui/icons'

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
}

const DeleteScream = ({ classes,deleteScream, screamId }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <MyButton tip="Delete Scream" onClick={handleOpen} btnClassName={classes.deleteButton}>
        <DeleteOutline color="secondary"/>
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Are you sure you want to delete this scream ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => deleteScream(screamId)} color="secondary">
            Delete
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default connect(null, {deleteScream})(withStyles(styles)(DeleteScream))
