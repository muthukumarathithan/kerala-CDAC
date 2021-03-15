import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import {
  Grid,
  Select,
  OutlinedInput,
  MenuItem,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {connect} from 'react-redux';

//redux
import {getLiveVehicles} from '../../store/actions/sockets';

// styles 
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import VehicleMap from "../../components/GoogleMap/VehicleMap";
import VehiclesMap from "../../components/GoogleMap/VehiclesMap";
import VehicleInfo from "../../components/GoogleMap/Vehicleinfo";
import VehicleLive from "../../components/DashboardTable/VehicleLive";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/BigDot";


const mainChartData = getMainChartData();
const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];

const hideShadows = {
  shadows: ["none"]
}

const datatableData = [
  ["Soundar", "Example Inc.", "Yonkers", "NY"],
  ["John Walsh", "Example Inc.", "Hartford", "CT"],
  ["Bob Herm", "Example Inc.", "Tampa", "FL"],
  ["James Houston", "Example Inc.", "Dallas", "TX"],
  ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
  ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
  ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
  ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
  ["Meral Elias", "Example Inc.", "Hartford", "CT"],
  ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
  ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
  ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
  ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
  ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
  ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
  ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
  ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();



  // local
  var [mainChartState, setMainChartState] = useState("monthly");

  return (
    <>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Vehicles
                </Typography>
                <div className={classes.mainChartHeaderLabels}>

                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="#3598dc" size='extra' total={props.status.total}/>
                    <Typography className={classes.mainChartLegentElement}>
                      Vehicles
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="#26C281" size='extra' total={props.status.online}/>
                    <Typography className={classes.mainChartLegentElement}>
                      Online
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="default" size='extra' total={props.status.idle}/>
                    <Typography className={classes.mainChartLegentElement}>
                      Idle
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="#7d68ff" size='extra'total={props.status.offline}/>
                    <Typography className={classes.mainChartLegentElement}>
                      Offline
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="#e7505a" size='extra' total={props.status.offroad}/>
                    <Typography className={classes.mainChartLegentElement}>
                      Offroad
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="#E87E04" size='extra' total={props.status.garage}/>
                    <Typography className={classes.mainChartLegentElement}>
                      Garage
                    </Typography>
                  </div>
                </div>
                <Select
                  value={mainChartState}
                  onChange={e => setMainChartState(e.target.value)}
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      classes={{
                        notchedOutline: classes.mainChartSelectRoot,
                        input: classes.mainChartSelect,
                      }}
                    />
                  }
                  autoWidth
                >
                  <MenuItem value="daily">Table</MenuItem>
                  <MenuItem value="weekly">Map</MenuItem>
                  <MenuItem value="monthly">Map & Table</MenuItem>
                </Select>
              </div>
            }
          >
            

             <Grid container spacing={4}>
               <Grid item md={7} sm={12} xs={12} >
                  <VehicleLive />

              </Grid> 
              <Grid item md={5} sm={12} xs={12} style={{minHeight:'80vh'}}>
                  <Widget
                    title="Map View"
                    upperTitle
                    noBodyPadding
                    bodyClass={classes.tableWidget}
                    boxShadow='none'
                  >
                     {
                  Object.keys(props.vehicle).length !== 0 ?
                      (<React.Fragment>
                          <VehicleMap />
                          <VehicleInfo />
                      </React.Fragment>)  : (<VehiclesMap />)

                }
                     
                  </Widget>       
              </Grid> 
            </Grid> 

          </Widget>
        </Grid>


      </Grid>
    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}


export default connect (store =>({status:store.vehicleStatus, vehicle:store.liveVehicle}))(Dashboard);



