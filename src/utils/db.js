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

export {
    addUser
}