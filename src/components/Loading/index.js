import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";

function Loading() {
  return (
    <Grid
      container
      item
      xs={12}
      style={{ marginTop: 15, marginBottom: 15, paddingBottom: 30 }}
      justify="center"
    >
      <CircularProgress />
    </Grid>
  );
}

export default Loading;
