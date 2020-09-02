import CreateOffer from './components/CreateOffer.vue'
import Offers from './components/Offers.vue'
import Admin from './components/Admin.vue'

const routes = [
  { path: '/', component: CreateOffer },
  { path: '/offers', component: Offers },
  { path: '/admin', component: Admin },
]

export default routes
