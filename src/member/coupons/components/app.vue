<template>
    <section class="container coupon">
        <tab :current="current" @click="switchTab"></tab>
        <list :data="coupons"></list>
        <empty v-if="coupons.length==0"></empty>
    </section>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import tab from './tab.vue'
import list from './list.vue'
import empty from './empty.vue'

export default {
    name: 'app',
    components: {
        tab,
        list,
        empty
    },
    computed: {
        coupons() {
            return this.$store.getters.coupons
        },
        current() {
            return this.$store.getters.current
        },
    },
    methods: {
        switchTab(key) {
            this.$store.dispatch('switchTab', key);
        }
    }

}
</script>
