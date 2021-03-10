import Vue from 'vue'
import Vuetify, {
    VApp,
    VTimePicker,
    VDataTable,
    VCardTitle,
    VSpacer,
    VTextField,
    VRow,
    VContainer,
    VCol,
    VIcon,
    VCard,
    VToolbar,
    VBtn,
    VChip,
    VList,
    VListItemGroup,
    VListItemContent,

} from 'vuetify/lib'

import { Touch, Ripple, Scroll } from 'vuetify/lib/directives'

import en from 'vuetify/es5/locale/en'
import nl from 'vuetify/es5/locale/nl'
import de from 'vuetify/es5/locale/de'

let locale = localStorage.getItem('language')

Vue.use(Vuetify, {
    components: {
        VApp,
        VTimePicker,
        VDataTable,
        VCardTitle,
        VSpacer,
        VTextField,
        VRow,
        VContainer,
        VCol,
        VIcon,
        VCard,
        VToolbar,
        VBtn,
        VChip,
        VList,
        VListItemGroup,
        VListItemContent,
    },
    directives: {
        Touch,
        Ripple,
        Scroll,
    },
})

let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color')
let secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color')
let successColor = getComputedStyle(document.documentElement).getPropertyValue('--success-color')
let infoColor = getComputedStyle(document.documentElement).getPropertyValue('--info-color')
let failColor = getComputedStyle(document.documentElement).getPropertyValue('--danger')
let warningColor = getComputedStyle(document.documentElement).getPropertyValue('--warning-color')

export default new Vuetify({
    lang: {
        locales: { en, nl, de },
        current: locale,
    },
    global: {
        ripples: false,
    },
    theme: {
        themes: {
            light: {
                primary: primaryColor,
                secondary: secondaryColor,
                accent: primaryColor,
                error: failColor,
                info: infoColor,
                success: successColor,
                warning: warningColor,
            },
        },
    },
})
