import React, { Component } from 'react'
import { Grid, Typography, TextField, Button } from '@material-ui/core'
import { Redirect, Route } from "react-router-dom"

import logo from "../Assets/logo.png"
// import { white } from "../Utils/colors"


export default class Search extends Component {
    state = {
        text: ""
    }
    search = () => {
        console.log()
        return (
            <Route exact path="/">
                <Redirect to="/dashboard" />
            </Route>
        )
    }
    change = (e) => {
        e.persist()
        this.setState(() => ({
            text: e.target.value
        }))
    }
    render() {
        return (
            <Grid container >
                <Grid className="home-left" item xs={4}>
                    <img className="logo" src={logo} alt="logo" />
                    <Typography align="center" color="initial" variant="h3" >One Website, A world of products</Typography>
                    <Typography align="center" variant="h5" >Centralize your online shopping</Typography>
                </Grid>
                <Grid className="home-right" item xs={8}>
                    <TextField
                        className="text-field"
                        onChange={this.change}
                        value={this.state.text}
                        placeholder="Insert Item"
                    />
                    <Button
                        onClick={this.search}
                        className="button"
                        variant="contained"
                        color="primary"
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        )

    }
}
