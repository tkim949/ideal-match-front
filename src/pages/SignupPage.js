import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';//errorchecking
import { Grid } from '@material-ui/core';
//https://www.flaticon.com/free-icon/balloons_609624?term=heart&page=1&position=68
//https://pixabay.com/vectors/penguins-art-amorous-love-tux-157418/
import AppIcon from '../images/penguins.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
//https://material-ui.com/api/text-field/
import Button from '@material-ui/core/Button';

//https://material-ui.com/components/buttons/
//https://material-ui.com/components/progress/
import CircularProgress from '@material-ui/core/CircularProgress';

//import axios from 'axios';

//for the reliable state, redux
//npm install --save redux react-redux redux-thunk 
//import { reduxForm } from 'redux-form'; //npm install --save redux-form
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = {
    signupForm: {
        textAlign: 'center'
    },
    icon: {
        margin: '20px auto 20px auto',
        height: '40%',
        width: '50%'
    },
    pageTitle: {
        margin: '5px auto 5px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    progress: {
        position: 'absolute'
    },
    errorMsg: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    }
};


class SignupPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword:'',
            handle:'',
            //loading: false,
            errors: {} //for the potential errors on the form
        }
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.UI.errors !== this.props.UI.errors) { // <-- Only update error state if value different
            this.setState({
              errors: this.props.UI.errors,
            });
          }
    }
  
    handleSubmit = (event) => {
        event.preventDefault(); //
         this.setState({
            loading: true
         });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        //[error] Uncaught TypeError: this.props.signupUser is not a function
        this.props.signupUser(newUserData, this.props.history);
        /*
        const optionAX = {
            url: '/signup',
            method: 'POST',
            data: newUserData
        };
        axios(optionAX)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('FBToken', `Bearer ${res.data.token}`); //it will be used in App.js file
                this.setState({ 
                    loading: false
                }); 
                this.props.history.push('/'); //to the homepage/redirect 
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })*/
            //https://stackoverflow.com/questions/38423108/using-localstorage-with-react
            //https://blog.logrocket.com/axios-or-fetch-api/
            //https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4?rq=1

    }

   handleChange = (event) => {
       this.setState({
           [event.target.name]: event.target.value
       });

   }
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.signupForm}>
                <Grid item sm></Grid>
               
                <Grid>
                <img src={AppIcon} alt="date" className={classes.icon}></img>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}> {/* later change to input!*/}
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            variant="outlined"
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            className={classes.textField}
                            value={this.state.email}  
                            onChange={this.handleChange} 
                            fullWidth>
                        </TextField>
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            variant="outlined"
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            className={classes.textField}
                            value={this.state.password}  
                            onChange={this.handleChange} 
                            fullWidth>
                        </TextField>
                        <TextField 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="ConfirmPassword" 
                            variant="outlined"
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            className={classes.textField}
                            value={this.state.confirmPassword}  
                            onChange={this.handleChange} 
                            fullWidth>
                        </TextField>
                        <TextField 
                            id="handle" 
                            name="handle" 
                            type="text" 
                            label="UserName" 
                            variant="outlined"
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            className={classes.textField}
                            value={this.state.handle}  
                            onChange={this.handleChange} 
                            fullWidth>
                        </TextField>
                            {errors.errorMsg && (
                                <Typography variant="body2" className={classes.errorMsg}>
                                    {errors.errorMsg}
                                </Typography>
                            )}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                            >Signup
                            {loading && (
                                <CircularProgress color="secondary" size={25} className={classes.progress}/>
                            )}
                           </Button>
                        <br/>
                        <small>You already have an acount? <Link to="/login">Go to Login</Link></small>
                    </form>

                </Grid>
               
                <Grid item sm></Grid>
                
            </Grid>
        )
    }
}

SignupPage.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {user: state.user, UI: state.UI};
};
export default connect(mapStateToProps, { signupUser })(withStyles(styles)(SignupPage))
//https://stackoverflow.com/questions/52590903/mapstatetoprops-in-connect-must-return-a-plain-object-instead-received-unde
//mapDispatchToProps() in Connect(WithStyles(SignupPage)) must return a plain object. Instead received undefined. 
//export default withStyles(styles)(SignupPage)
//https://stackoverflow.com/questions/41138158/uncaught-typeerror-this-props-signinuser-is-not-a-function
//export default reduxForm({form: 'signup'}) (connect(mapStateToProps, signupUser)(withStyles(styles)(SignupPage)));
//module not found redux-form, npm install react-redux --save
/*
Signin = connect(mapStateToProps, actions)(Signin);
Signin = reduxForm({
 form: 'signin'
})(Signin);
export default Signin;
*/