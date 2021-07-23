<template>
  <div class="goods-property-wrap">
    <el-form>
      <el-form-item class="goods-property-item" label="商品所属分类:" prop="goodsGroup">
        <el-input style="width: 200px; margin-right: 15px;" disabled v-model="property.goodsGroup"></el-input>
        <el-input style="width: 200px" disabled v-model="property.goodsGroup"></el-input>
      </el-form-item>
      <el-form-item class="goods-property-item">
        <el-row>
          <el-col :lg="12" :md="18" :sm="12" :xs="12">
          <sht-table :tableColumn="tableColumn"></sht-table>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'property',
  data() {
    return {
      property: {
        goodsGroup: '推荐分类'
      },
      tableColumn: [
        {
          name: '规格',
          key: 'specification'
        },
        {
          name: '产地',
          key: 'place'
        },
        {
          name: '售价(元)',
          key: 'price'
        },
        {
          name: '展示价(元)',
          key: 'showPrice'
        },
        {
          name: '库存',
          key: 'inventory'
        },
        {
          name: '储存方式',
          key: 'storage'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .goods-property-wrap {
    ::v-deep {
      .el-form-item__label {
        font-size: 16px;
      }
    }
    span {
      display: inline-block;
      font-size: 14px;
      padding: 5px 25px 5px 0;
    }
  }
</style>