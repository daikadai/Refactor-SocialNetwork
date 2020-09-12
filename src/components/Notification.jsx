import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux';
import { markNotificationsRead } from '../redux/user/user.action';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Badge, IconButton, Menu, MenuItem, Tooltip, Typography } from '@material-ui/core';
import { Chat, Favorite, Notifications } from '@material-ui/icons';
import { Link } from 'react-router-dom';


dayjs.extend(relativeTime);

const Notification = ({
  markNotificationsRead,
  notifications
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = e => {
    setAnchorEl(e.target);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const onMenuOpened = () => {
    let unreadNotification = notifications.filter(noti => !noti.read).map(noti => noti.notificationId);
    markNotificationsRead(unreadNotification);
  }

  let notificationsIcon;

  if(notifications.length > 0) {
    notifications.filter(noti => noti.read === false).length > 0 ?
    (
      notificationsIcon = (
        <Badge 
          badgeContent={
            notifications.filter(noti => noti.read === false).length
          }       
          color="secondary" 
        >
          <Notifications />
        </Badge>
      )
    ) : (
      notificationsIcon = <Notifications />
    )  
  } else {
    notificationsIcon = <Notifications />
  }

  let notificationMarkup = notifications.length > 0 ? (
    notifications.map(noti => {
      const verb = noti.type === 'like' ? 'liked' : 'commented on';
      const time = dayjs(noti.createdAt).fromNow();
      const iconColor = noti.read ? 'primary' : 'secondary';
      const icon = noti.type === 'like' ? (
        <Favorite color={iconColor} style={{ marginRight: 10 }}/>
      ) : (
        <Chat color={iconColor} style={{ marginRight: 10 }}/>
      )

      return (
        <MenuItem key={noti.createdAt} onClick={handleClose}>
          {icon}
          <Typography
            component={Link}
            color="default"
            variant="body1"
            to={`/users/${noti.recipient}/scream/${noti.screamId}`}
          >
            {noti.sender} {verb} your scream {time}
          </Typography>
        </MenuItem>
      )
    })
  ) : (
    <MenuItem onClick={handleClose}>
      You have no notifications yet
    </MenuItem>
  )

  return (
    <>
      <Tooltip placement="top" title="Notification">
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationMarkup}
      </Menu>
    </>
  )
}

const mapStateToProps = state => ({
  notifications: state.user.notifications
})

export default connect(mapStateToProps, {markNotificationsRead})(Notification)
