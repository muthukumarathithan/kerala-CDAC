import React, {Component} from "react";
import { Grid } from "@material-ui/core";
import {connect} from 'react-redux';
import {
  Route,
  Switch,
  withRouter, 
} from "react-router-dom";

// components
import PingReport from '../../components/BasicReport/PingReport';
import DistanceReport from '../../components/BasicReport/DistanceReport';
import IdleReport from '../../components/BasicReport/IdleReport';
import RuntimeReport from '../../components/BasicReport/RuntimeReport';
import HealthReport from '../../components/BasicReport/HealthReport';
import OverSpeedReport from '../../components/BasicReport/OverSpeedReport';

import {getLiveVehicles} from '../../store/actions/';

class BasicReports extends Component {

  async componentDidMount(){
    try {
        const getVehicles = this.props.getLiveVehicles;
        await getVehicles();

    } catch (error) {
        
    }

    
}

 render(){
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route
             exact
             path='/app/reports/basic/ping' 
             render={(props) =>
              <PingReport {...props}
              vehicles={this.props.vehicles}
               />} />
             <Route
             exact
             path='/app/reports/basic/distance' 
             render={(props) =>
              <DistanceReport {...props}
              vehicles={this.props.vehicles}
               />} />   
            <Route
             exact
             path='/app/reports/basic/idle' 
             render={(props) =>
              <IdleReport {...props}
              vehicles={this.props.vehicles}
               />} />
             <Route
             exact
             path='/app/reports/basic/runtime' 
             render={(props) =>
              <RuntimeReport {...props}
              vehicles={this.props.vehicles}
               />} /> 
              <Route
             exact
             path='/app/reports/basic/health' 
             render={(props) =>
              <HealthReport {...props}
              vehicles={this.props.vehicles}
               />} />    
              <Route
             exact
             path='/app/reports/basic/overspeed' 
             render={(props) =>
              <OverSpeedReport {...props}
              vehicles={this.props.vehicles}
               />} />       
         </Switch>
        </Grid>
       </Grid>
    </>
  );
 }

}

export default withRouter(connect(store=>({vehicles:store.liveVehicles}),{getLiveVehicles})(BasicReports))


