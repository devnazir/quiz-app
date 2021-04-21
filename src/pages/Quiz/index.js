import { Box, Card, Typography, CardContent } from "@material-ui/core"
import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router"
import { getQuizByCategory } from '../../utils/db'

function Quiz() {
    const params = useParams()
    const [quiz, setQuiz] = useState([])

    useEffect(() => {
        getQuizByCategory(params.category).then((quiz) => {
            setQuiz(quiz)
        })
    }, [params.category])

    console.log(quiz)

    return (
        <Fragment>
            <Typography variant="h5">
                {quiz[0]?.category}
            </Typography>

            <Box>
                <Card>
                    <CardContent>
                    </CardContent>
                </Card>
            </Box>
        </Fragment>


    )
}

export default Quiz