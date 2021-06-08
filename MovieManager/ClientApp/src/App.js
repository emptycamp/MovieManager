import React from "react";
import { Route } from "react-router";
import Home from "./views/Home/index";

import { Container } from "@material-ui/core";

export default () => {
    return (
      <Container>
        <Route exact path="/" component={Home} />
      </Container>
    );

}
