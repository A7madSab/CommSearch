import React, { Component } from 'react'
import { Grid, Typography, TextField, Box, Checkbox, FormControlLabel } from '@material-ui/core'
import { Link } from "react-router-dom"

import "../Styles/Search/styles.scss"
import logo from "../Assets/logo.png"
import Slider from "../Components/Slider"

import Chatbot from "../Components/Chatbot"

export default class Search extends Component {
    state = {
        text: "",
        errors: "",
        product: "",
        startValue: 0,
        endValue: 50,
        includeUsedItems: false,
        chatBoxVisibale: true
    }
    setEndValue = (endValue) => {
        this.setState(({ endValue: Number(endValue) }))
    }
    setStartValue = (startValue) => {
        this.setState(({ startValue: Number(startValue) }))
    }
    setProduct = (product) => {
        this.setState(({ product, text: product }))
    }
    handleSliderChange = (event, newValue) => {
        this.setState(() => ({ startValue: newValue[0], endValue: newValue[1] }))
    };
    handleCheckBoxChange = () => {
        this.setState((state) => ({ includeUsedItems: !state.includeUsedItems }))
    }
    handleIncludeUsedItems = () => {
        this.setState(({ includeUsedItems: true }))
    }
    handleRejectUsedItems = () => {
        this.setState(({ includeUsedItems: false }))
    }
    change = (e) => {
        e.persist()
        this.setState(({ text: e.target.value }))
    }
    render() {
        return (
            <Grid container >
                <Grid className="home-left" item xs={3}>
                    <img className="logo" src={logo} alt="logo" />
                    <Typography className="header" align="center" variant="h4" >One Website, A world of products</Typography>
                    <Box display="flex" flexGrow="1" flexDirection="column" justifyContent="flex-end">
                        <Typography className="subtitle" align="center" variant="h6" >Centralize your online shopping</Typography>
                    </Box>
                </Grid>
                <Grid container className="home-right" direction="column" justify="center" item xs={6}>
                    <Grid container direction="column" justify="center" spacing={5} >
                        <Grid item>
                            <TextField
                                className="text-field"
                                onChange={this.change}
                                value={this.state.text}
                                placeholder="Insert Item"
                            />
                        </Grid>
                        <Grid item>
                            <Slider
                                handleSliderChange={this.handleSliderChange}
                                start={this.state.startValue}
                                end={this.state.endValue}
                            />
                        </Grid>
                        <Grid container>
                            <FormControlLabel
                                value="top"
                                control={<Checkbox
                                    checked={this.state.includeUsedItems}
                                    onChange={this.handleCheckBoxChange}
                                />}
                                label="Include used products?"
                                labelPlacement="start"
                            />

                        </Grid>
                        <Grid item>
                            <Link
                                to={`/result?name=${this.state.text}&from=${this.state.startValue}&to=${this.state.endValue}&includeUsedItems=${this.state.includeUsedItems}`}
                                className="button"
                            >
                                Search
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className="chatbot">
                    <Chatbot
                        chatBoxVisibale={this.state.chatBoxVisibale}
                        setProduct={this.setProduct}
                        setStartValue={this.setStartValue}
                        setEndValue={this.setEndValue}
                        handleIncludeUsedItems={this.handleIncludeUsedItems}
                        handleRejectUsedItems={this.handleRejectUsedItems}
                    />
                </Grid>
            </Grid>
        )
    }
}
