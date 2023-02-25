 <!--
 * 厦门大学计算机专业 | 前华为工程师
 * 专注《零基础学编程系列》  http://lblbc.cn/blog
 * 包含：Java | 安卓 | 前端 | Flutter | iOS | 小程序 | 鸿蒙
 * 公众号：蓝不蓝编程
 -->
<template>
  <van-nav-bar
    name="编辑"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="row">
    <van-image class="logo" :src="logoUrl" />
  </div>
  <div class="row">
    <div>{{ name }}</div>
  </div>
  <div class="row">
    <div>{{ downloadCount }} {{ fileSize }}</div>
  </div>
  <van-divider />
  <div class="row">
    <van-image
      v-for="(item, index) in screenShots"
      :key="index"
      :src="item"
      radius="10"
    />
  </div>
  <div v-html="description" class="description"></div>
  <div class="bottom-wrapper">
    <van-button @click="download" class="btn" type="primary" size="large"
      >下载</van-button
    >
  </div>
</template>


<script>
import { queryApp } from '../common/api'
export default {
  data() {
    return {
      name: '',
      downloadCount: '',
      fileSize: '',
      apkUrl: '',
      logoUrl: '',
      screenShots: [],
      description: ''
    }
  },
  mounted() {
    var id = this.$route.query.id;
    this.queryData(id)
  },
  methods: {
    onClickLeft() {
      history.back()
    },
    async queryData(id) {
      const resp = await queryApp(id)
      this.name = resp.data.name
      this.downloadCount = resp.data.downloadCount
      this.fileSize = resp.data.fileSize
      this.logoUrl = resp.data.logoUrl
      this.apkUrl = resp.data.apkUrl
      this.screenShots = resp.data.screenshotUrls.split(',')
      this.description = resp.data.description.replaceAll(/\\n/g, '<br>')
    },
    download() {
      location.href = this.apkUrl
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  width: 100%;
  justify-content: center;
}
.logo {
  width: 3rem;
  height: 3rem;
  margin-top: 20px;
}
.description {
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: medium;
}
.bottom-wrapper {
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  margin-top: 20px;
  padding-bottom: 20px;
}

.btn {
  width: 200px;
  height: 40px;
  line-height: 40px;
  border-radius: 2rem;
  background-color: #418df9;
  color: #fff;
}
</style>