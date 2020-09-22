<template>
    <div class="m_detail">
        <h1> {{blog.title}} </h1>
        <div>
            <el-link icon="el-icon-edit" v-if="ownBlog">
                <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}">
                    编辑
                </router-link>
            </el-link>
            <el-link icon="el-icon-delete" v-if="ownBlog" @click="deleteThisBlog()" style="margin-left: 20px; color: #6e9eff">
                删除
            </el-link>
            <el-tag type="success" style="float: right;">阅读量：{{blog.views}}</el-tag>
        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <div class="markdown-body" v-html="blog.content">
        </div>
    </div>
</template>

<script>
import "github-markdown-css/github-markdown.css"
export default {
    data() {
        return {
            blog: {
                id: '',
                title: '',
                views: '1',
                content: ''
            },
            ownBlog: false
        }
    },
    created() {
        const _this = this
        const blogId = _this.$route.params.blogId
        if (blogId) {
            _this.$axios.get("/blog/" + blogId).then(res => {
                console.log(res)
                _this.blog.id = res.data.data.id
                _this.blog.title = res.data.data.title
                _this.blog.views = res.data.data.views

                // 渲染markdown
                const MarkdownIt = require('markdown-it')
                const md = new MarkdownIt()
                const result = md.render(res.data.data.content)
                _this.blog.content = result

                console.log(res.data.data.userId)
                console.log(_this.$store.getters.getUser.id)
                //是否是当前用户发表的博客
                _this.ownBlog = (res.data.data.userId ===  _this.$store.getters.getUser.id)
            })
        }
    },
    methods: {
        deleteThisBlog() {
            const _this = this
            this.$confirm('确认删除该博客？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete('/blog/deleteBlogById?id='+_this.blog.id,{
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res => {
                    console.log(res)
                    _this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    _this.$router.push('/')
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}
</script>

<style scoped>
.m_detail {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    min-height: 500px;
    padding: 20px 15px;
}
</style>