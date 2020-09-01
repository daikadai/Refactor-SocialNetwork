import React from 'react'
import { connect } from 'react-redux'
import { withStyles, Paper, Typography, Button, Tooltip, IconButton } from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link';
import {LocationOn, CalendarToday, Edit, KeyboardReturn} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { uploadImage, logoutUser } from '../redux/user/user.action';
import EditDetail from './EditDetail';

const styles = (theme) => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
})

const Profile = ({ 
  classes,
  user: {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated
  },
  uploadImage,
  logoutUser
}) => {
  const handleImageChange = e => {
    const image = e.target.files[0];
    console.log(image);
    const formData = new FormData();
    console.log(formData);
    formData.append('image', image, image.name);
    console.log(formData);
    uploadImage(formData)
  }
  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }
  return (
    loading ? <p>loading...</p> : (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image"/>
              <input type="file" id="imageInput" onChange={handleImageChange} hidden="hidden"/>
              <Tooltip title="Edit profile picture" placement="top">
                <IconButton onClick={handleEditPicture} className="button">
                  <Edit color="primary"/>
                </IconButton>
              </Tooltip>
            </div>
            <hr/>
            <div className="profile-details">
              <LinkIcon component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                @ {handle}
              </LinkIcon>
              <hr/>
              { bio && <Typography variant="body2">{bio}</Typography>}
              <hr/>
              {
                location && (
                  <>
                    <LocationOn color="primary" /> <span>{location}</span>
                    <hr/>
                  </>
                )
              }
              {
                website && (
                  <>
                    <LinkIcon color='primary'/>
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {' '} {website}
                    </a>
                    <hr/>
                  </>
                )
              }
              <CalendarToday color="primary" />
              <span>
                Joined {dayjs(createdAt).format('MMM YYY')}
              </span>
            </div>    
            <Tooltip title="Edit profile picture" placement="top">
                <IconButton onClick={() => logoutUser()} className="button">
                  <KeyboardReturn color="primary"/>
                </IconButton>
            </Tooltip>      
            <EditDetail /> 
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login again
          </Typography>
          <div className={classes.buttons}>
            <Button variant="contained" color="primary" component={Link} to="/login">
                Login
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/signup">
                Signup
            </Button>
          </div>
        </Paper>
      )
    )
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, {uploadImage, logoutUser})(withStyles(styles)(Profile));
