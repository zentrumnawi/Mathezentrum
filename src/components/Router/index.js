import Vue from 'vue'
import Router from 'vue-router'
import {version} from './package.json'
import SignIn from '@/components/SignIn'
import AttendeeFormSolo from '@/components/AttendeeForm'

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
            name: 'AttendeeForm',
            component: AttendeeFormSolo
        }
    ],
    mode: 'history'
})