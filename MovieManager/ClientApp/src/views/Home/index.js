import React, { useState, useEffect } from "react";
import { TextField, Grid, Fab, Tooltip, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";

import MovieTable from "../../components/MovieTable";
import CreateModal from "./components/CreateModal";

import "./styles.scss";

const defaultModalData = {
  name: "",
  releaseDate: new Date().toISOString().slice(0, 10),
  genres: [],
};

export default () => {
  const [movieData, setMovieData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [modalData, setModalData] = useState(defaultModalData);
  const [titleSearch, setTitleSearch] = useState("");

  const fetchMovies = () => {
    fetch("http://localhost:43785/movies")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovieData(data);
      });
  };

  const handleSearch = e => {
    setTitleSearch(e.target.value);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleVideoAdd = e => {
    e.preventDefault();

    let url = "http://localhost:43785/movies/";
    url += modalData.id ? "edit" : "create";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(modalData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        fetchMovies();
        setToastOpen(true);
        setModalOpen(false);
      });
  };

  const handleCloseToast = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };

  const handleDisplayModal = () => {
    setModalData(defaultModalData);
    setModalOpen(true);
  };

  const handleEdit = (props) => {
    setModalData({
      ...props,
      releaseDate: new Date(props.releaseDate).toLocaleDateString("lt"),
    });
    setModalOpen(true);
  };

  return (
    <div className="Home">
      <CreateModal
        open={modalOpen}
        data={modalData}
        setData={setModalData}
        handleClose={() => setModalOpen(false)}
        onSubmit={handleVideoAdd}
      />
      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={handleCloseToast}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseToast}
          severity="success"
          message="asd"
        >
          Movie {modalData.id ? "updated" : "added"} successfully
        </MuiAlert>
      </Snackbar>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
        className="Search__container"
      >
        <Grid item xs lg={6}>
          <TextField
            id="outlined-search"
            label="Search by name"
            variant="outlined"
            onChange={handleSearch}
          />
        </Grid>
        <Grid item xs={2} sm={1} lg={1} style={{ marginLeft: 10 }}>
          <Tooltip title="Add" aria-label="add">
            <Fab
              color="secondary"
              aria-label="add"
              onClick={handleDisplayModal}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>
      <MovieTable data={movieData} search={titleSearch} onEdit={handleEdit} />
    </div>
  );
};
