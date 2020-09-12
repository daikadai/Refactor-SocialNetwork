import React, { useState } from "react";
import { connect } from "react-redux";
import MyButton from "../util/MyButton";
import { Add } from "@material-ui/icons";
import { clearError } from "../redux/ui/ui.action";
import PostDialog from "./dialog/PostDialog";

const PostScream = ({ clearError }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearError();
  }

  return (
    <>
      <MyButton onClick={handleOpen} tip="Post a Scream!">
        <Add />
      </MyButton>
      <PostDialog handleClose={handleClose} open={open} />
    </>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { clearError })(PostScream);
