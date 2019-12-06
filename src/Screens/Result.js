import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Grid, TextField, Button } from "@material-ui/core"
import queryString from "query-string"

import logo from "../Assets/logo.png"
import TopCard from "../Components/TopCard"
import ItemCard from "../Components/ItemCard"

import "../Styles/Result/styles.scss"

export default class Result extends Component {
    state = {
        name: null,
        to: 0,
        from: 0,
        includeUsedItems: null
    }
    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        console.log(values)
        this.setState(() => ({
            name: values.name,
            from: Number(values.from),
            to: Number(values.to),
            includeUsedItems: Boolean(values.includeUsedItems)
        }))
    }
    render() {
        const { name } = this.state
        return (
            <Grid container className="container" alignContent="space-between" direction="column" >
                <Grid className="search-bar" direction="row" item>
                    <Link className="logo-link" to="/">
                        <img className="logoResult" src={logo} alt="logo" />
                    </Link>
                    <TextField
                        className="text-feild"
                        placeholder="Search of Items"
                        value={name}
                    />
                    <Button variant="contained" color="default">
                        Search
                    </Button>
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
