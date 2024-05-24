import DateInput from '@/DateInput.vue'

import {
  createApp,
  defineComponent,
  h,
  ref,
} from 'vue'

const app = createApp(defineComponent({
  setup() {
    const date = ref('')

    return () => h(DateInput, {
      'value': date.value,
      'placeholder': 'Date',
      'onUpdate:value': (value: string) => { date.value = value },
    })
  },
}))

app.mount('#app')
