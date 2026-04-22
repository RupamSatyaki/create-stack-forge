export const firebaseConfig = `import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.cert({
    projectId:   process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\\\n/g, '\\n'),
  }),
})

export const db = admin.firestore()

export const connectDB = async () => {
  console.log('Firebase Firestore ready')
}
`

export const firebaseEnv = `FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
PORT=3000
`
