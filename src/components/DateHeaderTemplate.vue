<template>
    <div
        :id="$moment(data.date).apiFormat()"
        class="date-text"
    >
        {{ $moment(data.date).shortDayFormat() }}
    </div>
</template>

<script>
export default {
    name: 'DateHeaderTemplate',
    data () {
        return {
            data: {},
        }
    },
}
</script>
