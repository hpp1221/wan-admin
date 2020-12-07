<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view :key="$route.fullPath"></router-view>
                    </keep-alive>
                    <!--<router-view  :key="key"></router-view>-->
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        };
    },
    computed:{
    },
    components: {
        vHead,
        vSidebar
    }
};
</script>
