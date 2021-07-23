<template>
  <div class="basic-table-wrap">
    <el-table
      style="width: 100%"
      :data="tableData"
      :border="border"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-for="item in tableColumn"
        :key="item.key"
        :type="item.type || ''"
        :label="item.name"
        :prop="item.key"
        :width="item.width"
        :align="item.align || 'center'"
      >
      <template v-if="item.slotName" scope="scope">
        <slot :name="item.slotName" :scope="scope.row"></slot>
      </template>
      <template>
        <slot></slot>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ShtTable',
  props: {
    tableData: {
      type: Array,
      deault () {
        return []
      }
    },
    tableColumn: {
      type: Array,
      default () {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    }
  }
}
</script>

<style>
</style>