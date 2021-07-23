<template>
  <div class="product-info-wrap">
    <el-form label-width="90px">
      <el-form-item label="商品编号:" prop="goodsNumber">
        P535422287635935232
      </el-form-item>
      <el-form-item label="所属店铺:" prop="belongStore">
        小小德
      </el-form-item>
      <el-form-item label="商品名称:" prop="goodsName">
        红颜草莓
      </el-form-item>
      <el-form-item label="商品标签:" prop="goodsTags">
        <el-tag style="margin-right: 5px;" v-for="(item, index) in baseInfo.tagList" :key="index">
          {{item}}
        </el-tag>
      </el-form-item>
      <el-form-item label="商品品牌:" prop="goodsBrand">
        <el-tag effect="plain">{{baseInfo.goodsBrand}}</el-tag>
      </el-form-item>
      <el-form-item label="品牌LOGO:" prop="goodsCover">
        <el-image style="width: 100px; height: 100px" fit="fill" :src="baseInfo.brandLogo" :preview-src-list="[baseInfo.brandLogo]"></el-image>
      </el-form-item>
      <el-form-item label="商品封面:" prop="goodsCover">
        <el-image style="width: 100px; height: 100px" fit="fill" :src="baseInfo.goodsCover" :preview-src-list="[baseInfo.goodsCover]"></el-image>
      </el-form-item>
      <el-form-item label="商品视频:" prop="goodsVideo">
        <el-image style="width: 100px; height: 100px" fit="fill" :src="baseInfo.goodsCover" :preview-src-list="[baseInfo.goodsCover]"></el-image>
      </el-form-item>
      <el-form-item label="商品详情:" prop="goodsInfoImg">
        <el-image style="width: 100px; height: 100px" fit="fill" :src="baseInfo.goodsCover" :preview-src-list="[baseInfo.goodsCover]"></el-image>
      </el-form-item>
      <el-form-item label="商品图片:" prop="goodsImg">
        <el-image style="width: 100px; height: 100px" fit="fill" :src="baseInfo.goodsCover" :preview-src-list="[baseInfo.goodsCover]"></el-image>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'baseInfo',
  prop: {

  },
  data() {
    return {
      baseInfo: {
        goodsPresell: 1,
        tagList: ['爆款'],
        goodsBrand: '伊利',
        brandLogo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        goodsCover: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        goodsImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        goodsInfoImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    }
  }
}
</script>

<style>

</style>