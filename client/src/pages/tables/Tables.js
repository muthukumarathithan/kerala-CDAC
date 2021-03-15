import React from "react";
import { Grid } from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle";
import DeviceList from '../../components/Devices/DeviceList';


export default function Devices(props) {
  return (
    <>
      <PageTitle title="Devices" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <DeviceList {...props}/>
        </Grid>
       </Grid>
    </>
  );
}
