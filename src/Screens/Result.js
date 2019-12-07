import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Grid, TextField, Button, Typography, CircularProgress } from "@material-ui/core"

import queryString from "query-string"

import logo from "../Assets/logo.png"
import TopCard from "../Components/TopCard"
import ItemCard from "../Components/ItemCard"
import { getProducts } from "../Api/index"

import "../Styles/Result/styles.scss"

export default class Result extends Component {
    state = {
        name: "",
        start: 0,
        end: 0,
        loading: true,
        includeUsedItems: null,
        products: []
    }
    async componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        const products = await getProducts(values.name, values.includeUsedItems, values.from, values.to)
        this.setState(() => ({
            products,
            loading: false
        }))
    }
    render() {
        const { name } = this.state
        return (
            <Grid container className="container" alignContent="space-between" direction="column" >
                <Grid container className="search-bar" direction="row" >
                    <Link className="logo-link" to="/">
                        <img className="logoResult" src={logo} alt="logo" />
                    </Link>
                    <TextField
                        className="text-feild"
                        placeholder="Search of Items"
                        value={name}
                    />
                    <Button className="search-button" variant="contained" color="default">
                        Search
                    </Button>
                </Grid>

                <Grid container justify="space-around" className="section-one" direction="column" >
                    <Typography variant="h3" component="h2" align="center" className="title">
                        Best Offers
                    </Typography>
                    <Grid container justify="space-around" direction="row">
                        <TopCard url={logo} price="100" itemName="Potato" rating="3" />
                        <TopCard url={logo} price="100" itemName="Potato" rating="3" />
                        <TopCard url={logo} price="100" itemName="Potato" rating="3" />
                    </Grid>
                </Grid>

                <Grid container alignItems="stretch" className="section-two" direction="column">
                    <Typography variant="h3" component="h2" align="center" className="title">
                        Other Projects
                    </Typography>
                    {
                        this.state.loading
                            ? <CircularProgress color="secondary" />
                            : this.state.products.map((product, index) => {
                                console.log(product)
                                return (
                                    <ItemCard
                                        key={index}
                                        link={product.link}
                                        url={product.image_link}
                                        price={product.price}
                                        itemName={product.name}
                                        buyers={product.buyers}
                                        website={product.website}
                                        rating={product.rate === 0 ? "None" : product.rate}
                                    />
                                )
                            })
                    }

                </Grid>
            </Grid>
        )
    }
}
