import React, { Component } from 'react'
import { Slider, Typography } from '@material-ui/core'

export default class PriceSlider extends Component {
    state = {
        value: [0, 15]
    }
    handleChange = (event, newValue) => {
        this.setState(() => ({
            value: newValue
        }))
    };
    valuetext(value) {
        return `${value}LE`;
    }
    render() {
        console.log("state", this.state)
        const { value } = this.state
        return (
            <div>
                <Typography id="range-slider" gutterBottom>
                    Cost
                </Typography>
                <Slider
                    className="slider"
                    value={value}
                    onChange={this.handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={this.valuetext}
                />
            </div>
        )
    }
}

