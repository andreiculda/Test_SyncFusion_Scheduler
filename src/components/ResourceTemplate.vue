<template>
    <div>
        <div class="template-wrap">
            {{ data.resourceData.text }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'ResourceTemplate',
    data () {
        return {
            data: {},
        }
    },
    computed: {
        details () {
            return this.data
        },
    },
}
</script>
