import { Card, CardContent, CardActions, Button, Typography, Box, makeStyles } from "@material-ui/core"
import { Fragment, useEffect, useState } from "react"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom'
import { getPosts } from "../../utils/db";
import Form from "../../components/Form/Form";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    post: {
        textTransform: "uppercase",
        width: "350px",
        marginRight: "25px",
        marginBottom: "25px",
        [theme.breakpoints.down('sm')]: {
            marginRight: "0",
        },
    },
    desc: {
        textTransform: "lowercase"
    },
}));

function Home() {
    const [open, setOpen] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts().then((post) => {
            setPosts(post)
        })
        return () => setPosts([])
    }, [open])

    const showDialogFormPost = () => {
        setOpen(true)
    }

    return (
        <Fragment>
            <Box display="flex" flexWrap="wrap" justifyContent="center" >
                {
                    posts.map((post, id) => {
                        return <Posts key={id} {...post} />
                    })
                }
            </Box>
            <Box position="fixed" bottom={20} right={20} >
                <IconButton onClick={showDialogFormPost}>
                    <AddCircleOutlineIcon />
                </IconButton>
            </Box>
            {
                open ? <Form open={open} setOpen={setOpen} type='form-post' /> : <></>
            }

        </Fragment>
    )
}

function Posts(post) {
    const classes = useStyles()
    return (
        <Card className={classes.post}>
            <CardContent>
                <Typography variant="h5">
                    {post.category}
                </Typography>
                <Typography component="p" className={classes.desc}>
                    {post.description}
                </Typography>
            </CardContent>
            <Link to={`/quiz/${post.category}`}>
                <CardActions>
                    <Button size="small">Answer QUIZ</Button>
                </CardActions>
            </Link>
        </Card >
    )
}

export default Home