// Importera och konfigurera
import express, { Express, Request, Response, NextFunction } from 'express'
import { router as userRouter } from './routes/users.js'
import { router as channelRouter } from './routes/channels.js'
import { router as messagesRouter } from './routes/messages.js'
import { authenticateToken } from './routes/authMiddleware.js'
import { router as loginRouter } from './routes/login.js'
import { router as authRouter } from './routes/auth.js'

const app: Express = express()
const port: number = Number(process.env.PORT || 4242)

// Middleware
app.use('/', express.static('dist/'))
app.use('/', express.json())

app.use('/', (req: Request, __: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`, req.body)
  next()
})
app.use('/api/auth', authRouter)

app.use('/api/userInfo', userRouter)
app.use('/api/channels', channelRouter)
app.use('/api/messages', authenticateToken, messagesRouter)
// app.use('/api/login', loginRouter)

// Starta servern
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})