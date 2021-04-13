import React from 'react';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import Login from '../components/login';
import Login from '../components/login-ui';
import Signup from '../components/signup-ui';

const SignInOutContainer = () => {
        const [value,setValue]=React.useState(0);
        const paperStyle = {width:370,margin:'20px auto',height:'80vh'};
        function TabPanel(props) {
            const { children, value, index, ...other } = props;          
            return (
              <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
              >
                {value === index && (
                  <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
                  </Box>
                )}
              </div>
            );
          }
        const handleChange = (event, newValue) => {
          setValue(newValue);
        };

    return(
        <Paper elevation={20} style={paperStyle}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>
      <TabPanel value={value} index={0}>
          <div><Login></Login></div>
      </TabPanel>
      <TabPanel value={value} index={1}>
          <Signup></Signup>
      </TabPanel>
    </Paper>
    );
}
export default SignInOutContainer;