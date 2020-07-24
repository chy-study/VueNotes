<template>
  <el-container>
    <el-header>
      <div style="margin-top: 0px">
        <h1 style="display: block; margin: 0; float: left; ">
          <a href="/"><img src="./assets/logo.png" style="width: 40px; height: 40px; margin-top: -10px"></a>
        </h1>

        <ul style="list-style:none; ">
          <li class="m_li" style="margin-left: 40px">
            <router-link to="/">Home</router-link>
          </li>
          <li class="m_li">
            <router-link to="/echarts">Echarts</router-link>
          </li>
          <li class="m_li">
            <router-link to="/notes">Notes</router-link>
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
                <el-dropdown-item>
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

    <el-main height="2000px"> 
        <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        input: '',
        isDark: false,
        pickerColor: '#ffffff',
        themeTitle: '更改主体颜色',
        aboutTitle: '关于我'
      }
    },
    methods: {
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
      }
    },
  }
</script>

<style>
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
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;

  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .m_li {
    float: left;
    margin-left: 30px
  }

  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
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
