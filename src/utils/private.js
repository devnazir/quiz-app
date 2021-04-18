import { Redirect } from "react-router-dom"

function Private({ userLogged, children }) {
    console.log(userLogged)
    if (userLogged) {
        return (
            <>
                {children}
            </>
        )
    }

    return <Redirect to="/"></Redirect>
}

export default Private