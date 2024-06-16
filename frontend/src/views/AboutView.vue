<script lang="ts" setup>
import { ref } from 'vue'

console.log('About page loaded')
const res = ref('')
async function fetchData() {
  try {
    const response = await fetch('/auth/cats')
    res.value = response.ok ? await response.text() : 'Error fetching data'
  }
  catch (error) {
    console.log('error fetching data')
  }

  // console.log( response );
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button class="btn btn-circle" @click=" fetchData ">
      Fetch data
    </button>
    <button class="btn btn-circle" @click=" fetchData ">
      login
    </button>
    <div v-if=" res ">
      {{ res }}
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
