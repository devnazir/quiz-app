import { useParams, useRouteMatch } from "react-router"

function Quiz() {
    const params = useParams()
    const match = useRouteMatch()
    console.log(params, match) 
    return <div>Quiz</div>
}

export default Quiz