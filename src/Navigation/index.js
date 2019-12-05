import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import Search from "../Screens/Search"
import Result from "../Screens/Result"

export default function index() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Search} />
                <Route path="/result/:searchString" component={Result} />
            </div>
        </Router>
    )
}
