import { Card, CardContent, CardActions, Button, Typography, Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions, makeStyles, MenuItem } from "@material-ui/core"
import { Fragment, useState } from "react"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom'
import { useAuth } from '../../hook/useAuth'
import { addQuiz, getAllQuiz } from "../../utils/db";

const categoryQuiz = [
    {
        value: 'js',
        label: 'JavaScript'
    },
]

const correctAnswer = [
    {
        value: 'A',
    },
    {
        value: 'B',
    },
    {
        value: 'C',
    },
    {
        value: 'D',
    }
]

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
}));

function Home() {
    const [open, setOpen] = useState(false)
    getAllQuiz()
    const showDialogAddProject = () => {
        setOpen(true)
    }

    return (
        <Fragment>
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
            <Box position="fixed" bottom={20} right={20} >
                <IconButton onClick={showDialogAddProject}>
                    <AddCircleOutlineIcon />
                </IconButton>
            </Box>
            <FormAddProject open={open} setOpen={setOpen} />
        </Fragment>
    )
}

function FormAddProject({ open, setOpen }) {
    const { auth } = useAuth()
    const classes = useStyles()

    const [selectValue, setSelectValue] = useState({
        publisher: auth.name,
        category: "",
        description: "",
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
        setOpen(false)
        setSelectValue({
            publisher: auth.name,
            category: "",
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
                        <TextField disabled label="Publisher" value={selectValue.publisher}>{auth.name}</TextField>
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
                <Button onClick={async () => await addQuiz(selectValue) && hiddenFormAndResetState()}>
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