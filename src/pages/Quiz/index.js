import { Box, Card, Typography, CardContent, makeStyles, FormControl, RadioGroup, FormControlLabel, Radio, Button, styled } from "@material-ui/core"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import { Fragment, useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getQuizByCategory } from '../../utils/db'
import Form from "../../components/Form/Form";

const useStyles = makeStyles({
    root: {
        marginTop: "20px",
    },
    boxCorrect: {
        backgroundColor: "#91c788",
        color: "white",
        padding: ".7rem"
    }
})

const LinkButton = styled(Link)({
    width: "100%",
    textAlign: "center",
    marginTop: "20px",
    textDecoration: "none",
    backgroundColor: "#81c784",
    color: "white",
    padding: ".5rem"
})


function Quiz() {
    const classes = useStyles()
    const params = useParams()
    const refGrade = useRef()

    const [quiz, setQuiz] = useState([])
    const [questionAnswered, setQuestionAnswered] = useState([])
    const [lengthQuestion, setLengthQuestion] = useState(0)
    const [disableButton, setDisableButton] = useState(false)
    const [btnSubmitHasClick, setBtnSubmitHasClick] = useState(false)
    const [open, setOpen] = useState(false)
    const [boxCorrectAnswer, setBoxCorrectAnswer] = useState({})

    useEffect(() => {
        getQuizByCategory(params.category).then((quiz) => {
            setQuiz(quiz)
            setLengthQuestion(quiz.length)
        })

        return () => setQuiz([])
    }, [params.category, open])

    const handleChangeRadio = (e) => {
        const index = e.target.name;
        const value = e.target.value;

        questionAnswered.splice(index, index + 1, value)
        setQuestionAnswered(questionAnswered)
    }

    const checkQuestionThatAnswered = () => {

        questionAnswered.forEach((checked, index) => {
            if (checked !== quiz[index].correctAnswer) {
                setBoxCorrectAnswer({
                    ...boxCorrectAnswer,
                    [index]: false
                })
            }
        })

        const correct = quiz.map(question => {
            return question.correctAnswer
        })

        const checkAnsweredQuestion = questionAnswered.filter((answered, i) => {
            return answered === correct[i]
        }).length

        setBtnSubmitHasClick(true)
        setDisableButton(true)

        refGrade.current.textContent = `Score: ${gradeOfQuiz(checkAnsweredQuestion)}`

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    const gradeOfQuiz = (correct) => {
        return Math.round((correct / lengthQuestion) * 100)
    }

    const showdDialogFormPostQuiz = () => {
        setOpen(true)
    }

    return (
        <Fragment>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">
                    {`${params.category ?? ""}`.toUpperCase()}
                </Typography>
                <Typography variant="h5" ref={refGrade}>Score: </Typography>
            </Box>
            <Box>
                {
                    quiz.map((quiz, id) => {
                        return (
                            <Card key={id} className={classes.root}>
                                <CardContent>
                                    <Typography component="p">
                                        {quiz.question}
                                    </Typography>
                                    <FormControl disabled={disableButton}>
                                        <RadioGroup name={`${id}`} onChange={handleChangeRadio}>
                                            <MultipleChoice answer={quiz.answer} />
                                        </RadioGroup>
                                    </FormControl>
                                </CardContent>
                                <div className={classes.boxCorrect}>
                                    {boxCorrectAnswer[id] === false && btnSubmitHasClick ? (
                                        <Typography >
                                            {quiz.answer[quiz.correctAnswer]}
                                        </Typography>
                                    ) : <></>}
                                </div>
                            </Card>
                        )
                    })
                }
                {
                    lengthQuestion > 0 ? (
                        <Box display="flex" flexDirection="column" marginTop={4} marginBottom={4}>
                            <Button disabled={disableButton} variant="contained" color="primary" onClick={checkQuestionThatAnswered}>Submit</Button>
                            {
                                disableButton ? <LinkButton to='/'> Back to Home </LinkButton> : <></>
                            }
                        </Box>
                    ) : <></>
                }

            </Box>
            <Box position="fixed" bottom={20} right={20} >
                <IconButton onClick={showdDialogFormPostQuiz}>
                    <AddCircleOutlineIcon />
                </IconButton>
            </Box>
            <Form open={open} setOpen={setOpen} type="form-question" />
        </Fragment >

    )
}


function MultipleChoice({ answer }) {
    const classes = useStyles()
    const result = []

    for (const [mc, theAnswer] of Object.entries(answer)) {
        result.push(
            {
                choice: mc,
                answer: theAnswer
            }
        )
    }

    return (
        <>
            {
                result?.map((radio, id) => {
                    return <FormControlLabel className={classes.root} key={id} label={radio.answer} value={radio.choice} control={< Radio />}></FormControlLabel >
                })
            }
        </>
    )
}

export default Quiz