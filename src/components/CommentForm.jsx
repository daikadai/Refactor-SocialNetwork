import React, { useEffect } from "react";
import { connect } from "react-redux";
import { submitComment } from "../redux/data/data.action";
import { useState } from "react";
import { Grid, TextField, Button, withStyles } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spreadThis,
});

const CommentForm = ({
  data,
  screamId,
  classes,
  submitComment,
  UI,
  user: { authenticated },
}) => {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(UI.errors) {
      setErrors(UI.errors)
    } else {
      setErrors({});
    }
    if(!UI.errors && !UI.loading) {
      setBody('');
      console.log(123);
    }
    // eslint-disable-next-line
  },[UI.errors, data])

  const handleSubmit = (e) => {
    e.preventDefault();

    submitComment(screamId, { body });

  };
  return authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={e => setBody(e.target.value)}
          fullWidth
          className={classes.textField}
        />
        <Button 
            type="submit" 
            variant="contained"
            color="primary"
            className={classes.button}
           >
             Submit
        </Button>
        <hr className="classes visibleSeparator"/>
      </form>
    </Grid>
  ) : null;
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
  data: state.data
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
