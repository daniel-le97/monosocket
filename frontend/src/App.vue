<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import * as os from 'socket:os';
// import { LLM } from 'socket:ai'
import HelloWorld from './components/HelloWorld.vue';
import { useCounterStore } from './stores/counter';
import application from 'socket:application';
const counter = useCounterStore();
// application.backend.open();
const onClick = () => {
  application.backend.open( { force: true } );
  counter.increment();

};
// const currentWindow = await application.getCurrentWindow();

// currentWindow.on( 'pong', ( event ) => {
//   console.log( event );
// } );
// const llm = new LLM()
const _platform = os.platform();


</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125">
    <h1 class="flex justify-center">
      Welcome to Your Vue + Socket + Esbuild App
    </h1>
    <div class="wrapper">
      <div class="flex justify-center">
        <p>Platform: {{ _platform }}</p>
        <p>{{ counter.count }}</p>
        <button class="btn btn-square w-20" @click=" onClick ">Increment</button>
      </div>
      <HelloWorld msg="You did it! on nice changes" />

      <nav>
        <RouterLink to="/">
          Home page
        </RouterLink>
        <RouterLink to="/about">
          About
        </RouterLink>
        <RouterLink to="/login">
          Login
        </RouterLink>
        <RouterLink to="/backend">
          Backend
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
