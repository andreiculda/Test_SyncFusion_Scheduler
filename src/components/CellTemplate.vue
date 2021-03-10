<template>
    <div
        v-if="false"
        :id="`${$moment(data.date).longApiFormat()}_${data.groupIndex}_cell`"
        class="template-wrap"
    />
</template>

<script>
export default {
    name: 'CellTemplate',
    data () {
        return {
            data: {},
        }
    },
}
</script>

<style lang="scss" scoped>
    .template-wrap {
        height: 100%;
    }
</style>
