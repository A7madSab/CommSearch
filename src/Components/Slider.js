import React from 'react'
import { Slider, Typography } from '@material-ui/core'

export default function PriceSlider({ start, end, handleSliderChange }) {
    return (
        <div>
            <Typography id="range-slider" gutterBottom>
                Cost
                </Typography>
            <Slider
                className="slider"
                value={[start, end]}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    )
}

const valuetext = (value) => {
    return `${value}LE`;
}