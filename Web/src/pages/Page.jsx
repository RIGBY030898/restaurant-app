import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { authentification } from '../common'

const Page = ({ component: Component, redirect, nameAccess, ...rest }) => {
    var auth = authentification(nameAccess)
    return (
        <Route
            {...rest}
            render={(props) => {
                if (auth) return <Component {...props} {...rest} />
                else
                    return (
                        <Redirect
                            to={{
                                pathname: redirect,
                                state: {
                                    from: rest.location,
                                },
                            }}
                        />
                    )
            }}
        />
    )
}

export default Page
