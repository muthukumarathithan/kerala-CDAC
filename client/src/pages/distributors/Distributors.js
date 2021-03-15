import React from "react";
import { Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

// components
import DistributorList from '../../components/Distributors/DistributorList';
import AddEditDistributor from '../../components/Distributors/AddEditDistributor';


const Distributors = (props) =>{
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/app/distributors' component={DistributorList}></Route>
            <Route exact path='/app/distributors/new' component={AddEditDistributor}></Route>
            <Route exact path='/app/distributors/edit/:id' component={AddEditDistributor}></Route>
          </Switch>
        </Grid>
       </Grid>
    </>
  );
}

export default withRouter(Distributors);
