<template>
    <div class="block">
        <el-timeline>
            <el-timeline-item timestamp="2018/4/12" placement="top">
                <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/12 20:46</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
                <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/3 20:46</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <el-pagination
                class="mpage"
                background
                layout="prev, pager, next"
                :total="1000">
        </el-pagination>
    </div>
</template>

<style scoped>
    .block {
        max-width: 1300px;
    }

    .mpage {
        margin: 0 auto;
        text-align: center;
    }
</style>