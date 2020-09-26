<template>
  <div id="login">
    <div id="bgd">
      <canvas
        id='myCanvas'
        :width='width'
        :height='height'
      >
      </canvas>
    </div>
    <div id="loginBox">
      <el-page-header @back="goLogin" title='返回登录' style="font-size: 9px; color: #3399ff; margin-left: -20px; margin-top: -25px">
      </el-page-header>

      <h4>注册</h4>
      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerForm"
        label-width="0px"
      >
        <el-form-item
          label=""
          prop="username"
          style="margin-top:40px;"
        >
          <el-row>
            <el-col :span='2'>
              <span class="iconfont">&#xe654;</span>
            </el-col>
            <el-col :span='22'>
              <el-input
                class="inps"
                placeholder='用户名'
                v-model="registerForm.username"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          label=""
          prop="password"
        >
          <el-row>
            <el-col :span='2'>
              <span class="iconfont">&#xe616;</span>
            </el-col>
            <el-col :span='22'>
              <el-input
                class="inps"
                placeholder='密码'
                v-model="registerForm.password"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
                label=""
                prop="verify_password"
        >
          <el-row>
            <el-col :span='2'>
              <span class="iconfont">&#xe616;</span>
            </el-col>
            <el-col :span='22'>
              <el-input
                      class="inps"
                      placeholder='确认密码'
                      v-model="registerForm.verify_password"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-top:55px;">
          <el-button
            type="primary"
            round
            class="submitBtn"
            @click="submitForm('registerForm')"
          >注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ElementUI from "element-ui";

export default {
  data() {
    return {
      canvas: null,
      context: null,
      stars: [], //星星数组
      shadowColorList: [
        "#39f",
        "#ec5707",
        "#b031d4",
        "#22e6c7",
        "#92d819",
        "#14d7f1",
        "#e23c66"
      ], //阴影颜色列表
      directionList: ["leftTop", "leftBottom", "rightTop", "rightBottom"], //星星运行方向
      speed: 50, //星星运行速度
      last_star_created_time: new Date(), //上次重绘星星时间
      Ball: class Ball {
        constructor(radius) {
          this.x = 0;
          this.y = 0;
          this.radius = radius;
          this.color = "";
          this.shadowColor = "";
          this.direction = "";
        }

        draw(context) {
          context.save();
          context.translate(this.x, this.y);
          context.lineWidth = this.lineWidth;
          var my_gradient = context.createLinearGradient(0, 0, 0, 8);
          my_gradient.addColorStop(0, this.color);
          my_gradient.addColorStop(1, this.shadowColor);
          context.fillStyle = my_gradient;
          context.beginPath();
          context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
          context.closePath();

          context.shadowColor = this.shadowColor;
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.shadowBlur = 10;

          context.fill();
          context.restore();
        }
      }, //工厂模式定义Ball类
      width: window.innerHeight,
      height: window.innerHeight,
      registerForm: {
        username: "",
        password: "",
        verify_password: ""
      },
      registerRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: "blur"}
        ],
        verify_password: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: "blur"}
        ]
      }
    };
  },
  methods: {
    //提交登录
    submitForm(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const isEqual = (_this.registerForm.password === _this.registerForm.verify_password)
            if (isEqual) {
              // 提交逻辑
              this.$axios.post('/user/register', this.registerForm).then((res)=>{
                _this.$message({
                  message: '恭喜你，注册成功',
                  type: 'success'
                });
                _this.$router.push("/login")
              })
            } else {
              ElementUI.Message.error('两次输入的密码不一致',{duration: 2*1000})
            }
         } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

    goLogin() {
      this.$router.push('/login')
    },

    //重复动画
    drawFrame() {
      let animation = requestAnimationFrame(this.drawFrame);
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.createStar(false);
      this.stars.forEach(this.moveStar);
    },
    //展示所有的星星
    createStar(params) {
      let now = new Date();
      if (params) {
        //初始化星星
        for (var i = 0; i < 50; i++) {
          const radius = Math.random() * 3 + 2;
          let star = new this.Ball(radius);
          star.x = Math.random() * this.canvas.width + 1;
          star.y = Math.random() * this.canvas.height + 1;
          star.color = "#ffffff";
          star.shadowColor = this.shadowColorList[
            Math.floor(Math.random() * this.shadowColorList.length)
          ];
          star.direction = this.directionList[
            Math.floor(Math.random() * this.directionList.length)
          ];
          this.stars.push(star);
        }
      } else if (!params && now - this.last_star_created_time > 3000) {
        //每隔3秒重绘修改颜色其中30个球阴影颜色
        for (var i = 0; i < 30; i++) {
          this.stars[i].shadowColor = this.shadowColorList[
            Math.floor(Math.random() * this.shadowColorList.length)
          ];
        }
        this.last_star_created_time = now;
      }
    },
    //移动
    moveStar(star, index) {
      if (star.y - this.canvas.height > 0) {
        //触底
        if (Math.floor(Math.random() * 2) === 1) {
          star.direction = "leftTop";
        } else {
          star.direction = "rightTop";
        }
      } else if (star.y < 2) {
        //触顶
        if (Math.floor(Math.random() * 2) === 1) {
          star.direction = "rightBottom";
        } else {
          star.direction = "leftBottom";
        }
      } else if (star.x < 2) {
        //左边
        if (Math.floor(Math.random() * 2) === 1) {
          star.direction = "rightTop";
        } else {
          star.direction = "rightBottom";
        }
      } else if (star.x - this.canvas.width > 0) {
        //右边
        if (Math.floor(Math.random() * 2) === 1) {
          star.direction = "leftBottom";
        } else {
          star.direction = "leftTop";
        }
      }
      if (star.direction === "leftTop") {
        star.y -= star.radius / this.speed;
        star.x -= star.radius / this.speed;
      } else if (star.direction === "rightBottom") {
        star.y += star.radius / this.speed;
        star.x += star.radius / this.speed;
      } else if (star.direction === "leftBottom") {
        star.y += star.radius / this.speed;
        star.x -= star.radius / this.speed;
      } else if (star.direction === "rightTop") {
        star.y -= star.radius / this.speed;
        star.x += star.radius / this.speed;
      }
      star.draw(this.context);
    }
  },
	mounted() {
		this.canvas = document.getElementById("myCanvas");
		this.context = this.canvas.getContext("2d");

		this.createStar(true);
		this.drawFrame();
		this.$notify({
		        title: '提示：',
		        message: '欢迎注册',
				// 向下偏移
		        offset: 0,
		        duration: 2000
		});
	},
};
</script>

<style lang='less' scoped>
#login {
  width: 100vw;
  padding: 0;
  margin: -21px -20px;
  height: 100vh;
  font-size: 16px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #242645;
  color: #fff;
  font-family: "Source Sans Pro";
  /*background-size: 100%;*/
  background-size:cover;
  background-image: url(https://wallroom.io/img/2880x1620/bg-ca47e40.jpg);
  position: relative;
  #bgd {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  #loginBox {
    width: 240px;
    height: 340px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 50px 40px 40px 40px;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
    opacity: 1;
    background: linear-gradient(
      230deg,
      rgba(53, 57, 74, 0) 0%,
      rgb(0, 0, 0) 100%
    );
    /deep/ .inps input {
      border: none;
      color: #fff;
      background-color: transparent;
      font-size: 12px;
    }
    .submitBtn {
      background-color: transparent;
      color: #39f;
      width: 200px;
    }
    .iconfont {
      color: #fff;
    }
  }
}
</style>