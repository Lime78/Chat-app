import Joi from 'joi'

export const messageSchema = Joi.object({
  content: Joi.string().min(1).max(500).required(),
  senderId: Joi.alternatives()
    .try(Joi.string().pattern(/^[a-fA-F0-9]{24}$/), Joi.string().valid('guest'))
    .required(),
  recipientId: Joi.string()
    .pattern(/^[a-fA-F0-9]{24}$/)
    .optional(),
  channelId: Joi.string()
    .pattern(/^[a-fA-F0-9]{24}$/)
    .optional(),
  isDirectMessage: Joi.boolean().required(),
})