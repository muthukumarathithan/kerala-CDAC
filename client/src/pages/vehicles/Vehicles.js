import React from "react";
import { Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

// components
import VehicleList from '../../components/Vehicles/VehicleList';
import AddEditVehicle from '../../components/Vehicles/AddEditVehicle';


const Vehicles = (props) =>{
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/app/vehicles' component={VehicleList}></Route>
            <Route exact path='/app/vehicles/new' component={AddEditVehicle}></Route>
            <Route exact path='/app/vehicles/edit/:id' component={AddEditVehicle}></Route>
          </Switch>
        </Grid>
       </Grid>
    </>
  );
}

export default withRouter(Vehicles);
