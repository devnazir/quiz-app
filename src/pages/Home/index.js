import { Card, CardContent, CardActions, Button, Typography } from "@material-ui/core"
import { Link } from 'react-router-dom'

function Home() {
    return (

        <Card>
            <CardContent>
                <Typography variant="h5">
                    JavaScript
                </Typography>
                <Typography component="p">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit a sit, consectetur fugit in rem, deserunt debitis quod magnam possimus maiores ullam laudantium ex quis, nostrum tenetur iusto magni placeat.
                </Typography>
            </CardContent>
            <Link to="/quiz/1">
                <CardActions>
                    <Button size="small">Answer Questions Of Quiz ""</Button>
                </CardActions>
            </Link>
        </Card >
    )
}

export default Home