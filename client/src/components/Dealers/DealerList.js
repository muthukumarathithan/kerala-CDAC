import React, {Component} from 'react';
import {connect} from 'react-redux';
import MUIDataTable from "mui-datatables";
import  { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import moment from 'moment';
import Swal from 'sweetalert2';



//redux
import {getDealers, removeDealer} from '../../store/actions/dealers';

//Component
import PageTitle from "../PageTitle";


const columns = [
    {
        name: "id",
        label: "No.",
       },
    {
     name: "name",
     label: "Name",
     },
    {
        name: "mobile",
        label: "Mobile",
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
        name: "city",
        label: "City",
        options: {
         filter: true,
         sort: false,
        }
       }, 
       {
        name: "state",
        label: "State",
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

class DealerList extends Component {

    constructor(props){
        super(props);
        this.state = {
            datatableData:[]
        }
    }

    async componentDidMount(){
        try {
            const getDealers = this.props.getDealers;
            await getDealers();
            
        } catch (error) {
            
        }

        
    }

    
    handleSelect = (id) =>{
        const getCurrentDealer = this.props.getCurrentDealer;
        getCurrentDealer(id);

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
                this.props.removeDealer(id)
             
            }
          })
    }

    


    render(){
        const datatableData = this.props.dealers.map((item, index)=>({
            id:index + 1,
            name:item.firstName + ' '+item.lastName ,
            mobile:item.mobile,
            city:item.address.city,
            state:item.address.state,
            distributor:'Not Assigned' ||item.distributor && item.distributor.first_name,
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
               <PageTitle title="Dealers" button="ADD NEW DEALER" onClick={()=>this.props.history.push(`${this.props.location.pathname}/new`)} />
                <MUIDataTable
                    title="Dealer List"
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

export default connect (store =>({dealers:store.dealers}), {getDealers, removeDealer } )(DealerList);


