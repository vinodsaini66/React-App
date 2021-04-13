import React,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


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



 class login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            'email' : '',
            'password' : '',
            'msg' : '',
            'isLoading' : false,
            'redirect' : false,
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

    onLoginhandler = () => {
        this.setState({isLoading:true});

        let option={
            header:{
                'Content-Type': 'multipart/form-data',   
                "Access-Control-Allow-Origin": "*", 
            }
        };
        axios.post(
            'http://127.0.0.1:8000/api/user-login',{
                email: this.state.email,
                password: this.state.password,
            },option)
            .then((response) => {
                this.setState({isLoading:false});                
                if (response.data.status === "success" && response.data.success === true) {
                    
                    localStorage.setItem('isLoggedIn',true);
                    localStorage.setItem('userData', JSON.stringify(response.data.data));
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
                       });
                       setTimeout(() =>{
                           this.setState({'errEmail': '', 'errPass':""});
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
        if(this.state.redirect){
            return  <Redirect to="/home" />;
        }
        const login1= localStorage.getItem('isLoggedIn');
        if(login1){
            return <Redirect to="/home" />;
        }
        const isLoading =this.state.isLoading;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {/* <Typography component="h1" variant="h5">
          Sign in
        </Typography> */}
        <form className={classes.form}  >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={this.state.email}
            onChange={this.onChangehandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.onChangehandler}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.onLoginhandler}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs={6}>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            {/* <Grid item xs={6}>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </form>
      </div>
      
    </Container>
  );
    }
}
export default withStyles(classes)(login);