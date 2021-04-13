import React, {Component} from 'react';
import {Button,Input,FormGroup,Label,Form} from 'reactstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class signup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            'name' : '',
            'email' : '',
            'password' : '',                    
            'phone':'',
            'isLoading' :'',    
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
                this.setState({isLoading:false});                
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
        
        const isLoading =this.state.isLoading;
        return (
            <div>
                <Form className="">
                <FormGroup>
                        <Label for="name">Name</Label> 
                        <Input placeholder=" Name"
                          type="text"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChangehandler}>
                              
                          </Input>
                          
                          <span className="text-danger">{this.state.errName}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label> 
                        <Input placeholder=" Email"
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChangehandler}>
                              
                          </Input>
                          
                          <span className="text-danger">{this.state.errEmail}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Mobile</Label> 
                        <Input placeholder=" Mobile Number"
                          type="text"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.onChangehandler}>
                              
                          </Input>
                          
                          <span className="text-danger">{this.state.errPhone}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label> 
                        <Input placeholder=" Password"
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangehandler}></Input>
                          
                          <span className="text-danger">{this.state.errPass}</span>
                    </FormGroup>
                    <Button  
                         className="text-center mb-4"
                         color="success"
                         onClick={this.onSignUpinhandler}>

                             Sign up
                                 {isLoading ? (
                                            <span
                                              className="spinner-border spinner-border-sm ml-5"
                                               role="status"
                                               aria-hidden="true">
                                             </span>
                                             ) : (
                                             <span></span>
                                            )}
                         </Button>
                      </Form>

                
                <span className="text-danger">{this.state.msg}</span>
            </div>

        );
    }

    
}
