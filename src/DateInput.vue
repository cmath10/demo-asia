<template>
    <input
        ref="input"
        :value="value"
        @jmask:change="onChange"
        @change="autofix"
        @input="autofix"
        @paste="autofix"
    />
</template>

<script lang="ts" setup>
import type { ChangeEvent } from '@cmath10/jmask'

import JMask from '@cmath10/jmask'

import {
  computed,
  onBeforeUnmount,
  onMounted,
  nextTick,
  ref,
  watch,
} from 'vue'

import {
  fixForRest,
  fixForUS,
} from '@/autofix'

const props = defineProps({
  value: {
    type: String,
    default: '',
  },

  locale: {
    type: String,
    default: 'en-US',
  },
})

const emit = defineEmits([
  'update:value',
])

const mask = computed(() => props.locale === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY')
const maskRef = ref<JMask | null>(null)

const input = ref<HTMLInputElement | null>(null)

const fix = (value: string) => mask.value === 'MM/DD/YYYY'
  ? fixForUS(value)
  : fixForRest(value)

const onChange = (event: ChangeEvent): void => {
  emit('update:value', fix(event.detail[0]))
}

const autofix = async () => {
  if (!maskRef.value) {
    return
  }

  await nextTick()

  const mask = maskRef.value!

  if (!mask.test(mask.value, true)) {
    emit('update:value', '')
  } else {
    const fixed = fix(mask.value)
    const caret = mask.caret

    emit('update:value', fixed)
    await nextTick()
    maskRef.value!.caret = caret
  }
}

const applyMask = () => {
  if (input.value) {
    maskRef.value?.destroy()
    maskRef.value = new JMask(input.value, mask.value, {
      descriptors: {
        D: { pattern: /\d/ },
        M: { pattern: /\d/ },
        Y: { pattern: /\d/ },
      },
    })
  }
}

watch(mask, () => {
  applyMask()
  emit('update:value', '')
})

onMounted(applyMask)
onBeforeUnmount(() => maskRef.value?.destroy())
</script>
