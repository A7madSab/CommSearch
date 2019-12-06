import React, { Component } from 'react'
import { Grid, Typography, TextField, Box } from '@material-ui/core'
import { Link } from "react-router-dom"
import "../Styles/Search/styles.scss"
import logo from "../Assets/logo.png"

export default class Search extends Component {
    state = {
        text: "",
        errors: ""
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
                    <Typography className="header" align="center" variant="h4" >One Website, A world of products</Typography>
                    <Box display="flex" flexGrow="1" flexDirection="column" justifyContent="flex-end">
                        <Typography className="subtitle" align="center" variant="h6" >Centralize your online shopping</Typography>
                    </Box>
                </Grid>
                <Grid className="home-right" item xs={8}>
                    <Grid container direction="row" justify="center" spacing={2} >
                        <Grid item xs={12}>
                            <TextField
                                className="text-field"
                                onChange={this.change}
                                value={this.state.text}
                                placeholder="Insert Item"
                            />
                        </Grid>
                        <Grid item>
                            <Link
                                to={`/result/${this.state.text}`}
                                className="button"
                            >
                                Search
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
