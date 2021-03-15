import React, {Component} from 'react';
import AnimationCount from 'react-count-animation';
import 'react-count-animation/dist/count.min.css';


class DashboardStatus extends Component {

constructor(props){
  super(props);
}

render () {
   return (
     <div className="col-lg-2 col-md-2 col-sm-3 col-xs-6">
       <div className="dashboard-stat2 ">
         <div className="display">
           <div className="number">
             <h3 className="font-green-sharp">
               <span>
                     <AnimationCount start={0}
                     count={this.props.total}
                     duration={3000}
                     useGroup={true}
                     animation={'up'}
                     />
               </span>
             </h3>
           <small>{this.props.title}</small>
           </div>
           <div className="icon">
             <i className="icon-bar-chart" />
           </div>
         </div>
       </div>
     </div>
   )
 }
}


export default DashboardStatus
