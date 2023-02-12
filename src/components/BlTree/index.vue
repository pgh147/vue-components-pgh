<template>
  <ul class="vue-tree">
    <TreeItem
      v-for="(item, index) in treeData"
      :key="index"
      :treeItemData="item"
      :tree-click-event="treeClickEvent"
    ></TreeItem>
  </ul>
</template>

<script>
import TreeItem from './TreeItem'
export default {
  name: 'VueTreeMenu',
  components: {
    TreeItem
  },
  props: {
    // 树形控件数据
    treeData: {
      type: Array,
      default() {
        return []
      }
    },
    // 节点点击事件
    treeClickEvent: {
      type: Function,
      default() {
        return function () {}
      }
    }
  }
}
</script>

<style lang="scss">
.vue-tree {
  list-style: none;
  padding: 0;
  margin: 0;
  .tree-item {
    cursor: pointer;
    transition: background-color 0.2s;
    .tree-content {
      position: relative;
      /* prettier-ignore */
      padding-left: 56PX;
      &:hover {
        background-color: #f0f7ff;
      }
    }
    .expand-arrow {
      position: absolute;
      top: 0;
      left: 0;
      /* prettier-ignore */
      width: 56PX;
      /* prettier-ignore */
      height: 56PX;
      cursor: pointer;
      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        content: ' ';
        border-width: 5px;
        border-style: solid;
        border-color: transparent;
        border-left-color: #ccc;
        margin: -5px 0 0 -2.5px;
        transition: all 0.2s;
      }
    }
    &.expand {
      & > .tree-content {
        background-color: #f0f7ff;
        & > .expand-arrow {
          &::after {
            transform: rotate(90deg);
            margin: -2.5px 0 0 -5px;
          }
        }
      }
    }
    .tree-label {
      /* prettier-ignore */
      height: 56PX;
      /* prettier-ignore */
      line-height: 56PX;
      /* prettier-ignore */
      font-size: 14px;
    }
    .sub-tree {
      display: none;
      list-style: none;
      /* prettier-ignore */
      padding: 0 0 0 56PX;
      margin: 0;
    }
    &.expand > .sub-tree {
      display: block;
    }
    &.no-child {
      & > .tree-content {
        /*padding-left: 0;*/
        & > .expand-arrow {
          display: none;
        }
      }
    }
  }
}
</style>
