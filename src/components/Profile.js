import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

//https://material-ui.com/components/cards/
import Card  from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
//import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

//change the date format, https://www.npmjs.com/package/dayjs
//npm install --save dayjs
import dayjs from 'dayjs';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        //height: 300,
        minWidth: 200,
    },
    content: {
        padding: 30,
        objectFit: 'cover',
    }
};

class Profile extends Component {
    render() {
        const { classes, profile: { name,
                                    intro, 
                                    createdAt, 
                                    imageUrl, 
                                    handle, 
                                    profileId, 
                                    likeCount
                                } } = this.props;
        //let time = dayjs(classes.createdAt);
        return(
            <Card className={classes.card}>
               <CardMedia
                image={imageUrl}
                title={"Profile image"}
                className={classes.image}
          />
            <CardContent className={classes.content}>
                <Typography 
                    variant="h5" 
                    component={Link} 
                    to={`/users/${handle}`} 
                   >
                    {handle}
                </Typography>
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).format('YYYY-MM-DD')} </Typography>
                <Typography variant="body1">{name}</Typography>
                <Typography variant="body1">{intro}</Typography>
            </CardContent>
        </Card>
        )
    }
}

export default withStyles(styles)(Profile)