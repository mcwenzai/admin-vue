<template>
  <div class="app-container" v-loading="true"
		element-loading-text="正在开发中......">
    <el-row>
      <el-form :inline="true" :model="queryParams">
        <el-col :lg="6" :md="12" :xs="24" :sm="24">
          <el-form-item label="商品编码">
            <el-input
              style="width: 200px;"
              placeholder="请输入订单编号"
              v-model="queryParams.goodsNumber"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="12" :xs="24" :sm="24">
          <el-form-item label="商品名称">
            <el-input
              style="width: 200px;"
              placeholder="请输入订单编号"
              v-model="queryParams.goodsName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="12" :xs="24" :sm="24">
          <el-form-item label="状态">
            <el-select v-model="queryParams.state">
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="12" :xs="24" :sm="24">
          <el-button type="primary">查询</el-button>
          <el-button>全部</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <sht-table :tableData="tableData" :tableColumn="tableColumn">
        <template slot="goodsNumber" slot-scope="scope">
          <el-button type="text" @click="handleToDetail(scope.scope)">{{scope.scope.goodsNumber}}</el-button>
        </template>
      </sht-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      ></pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "traceInfoList",
  data() {
    return {
      queryParams: {
        goodsNumber: "",
        goodsName: "",
        state: "",
        pageNum: 1,
        pageSize: 10
      },
      tableColumn: [
        {
          type: "selection",
          width: "55"
        },
        {
          name: "商品编码",
          key: "goodsNumber",
          slotName: 'goodsNumber'
        },
        {
          name: "商品名称",
          key: "goodsName"
        },
        {
          name: "所属厂商",
          key: "belongStore"
        },
        {
          name: "厂商联系人",
          key: "contact"
        },
        {
          name: "联系人电话",
          key: "telNumber"
        },
        {
          name: "状态",
          key: "state"
        },
        {
          name: "发布时间",
          key: "time"
        },
        {
          name: "操作",
          key: "operate",
          slotName: "operate"
        }
      ],
      tableData: [
        {
          goodsNumber: 'GYS000001',
          goodsName: '陕西苹果',
          belongStore: '小小德',
          contact: '张三',
          telNumber: '15556565656',
          state: '上架',
          time: '2020-02-05'
        }
      ],
      total: 1,
      options: [
        {
          value: 1,
          label: "全部"
        },
        {
          value: 1,
          label: "上架"
        },
        {
          value: 2,
          label: "下架"
        }
      ]
    };
  },
  methods: {
    getList() {},
    handleToDetail(value) {
      this.$router.push({
        path: '/supplyManage/traceInfoList/detail',
        query: {
          value
        }
      })
    }
  }
};
</script>

<style></style>
