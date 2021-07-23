<template>
  <div class="goods-trace-wrap">
    <el-form>
    <el-form-item>
      <el-form-item label="生产许可证">
        <el-image style="width: 100px; height: 100px" fit="fill" :src="goodsTrace.QSImg"></el-image>
      </el-form-item>
      <el-form-item label="生产(采摘)过程">
        <el-row style="padding-top: 35px;">
          <el-timeline>
            <el-timeline-item timestamp="视频" placement="top">
              <el-image style="width: 100px; height: 100px" fit="fill" :src="goodsTrace.video" :preview-src-list="[goodsTrace.video]"></el-image>
            </el-timeline-item>
            <el-timeline-item timestamp="包装视频" placement="top">
              <el-image style="width: 100px; height: 100px" fit="fill" :src="goodsTrace.packagingVideo" :preview-src-list="[goodsTrace.packagingVideo]"></el-image>
            </el-timeline-item>
            <el-timeline-item timestamp="入库视频" placement="top">
              <el-image style="width: 100px; height: 100px" fit="fill" :src="goodsTrace.enterVideo" :preview-src-list="[goodsTrace.enterVideo]"></el-image>
            </el-timeline-item>
            <el-timeline-item timestamp="送检视频" placement="top">
              <el-image style="width: 100px; height: 100px" fit="fill" :src="goodsTrace.checkVideo" :preview-src-list="[goodsTrace.checkVideo]"></el-image>
            </el-timeline-item>
            <el-timeline-item timestamp="抽检视频" placement="top">
              <el-image style="width: 100px; height: 100px" fit="fill" :src="goodsTrace.spotCheckVideo" :preview-src-list="[goodsTrace.spotCheckVideo]"></el-image>
            </el-timeline-item>
            <el-timeline-item timestamp="图片" placement="top">
              <el-image style="width: 100px; height: 100px" fit="fill" :src="goodsTrace.goodsImg" :preview-src-list="[goodsTrace.goodsImg]"></el-image>
            </el-timeline-item>
          </el-timeline>
        </el-row>
      </el-form-item>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'goodsTrace',
  props: {

  },
  data() {
    return {
      goodsTrace: {
        QSImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        video: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        packagingVideo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        enterVideo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        checkVideo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        spotCheckVideo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        goodsImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    }
  }
}
</script>

<style>

</style>