<template>
    <div class="coupon-box">
        <ul>
            <item v-for="(d, i) in data" key="i" :data="d"></item>
        </ul>
    </div>
</template>
<script>
import item from './item.vue'

export default {
    name: 'list',
    props: {
        data: Array
    },
    components: {
        item
    }
}
</script>
