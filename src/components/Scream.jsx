import React from 'react'
import { withStyles, Card, CardMedia, Typography, CardContent } from '@material-ui/core'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import  relativeTime  from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import { Chat } from '@material-ui/icons';
import MyButton from '../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

const styles = theme => ({
  card: {
    display: 'flex',
    marginBottom:  20,
    position: 'relative'
  },
  image: {
    minWidth: 200,
    objectFit: 'cover'
  },
  content: {
    padding: 25,
  }
})

dayjs.extend(relativeTime);

const Scream = ({ 
  openDialog,
  classes, 
  scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }, 
  user: { authenticated, credentials: { handle } },
}) => {
  
  const deleteButton = authenticated && userHandle === handle ? (
    <DeleteScream screamId={screamId}/>
  ) : null


  return (
    <Card className={classes.card}>
      <CardMedia image={userImage ? userImage : ''} title="Profile Image" className={classes.image} />
      <CardContent className={classes.content}>
        <Typography variant="h5" component={Link} to={`/users/${userHandle}`}  color="primary">
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
        <Typography variant="body1">{body}</Typography>
        
        <LikeButton screamId={screamId}/>
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <Chat color="primary"/>
        </MyButton>
        <span>{commentCount} comments</span>
        <ScreamDialog userHandle={userHandle} scrmId={screamId} openDialog={openDialog}/>
      </CardContent>
    </Card>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Scream))
