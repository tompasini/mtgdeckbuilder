import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { cardsService } from '../services/CardsService'

export class CardsController extends BaseController {
  constructor() {
    super('/api/cards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserCards)
      .post('', this.addCard)
      .put('/increase/:cardId', this.increaseCount)
      .put('/decrease/:cardId', this.decreaseCount)
      .delete('/clear', this.deleteUserCards)
      .delete('/:cardId', this.deleteCard)
  }

  // get methods
  async getUserCards(req, res, next) {
    try {
      res.send(await cardsService.getUserCards(req.userInfo)).populate('creator')
    } catch (error) {
      next(error)
    }
  }

  // post, put, delete methods

  async addCard(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await cardsService.addCard(req.body)).populate('creator')
    } catch (error) {
      next(error)
    }
  }

  async increaseCount(req, res, next) {
    try {
      res.send(await cardsService.increaseCount(req.params.cardId, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async decreaseCount(req, res, next) {
    try {
      res.send(await cardsService.decreaseCount(req.params.cardId, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async deleteCard(req, res, next) {
    try {
      res.send(await cardsService.deleteCard(req.params.cardId, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async deleteUserCards(req, res, next) {
    try {
      res.send(await cardsService.deleteUserCards(req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}
