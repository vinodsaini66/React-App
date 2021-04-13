import React,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {Redirect} from 'react-router-dom';// for login


const classes = theme => ({
    paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });




class signup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            'name' : '',
            'email' : '',
            'password' : '',                    
            'phone':'',   
            'msg' :'',
            'errName': '',
            'errPhone': '',
            'errEmail': '',
            'errPass': '',
            'errMsg' : '',
        };
    }
    onChangehandler = (e) =>{
        let name =e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    };

    onSignUpinhandler = () => {
        this.setState({isLoading:true});

        let option={
            header:{
                'Content-Type': 'multipart/form-data',   
                "Access-Control-Allow-Origin": "*", 
            }
        };
        axios.post(
            'http://127.0.0.1:8000/api/user-signup',{
                name:this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password,
            },option)
            .then((response) => {
                             
                if (response.data.status === "success" && response.data.success === true) {                    

                    this.setState({
                        'msg' : response.data.message,
                        'redirect' : true,
                    });
                    setTimeout(() =>{
                        this.setState({'msg': ""});
                    },2000);
                }

                if(response.data.status === "Failed" && response.data.success === false) {
                       this.setState({
                           'errEmail' : response.data.error.email,
                           'errPass': response.data.error.password, 
                           'errName': response.data.error.name,
                           'errPhone' : response.data.error.phone,                          
                       });
                       setTimeout(() =>{
                           this.setState({'errEmail': '', 'errPass':"",'errName': '', 'errPhone':''});
                       },2000);
                } else if(response.data.status === 'Failed1' && response.data.success === false) {
                    this.setState({'msg' : response.data.message,});
                    setTimeout(() =>{
                        this.setState({'msg': ""});
                    },2000);
                }
            })
            .catch((error) => {
                console.log(error);
            });

    };
    
    render() {
        
         
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {/* <Typography component="h1" variant="h5">
          Sign up
        </Typography> */}
        <form className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="phone"
                name="phone"
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email "
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            onClick={this.onSignUpinhandler}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            {/* <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid> */}
          </Grid>
        </form>
      </div>
      
    </Container>
  );
    }
}
export default withStyles(classes)(signup);