<template>
    <div>
      {{getHeaderTitle}}
    </div>
</template>

<script>
export default {
    name: 'QuickActionsHeader',
    data () {
        return {
            data: {},
        }
    },
    computed: {
        scheduler () {
            return this.$parent.ej2Instances
        },
    },
    methods: {
        closePopoup () {
            let popup = document.getElementsByClassName('e-quick-popup-wrapper')[0]
            popup.classList.remove('e-popup-open')
            popup.classList.add('e-popup-close')
        },
        getHeaderTitle (data) {
            return (data.elementType === 'cell') ? 'Add employee schedule' : 'Schedule Details'
        },
    },
}
</script>

<style lang="scss" scoped>
.quick-info-header-content {
    padding: 5px 10px;
}
.top-right-buttons {
    position: absolute;
    right: 6px;
    top: 6px;
}
</style>
