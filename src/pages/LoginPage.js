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
//import { loginUser } from '../redux/actions/userActions';
//https://material-ui.com/components/buttons/
//https://material-ui.com/components/progress/
import CircularProgress from '@material-ui/core/CircularProgress';

//import axios from 'axios';

//for the reliable state, redux
//npm install --save redux react-redux redux-thunk 
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = {
    loginForm: {
        textAlign: 'center',
        //width: '50%'
        
    },
    icon: {
        margin: '20px auto 20px auto',
        height: '50%',
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


class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            //loading: false,
            errors: {} //for the potential errors on the form
        }
    }
    //because it doesn't show the error message after redux, before redux, it showed well the error messages such as "email must not be empty"
    //https://stackoverflow.com/questions/62722407/how-to-change-update-componentwillreceiveprops-to-getderivedstatefromprops-in-re
    /*componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }*/
    /*
    componentDidUpdate(prevProps) {
        if (prevProps.UI.errors !== this.props.UI.errors) { // <-- Only update error state if value different
            this.setState({
              errors: this.props.UI.errors,
            });
          }
    }*/
    componentDidUpdate(prevProps) {
        //console.log(prevProps.auth, this.props.auth, this.props.history);
        if (prevProps.authenticated !== this.props.authenticated) {
          this.props.history.push("/dashboard");
        }
      
        console.log(this.props.history);
        if (prevProps.errors !== this.props.errors) { // <-- Only update error state if value different
          this.setState({
            errors: this.props.errors,
          });
        }
      }

    handleSubmit = (event) => {
        event.preventDefault(); //
        //this.setState({
       //     loading: true
       // });
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(userData);
        this.props.loginUser(userData, this.props.history); //call the loginUSer with params
        /*const optionAX = {
            url: '/login',
            method: 'POST',
            data: userData
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
            //https://blog.logrocket.com/axios-or-fetch-api/
            //https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4?rq=1
    };

   handleChange = (event) => {
       this.setState({
           [event.target.name]: event.target.value
       });

   }
    render() {
        const { classes, UI: { loading} } = this.props;
        const { errors } = this.state; //error handle  in ui reducer!
        return (
            <Grid container className={classes.loginForm}>
                <Grid item sm></Grid>
                <Grid item sm></Grid>
                <Grid>
                <img src={AppIcon} alt="date" className={classes.icon}></img>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
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
                            >Login
                            {loading && (
                                <CircularProgress color="secondary" size={25} className={classes.progress}/>
                            )}
                           </Button>
                        <br/>
                        <small>Don't have an acoount? <Link to="/signup">Go to Signup</Link></small>
                    </form>

                </Grid>
                <Grid item sm></Grid>
                <Grid item sm></Grid>
                
            </Grid>
        )
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}
//take the gloabl state
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}
//export default withStyles(styles)(LoginPage)
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LoginPage))
//export default withStyles(styles)(LoginPage)
/*
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';//error?
import { Link } from 'react-router-dom';
//import axios from 'axios';
//https://pixabay.com/illustrations/man-love-girl-black-background-2382314/
//https://www.flaticon.com/free-icon/wedding-date_3420547?term=date&page=8&position=96
//https://www.flaticon.com/free-icon/balloons_609624?term=heart&page=1&position=68
import AppIcon from '../images/balloons.png';
//https://material-ui.com/components/cards/
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
//https://material-ui.com/api/text-field/
import Button from '@material-ui/core/Button';
//https://material-ui.com/components/buttons/
//https://material-ui.com/components/progress/
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

//npm install --save axios
    //error related to axios and proxy. delete the package-lock.json and node module and re install
    //rm -r package-lock.json node_modules //then npm install

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
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
    customeError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
};


class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password:'',
            //loading:false,
            errors: {}
        }
    }
    //https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
    //npx react-codemod rename-unsafe-lifecycles
    //https://stackoverflow.com/questions/58924617/componentwillreceiveprops-has-been-renamed
    //https://stackoverflow.com/questions/49386324/componentdidupdate-vs-componentwillreceiveprops-use-case-in-react#:~:text=So%20if%20you%20wanted%20to,%2C%20you'd%20use%20componentDidUpdate%20.
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }
    handleSubmit = (event) => {
        console.log('hi');
        event.preventDefault() //prevent reload the page!
        //this.setState({
        //    loading: true
        //});
        const userData = {
            email: this.state.email,
            password: this.state.password,
          //https://blog.logrocket.com/axios-or-fetch-api/
        }; // https://stackoverflow.com/questions/47824521/create-react-app-doesnt-work-with-proxy/52797226
        this.props.loginUser(userData, this.props.history);
        
    };
    handleChange =(event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="date" className={classes.image}></img>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}> 
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}  
                            onChange={this.handleChange} 
                            fullWidth>
                            </TextField>
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}  
                            onChange={this.handleChange} 
                            fullWidth>
                            </TextField>
                            {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                            disabled={loading}
                            >
                                Login
                            {loading && (
                                <CircularProgress size={25} className={classes.progress}/>
                            )}
                        
                        </Button>
                        <br/>
                        <small>Don't have an acoount? <Link to="/signup">Go to Signup</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}
//export default withStyles(styles)(LoginPage)
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LoginPage))
*/
/*
[encounter error 1:]
Proxy error: Could not proxy request /messages from localhost:3000 to https://us-central1-c-dating-ec4f7.cloudfunctions.net/api.
See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNRESET).
[Solution:]
Not much, if I input the correct one, it is still working!

[error:2]
Error: Could not find "store" in the context of "Connect(Auth Route)". Either wrap the root component in a <Provider>, 
or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(Auth Route) in connect options.
[solution]
https://github.com/reduxjs/react-redux/issues/57

*/
/*/*
        const optionAX = {
            url: '/login',
            method: 'POST',
            data: userData
        };
        //const optionFT = {
        //    method: 'POST',
       //     body: JSON.stringify(userData)
       // }
       // const url = "/login"
        axios(optionAX)
        //axios.post('/login', userData)
        //fetch('/login', { method: 'post'}, userData)
        //fetch(url, optionFT)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })
            */