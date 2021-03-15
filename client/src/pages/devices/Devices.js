import React from "react";
import { Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

// components
import DeviceList from '../../components/Devices/DeviceList';
import AddEditDevice from '../../components/Devices/AddEditDevice';


const Devices = (props) =>{
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/app/devices' component={DeviceList}></Route>
            <Route exact path='/app/devices/new' component={AddEditDevice}></Route>
            <Route exact path='/app/devices/edit/:id' component={AddEditDevice}></Route>
          </Switch>
        </Grid>
       </Grid>
    </>
  );
}

export default withRouter(Devices);
