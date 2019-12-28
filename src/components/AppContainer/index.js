import React from "react";
import { Container, Toolbar } from "@material-ui/core";
import styled from "styled-components";

const AppWrapper = styled.div`
  background-color: #f5f5f5;
`;

function AppContainer(props) {
  return (
    <AppWrapper>
      <Toolbar />
      <Container maxWidth="lg">
        {props.children}
      </Container>
    </AppWrapper>
  );
}

export default AppContainer;
