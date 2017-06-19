<template>
    <div>
        <div class="me-list" v-for="(item, index) in data">
            <a class="me-list-item" v-for="(sitem, j) in item" :href="sitem.link">
                <div class="me-list-item-icon"><span class="iconfont" :class="sitem.icon"></span></div>
                <div class="me-list-item-content">{{sitem.name}}</div>
                <div class="mei-list-item-opt"><span class="iconfont icon-arrow"></span></div>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Quick',
    props: {
        data: Array
    },
}
</script>
