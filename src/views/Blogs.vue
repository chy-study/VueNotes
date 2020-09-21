<template>
    <div class="block">
        <el-timeline>
            <el-timeline-item :timestamp="blog.created" placement="top" v-for="(blog,index) in blogs">
                <el-card>
                    <h4>
                        <router-link :to="{name:'BlogDetail', params:{blogId: blog.id}}">{{blog.title}}</router-link>
                    </h4>
                    <p style="color: #78beff; font-size: 13px"> {{usernameList[index]}} </p>
                    <p> {{blog.description}} </p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <el-pagination
                class="mpage"
                background
                layout="prev, pager, next"
                :total="total"
                :current-page="currentPage"
                :page-size="pageSize"
                @current-change="page"
                >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                blogs: {},
                usernameList: {},
                currentPage: 1,
                total: 0,
                pageSize: 5,
            }
        },

        methods: {
            page(currentPage) {
                const _this = this
                _this.$axios.get("/blog/blogs?currentPage="+currentPage).then(res => {
                    console.log(res)
                    _this.blogs = res.data.data.pageData.records
                    _this.currentPage = res.data.data.pageData.current
                    _this.total = res.data.data.pageData.total
                    _this.pageSize = res.data.data.pageData.size
                    _this.usernameList = res.data.data.usernameList
                })
            }
        },

        created() {
            this.page(1)
        }
    }
</script>

<style scoped>
    .block {
        max-width: 1300px;
    }

    .mpage {
        margin: 0 auto;
        text-align: center;
    }
</style>