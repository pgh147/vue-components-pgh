import TableCus from "../src/components/tableCus.vue"
// export default function (Vue) {
//     Vue.component(tableCus.name, tableCus)
// }
TableCus.install = function (Vue) {
    Vue.component(TableCus.name, TableCus)
}
export default TableCus