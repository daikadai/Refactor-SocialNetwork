import React, { useState } from 'react'
import AppIcon from "../images/icon.png";
import { withStyles, Grid, TextField, Typography, Button, CircularProgress } from '@material-ui/core'
import Axios from 'axios'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../redux/user/user.action';

const styles = theme => ({
  ...theme.spreadThis
})

const Signup = ({ history, classes, UI: { loading, errors}, signupUser  }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword:"",
    handle: "",
  })

  const { email, password, confirmPassword, handle } = formData;

  const handleSubmit = async e => {
    e.preventDefault();

    signupUser(formData, history)
   
  }

  const handleChange = e => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  return (
    <Grid container className={classes.form}>
      <Grid item sm></Grid>
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image}/>
        <Typography variant="h2" className={classes.pageTitle}>
            Sign Up
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField 
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={handleChange}
            fullWidth
           />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            helperText={errors.password}
            error={errors.password ? true : false}
            className={classes.textField}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            className={classes.textField}
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
            />
            <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            helperText={errors.handle}
            error={errors.handle ? true : false}
            className={classes.textField}
            value={handle}
            onChange={handleChange}
            fullWidth
            />
            {
              errors.general && (
                <Typography variant='body2' className={classes.customError}>
                  {errors.general}
                </Typography>
              )
            }
            <Button 
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Sign Up
              { loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
            </Button>
            <br/>
            <small>Already have an account ? login <Link to="/login">here</Link></small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  )
}

const mapStateToProps = state => ({
  UI: state.UI
})

export default connect(mapStateToProps, {signupUser})(withStyles(styles)(Signup));
