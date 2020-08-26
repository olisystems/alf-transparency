import CreateOffer from './components/CreateOffer.vue'
import Offers from './components/Offers.vue'
import Verification from './components/Verification.vue'

const routes = [
  { path: '/', component: CreateOffer },
  { path: '/offers', component: Offers },
  { path: '/verification', component: Verification },
]

export default routes
