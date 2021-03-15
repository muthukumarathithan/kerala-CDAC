import React from "react";
import { Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  withRouter, 
} from "react-router-dom";

// components
import DealerList from '../../components/Dealers/DealerList';
import AddEditDealer from '../../components/Dealers/AddEditDealer';


const Dealers = (props) =>{
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/app/dealers' component={DealerList}></Route>
            <Route exact path='/app/dealers/new' component={AddEditDealer}></Route>
            <Route exact path='/app/dealers/edit/:id' component={AddEditDealer}></Route>
          </Switch>
        </Grid>
       </Grid>
    </>
  );
}

export default withRouter(Dealers);
