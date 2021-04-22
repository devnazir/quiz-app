import { Card, CardContent, CardActions, Button, Typography, Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions, makeStyles, MenuItem } from "@material-ui/core"
import { Fragment, useEffect, useState } from "react"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom'
import { useAuth } from '../../hook/useAuth'
import { addQuiz, getPosts } from "../../utils/db";
import categoryQuiz from '../../utils/category_quiz'
import correctAnswer from '../../utils/correct_answer'

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
    }, [open])

    const showDialogAddProject = () => {
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
                <IconButton onClick={showDialogAddProject}>
                    <AddCircleOutlineIcon />
                </IconButton>
            </Box>
            <FormAddProject open={open} setOpen={setOpen} />
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

function FormAddProject({ open, setOpen }) {
    const { auth } = useAuth()
    const classes = useStyles()
    const [descriptionValue, setDescriptionValue] = useState("")

    const [selectValue, setSelectValue] = useState({
        publisher: auth?.name ?? "Anonymous",
        category: "",
        description: descriptionValue ? descriptionValue : "",
        question: "",
        answer: {
            A: "",
            B: "",
            C: "",
            D: ""
        },
        correctAnswer: "",
    });

    const hiddenFormAndResetState = () => {
        // setOpen(false)
        setSelectValue({
            publisher: auth?.name ?? "Anonymous",
            category: descriptionValue,
            description: "",
            question: "",
            answer: {
                A: "",
                B: "",
                C: "",
                D: ""
            },
            correctAnswer: "",
        })
    }

    const addPostQuiz = async () => {
        await addQuiz(selectValue)
        hiddenFormAndResetState()
        setDescriptionValue(selectValue.description)
    }

    const handleChange = (event) => {
        const name = event.target.name;

        if (name === "answer") {
            const answer = event.target.dataset.answer;
            setSelectValue({
                ...selectValue,
                [name]: {
                    ...selectValue.answer,
                    [answer]: event.target.value
                }
            })
            return
        }

        setSelectValue({
            ...selectValue,
            [name]: event.target.value
        })
    };

    return (
        <Dialog open={open} aria-labelledby="title-project" onClose={hiddenFormAndResetState}>
            <DialogTitle id="title-project">Add New Quiz And Question</DialogTitle>
            <DialogContent>
                <form className={classes.root}>
                    <div >
                        <TextField name="category" onChange={handleChange} required select label="Category" value={selectValue.category} helperText="Please select category of Quiz">
                            {categoryQuiz.map((category) => {
                                return <MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
                            })}
                        </TextField>
                        <TextField disabled label="Publisher" value={selectValue.publisher}>{auth?.name}</TextField>
                    </div>

                    <div>
                        <TextField name="description" onChange={handleChange} multiline rows={3} required label="Description" fullWidth></TextField>
                    </div>

                    <div>
                        <TextField name="question" onChange={handleChange} multiline rows={3} required label="Question" fullWidth></TextField>
                    </div>

                    <div>
                        <TextField name="answer" inputProps={{ 'data-answer': 'A' }} onChange={handleChange} required label="A"></TextField>
                        <TextField name="answer" inputProps={{ 'data-answer': 'B' }} onChange={handleChange} required label="B"></TextField>
                    </div>

                    <div>
                        <TextField name="answer" inputProps={{ 'data-answer': 'C' }} onChange={handleChange} required label="C"></TextField>
                        <TextField name="answer" inputProps={{ 'data-answer': 'D' }} onChange={handleChange} required label="D"></TextField>
                    </div>

                    <div>
                        <TextField name="correctAnswer" fullWidth onChange={handleChange} required select label="Correct Answer" value={selectValue.correctAnswer} helperText="Please select correct answer of question">
                            {correctAnswer.map((correct, id) => {
                                return <MenuItem key={id} value={correct.value}>{correct.value}</MenuItem>
                            })}
                        </TextField>
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={addPostQuiz}>
                    Save
                </Button>
                <Button onClick={hiddenFormAndResetState}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Home