import React, { Component } from 'react';
import {Button, Grid, TextField, Paper} from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

import api from '../../services/api';




  const columns = [
    {
      label: 'GPS Device ID',
      name: 'device_id',
    },
    {
      label: 'Reg Number',
      name: 'vehicle_reg_no',
    },
    {
      label: 'Speed',
      name: 'speed',
    },
    {
      label: 'Date Time',
      name: 'date',
    },

]  

const styles = theme => ({
    root: {
        flexGrow: 1,
      },
    paper: {
        padding: theme.spacing(2),
      },
  });


class OverspeedReport extends Component{
    constructor(props){
        super(props);
        this.state = {
            vehicle:[],
            startDate:moment(),
            endDate:moment().add(1,'day'),
            Date:new Date(),
            rows:[]
        }
    }

    getMuiTheme = () => createMuiTheme({
      overrides: {
        MUIDataTableHeadCell: {
          root: {
            '&:nth-child(0)': {
              width: 570,
              backgroundColor: "#FF0000"
            }
          }
        }
      }
    })

    handleStartDateChange = (date) =>{
      this.setState({startDate:date})
    }
   
    handleEndDateChange = (date) =>{
      this.setState({startDate:date})
    }

      showReport =  async () => {

        const data = {
        startDate:this.state.startDate,
        endDate:this.state.endDate,
        device_id:this.state.vehicle.device_id
      } 
      const response = await api.call('post',`reports/idle`, data);
      this.setState({rows:response})
    }

    handleInputChange = (event) => {
      this.setState({
        [event.target.id]:event.target.value
      })
    }


    render(){
        const { classes } = this.props;
        const vehicles = {
            options: this.props.vehicles,
            getOptionLabel: (option) => option.vehicle_reg_no,
          };

        return(
           <div className={classes.root}>
            <Paper elevation={2} className={classes.paper}>
                <Grid container spacing={3} style={{alignItems:'center'}}>
                   <Grid item md={2}>
                      <Autocomplete
                         {...vehicles}
                        id="dealer"
                        value={this.state.vehicle}
                        onChange={(event, newValue) => {
                            this.setState({vehicle:newValue});
                        }}
                        renderInput={(params) => <TextField {...params} label="Vehicle" margin="normal" />}
                        />
                  </Grid>
                  <Grid item md={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                     value={this.state.startDate}
                      onChange={this.handleStartDateChange}
                      label="Start Date"
                      format={"dd-MM-yyyy hh:mm:ss"} 

                       />
                   </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item md={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                     value={this.state.endDate}
                      onChange={this.handleEndDateChange}
                      label="End Date"
                      format={"dd-MM-yyyy hh:mm:ss"} 

                       />
                   </MuiPickersUtilsProvider>
                  </Grid> 
                  <Grid item md={2}>
                  <TextField
                      required
                      id="speed"
                      name="speed"
                      label="Speed Limit"
                      fullWidth
                      autoComplete="speed"
                      value={this.state.speed}
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  <Grid item md={2}>
                     <Button variant="contained" color="secondary" onClick={this.showReport}>View Report</Button>
                  </Grid>

               </Grid>
              </Paper>
              <Grid style={{marginTop:'20px'}}>
               <MuiThemeProvider >
                 <MUIDataTable
                        title="Overspeed Report"
                        data={this.state.rows}
                        columns={columns}
                        options={{
                        filterType: "checkbox",
                        selectableRows: false,
                        }}
                    />  
                </MuiThemeProvider>
    
              </Grid>
      
            </div>
        )
    }
}

OverspeedReport.defaultProps = {
    vehicles:[]
}


export default withStyles(styles)(OverspeedReport);



