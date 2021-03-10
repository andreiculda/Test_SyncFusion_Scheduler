<template>
    <v-menu
        v-if="activeContextMenu"
        v-click-outside="closeMenu"
        :value="showMenu"
        :position-x="activeContextMenu.x"
        :position-y="activeContextMenu.y"
        absolute
        offset-y
    >
        <v-list
            dense
            subheader
        >
            <v-subheader>{{ activeContextMenu.data.Subject }} / {{ activeContextMenu.data.department.department_name }}</v-subheader>
            <v-divider />
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click="emitEvent(item.action)"
            >
                <v-list-item-icon v-if="item.icon">
                    <v-icon
                        :color="item.color"
                        :size="18"
                        v-text="item.icon"
                    />
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: '',
    computed: {
        ...mapState('scheduler', ['activeContextMenu']),
        items () {
            return this.activeContextMenu ? [
                { title: 'Edit', icon: 'mdi-pencil', color: 'primary', action: 'edit' },
                { title: 'Delete', icon: 'mdi-delete-forever', color: 'error', action: 'delete' },
                { title: 'Substitute Requests', icon: 'mdi-account-switch', color: 'secondary', action: 'ssr' },
                { title: 'Some other menu', icon: 'mdi-gesture-tap-button', color: 'primary', action: 'other' },
            ] : []
        },
        showMenu: {
            get () {
                return this.activeContextMenu
            },
            set (newVal) {
                if (!newVal) {
                    this.closeMenu()
                }
            },
        },
    },
    methods: {
        ...mapMutations('scheduler', ['SET_ACTIVE_CONTEXT_MENU']),
        emitEvent (event) {
            this.$emit(event, this.activeContextMenu.data)
            this.closeMenu()
        },
        closeMenu () {
            this.SET_ACTIVE_CONTEXT_MENU(null)
        },
    },
}
</script>
