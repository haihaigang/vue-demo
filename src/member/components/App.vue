<!--样式-->
<style src="../css/index.css"></style>
<!--模板-->
<template>
    <div class="chatapp">
        <avatar :url="avatar"></avatar>
        <me-nav></me-nav>
        <quick :data="quickData"></quick>
        <quick :data="quickData2"></quick>
    </div>
</template>
<!--控制-->
<script>
import {
    mapGetters
} from 'vuex'
import Avatar from './Avatar.vue'
import MeNav from './MeNav.vue'
import Quick from './Quick.vue'

export default {
    name: 'App',
    components: {
        Avatar, MeNav, Quick
    },
    computed: {
        avatar() {
            return this.$store.getters.avatar
        },
        getAvatarFromState(){
            return this.$store.state.avatar
        },
        quickData(){
            return this.$store.getters.quickData
        },
        quickData2(){
            return this.$store.getters.quickData2
        }
    },
    computed2: mapGetters([
        'avatar'
    ])
}
</script>
