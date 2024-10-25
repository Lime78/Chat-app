// Importera och konfigurera
import express, { Express, Request, Response, NextFunction } from 'express'
import { router as userRouter } from './routes/users.js'

const app: Express = express()
const port: number = Number(process.env.PORT || 4242)


// Middleware
app.use('/', express.static('dist/'))
app.use('/', express.json())

app.use('/', (req: Request, __: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`, req.body)
  next()
})

app.use('/api/users', userRouter)



// Starta servern
app.listen(port, () => {
	console.log('Server is listening on port ' + port)
  })