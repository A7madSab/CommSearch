import React from 'react'

import { Rating } from '@material-ui/lab'
import Img from 'react-image'
import { Card, Grid, Typography, CardActionArea, CircularProgress, Button, CardMedia, CardContent } from '@material-ui/core'
import { LocalAtm } from '@material-ui/icons/'
import LanguageIcon from '@material-ui/icons/Language'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import "../Styles/Result/styles.scss"


export default function ItemCard(props) {
    console.log(props.link, props.url, props.price, props.itemName, props.buyers, props.website, props.rating)
    return (
        <Card className="item-Card">
            <CardActionArea>
                <CardContent>
                    <Grid container direction="row">
                        <Grid item xs={2} alignContent="center" justify="center">
                            <Img
                                src={("" + props.url)}
                                width="100"
                                loader={
                                    <CircularProgress
                                        className="Progress"
                                        size={60}
                                    />
                                }
                                alt="product"
                            />
                        </Grid>
                        <Grid container xs={9} direction="column" justify="space-around">
                            <a
                                href={props.link}
                                target="_blank">
                                <Typography gutterBottom variant="h5" component="h2">
                                    {props.itemName}
                                </Typography>
                            </a>
                            <Grid container direction="row">
                                <Button>
                                    <LocalAtm /> {props.price}
                                </Button>
                                <Button>
                                    <LanguageIcon /> {props.website}
                                </Button>
                                <Button>
                                    <PeopleAltIcon /> {props.buyers}
                                </Button>
                                <Rating name="rating" readOnly value={Number(props.rating)} />
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}



        //

        // <Typography variant="body2" color="textSecondary" component="p">
        // </Typography>

        // <CardMedia
    //     // src={require(props.url)}
    //     style={{
    //         height: 100
    //     }}
    //     title="Paella dish"
    // />

// {itemName}
// Price: {price}
// Rating: {rating}