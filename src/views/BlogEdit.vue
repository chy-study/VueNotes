<template>
    <div class="m-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title" style="max-width: 450px">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="摘要" prop="description" style="max-width: 600px;">
                <el-input type="textarea" v-model="ruleForm.description" :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <mavon-editor v-model="ruleForm.content"></mavon-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    id: '',
                    title: '',
                    description: '',
                    content: '',
                },
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请填写摘要', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请填写内容', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        _this.$axios.post('/blog/edit', _this.ruleForm, {
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        }).then(res => {
                            _this.editSuccess()
                            _this.$router.push("/blogs")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            editSuccess() {
                this.$notify({
                    title: '操作成功',
                    message: '这是一条成功的提示消息',
                    type: 'success',
                    duration: 3000
                });
            }
        },
        created() {
            const _this = this
            const blogId = _this.$route.params.blogId
            if (blogId) {
                _this.$axios.get("/blog/" + blogId).then(res => {
                    console.log(res)
                    _this.ruleForm.id = res.data.data.id
                    _this.ruleForm.title = res.data.data.title
                    _this.ruleForm.description = res.data.data.description
                    _this.ruleForm.content = res.data.data.content
                })
            }
        }
    }
</script>

<style scoped>
    .m-content {
        max-width: 90%;
        text-align: center;
    }
</style>