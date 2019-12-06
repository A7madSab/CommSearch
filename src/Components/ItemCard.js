import React from 'react'

import { Card, CardMedia, CardContent, Typography } from '@material-ui/core'

export default function ItemCard({ itemName, url, price, rating }) {
    return (
        <Card className="item-Card">
            <CardMedia
                image={url}
                style={{
                    height: 100
                }}
                title="Paella dish"
            />
            <CardContent>
                <Typography>
                    {itemName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Price: {price}
                    Rating: {rating}
                </Typography>
            </CardContent>
        </Card>
    )
}
