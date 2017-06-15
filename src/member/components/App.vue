<!--样式-->
<style src="../css/index.css"></style>
<!--模板-->
<template>
    <div class="chatapp">
        <avatar :url="avatar"></avatar>
        <p>avatar = {{avatar}}</p>
        <p>getAvatarFromState = {{getAvatarFromState}}</p>
    </div>
</template>
<!--控制-->
<script>
import {
    mapGetters
} from 'vuex'
import Avatar from './Avatar.vue'

export default {
    name: 'App',
    components: {
        Avatar
    },
    computed: {
        avatar() {
            return this.$store.getters.avatar
        },
        getAvatarFromState(){
            return this.$store.state.avatar
        }
    },
    computed2: mapGetters([
        'avatar'
    ])
}
</script>
