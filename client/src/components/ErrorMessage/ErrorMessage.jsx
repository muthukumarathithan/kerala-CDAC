import React,{Component} from 'react';
import {connect} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ErrorMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            error:''
        }
    }
   
    static getDerivedStateFromProps(props, state) {
        if (props.error.message !== null) {
            toast.error(props.error.message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
    });
           }
        return state;
      }

    render(){
        return <ToastContainer />
    }
}

export default connect (store =>({error:store.error}))(ErrorMessage);