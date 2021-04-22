import { Box, Card, Typography, CardContent, makeStyles, FormControl, RadioGroup, FormControlLabel, Radio, Button, styled } from "@material-ui/core"
import { Fragment, useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { getQuizByCategory } from '../../utils/db'

const useStyles = makeStyles({
    root: {
        marginTop: "20px",
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

const questionAnswered = []

function Quiz() {
    const classes = useStyles()
    const params = useParams()

    const [quiz, setQuiz] = useState([])
    const [lengthQuestion, setLengthQuestion] = useState(0)
    const [disableButton, setDisableButton] = useState(false)
    const refGrade = useRef()

    useEffect(() => {
        getQuizByCategory(params.category).then((quiz) => {
            setQuiz(quiz)
            setLengthQuestion(quiz.length)
        })

    }, [params.category])

    const handleChangeRadio = (e) => {
        console.log(e.target)
        const index = e.target.name;
        const value = e.target.value;

        questionAnswered[index] = value
    }

    const checkQuestionThatAnswered = () => {
        const correct = quiz.map(question => {
            return question.correctAnswer
        })

        const checkAnsweredQuestion = questionAnswered.filter((answered, i) => {
            return answered === correct[i]
        }).length

        refGrade.current.textContent = `Score: ${gradeOfQuiz(checkAnsweredQuestion)}`
        setDisableButton(true)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    const gradeOfQuiz = (correct) => {
        return (correct / lengthQuestion) * 100
    }

    return (
        <Fragment>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">
                    {`${quiz[0]?.category ?? ""}`.toUpperCase()}
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
                            </Card>
                        )
                    })
                }
                <Box display="flex" flexDirection="column" marginTop={4} marginBottom={4}>
                    <Button disabled={disableButton} variant="contained" color="primary" onClick={checkQuestionThatAnswered}>Submit</Button>
                    {
                        disableButton ? <LinkButton to='/'> Back to Home </LinkButton> : <></>
                    }
                </Box>
            </Box>
        </Fragment >
    )
}

function MultipleChoice({ answer }) {
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
                    return <FormControlLabel key={id} label={radio.answer} value={radio.choice} control={< Radio />}></FormControlLabel >
                })
            }
        </>
    )
}

export default Quiz