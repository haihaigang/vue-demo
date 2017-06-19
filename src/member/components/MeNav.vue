<template>
    <nav class="me-bar">
        <a class="me-bar-title" href="../member/orders.html?status=0">
            <div class="me-bar-title-name">我的订单</div>
            <div class="me-bar-title-opt iconfont icon-arrow"></div>
        </a>
        <div class="me-bar-content clearfix">
            <a class="me-bar-content-tiem tab-item mei-track-pos" data-pos="GA-0" href="../member/orders.html?status=0">
                <div class="iconfont icon-order-detail"></div>
                <div class="tab-label">全部订单</div>
            </a>
            <a class="me-bar-content-tiem tab-item mei-track-pos" data-pos="GA-1" href="../member/orders.html?status=5">
                <div class="iconfont icon-waitpay"></div>
                <div class="tab-label">待支付</div>
            </a>
            <a class="me-bar-content-tiem tab-item mei-track-pos" data-pos="GA-2" href="../member/orders.html?status=2">
                <div class="iconfont icon-waitdelivergoods"></div>
                <div class="tab-label">待发货</div>
            </a>
            <a class="me-bar-content-tiem tab-item mei-track-pos" data-pos="GA-3" href="../member/orders.html?status=3">
                <div class="iconfont icon-receivegoods"></div>
                <div class="tab-label">待收货</div>
            </a>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'MeNav'
}
</script>
