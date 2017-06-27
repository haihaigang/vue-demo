<template>
    <li>
        <a class="expire">
            <h4>{{data.name}}</h4>
            <div class="coupon-info clearfix">
                <span>￥<b>{{data.price}}</b></span>
                <div class="remark-info">
                    <!-- v-for="(item, index) in data" -->
                    <p v-for="d in data.rule">{{d}}</p>
                </div>
            </div>
            <em></em>
        </a>
        <div class="expiry-date expire">
            <span>有效期：{{data.beginTime}} 至 {{data.endTime}}</span>
        </div>
    </li>
</template>
<script>
export default {
    name: 'App',
    props: {
        data: Object
    }
}
</script>
