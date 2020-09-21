<template>
    <div class="m_detail">
        <h1> {{blog.title}} </h1>
        <el-link icon="el-icon-edit" v-if="ownBlog">
            <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}">
                编辑
            </router-link>
        </el-link>
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