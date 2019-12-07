import React, { Component } from 'react'
import Img from 'react-image'

import { Card, Grid, CardActionArea, CircularProgress, Button, CardContent } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { LocalAtm } from '@material-ui/icons/'

import LanguageIcon from '@material-ui/icons/Language'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'

import "../Styles/Result/styles.scss"

export default class TopCard extends Component {
    render() {
        console.log("this.props", this.props)
        return (
            <Card className="item-Card">
                <CardActionArea>
                    <CardContent>
                        <p className="titles">
                            {this.props.title}
                        </p>
                        <Grid container direction="row">
                            <Grid item xs={3} alignContent="center" justify="center">
                                <Img
                                    className="Imp-img"
                                    src={this.props.data.image_link}
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
                                    href={this.props.data.link}
                                    target="_blank">
                                    {this.props.data.name}
                                </a>
                                <Grid container direction="row" justify="center"  >
                                    <Button>
                                        <LocalAtm /> <p style={{ fontWeight: 600 }}>  {this.props.data.price}</p>
                                    </Button>
                                    <Button>
                                        <LanguageIcon /> {this.props.data.website}
                                    </Button>
                                    <Button>
                                        <PeopleAltIcon /> {this.props.data.buyers}
                                    </Button>
                                </Grid>
                                {
                                    this.props.data.rating && <Rating name="rating" readOnly value={Number(this.props.data.rating)} />
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}

