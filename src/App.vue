<template>
  <div id="app">
    <HelloWorld />
    <About />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import About from './components/About.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    About
  }
};
</script>
