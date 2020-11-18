import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
//import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import AppIcon from '../images/balloons.png';

/*import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close'; */
//https://stackoverflow.com/questions/47798104/set-min-max-on-textfield-type-number
//https://material-ui.com/components/radio-buttons/
/*
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'; */

// redux
import { connect } from 'react-redux';
import { postProfile } from '../redux/actions/dataActions';
//import { editUserDetails, clearErrorsU } from '../redux/actions/userActions';

const styles = {
    profileForm: {
        textAlign: 'center',
        //width: '600px'
    },
    icon: {
        margin: '20px auto 20px auto',
        height: '10%',
        width: '15%'
    },
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  },
  errorMsg: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
}
};

class PostProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //name: '',
            intro: '',
            location:'',
            age: 18, 
            //errors: {} 
        };
    }
    /*
            value: '',
            sex: '',
            pGender: '',
            interest:'',

    */
    /*
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
        this.setState({
            errors: nextProps.UI.errors
        });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
        this.setState({ body: '', open: false, errors: {} });
        }
    }*/
    //// <-- Only update error state if value different
    /*
    componentDidUpdate(prevProps) {
        if (prevProps.UI.errors !== this.props.UI.errors) { 
            this.setState({
              errors: this.props.UI.errors,
            });
          }
    }*/
    //[e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    //https://stackoverflow.com/questions/46447504/number-input-is-string-not-integer-in-react
    handleSubmit = (event) => {
        event.preventDefault();
        //this.setState({
         //   loading: true
        //});
        const newProfileData = {
            //name: this.state.name,
            intro: this.state.intro,
            location: this.state.location,
            age: this.state.age,
           
        };
        /*
         value: this.state.value,
            interest: this.state.interest,
            sex: this.state.sex,
            pGender: this.state.pGender
        */
        console.log(newProfileData);
        this.props.postProfile({ newProfileData });
        //this.props.editUserDetails({ newProfileData });
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value });
    };
    /*
                        helperText={errors.location}
                        error={errors.location ? true : false}
                        helperText={errors.intro}
                        error={errors.intro ? true : false}
                        helperText={errors.age}
                        error={errors.age ? true : false}

                        {errors.errorMsg && (
                            <Typography variant="body2" className={classes.errorMsg}>
                                {errors.errorMsg}
                            </Typography>
                        )}

    */
    render() {
        //const { errors } = this.state;
        const { classes, 
              //UI: { loading }
             } = this.props;
        return (
            <Grid container className={classes.profileForm}>
            <Grid item sm></Grid>
           
            <Grid>
            <img src={AppIcon} alt="fillForm" className={classes.icon}></img>
                <Typography variant="h4" className={classes.pageTitle}>
                    Fillout your profile!
                </Typography>
                <br/>
                {/*<form noValidate onSubmit={this.handleSubmit}> */}
                   <form> 
                    <TextField 
                        id="intro" 
                        name="intro" 
                        type="text" 
                        label="Introduction" 
                        variant="outlined"
                        multiline
                        rows={10}
                        className={classes.textField}
                        value={this.state.intro}  
                        onChange={this.handleChange} 
                        fullWidth>
                    </TextField>
                    <TextField 
                        id="location" 
                        name="location" 
                        type="text" 
                        label="Location" 
                        variant="outlined"
                        className={classes.textField}
                        value={this.state.location}  
                        onChange={this.handleChange} 
                        fullWidth>
                    </TextField>
                    <br/>
                    
                    <br/>
                    
                    <br/>
                    
                    <br/>
                    
                    <TextField
                        id="age" 
                        name="age" 
                        type="number" 
                        InputProps={{
                            inputProps: { 
                                max: 100, min: 18 
                            }
                        }}
                        label="age" 
                        variant="outlined"
                        className={classes.textField}
                        value={this.state.age}  
                        onChange={this.handleChange} 
                        fullWidth> 
                    </TextField>

                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onSubmit={this.handleSubmit}
                        >Submit
                        
                       </Button>  
                </form>

            </Grid>
           
            <Grid item sm></Grid>
            
        </Grid>
        );
    }
}

PostProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  //user: PropTypes.object.isRequired,
  //UI: PropTypes.object.isRequired,
  postProfile: PropTypes.func.isRequired,
  //clearErrors: PropTypes.func.isRequired,
  //editUserDetails: PropTypes.func.isRequired,
  //clearErrorsU: PropTypes.func.isRequired,
  
};

