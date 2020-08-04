<template>
  <el-container ref="homePage" style="width: 100%">
    <el-header :class="{m_down : isScroll}">
      <div style="margin-top: 0px">
        <h1 style="display: block; margin: 0; float: left; ">
          <a href="/"><img src="./assets/logo.png" style="width: 40px; height: 40px; margin-top: -5px"></a>
        </h1>

        <ul style="list-style:none; ">
          <li class="m_li" style="margin-left: 40px">
            <router-link to="/">Home</router-link>
          </li>
          <li class="m_li">
            <router-link to="/echarts">Echarts</router-link>
          </li>
          <li class="m_li">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                Notes<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="vNotes">
                  Vue笔记
                </el-dropdown-item>
                <el-dropdown-item command="sNotes" :divided="true">
                  SpringBoot笔记
                </el-dropdown-item>
                <el-dropdown-item command="dNotes" :divided="true">
                  Delphi笔记
                </el-dropdown-item>
                <el-dropdown-item command="mNotes" :divided="true">
                  Markdown语法
                </el-dropdown-item>
                <el-dropdown-item command="mNotes" :divided="true">
                  Git
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="m_li" :title="themeTitle">
            <el-dropdown trigger="click" :hide-on-click="false">
              <span class="el-dropdown-link">
                Theme<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-switch @change="switchChangeBgc"
                    v-model="isDark"
                    active-text="暗夜"
                    inactive-text="日间"
                    active-color="#A9A9A9">
                  </el-switch>
                </el-dropdown-item>
                <el-dropdown-item :divided="true">
                  <div class="block">
                    <span class="demonstration">自定义</span>
                    <el-color-picker @change="pickerChangeBgc" @active-change="pickerChangeBgc" v-model="pickerColor" size="small" style="float: right;"></el-color-picker>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="m_li" :title="aboutTitle">
            <el-link disabled>About</el-link>
          </li>
          <li class="m_li" style="float: right">
            <el-input
              placeholder="搜索本站"
              prefix-icon="el-icon-search"
              v-model="input"
              clearable>
            </el-input>
          </li>
        </ul>
      </div>
    </el-header>

    <el-main ref="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        clientHeight: '',
        input: '',
        isDark: false,
        isScroll: false,
        pickerColor: '#ffffff',
        themeTitle: '更改主体颜色',
        aboutTitle: '关于我'
      }
    },
    methods: {
      changeFixed(clientHeight){
        this.$refs.homePage.$el.style.height = clientHeight-1+'px';
      },
      switchChangeBgc(val) {
        console.log(val);
        if (val) {
          document.body.style.backgroundColor = "#A9A9A9",
          this.pickerColor = "#A9A9A9"
        } else {
          document.body.style.backgroundColor = "#ffffff",
          this.pickerColor = "#ffffff"
        } 
      },
      pickerChangeBgc(val) {
        console.log(val);
        document.body.style.backgroundColor = val;
      },
      handleCommand(val) {
        switch(val){
          case "vNotes":
            this.goTovNotes();
            break;
          case "sNotes":
            this.goTosNotes();
            break;
          case "dNotes":
            this.goTodNotes();
            break;
          case "mNotes":
            this.goTomNotes();
            break;
        }
      },
      goTovNotes() {
        this.$router.push("/vue")
      },
      goTosNotes() {
        this.$router.push("/springboot")
      },
      goTodNotes() {
        this.$router.push("/delphi")
      },
      goTomNotes() {
        this.$router.push("/markdown")
      },
    },
    mounted(){   
      this.clientHeight = document.documentElement.clientHeight;
      // onresize 事件会在窗口或框架被调整大小时发生。         
      window.onresize = () => {
        this.clientHeight = document.documentElement.clientHeight;
      };
      //监听main的滚动条
      this.$refs.main.$el.addEventListener('scroll', e => {
        console.log('相对距离', this.$refs.main.$el.scrollTop)
        console.log('绝对距离', e.target.offsetTop + this.$refs.main.$el.scrollTop)
        if (this.$refs.main.$el.scrollTop > 0) {
          this.isScroll = true
        } else {
          this.isScroll = false
        }
      }, true)
    },
    watch: {
      // 如果clientHeight发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
  }
</script>

<style>

  body {
    overflow: hidden;
    margin: 0;
    background-image: url(https://wallroom.io/img/1920x1080/bg-976058f.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size:100% 100%;
  }
  .el-header {
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: center;
    height: 80px;
    line-height: 20px;
  }
  
  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    line-height: 30px;  
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: black;
    font-size: 16px;
  }
  .el-icon-arrow-down {
    font-size: 10px;
  }

  .m_li {
    float: left;
    margin-left: 30px;
    color: black;
    font-size: 16px;
  }

  .m_li a {
    color: black;
  }

  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }

  /* 主菜单下面的阴影 */
  .m_down {
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.1); 
  }

  /* 在全局CSS里引用: */
  /* 滚动条宽度 */
  ::-webkit-scrollbar {
   width: 7px;
   height: 10px;
  }
  /* 滚动条的滑块 */
  ::-webkit-scrollbar-thumb {
   background-color: #a1a3a9;
   border-radius: 3px;
  }
</style>
