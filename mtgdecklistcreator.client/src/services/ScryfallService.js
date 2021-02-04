import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { scryfall } from './AxiosService'

class ScryfallService {
  async searchCards(cardSearch) {
    try {
      const res = await scryfall.get(`cards/search?q=${cardSearch}`)
      AppState.cards = res.data.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getActiveCard(cardName) {
    try {
      const res = await scryfall.get(`cards/named?exact=${cardName}`)
      AppState.activeCard = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}

export const scryfallService = new ScryfallService()
