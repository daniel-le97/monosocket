<script lang="ts" setup>
import application from 'socket:application'
import type ApplicationWindow from 'socket:window'
import { onMounted, ref } from 'vue'

const events = ref('')
let currentWindow: ApplicationWindow
onMounted(async () => {
  await application.backend.open()
  currentWindow = await application.getCurrentWindow()
  currentWindow.on('pong', (event) => {
    const keys = Object.keys(event)
    console.log(keys)
  })
})

async function ping() {
  try {
    await currentWindow.send({ event: 'ping', backend: true })
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-black w-screen">
    <div class="bg-white p-8 rounded-md w-full sm:w-96 shadow-xl">
      <h2 class="text-2xl text-black font-semibold mb-6">
        Backend
      </h2>
      <textarea v-model=" events " class="w-full h-32 p-2 mb-4" />
      <button class="btn btn-circle" @click=" ping ">
        Ping
      </button>
    </div>
  </div>
</template>
