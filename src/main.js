import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/index'

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);
Amplify.configure({
    API: {
        endpoints: [
            {
              name: "demo",
              endpoint:
                "https://a97s6j7cue.execute-api.us-east-1.amazonaws.com/default",
            },
        ],
    },
});

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
