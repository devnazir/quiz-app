import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, makeStyles, Button } from '@material-ui/core'
import { Fragment, useState, useEffect } from "react"
import { useAuth } from '../../hook/useAuth'
import { addPost, addQuiz } from "../../utils/db";
import correctAnswer from '../../utils/correct_answer'
import categoryQuiz from '../../utils/category_quiz'
import { useParams } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  }
}));

function Form({ open, setOpen, type }) {
  const params = useParams()
  const category = params?.category
  const { auth } = useAuth()

  const [disabledBtn, setDisabledBtn] = useState(false)
  const [selectValue, setSelectValue] = useState({});

  useEffect(() => {
    if (type === 'form-post') {
      setSelectValue({
        publisher: auth?.name ?? "Anonymous",
        category: "",
        description: "",
      })
    } else if (type === 'form-question') {
      setSelectValue({
        category: category,
        question: "",
        answer: {
          A: "",
          B: "",
          C: "",
          D: "",
        },
        correctAnswer: ""
      })
    }

    return () => setSelectValue({})
  }, [type, auth, category])

  const hiddenFormAndResetState = (type) => {
    setOpen(false)
    if (type === 'form-post') {
      setSelectValue({
        publisher: auth?.name ?? "Anonymous",
        category: "",
        description: "",
      })
    } else {
      setSelectValue({
        category: category,
        question: "",
        answer: {
          A: "",
          B: "",
          C: "",
          D: "",
        },
        correctAnswer: ""
      })
    }
    setDisabledBtn(false)
  }

  const addPostQuiz = async () => {
    try {
      setDisabledBtn(true)
      await addPost(selectValue)
      hiddenFormAndResetState(type)
    } catch (err) {
      alert(err.code)
      hiddenFormAndResetState(type)
    }
  }

  const addQuestion = async () => {
    try {
      setDisabledBtn(true)
      await addQuiz(selectValue)
      hiddenFormAndResetState(type)
    } catch (err) {
      alert(err.code)
      hiddenFormAndResetState(type)
    }
  }

  const handleChange = (event) => {
    const name = event.target.name;

    if (name === 'answer') {
      const answer = event.target.dataset.answer
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
    <Fragment>
      {type === 'form-post' ? (
        <FormPost
          disabledBtn={disabledBtn}
          hiddenFormAndResetState={hiddenFormAndResetState}
          targetForm={addPostQuiz}
          auth={auth}
          selectValue={selectValue}
          open={open}
          handleChange={handleChange} />
      ) : (
          <FormQuestion
            hiddenFormAndResetState={hiddenFormAndResetState}
            targetForm={addQuestion}
            selectValue={selectValue}
            open={open}
            handleChange={handleChange}
            disabledBtn={disabledBtn} />
        )}
    </Fragment>
  )
}

function FormPost({ disabledBtn, hiddenFormAndResetState, targetForm, auth, selectValue, open, handleChange }) {
  const classes = useStyles()
  return (
    <Dialog open={open} aria-labelledby="dialog-post">
      <DialogTitle id="dialog-post">Add New Post</DialogTitle>
      <DialogContent>
        <form className={classes.root}>
          <div >
            <TextField name="category" onChange={handleChange} required select label="Category" defaultValue="" value={selectValue.category ? selectValue.category : ""} helperText="Please select category of Quiz">
              {categoryQuiz.map((category) => {
                return <MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
              })}
            </TextField>
            <TextField disabled label={auth?.name ?? ""} value={selectValue.publisher ? selectValue.publisher : ""} >{auth?.name ?? ""}</TextField>
          </div>

          <div>
            <TextField name="description" onChange={handleChange} multiline rows={3} required label="Description" fullWidth></TextField>
          </div>
        </form>
      </DialogContent>
      <ButtonAction onCancel={hiddenFormAndResetState} targetForm={targetForm} disabledBtn={disabledBtn} />
    </Dialog>
  )
}

function FormQuestion({ disabledBtn, hiddenFormAndResetState, targetForm, selectValue, open, handleChange }) {
  return (
    <Dialog open={open} aria-labelledby="dialog-quiz">
      <DialogTitle id="dialog-quiz">Add New Question</DialogTitle>
      <DialogContent>
        <form>
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
      <ButtonAction onCancel={hiddenFormAndResetState} targetForm={targetForm} disabledBtn={disabledBtn} />
    </Dialog>
  )
}

function ButtonAction({ onCancel, targetForm, disabledBtn }) {
  return (
    <DialogActions>
      <Button disabled={disabledBtn} onClick={targetForm}>
        Save
      </Button>
      <Button onClick={onCancel}>
        Cancel
      </Button>
    </DialogActions>
  )
}

export default Form