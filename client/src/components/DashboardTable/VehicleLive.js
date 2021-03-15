import React, {Component} from 'react';
import {connect} from 'react-redux';
import MUIDataTable from "mui-datatables";
import moment from 'moment';
import Swal from 'sweetalert2';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import {
    LocalShipping as StatusIcon,
    Battery80TwoTone as Battery80,
    Battery20 as Battery20,
} from "@material-ui/icons";



//redux
import {getLiveVehicles, getLiveVehicle} from '../../store/actions/';



const OFFROAD_TIME = 24;
const OFFLINE_TIME = 6;

const getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {
        },
        paper: {
          boxShadow: "none",
        }
      },
      MUIDataTableHeadCell: {
        root: {
           fontWeight:'bolder'
      }
      },
      MUIDataTableBodyRow: {
        root: {
          whiteSpace: 'nowrap'
        }
      }, 

      MuiTableRow: {
        root: {
          '&$selected': {
            backgroundColor: 'yellow'
          }
        }
      },  

     
    }
  })

const columns = [
    {
        name: "id",
        label: "No.",
     },
    {
        name: "reg_no",
        label: "Vehicle No.",
     },
     {
        name: "device_id",
        label: "Device ID",
        }, 
          
    {
        name: "status",
        label: "Status",
        }, 
    {
        name: "speed",
        label: "Speed",
        },
    {
        name: "main_battery",
        label: "Main Battery",
        },
    {
        name: "gps_battery",
        label: "Gps Battery",
        },  
    {
        name: "device_time",
        label: "Date",
        },       

  
  
   ];



class VehicleList extends Component {

    constructor(props){
        super(props);
        this.state = {
            datatableData:[],
            vehicles:[]
        }
    }

    componentWillMount() {
    
    }



    async componentDidMount(){
        try {
            const getVehicles = this.props.getLiveVehicles;
            await getVehicles();
   
        } catch (error) {
            
        }

        
    }

    
    handleRowClick = (rowData, rowMeta) => {
      const getLiveVehicle = this.props.getLiveVehicle;
      getLiveVehicle(rowData[1]);
  };
    


    render(){
        const datatableData = this.props.vehicles.map((item, index)=>({
            id:index + 1,
            device_id:item.device_id ,
            reg_no:item.vehicle_reg_no,
            status:<StatusIcon style={{color:item.color}}/>,
            main_battery:<Battery80 style={{ color:'green'}} />,
            gps_battery:<Battery20 style={{ transform: "rotate(90deg)", color:'red'}} />,
            speed: (item.ignition_status ? 0 : item.speed) || 0,
            device_time:moment(item.device_time).format('DD-MM-YY hh:mm:ss'),
        }));

        return (
          <React.Fragment>
               <MuiThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable
                        title="Table View"
                        data={datatableData}
                        columns={columns}
                        options={{
                        filterType: "checkbox",
                        selectableRows: false,
                        onRowClick: this.handleRowClick,
                        }}
                        style={{boxShadow: "none"}}
                        />
               </MuiThemeProvider>
          </React.Fragment>  
          

        )
    }
}

export default connect (store =>({vehicles:store.liveVehicles}), {getLiveVehicles, getLiveVehicle } )(VehicleList);


