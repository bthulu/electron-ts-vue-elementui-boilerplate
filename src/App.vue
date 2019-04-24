<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <HelloWorld msg="Hello, World"></HelloWorld>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import HelloWorld from './components/HelloWorld.vue';
  export default Vue.extend({
    name: 'App',
    components: {
      HelloWorld
    }
  });
</script>

<style>
</style>