import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from '../services/AxiosService'

class DeckListService {
  // get methods
  async getDeckList() {
    try {
      const res = await api.get('/api/cards')
      AppState.deck = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  // post, put, delete methods
  async addCard(cardName) {
    const body = {
      name: cardName
    }
    try {
      await api.post('/api/cards', body)
      this.getDeckList()
    } catch (error) {
      logger.error(error)
    }
  }

  async decreaseCount(cardId) {
    try {
      await api.put('/api/cards/decrease/' + cardId)
      this.getDeckList()
    } catch (error) {
      logger.error(error)
    }
  }

  async increaseCount(cardId) {
    try {
      await api.put('/api/cards/increase/' + cardId)
      this.getDeckList()
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteCard(cardId) {
    try {
      await api.delete('/api/cards/' + cardId)
      this.getDeckList()
    } catch (error) {
      logger.log(error)
    }
  }
}

export const deckListService = new DeckListService()
