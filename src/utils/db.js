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

async function addPost(post) {
    try {
        await db.collection('postQuiz').doc(post.category).set({
            publisher: post.publisher,
            category: post.category,
            description: post.description,
        })
    } catch (err) {
        throw err
    }
}

async function addQuiz(quiz) {
    try {
        await db.collection('quiz').doc(quiz.category).collection('questions').add({
            question: quiz.question,
            answer: {
                A: quiz.answer.A,
                B: quiz.answer.B,
                C: quiz.answer.C,
                D: quiz.answer.D,
            },
            correctAnswer: quiz.correctAnswer,
        })
    } catch (err) {
        throw err
    }
}

async function getPosts() {
    const result = []
    const post = await db.collection('postQuiz').get()
    post.forEach(quiz => {
        result.push(quiz.data())
    })
    return result
}

async function getQuizByCategory(category) {
    const result = []
    const categories = await db.collection('quiz').doc(category).collection('questions').get()
    categories.forEach((doc) => {
        result.push(doc.data())
    })
    return result
}

export {
    addUser,
    addQuiz,
    addPost,
    getPosts,
    getQuizByCategory
}