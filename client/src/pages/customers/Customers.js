import React from "react";
import { Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  withRouter, 
} from "react-router-dom";

// components
import CustomerList from '../../components/Customers/CustomerList';
import AddEditCustomer from '../../components/Customers/AddEditCustomer';


const Customers = (props) =>{
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/app/customers' component={CustomerList}></Route>
            <Route exact path='/app/customers/new' component={AddEditCustomer}></Route>
            <Route exact path='/app/customers/edit/:id' component={AddEditCustomer}></Route>
          </Switch>
        </Grid>
       </Grid>
    </>
  );
}

export default withRouter(Customers);
