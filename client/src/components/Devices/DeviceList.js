import React, {Component} from 'react';
import {connect} from 'react-redux';
import MUIDataTable from "mui-datatables";
import  { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import moment from 'moment';
import Swal from 'sweetalert2';



//redux
import {getDevices, removeDevice} from '../../store/actions/devices';

//Component
import PageTitle from "../PageTitle";


const columns = [
    {
        name: "id",
        label: "No.",
       },
    {
     name: "device_id",
     label: "Device ID",
     },
    {
        name: "sim_no",
        label: "Sim No",
    }, 
    {
        name: "network",
        label: "Network",
        options: {
         filter: true,
         sort: false,
        }
       },
       {
        name: "device_type",
        label: "Device Type",
        options: {
         filter: true,
         sort: false,
        }
       },   

     {
        name: "distributor",
        label: "Distributor",
        options: {
         filter: true,
         sort: false,
        }
       },  
       {
        name: "dealer",
        label: "Dealer",
        options: {
         filter: true,
         sort: false,
        }
       }, 
       {
        name: "customer",
        label: "Customer",
        options: {
         filter: true,
         sort: false,
        }
       },        
    {
        name: "created",
        label: "Created At",
        options: {
         filter: true,
         sort: false,
        }
       },
    {
     name: "action",
     label: "Action",
     options: {
      filter: true,
      sort: false,
     }
    },
   ];

class DeviceList extends Component {

    constructor(props){
        super(props);
        this.state = {
            datatableData:[]
        }
    }

    async componentDidMount(){
        try {
            const getDevices = this.props.getDevices;
            await getDevices();
            
        } catch (error) {
            
        }

        
    }

    
    handleSelect = (id) =>{
        const getCurrentDevice = this.props.getCurrentDevice;
        getCurrentDevice(id);

    }

    handleDelete = (id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover',
            confirmButtonColor: '#FF5C93',
            cancelButtonColor: '#3CD4A0',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
                this.props.removeDevice(id)
             
            }
          })
    }

    


    render(){
        const datatableData = this.props.devices.map((item, index)=>({
            id:index + 1,
            device_id:item.device_id ,
            sim_no:item.sim_no,
            network:item.network,
            device_type:item.device_type,
            distributor: item.distributor && item.distributor.firstName || 'Not Assigned',
            dealer:item.dealer && item.dealer.firstName || 'Not Assigned',
            customer:item.customer && item.customer.firstName || 'Not Assigned',
            created:moment(item.created).format('DD-MM-YYYY'),
            action: <div class="MuiBox-root">
                  <Link style={{textDecoration:'none'}} to={`${this.props.location.pathname}/edit/${item._id}`}>
                      <Button 
                       variant="contained"
                       size="small"
                       color="inherit"
                       style={{marginRight:'8px', backgroundColor:'#3CD4A0', color:'#fff'}}

                      >
                          EDIT
                       </Button>
                       </Link>
                   <Button onClick={()=>this.handleDelete(item._id)} id={item._id}
                    variant="contained"
                    size="small"
                    style={{marginRight:'8px'}}
                    color="secondary" >
                        DELETE
                    </Button> 
                </div>

        }));

        return (
          <React.Fragment>
               <PageTitle title="Devices" button="ADD NEW DEVICE" onClick={()=>this.props.history.push(`${this.props.location.pathname}/new`)} />
                <MUIDataTable
                    title="Device List"
                    data={datatableData}
                    columns={columns}
                    options={{
                    filterType: "checkbox",
                    selectableRows: false,
                    }}
                />  
          </React.Fragment>  
          

        )
    }
}

export default connect (store =>({devices:store.devices}), {getDevices, removeDevice } )(DeviceList);


