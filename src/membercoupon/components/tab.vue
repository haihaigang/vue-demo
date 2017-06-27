<template>
    <div class="coupon-tabs tabs-fixed">
        <a class="tab-link" :class="isNoUsedOn" @click="$emit('click', 0)">未使用<i></i></a>
        <a class="tab-link" :class="isUsedOn" @click="$emit('click', 1)">已使用<i></i></a>
        <a class="tab-link" :class="isExpiredOn" @click="$emit('click', 2)">已过期<i></i></a>
    </div>
</template>
<script>
export default {
    name: 'tab',
    props: {
        current: Number
    },
    computed: {
        isNoUsedOn() {
            return {
                active: this.current == 0
            };
        },
        isUsedOn() {
            return {
                active: this.current == 1
            };
        },
        isExpiredOn() {
            return {
                active: this.current == 2
            };
        }
    }
}
</script>
