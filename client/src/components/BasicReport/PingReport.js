import React, { Component } from 'react';
import {Button, Grid, TextField, Paper, Typography} from '@material-ui/core';
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
      label: '00-01',
      name: '1',
    },
    {
      label: '01-02',
      name: '2',
    },
    {
      label: '02-03',
      name: '3',
    },
    {
      label: '03-04',
      name: '4',
    },
    {
      label: '04-05',
      name: '5',
    },
    {
      label: '05-06',
      name: '6',
    },
    {
      label: '06-07',
      name: '7',
    },
    {
      label: '07-08',
      name: '8',
    },
    {
      label: '08-09',
      name: '9',
    },
    {
      label: '09-10',
      name: '10',
    },
    {
      label: '10-11',
      name: '11',
    },
    {
      label: '11-12',
      name: '12',
    },
    {
      label: '12-13',
      name: '13',
    },
    {
      label: '13-14',
      name: '14',
    },
    {
      label: '14-15',
      name: '15',
    },
    {
      label: '15-16',
      name: '16',
    },
    {
      label: '16-17',
      name: '17',
    },
    {
      label: '17-18',
      name: '18',
    },
    {
      label: '18-19',
      name: '19',
    },
    {
      label: '19-20',
      name: '20',
    },
    {
      label: '20-21',
      name: '21',
    },
    {
      label: '21-22',
      name: '22',
    },
    {
      label: '22-23',
      name: '23',
    },
    {
      label: '23-24',
      name: '24',
    },
    {
      label:'Total Pings',
      name:'total'
    }
]  

 


const styles = theme => ({
    root: {
        flexGrow: 1,
      },
    paper: {
        padding: theme.spacing(2),
      },
  });


class PingReport extends Component{
    constructor(props){
        super(props);
        this.state = {
            vehicle:[],
            startDate:moment(),
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

      showReport =  async () => {

        const data = {
        startDate:moment(this.state.startDate).startOf('day'),
        endDate:moment(this.state.startDate).endOf('day'),
        device_id:this.state.vehicle.device_id
      } 
      const response = await api.call('post',`reports/ping`, data);

      if(response.length > 0){

        var pings = response.map((item)=>{
          var fi = [], total = 0;
          for(var i=0;i<24;i++){
            var val = 0;
            var result=item.ping.find(device =>device.hour === i);
            if(result)
              val=result.total
            fi.push(val);
            total = total + val;
              }
              fi.push(total);
          return {
            device_id:item._id,
            ping:fi
          }
        });
        var rows = pings.map((item, index) =>{
          var total_pings = 0;
          for(var i=0;i<24;i++){
             total_pings = total_pings + item.ping[i];
          }
          return {
            device_id:item.device_id,
            vehicle_reg_no:this.state.vehicle.vehicle_reg_no,
            1:item.ping[0],
            2:item.ping[1],
            3:item.ping[2],
            4:item.ping[3],
            5:item.ping[4],
            6:item.ping[5],
            7:item.ping[6],
            8:item.ping[7],
            9:item.ping[8],
            10:item.ping[9],
            11:item.ping[10],
            12:item.ping[11],
            13:item.ping[12],
            14:item.ping[13],
            15:item.ping[14],
            16:item.ping[15],
            17:item.ping[16],
            18:item.ping[17],
            19:item.ping[18],
            20:item.ping[19],
            21:item.ping[20],
            22:item.ping[21],
            23:item.ping[22],
            24:item.ping[23],
            total:total_pings
          }
        });
        rows.sort((a, b) => (a.device_id < b.device_id) ? 1 : -1);
        this.setState({rows});
      }
      

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
                   <Grid item md={3}>
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
                      format={"dd-MM-yyyy"} 

                       />
                   </MuiPickersUtilsProvider>
                  </Grid>


                  <Grid item md={3}>
                     <Button variant="contained" color="secondary" onClick={this.showReport}>View Report</Button>
                  </Grid>

               </Grid>
              </Paper>
              <Grid style={{marginTop:'20px'}}>
               <MuiThemeProvider >
                 <MUIDataTable
                        title="Ping Report"
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

PingReport.defaultProps = {
    vehicles:[]
}


export default withStyles(styles)(PingReport);



