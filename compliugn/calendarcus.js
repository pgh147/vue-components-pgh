import CalendarCus from "../src/components/calendarCus.vue"
// export default function (Vue) {
//     Vue.component(calendarCus.name, calendarCus)
// }
CalendarCus.install = function (Vue) {
    Vue.component(CalendarCus.name, CalendarCus)
}
export default CalendarCus