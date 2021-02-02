import { AppState } from '../AppState'
// import { logger } from '../utils/Logger'
import { scryfall } from './AxiosService'

class ScryfallService {
  async searchCards(cardSearch) {
    const res = await scryfall.get(`cards/search?q=${cardSearch}`)
    AppState.cards = res.data.data
  }

  async getActiveCard(cardName) {
    const res = await scryfall.get(`cards/named?exact=${cardName}`)
    AppState.activeCard = res.data
  }
}

export const scryfallService = new ScryfallService()
