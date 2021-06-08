import React from "react";
import { Route } from "react-router";
import { Container } from "@material-ui/core";

import Home from "./views/Home/index";
import './global.scss';

export default () => {
    return (
      <Container>
        <Route exact path="/" component={Home} />
      </Container>
    );

}
