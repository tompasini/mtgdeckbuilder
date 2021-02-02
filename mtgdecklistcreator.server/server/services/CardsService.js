import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class CardsService {
  // get methods
  async getUserCards(userInfo) {
    return await dbContext.Card.find({ creatorId: userInfo.id })
  }

  // post, put, delete methods
  async addCard(newCard) {
    return await dbContext.Card.create(newCard)
  }

  async increaseCount(cardId, userId) {
    const exists = await dbContext.Card.findById(cardId)
    if (!exists) {
      throw new BadRequest('Card does not exist')
    }
    const creator = exists._doc.creatorId
    const newCount = { count: ++exists._doc.count }
    if (creator !== userId) {
      throw new BadRequest('Not your deck homie')
    }
    return await dbContext.Card.findByIdAndUpdate(cardId, newCount, { new: true })
  }

  async decreaseCount(cardId, userId) {
    const exists = await dbContext.Card.findById(cardId)
    if (!exists) {
      throw new BadRequest('Card does not exist')
    }
    const creator = exists._doc.creatorId
    const newCount = { count: --exists._doc.count }
    if (creator !== userId) {
      throw new BadRequest('Not your deck homie')
    }
    return await dbContext.Card.findByIdAndUpdate(cardId, newCount, { new: true })
  }

  async deleteCard(cardId, userId) {
    const exists = await dbContext.Card.findById(cardId)
    if (!exists) {
      throw new BadRequest('Card does not exist')
    }
    const creator = exists._doc.creatorId
    if (creator !== userId) {
      throw new BadRequest('Not your deck homie')
    }
    await dbContext.Card.findByIdAndDelete(cardId)
    return 'Deleted card successfully'
  }

  async deleteUserCards(userId) {
    await dbContext.Card.deleteMany({ creatorId: userId })
    return 'Deck list has been deleted'
  }
}

export const cardsService = new CardsService()
