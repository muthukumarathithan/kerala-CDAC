import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { Button, Grid, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

//redux
import { createVehicle, getCurrentVehicle, updateVehicle, getDevices} from '../../store/actions';

//Component
import PageTitle from "../PageTitle";
import Widget from "../Widget";

class AddEditVehicle extends Component {

    constructor(props){
        super(props);
        this.state = {
            page:'Add',
            device:[],
            vehicle_reg_no:'',
            rto:'',
             }
    }

    

    async componentDidMount(){
        try {

            this.props.getDevices();
            if(this.props.location.pathname.includes("new"))
             this.setState({page : 'ADD'})
             else{
               this.setState({page:'UPDATE'});
               const getCurrentVehicle = this.props.getCurrentVehicle;
               await getCurrentVehicle(this.props.match.params.id);
               this.setState(this.props.vehicle);

             }

        } catch (error) {
            
        }

        
    }

    handleInputChange = (event) => {
      this.setState({
        [event.target.id]:event.target.value
      })
    }

    handleAddressChange = (event) => {
      var {address} = this.state;
      address[event.target.id] = event.target.value;
      this.setState({
        address
      })
    }

    addVehicle = (event) =>{
      if(this.state.page === 'ADD')
        this.props.createVehicle(this.state, this.props.history);
       else
         this.props.updateVehicle(this.props.match.params.id, this.state, this.props.history); 
     
    }



    

    render(){

      const devices = {
        options: this.props.devices,
        getOptionLabel: (option) => option.device_id,
      };

       return (

          <div>
              <PageTitle title="Vehicles"/>
              <Grid item lg={10} md={10} sm={12} xs={12}>

              <Widget
            title="Add New Vehicle"
            upperTitle
           
          >

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="vehicle_reg_no"
            name="vehicle_reg_no"
            label="Vehicle No"
            fullWidth
            autoComplete="vehicle_reg_no"
            value={this.state.vehicle_reg_no}
            onChange={this.handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="rto"
            name="rto"
            label="RTO"
            fullWidth
            autoComplete="rto"
            value={this.state.rto}
            onChange={this.handleInputChange}

          />
        </Grid>
      
       
        <Grid item xs={12} sm={6}>
          <Autocomplete
          id="devices"
          {...devices}
          value={this.state.device}
          onChange={(event, newValue) => {
            this.setState({device:newValue});
          }}
          renderInput={(params) => <TextField {...params} label="Device" margin="normal" />}
        />
        </Grid>
      
     

        
        <Grid container spacing={3} style={{margin:'10px 0px'}} alignItems="flex-start" justify="flex-end" direction="row">
          <Button variant="contained" style={{marginRight:'8px', backgroundColor:'#3CD4A0', color:'#fff'}}
 >CLEAR</Button>
          
          <Button variant="contained" color="secondary" onClick={this.addVehicle}>{this.state.page} VEHICLE</Button>
        </Grid>

        

      </Grid>
      </Widget>
      </Grid>
          </div>   

        )
    }
}


export default connect (store =>({devices:store.devices, vehicle:store.currentVehicle }), { getDevices ,getCurrentVehicle, createVehicle, updateVehicle } )(AddEditVehicle);


