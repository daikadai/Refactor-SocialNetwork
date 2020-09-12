import React from 'react'
import { useState } from 'react'
import AppIcon from '../images/icon.png'
import { withStyles, Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../redux/user/user.action';
import { useEffect } from 'react';

const styles = theme => ({
  ...theme.spreadThis
})

const Login = ({ history, classes, UI ,loginUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    loading: false,
  })

  const [errors, setErrors] = useState({});
  const { email, password } = formData;

  useEffect(() => {
    if(UI.errors) {
      setErrors(UI.errors);
    }
  },[UI.errors,errors])

  const handleSubmit = async e => {
    e.preventDefault();
    
    loginUser(formData,history);
  }

  const handleChange = e => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }
  return (
    <Grid container className={classes.form}>
      <Grid item sm></Grid>
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image}/>
        <Typography variant="h2" className={classes.pageTitle}>
            Login
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
            {
              errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )
            }
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={UI.loading}
            >
              Login 
              {UI.loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br/>
            <small>dont have an account ? sign up <Link to="/signup">here</Link></small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  )
}

const mapStateToProps  = state => ({
  UI: state.UI
})

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(Login));
