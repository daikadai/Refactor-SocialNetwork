import React from 'react'
import { withStyles, Card, CardMedia, Typography, CardContent } from '@material-ui/core'
import { Link } from 'react-router-dom'

const styles = {
  card: {
    display: 'flex',
    marginBottom:  20
  },
  image: {
    minWidth: 200,
    objectFit: 'cover'
  },
  content: {
    padding: 25,
  }
}

const Scream = ({ classes, scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }}) => {
  return (
    <Card className={classes.card}>
      <CardMedia image={userImage ? userImage : ''} title="Profile Image" className={classes.image} />
      <CardContent className={classes.content}>
        <Typography variant="h5" component={Link} to={`/users/${userHandle}`}  color="primary">
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">{createdAt}</Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(Scream)
