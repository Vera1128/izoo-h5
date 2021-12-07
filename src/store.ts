import { init } from '@rematch/core'
import subscriptionsPlugin from '@rematch/subscriptions'

import * as models from './models'

const store = init({
  models,
  plugins: [subscriptionsPlugin()],
})

export default store
