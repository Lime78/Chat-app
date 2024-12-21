import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface JwtPayload {
  id: string
  username: string
}
interface AuthenticatedRequest extends Request {
  user?: JwtPayload
}
export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]
  const isGuest = req.query.guest === 'true' || !token
  if (isGuest) {
    ;(req as any).user = { id: 'guest', username: 'Guest' }
    return next()
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload
    req.user = decoded
    next()
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' })
    return
  }
}