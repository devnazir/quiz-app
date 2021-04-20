import { db } from '../config/firebase'

async function addUser(user) {
    const result = await db.collection('users').add({
        uid: user.uid,
        email: user.email,
        displayName: user.name,
        photoUrl: user.photoUrl,
        token: user.token
    })

    return result
}

async function addQuiz(quiz) {
    const result = await db.collection('quiz').doc(quiz.category).collection('questions').add({
        publisher: quiz.publisher,
        category: quiz.category,
        description: quiz.description,
        question: quiz.question,
        answer: {
            A: quiz.answer.A,
            B: quiz.answer.B,
            C: quiz.answer.C,
            D: quiz.answer.D,
        },
        correctAnswer: quiz.correctAnswer,
    })

    return result
}

async function getAllQuiz() {
    const allQuiz = [];
    const js = await db.collection('quiz').doc('js').collection('questions').get();
    js.forEach(tes => {
        allQuiz.push(tes.data())
    })

    console.log(allQuiz)
}

export {
    addUser,
    addQuiz,
    getAllQuiz
}