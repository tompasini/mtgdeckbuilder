<template>
  <div class="home container-fluid">
    <div v-if="account._id" class="row justify-content-around">
      <div class="col-md-3">
        <h3>Search:</h3>
        <form @submit.prevent="searchCards(state.cardSearch)">
          <input type="search" required v-model="state.cardSearch">
        </form>
        <div class="page-height overflow-auto">
          <p v-for="card in cards" :key="card.id" @click.stop="getActiveCard(card.name)" class="pointer">
            {{ card.name }}
          </p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="row">
          <div class="col-12">
            <h1>Selected Card</h1>
          </div>
          <div v-if="activeCard.name" class="col-12">
            <img class="img-fluid" v-if="activeCard" :src="activeCard.image_uris.normal" alt="">
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <h1>Deck List</h1>
      </div>
    </div>
    <div v-else class="row justify-content-center">
      <div class="col-6">
        <h1>Log in to start making decks!</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { scryfallService } from '../services/ScryfallService'
import { AppState } from '../AppState'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      cardSearch: ''
    })
    return {
      state,
      cards: computed(() => AppState.cards),
      activeCard: computed(() => AppState.activeCard),
      account: computed(() => AppState.account),
      searchCards(cardSearch) {
        scryfallService.searchCards(cardSearch)
        state.cardSearch = ''
      },
      getActiveCard(cardName) {
        scryfallService.getActiveCard(cardName)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
