<template>
    <DateInput
        v-model:value="date"
        :locale="locale"
    />

    <select v-model="locale">
        <option
            v-for="(v, i) in localeOptions"
            :key="i"
            :value="v"
            :selected="locale === v"
        >
            {{ v }}
        </option>
    </select>
</template>

<script lang="ts" setup>
import DateInput from '@/DateInput.vue'

import { ref } from 'vue'

const date = ref('')

const locale = ref('en-US')
const localeOptions = ['en-US', 'en-GB']
</script>
