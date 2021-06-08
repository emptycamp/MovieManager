import React, { useState, useEffect } from "react";
import { TagsInput } from "react-tag-input-component";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import {
  Button,
  Grid,
  Typography,
  Fade,
  Backdrop,
  Modal,
  TextField,
} from "@material-ui/core";

import "./styles.scss";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default ({ open, handleClose, onSubmit, data, setData }) => {
  const classes = useStyles();
  const [genres, setGenres] = useState([]);

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateGenres = (genres) => {
    setData({
      ...data,
      genres: genres.map((x) => ({
        name: x
      })),
    });
  };

  useEffect(() => {
    if (data && data.genres) {
      setGenres(data.genres.map((x) => x.name));
    }
  }, [data]);

  const removeDuplicateGenres = (e) => {
    window.event.preventDefault();
    document.querySelector(".rti--input").value = "";
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Grid item xs sm={9} md={6} lg={6}>
          <div className={classes.paper}>
            <div className="Create">
              <Typography variant="h4" component="h2">
                {data.id ? "Edit movie" : "Add movie"}
              </Typography>
              <form
                className={classes.root}
                autoComplete="off"
                onSubmit={onSubmit}
              >
                <div>
                  <TextField
                    id="outlined-error"
                    label="Name"
                    name="name"
                    variant="outlined"
                    required={true}
                    onChange={handleInputChange}
                    value={data.name}
                  />
                </div>
                <div>
                  <TextField
                    id="date"
                    label="Release date"
                    name="releaseDate"
                    type="date"
                    value={data.releaseDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <TagsInput
                    value={genres}
                    onChange={updateGenres}
                    placeHolder="enter genre"
                    onExisting={removeDuplicateGenres}
                  />
                  <em>press enter to add multiple genres</em>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Grid>
      </Fade>
    </Modal>
  );
};
