import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import AttendeeFormSolo from '@/components/AttendeeFormSolo'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'SignIn',
            component: SignIn
        },
        {
            path: '/attendeeform',
            name: 'AttendeeFormSolo',
            component: AttendeeFormSolo
        }
    ],
    mode: 'history'
})