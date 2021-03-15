import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { Button, Grid, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

//redux
import { createDevice, getCurrentDevice, updateDevice, getDistributors, getDealers, getCustomers} from '../../store/actions';

//Component
import PageTitle from "../PageTitle";
import Widget from "../Widget";

class AddEditDevice extends Component {

    constructor(props){
        super(props);
        this.state = {
            page:'Add',
            device_id:'',
            sim_no:'',
            device_type:'',
            network:'',
            distributor:'',
            dealer:'',
            customer:'',
        }
    }

    

    async componentDidMount(){
        try {

          this.props.getDistributors();
          this.props.getDealers();
          this.props.getCustomers();
           
            if(this.props.location.pathname.includes("new"))
             this.setState({page : 'ADD'})
             else{
               this.setState({page:'UPDATE'});
               const getCurrentDevice = this.props.getCurrentDevice;
               await getCurrentDevice(this.props.match.params.id);
               this.setState(this.props.device);

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

    addDevice = (event) =>{
      if(this.state.page === 'ADD')
        this.props.createDevice(this.state, this.props.history);
       else
         this.props.updateDevice(this.props.match.params.id, this.state, this.props.history); 
     
    }



    

    render(){

      const distributors = {
        options: this.props.distributors,
        getOptionLabel: (option) => option.firstName,
      };

      const dealers = {
        options: this.props.dealers,
        getOptionLabel: (option) => option.firstName,
      };

      const customers = {
        options: this.props.customers,
        getOptionLabel: (option) => option.firstName,
      };

        return (

          <div>
              <PageTitle title="Devices"/>
              <Grid item lg={10} md={10} sm={12} xs={12}>

              <Widget
            title="Add New Device"
            upperTitle
           
          >

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="device_id"
            name="device_id"
            label="Device ID"
            fullWidth
            autoComplete="device_id"
            value={this.state.device_id}
            onChange={this.handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="sim_no"
            name="sim_no"
            label="Sim No"
            fullWidth
            autoComplete="sim_no"
            value={this.state.sim_no}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="network"
            name="network"
            label="Network"
            fullWidth
            autoComplete="network"
            value={this.state.network}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="device_type"
            name="device_type"
            label="Device Type"
            fullWidth
            autoComplete="device_type"
            value={this.state.device_type}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
          id="distributor"
          {...distributors}
          value={this.state.distributor}
          onChange={(event, newValue) => {
            this.setState({distributor:newValue});
          }}
          renderInput={(params) => <TextField {...params} label="Distributor" margin="normal" />}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            {...dealers}

          id="dealer"
          value={this.state.dealer}
          onChange={(event, newValue) => {
            this.setState({dealer:newValue});
          }}
          renderInput={(params) => <TextField {...params} label="Dealer" margin="normal" />}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Autocomplete
            {...customers}

          id="dealer"
          value={this.state.customer}
          onChange={(event, newValue) => {
            this.setState({customer:newValue});
          }}
          renderInput={(params) => <TextField {...params} label="Customer" margin="normal" />}
        />
        </Grid>
       

        
        <Grid container spacing={3} style={{margin:'10px 0px'}} alignItems="flex-start" justify="flex-end" direction="row">
          <Button variant="contained" style={{marginRight:'8px', backgroundColor:'#3CD4A0', color:'#fff'}}
 >CLEAR</Button>
          
          <Button variant="contained" color="secondary" onClick={this.addDevice}>{this.state.page} DEVICE</Button>
        </Grid>

        

      </Grid>
      </Widget>
      </Grid>
          </div>   

        )
    }
}


export default connect (store =>({device:store.currentDevice, dealers:store.dealers, distributors:store.distributors, customers:store.customers}), { getDealers, getDistributors, getCustomers ,getCurrentDevice, createDevice, updateDevice } )(AddEditDevice);