const mapStateToProps = (state) => {
   return { UI: state.UI, user: state.user}
}
  


export default connect( mapStateToProps,{ postProfile } )(withStyles(styles)(PostProfile));

/*
Error:

Solution: https://stackoverflow.com/questions/55429442/material-ui-select-component-a-component-is-changing-a-controlled-input-of-type


*/
/*
 

*/
/*
<TextField 
                        id="value" 
                        name="value" 
                        type="text" 
                        label="value" 
                        variant="outlined"
                        helperText={errors.value}
                        error={errors.value ? true : false}
                        className={classes.textField}
                        value={this.state.value}  
                        onChange={this.handleChange} 
                        fullWidth>
                    </TextField>

                   <TextField 
                        id="interest" 
                        name="interest" 
                        type="text" 
                        label="interest" 
                        variant="outlined"
                        helperText={errors.interest}
                        error={errors.interest ? true : false}
                        className={classes.textField}
                        value={this.state.interest}  
                        onChange={this.handleChange} 
                        fullWidth>
                    </TextField>
                    <TextField 
                        id="sex" 
                        name="sex" 
                        type="text" 
                        label="sex" 
                        variant="outlined"
                        helperText={errors.sex}
                        error={errors.sex ? true : false}
                        className={classes.textField}
                        value={this.state.sex}  
                        onChange={this.handleChange} 
                        fullWidth>
                    </TextField>
                    <TextField 
                        id="pGender" 
                        name="pGender" 
                        type="text" 
                        label="pGender" 
                        variant="outlined"
                        helperText={errors.pGender}
                        error={errors.pGender ? true : false}
                        className={classes.textField}
                        value={this.state.pGender}  
                        onChange={this.handleChange} 
                        fullWidth>
                    </TextField>

*/
/*
<TextField 
                        id="name" 
                        name="name" 
                        type="text" 
                        label="Name" 
                        variant="outlined"
                        helperText={errors.name}
                        error={errors.name ? true : false}
                        className={classes.textField}
                        value={this.state.name}  
                        onChange={this.handleChange} 
                        fullWidth>
                    </TextField>
<FormControl component="fieldset">
                    <FormLabel component="legend">Gender of yours</FormLabel>
                    <RadioGroup id="sex" name="sex" 
                        value={this.state.sex ? this.state.sex : "other"} onChange={this.handleChange}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                    </RadioGroup>
                    </FormControl>
                    
                    <br/>
<FormControl component="fieldset">
                    <FormLabel component="legend">Choose one that you are most interested in.</FormLabel>
                    <RadioGroup id="interest" name="interest" 
                        value={this.state.interest ? this.state.interest: "sports"} onChange={this.handleChange}>
                        <FormControlLabel value="sports" control={<Radio />} label="sports" />
                        <FormControlLabel value="movie" control={<Radio />} label="movie" />
                        <FormControlLabel value="travel" control={<Radio />} label="travel" />
                        <FormControlLabel value="music" control={<Radio />} label="music" />
                        <FormControlLabel value="food" control={<Radio />} label="food" />
                        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                    </RadioGroup>
                    </FormControl>
<FormControl component="fieldset" align="left">
                    <FormLabel component="legend">Choose one that most important you think in relation.</FormLabel>
                    <RadioGroup id="value" name="value" 
                        value={this.state.value ? this.state.value : "loyalty"} onChange={this.handleChange}>
                        <FormControlLabel value="loyalty" control={<Radio />} label="loyalty" />
                        <FormControlLabel value="honesty" control={<Radio />} label="honesty" />
                        <FormControlLabel value="passion" control={<Radio />} label="passion" />
                        <FormControlLabel value="reliability" control={<Radio />} label="reliability" />
                        <FormControlLabel value="dependability" control={<Radio />} label="dependability" />
                        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                    </RadioGroup>
                    </FormControl>

<FormControl component="fieldset">
                    <FormLabel component="legend">Gender of your future date</FormLabel>
                    <RadioGroup id="pGender" name="pGender" 
                        value={this.state.pGender ? this.state.pGender : "other"} onChange={this.handleChange}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                    </RadioGroup>
                    </FormControl>

*/