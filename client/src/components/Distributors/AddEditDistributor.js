import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Grid, TextField} from "@material-ui/core";




//redux
import { createDistributor, getCurrentDistributor, updateDistributor} from '../../store/actions/distributors';

import PageTitle from "../PageTitle";
import Widget from "../Widget";

class AddEditDistributor extends Component {

    constructor(props){
        super(props);
        this.state = {
            page:'ADD',
            firstName:'',
            lastName:'',
            mobile:'',
            email:'',
            address:{
              line1:'',
              line2:'',
              city:'',
              state:'',
              zip:'',
              country:''
            },
        
        }
    }

    async componentDidMount(){
        try {
           
            if(this.props.location.pathname.includes("new"))
             this.setState({page : 'ADD'})
             else{
               this.setState({page:'UPDATE'});
               const getCurrentDistributor = this.props.getCurrentDistributor;
               await getCurrentDistributor(this.props.match.params.id);
               this.setState(this.props.dealer);

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

    addDistributor = (event) =>{
      if(this.state.page === 'ADD')
        this.props.createDistributor(this.state, this.props.history);
       else
         this.props.updateDistributor(this.props.match.params.id, this.state, this.props.history); 
     
    }



    

    render(){

        return (

          <div>
              <PageTitle title="Distributors"/>
              <Grid item lg={10} md={10} sm={12} xs={12}>

              <Widget
            title="Add New Distributor"
            upperTitle
           
          >

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
            value={this.state.lastName}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="mobile"
            name="mobile"
            label="Mobile No"
            fullWidth
            autoComplete="mobile"
            value={this.state.mobile}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            value={this.state.email}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="line1"
            name="line1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            value={this.state.address.line1}
            onChange={this.handleAddressChange}


          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="line2"
            name="line2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
            value={this.state.address.line2}
            onChange={this.handleAddressChange}


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            value={this.state.address.city}
            onChange={this.handleAddressChange}


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state"
           name="state" 
           label="State/Province/Region" 
           fullWidth
           onChange={this.handleAddressChange}
           value={this.state.address.state}

            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            value={this.state.address.zip}
            onChange={this.handleAddressChange}


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            value={this.state.address.country}
            onChange={this.handleAddressChange}


          />
        </Grid>
        <Grid container spacing={3} style={{margin:'10px 0px'}} alignItems="flex-start" justify="flex-end" direction="row">
          <Button variant="contained" style={{marginRight:'8px', backgroundColor:'#3CD4A0', color:'#fff'}}
 >CLEAR</Button>
          
          <Button variant="contained" color="secondary" onClick={this.addDistributor}>{this.state.page} DISTRIBUTOR</Button>
        </Grid>

        

      </Grid>
      </Widget>
      </Grid>
          </div>   

        )
    }
}

export default connect (store =>({dealer:store.currentDistributor}), { getCurrentDistributor, createDistributor, updateDistributor } )(AddEditDistributor);


