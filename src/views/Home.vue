<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld v-bind:class="{fontRed : isRed}" msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
      return {
        timer: '',
        isRed : false
      }
  },
  methods: {
    changeIsRed() {
      let _isRed = this.isRed;
      if (_isRed) {
        _isRed = false
      } else {
        _isRed = true
      };
      this.isRed = _isRed;
      console.log(this.isRed)
    },
  },
  mounted() {
    this.timer = setInterval(this.changeIsRed, 1000);
  },
  beforeDestroy() {
        clearInterval(this.timer);
  },
}
</script>

<style>
	.home {
		text-align: center;
	}
  .fontRed {
    color: #41B883
  }
</style>
