<template>
    <div class="tags tags-page" v-if="showTags">
        <ul class="clearfix">
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags" @visible-change="tagsCloseChange">
                <div class="tags-close" :class="{'is-active':closeIsShow}">
                    <img src="../../assets/img/tags-close.svg" alt="">
                </div>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                tagsList: [],
                closeIsShow:false
            }
        },
        methods: {
            isActive(path) {
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                }else{
                    this.$router.push('/dashboard');
                }
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.$router.push('/dashboard');
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                })
                this.tagsList = curItem;
            },
            // 设置标签
            setTags(route){
                const isExist = this.tagsList.some(item => {
                    return item.path === route.fullPath;
                })
                if(!isExist){
                    if(this.tagsList.length >= 8){
                        this.tagsList.shift();
                    }
                    this.tagsList.push({
                        title: route.meta.title,
                        path: route.fullPath,
                        name: route.matched[1].components.default.name
                        // name: route.meta.name
                    })
                }
                bus.$emit('tags', this.tagsList);
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            },
            tagsCloseChange(data){
                this.closeIsShow = data;
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
            }
        },
        created(){
            this.setTags(this.$route);
            // 监听关闭当前页面的标签页
            bus.$on('close_current_tags', () => {
                for (let i = 0, len = this.tagsList.length; i < len; i++) {
                    const item = this.tagsList[i];
                    if(item.path === this.$route.fullPath){
                        if(i < len - 1){
                            this.$router.push(this.tagsList[i+1].path);
                        }else if(i > 0){
                            this.$router.push(this.tagsList[i-1].path);
                        }else{
                            this.$router.push('/');
                        }
                        this.tagsList.splice(i, 1);
                        break;
                    }
                }
            })
        }
    }

</script>


<!--<style>
    .tags {
        position: relative;
        height: 40px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
        border-top: 1px solid #E9E9E9;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.05);
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        float: left;
        margin: 6px 10px 0 10px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 34px;
        line-height: 34px;
        border-radius: 10px 10px 0px 0px;
        background: #fff;
        padding: 0 7px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #E6F7FF;
    }

    .tags-li.active {
        color: #fff;
        border: none;
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }

</style>-->
<style>
    .tags-page {
        position: relative;
        height: 40px;
        overflow: hidden;
        background: #fff;
        padding-right: 80px;
        border-top: 1px solid #E9E9E9;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.05);
    }

    .tags-page ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 0 10px;
    }

    .tags-page .tags-li {
        float: left;
        margin: 5px 5px 0 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 28px;
        line-height: 28px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-page .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-page .tags-li.active {
        color: #fff;
        border: 1px solid #409eff;
        background-color: #409eff;
    }

    .tags-page .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-page .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-page .tags-close-box {
        position: absolute;
        right: 12px;
        top: 0;
        box-sizing: border-box;
        text-align: center;
        width: 40px;
        height: 100%;
        /*background: #fff;*/
        /*box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);*/
        z-index: 5;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .tags-page .tags-close-box .tags-close{
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        cursor: pointer;
        border: none;
        user-select: none;
        -webkit-user-select: none;
        outline:none;
    }
    .tags-page .tags-close-box .tags-close:hover, .tags-page .tags-close-box .is-active{
        background: #E6F7FF;
    }
    .tags-page .tags-close-box .tags-close img{
        width: 14px;
        height: 14px;
        display: block;
        vertical-align: middle;
    }
</style>