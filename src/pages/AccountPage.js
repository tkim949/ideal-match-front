import React from 'react';
import { Grid } from '@material-ui/core';
//import ProfileForm from '../components/PostProfile';
import UserProfile from '../components/UserProfile';
export default function AccountPage() {

    return (

        <Grid container spacing={4}>
                <Grid item sm={7} xs={12}>
                <UserProfile />
                </Grid>
                <Grid item sm={5} xs={12}>
                   
                    <p>For the whom I like and who likes me page</p>
               </Grid>
            </Grid>
        
    )
}
