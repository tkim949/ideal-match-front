//https://material-ui.com/components/grid-list/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
//import tileData from './tileData';
import couple1 from '../images/couple1.jpg';
import couple2 from '../images/couple2.jpg';
import bunny from '../images/bunny.jpg';
import pair1 from '../images/pair1.jpg';
import pair2 from '../images/pair2.jpg';
import pair3 from '../images/pair3.jpg';
import people1 from '../images/people1.jpg';
import moon from '../images/moon.jpg';
import date1 from '../images/date1.jpg';
import date2 from '../images/date2.jpg';
import date3 from '../images/ladybugs.jpg';
import date4 from '../images/date4.jpg';
import date5 from '../images/date5.jpg';
import date6 from '../images/date6.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
const tileData = [
    { img: couple1,title: 'couple1',},
    { img: couple2, title: 'couple2', },
    { img: pair1, title: 'pair1', },
    { img: pair3, title: 'pair3', },
    { img: bunny, title: 'bunny', },
    { img: pair2, title: 'pair2', },
    { img: people1, title: 'people1', },
    { img: moon, title: 'moon',  cols: 2 },
    { img: date3, title: 'date3', },
    { img: date4, title: 'date4', },
    { img: date5, title: 'date5', },
    { img: date6, title: 'date6', },
    { img: date1, title: 'date1', },
    { img: date2, title: 'date2', },

];
export default function ImageGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
