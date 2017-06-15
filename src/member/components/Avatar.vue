<template>
    <div class="me-header">
        <div class="me-header-content">
            <img id="me-avatar" :src="url" alt="">
        </div>
    </div>
</template>
<script>
export default {
    name: 'Message',
    props: {
        url: String
    }
}
</script>
