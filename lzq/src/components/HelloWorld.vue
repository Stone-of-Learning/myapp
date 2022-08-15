<script>
import { reactive } from 'vue';
export default {
  name: 'App',
  setup() {
    let msg = reactive(0);
    function c() {
      console.log(msg);
      msg++;
    }
    return {
      msg,
      c,
    };
  },
};
</script>

<template>
  <div>
    <p>{{ msg }}</p>
    <button @click="c">button</button>
  </div>
</template>
