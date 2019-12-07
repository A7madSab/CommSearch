import React from 'react'
import Img from 'react-image'

import { Card, Grid, Typography, CardActionArea, CircularProgress, Button, CardMedia, CardContent } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { LocalAtm } from '@material-ui/icons/'

import LanguageIcon from '@material-ui/icons/Language'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'

export default function TopCard(props) {
    console.log(props)
    return (
        <Card className="item-Card">
            <CardActionArea>
                <CardContent>
                    <Grid container direction="row">
                        <Grid item xs={3} alignContent="center" justify="center">
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
                        <Grid container direction="column" justify="space-around">
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
                                <Rating name="rating" value={Number(props.rating)} />
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
