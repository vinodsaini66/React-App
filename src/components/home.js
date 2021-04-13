import React,{Component} from 'react';
import {Grid} from '@material-ui/core';
import SignInOutContainer from '../container'

class Home extends Component {
    render() {
        return(
            <div>
                <Grid container style={{ minHeight: '100vh' }}>
                     <Grid item
                             xs={12} 
                             sm={8}
                             style={{backgroundImage: 'url("https://iphoneswallpapers.com/wp-content/uploads/2019/11/Iron-Man-Armor-4K-iPhone-Wallpaper-1.jpg")',   
                             height:'100vh',
                             display:'flex',
                             width:'100%',
                             position:'relative',
                             justifyContent: 'flex-end',
                             alignItems: 'center',
                             marginTop: 0, 
                            backgroundSize:'cover',
                            
                                }}>
                                </Grid>
                        
                     <Grid container item xs={12} sm={4}
                         alignItems="center"
                         direction="column" 
                         justify="space-between"
                         style={{ padding :"" }}>
                        <div/>
                        <div >
                            <Grid container justify="center">
                            <SignInOutContainer></SignInOutContainer>
                            </Grid>
                        </div>
                        <div/>
                        <div></div>
                     
                    </Grid>

                </Grid>
                
            </div>

        );
    }
}
export default Home;