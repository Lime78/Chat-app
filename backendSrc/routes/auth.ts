import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '../database/db.js'
import { User } from '../models/users.js'
import { loginSchema } from '../validation/authSchema.js'

export const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET as string
router.post('/login', async (req: Request, res: Response) => {
  const { error } = loginSchema.validate(req.body)
  if (error) {
    res
      .status(400)
      .json({ message: 'Invalid login data', details: error.details })
    return
  }
  const { username, password } = req.body

  try {
    const db = await connectToDatabase()
    const usersCollection = db.collection<User>('userInfo')

    const user = await usersCollection.findOne({ username })
    console.log('db connection')

    if (!user) {
      console.log('could not find user')
      res.status(401)
      return
    }

    if (!user || user.password !== password) {
      console.log('user data wrong')

      res.status(401)
      return
    }

    console.log('on its way to create token')

    const token = jwt.sign(
      { id: user._id.toString(), username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    )
    console.log('on its way to send token')

    res.json({ token, userId: user._id.toString() })
  } catch (error) {
    res.status(500)
    return
  }
})