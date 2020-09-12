import React from 'react'
import { connect } from 'react-redux'
import { withStyles, Paper, Typography, Button } from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link';
import {LocationOn, CalendarToday, Edit, KeyboardReturn} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { uploadImage, logoutUser } from '../redux/user/user.action';
import EditDetail from './EditDetail';
import MyButton from '../util/MyButton';
import ProfileSkeleton from '../util/ProfileSkeleton';

const styles = (theme) => ({
  ...theme.spreadThis
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
    loading ? <ProfileSkeleton /> : (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image"/>
              <input type="file" id="imageInput" onChange={handleImageChange} hidden="hidden"/>
              <MyButton tip="Edit profile picture" onClick={handleEditPicture} btnClassName="button">
                <Edit color="primary"/>
              </MyButton>
            </div>
            <hr/>
            <div className="profile-details">
              <Typography component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                @ {handle}
              </Typography>
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
            <MyButton tip="Logout" onClick={() => logoutUser()} btnClassName="button">
              <KeyboardReturn color="primary" />
            </MyButton> 
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
