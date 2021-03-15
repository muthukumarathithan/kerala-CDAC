import React from "react";
import { Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

// components
import FenceList from '../../components/Fences/FenceList';
import AddEditFence from '../../components/Fences/AddEditFence';


const Fences = (props) =>{
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/app/fences' component={FenceList}></Route>
            <Route exact path='/app/fences/new' component={AddEditFence}></Route>
            <Route exact path='/app/fences/edit/:id' component={AddEditFence}></Route>
          </Switch>
        </Grid>
       </Grid>
    </>
  );
}

export default withRouter(Fences);
