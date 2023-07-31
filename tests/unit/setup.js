import { config } from '@vue/test-utils'
import { createApp } from 'vue'

config.global.mocks = {
  $t: (msg) => msg
}

const app = createApp({})

app.config.productionTip = false