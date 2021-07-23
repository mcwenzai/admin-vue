<template>
  <div class="app-container" v-loading="true"
		element-loading-text="正在开发中......">
    <el-row :gutter="20" style="padding: 20px 0;">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true">
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <el-form-item
            label="商品名称:"
            prop="goodsName">
            <el-input style="width: 200px;" placeholder="请输入商品名称" v-model="queryParams.goodsName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <el-form-item
            label="联系电话:"
            prop="telNumber">
            <el-input style="width: 200px;" placeholder="请输入联系电话" v-model="queryParams.telNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <el-form-item
            label="商品编号:"
            prop="goodsNumber">
            <el-input style="width: 200px;" placeholder="请输入商品编号" v-model="queryParams.goodsNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <el-form-item
            label="店铺名称:"
            prop="firm">
            <el-input style="width: 200px;" placeholder="请输入店铺名称" v-model="queryParams.firm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
          <el-form-item
            label="商品状态:"
            prop="state">
            <el-select
              v-model="queryParams.state"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="8" :md="10" :sm="24" :xs="24">
          <el-form-item label="申请时间:" prop="times">
            <el-date-picker
              v-model="queryParams.times"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :offset="16" :span="6" :lg="6" :md="6" :sm="24" :xs="24">
          <el-button type="primary" @click="handelSearch">查询</el-button>
          <el-button @click="handleInit">重置</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="6" :lg="6" :md="8" :sm="12" :xs="12">
        <el-button size="small" @click="handlePassMore">批量下架</el-button>
        <el-button size="small" @click="handlePassMore">批量上架</el-button>
        <el-button size="small" @click="handlePassMore">数据导出</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <sht-table :tableData="tableData" :tableColumn="tableColumn">
        <template slot="goodsNumber" slot-scope="scope">
          <el-button type="text" size="small" @click="getGoodsDetail(scope)">{{scope.scope.goodsNumber}}</el-button>
        </template>
        <template slot="goodsImg" slot-scope="scope">
          <el-image style="width: 100px; height: 100px" fit="fill" :src="scope.scope.goodsImg" :preview-src-list="[scope.scope.goodsImg]"></el-image>
        </template>
        <template slot="operate" slot-scope="scope">
          <el-button 
          type="text"
          size="small"
          @click="handlePass(scope)">上架</el-button>
          <el-button 
          type="text"
          size="small"
          @click="handleNoPass(scope)">删除</el-button>
        </template>
      </sht-table>
    </el-row>
    <pagination 
      v-show="total>0" 
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"></pagination>
  </div>
</template>

<script>
export default {
  name: 'minGoodsList',
  data () {
    return {
      options: [{
        value: 1,
        label: '全部'
      }, {
        value: 2,
        label: '上架'
      }, {
        value: 3,
        label: '下架'
      }],
      total: 10,
      queryParams: {
        goodsName: '',
        telNumber: '',
        goodsNumber: '',
        firm: '',
        state: '',
        times: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: [
        {
          goodsNumber: '123',
          goodsImg: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          goodsName: '123',
          publishTime: '123',
          goodsBrand: '123',
          goodsPrice: '123',
          belongStore: '123',
          state: '123',
        }
      ],
      tableColumn: [
        {
          type: 'selection',
          width: 55
        },
        {
          name: '商品编号',
          key: 'goodsNumber',
          slotName: 'goodsNumber',
          width: 180
        },
        {
          name: '商品封面',
          key: 'goodsImg',
          slotName: 'goodsImg',
          width: 180
        },
        {
          name: '商品名称',
          key: 'goodsName',
          width: 180
        },
        {
          name: '发布时间',
          key: 'publishTime',
          width: 180
        },
        {
          name: '商品品牌',
          key: 'goodsBrand',
          width: 180
        },
        {
          name: '商品价格(元)',
          key: 'goodsPrice',
          width: 180
        },
        {
          name: '所属店铺',
          key: 'belongStore',
          width: 180
        },
        {
          name: '状态',
          key: 'state',
          width: 180
        },{
          name: '操作',
          key: 'operate',
          slotName: 'operate',
          align: 'center'
        }
      ],
    }
  },
  methods: {
    handelSearch() {

    },
    handleInit() {

    },
    getList() {
      
    },
    getGoodsDetail(value) {
      const {goodsNumber} = value.scope
      this.$router.push({
        path: '/goodsManage/minGoodsList/detail',
        query: {
          goodsNumber
        }
      })
    },
    handlePassMore() {

    },
    handlePass(val) {
      console.log(val);
    },
    handleNoPass(val) {
      console.log(val);
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    .el-form--inline .el-form-item__label {
      width: 105px;
      text-align: right;
    }
  }
</style>