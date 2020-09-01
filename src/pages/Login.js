import React from 'react'
import { useState } from 'react'
import Axios from 'axios';
import AppIcon from '../images/icon.png'
import { withStyles, Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
}

const Login = ({ history, classes }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    loading: false,
  })

  const { email, password } = formData;
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await Axios.post('/login', formData);
      console.log(res.data);
      setLoading(false);
      history.push("/")
    } catch (error) {
      setErrors(error.response.data);
      setLoading(false);
    }
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
              disabled={loading}
            >
              Login 
              {loading && (
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

export default withStyles(styles)(Login);
