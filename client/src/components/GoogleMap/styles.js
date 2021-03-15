import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    height: "60%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: '10px'
  },
  formContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
  },
  form: {
    width: '90%',
  },
  tab: {
    fontWeight: 400,
    fontSize: 18,
  },
  greeting: {
    fontWeight: 500,
    textAlign: "left",
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  description: {
    marginTop: '10px',
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center'
  },
  driverDesc: {
    flex:2,
    display:'flex',
    flexDirection:'column',
  },
  locationDesc: {
    flex:2,
    display:'flex',
    flexDirection:'column',
    flexWrap:'wrap'
  },
  driverIcon: {
    flex:1,
    height: theme.spacing(8),
    marginRight: theme.spacing(2),
    textAlign:'center',
  },
  detailsText:{
    paddingLeft: theme.spacing(0.5),
  },
  indicatorIcon:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop: theme.spacing(2),
  },
  iconBtn:{
    flex:1,
    textDecoration:'none',
    color:'inherit'
  },

  googleButton: {
    marginTop: theme.spacing(6),
    boxShadow: theme.customShadows.widget,
    backgroundColor: "white",
    width: "100%",
    textTransform: "none",
  },
  googleButtonCreating: {
    marginTop: 0,
  },
  googleIcon: {
    width: 30,
    marginRight: theme.spacing(2),
  },
  MuiTabsCentered: {
    justifyContent: 'flex-start'
},
  creatingButtonContainer: {
    marginTop: theme.spacing(2.5),
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButton: {
    height: 46,
    textTransform: "none",
  },
  formDividerContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  formDividerWord: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40",
  },
  errorMessage: {
    textAlign: "center",
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light,
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main,
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`,
    },
  },
  textField: {
    borderBottomColor: theme.palette.background.light,
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgetButton: {
    textTransform: "none",
    fontWeight: 400,
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
  },

}));
