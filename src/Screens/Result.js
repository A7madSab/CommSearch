import React, { Component } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { Link } from "react-router-dom"

import logo from "../Assets/logo.png"
import TopCard from "../Components/TopCard"
import ItemCard from "../Components/ItemCard"

import "../Styles/Result/styles.scss"


export default class Result extends Component {
    state = {
        item: ""
    }
    componentDidMount() {
        this.setState(() => ({
            item: this.props.match.params.searchString
        }))
    }
    render() {
        const { item } = this.state
        return (
            <Grid container className="container" alignContent="space-between" direction="column" >
                <Grid className="search-bar" direction="row" item>
                    <Link className="logo-link" to="/">
                        <img className="logoResult" src={logo} alt="logo" />
                    </Link>
                    <TextField
                        className="text-feild"
                        placeholder="Search of Items"
                        value={item}
                    />
                </Grid>

                <Grid container justify="space-around" className="card-top" direction="row" >
                    <TopCard url={logo} price="100" itemName="Potato" rating="3" />
                    <TopCard url={logo} price="100" itemName="Potato" rating="3" />
                    <TopCard url={logo} price="100" itemName="Potato" rating="3" />
                </Grid>

                <Grid container alignItems="stretch" className="card-bottom" direction="column">
                    <ItemCard url={logo} price="100" itemName="Potato" rating="3" />
                    <ItemCard url={logo} price="100" itemName="Potato" rating="3" />
                    <ItemCard url={logo} price="100" itemName="Potato" rating="3" />
                    <ItemCard url={logo} price="100" itemName="Potato" rating="3" />
                </Grid>

            </Grid>
        )
    }
}
