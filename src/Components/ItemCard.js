import React from 'react'

import { Card, CardMedia, CardContent, Typography } from '@material-ui/core'

export default function ItemCard(props) {
    console.log(props)
    return (
        <Card className="item-Card">
            <CardMedia
                // image={url}
                style={{
                    height: 100
                }}
                title="Paella dish"
            />
            <CardContent>
                <Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                </Typography>
            </CardContent>
        </Card>
    )
}

// {itemName}
// Price: {price}
// Rating: {rating}