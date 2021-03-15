import React, {Component} from 'react';
import {connect} from 'react-redux';
import MUIDataTable from "mui-datatables";
import  { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import moment from 'moment';
import Swal from 'sweetalert2';



//redux
import {getVehicles, removeVehicle} from '../../store/actions/vehicles';

//Component
import PageTitle from "../PageTitle";


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
        name: "rto",
        label: "RTO",
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

class VehicleList extends Component {

    constructor(props){
        super(props);
        this.state = {
            datatableData:[]
        }
    }

    async componentDidMount(){
        try {
            const getVehicles = this.props.getVehicles;
            await getVehicles();
            
        } catch (error) {
            
        }

        
    }

    
    handleSelect = (id) =>{
        const getCurrentVehicle = this.props.getCurrentVehicle;
        getCurrentVehicle(id);

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
                this.props.removeVehicle(id)
             
            }
          })
    }

    


    render(){
        const datatableData = this.props.vehicles.map((item, index)=>({
            id:index + 1,
            device_id:item.device_id ,
            rto:item.rto ,
            reg_no:item.vehicle_reg_no,
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
               <PageTitle title="Vehicles" button="ADD NEW VEHICLE" onClick={()=>this.props.history.push(`${this.props.location.pathname}/new`)} />
                <MUIDataTable
                    title="Vehicle List"
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

export default connect (store =>({vehicles:store.vehicles}), {getVehicles, removeVehicle } )(VehicleList);


