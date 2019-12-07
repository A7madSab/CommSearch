import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Grid, Typography, CircularProgress } from "@material-ui/core"

import queryString from "query-string"

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
    async componentWillMount() {
        const values = queryString.parse(this.props.location.search)
        const products = await getProducts(values.name, values.includeUsedItems, values.from, values.to)

        let others = []
        products.other.map((item) => {
            return others.push(item[1])
        })

        this.setState(() => ({
            cheapest: products.cheapest,
            mostExpensive: products.most_expensive,
            top_rated: products.top_rated,
            products: others,

            loading: false
        }))

        this.forceUpdate()
    }
    render() {
        const { cheapest, mostExpensive, top_rated } = this.state
        return (
            <Grid container className="container" alignContent="space-between" direction="column" >

                <Grid container justify="space-around" className="section-one" direction="column" >
                    <Typography variant="h3" component="h2" align="center" className="title">
                        Best Offers
                    </Typography>
                    <Grid container justify="space-around" direction="row">
                        {
                            this.state.loading
                                ? <CircularProgress
                                    className="Progress"
                                    size={60}
                                />
                                : <TopCard data={cheapest} />
                        }
                        {
                            this.state.loading
                                ? <CircularProgress
                                    className="Progress"
                                    size={60}
                                />
                                : <TopCard data={mostExpensive} />
                        }
                        {
                            this.state.loading
                                ? <CircularProgress
                                    className="Progress"
                                    size={60}
                                />
                                : <TopCard data={top_rated} />
                        }
                    </Grid>
                </Grid>

                <Grid container alignItems="stretch" className="section-two" direction="column">
                    <Typography variant="h3" component="h2" align="center" className="title">
                        Other Products
                    </Typography>
                    {
                        this.state.loading
                            ? <CircularProgress
                                className="Progress"
                                size={60}
                            />
                            : this.state.products.map((product) => {
                                return (
                                    <ItemCard
                                        buyers={product.buyers}
                                        url={product.image_link}
                                        link={product.link}
                                        itemName={product.name}
                                        price={product.price}
                                        rating={product.rate === 0 ? "None" : product.rate}
                                        website={product.website}
                                        key={product.image_link}
                                    />
                                )
                            })
                    }
                </Grid>
            </Grid>
        )
    }
}


// <TopCard data={mostExpensive} />
// <TopCard data={top_rated} />