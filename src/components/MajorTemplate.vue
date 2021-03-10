<template>
    <div class="text-center">
        {{ date }}
    </div>
</template>

<script>
export default {
    name: 'MinorTemplate',
    data () {
        return {
            data: {},
        }
    },
    computed: {
        date () {
            return this.$moment(this.data.date).shortTime()
        },
    },
}
</script>
