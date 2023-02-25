 <!--
 * 厦门大学计算机专业 | 前华为工程师
 * 专注《零基础学编程系列》  http://lblbc.cn/blog
 * 包含：Java | 安卓 | 前端 | Flutter | iOS | 小程序 | 鸿蒙
 * 公众号：蓝不蓝编程
 -->
 <template>
  <div>
    <div class="header-search">
      <span class="title-text">应用市场</span>
      <div class="search_row" @click="gotoSearch">
        <van-icon name="search" color="#89939d" />
        <div class="search-text">点击搜索</div>
      </div>
    </div>
    <van-tabs v-model:active="current" @click-tab="tabSelect">
      <van-tab
        v-for="(item, index) in categories"
        :key="index"
        :title="item.name"
      />
    </van-tabs>

    <div>
      <van-list finished-text="到底啦">
        <div class="row" v-for="(item, index) in apps" :key="index">
          <van-image
            class="logo"
            :src="item.logoUrl"
            @click="gotoAppDetail(item.id)"
          />
          <div class="col" @click="gotoAppDetail(item.id)">
            <div class="app-name">{{ item.name }}</div>
            <div class="app-info">
              {{ item.downloadCount }} {{ item.fileSize }}
            </div>
          </div>
          <van-button
            @click="download(item.apkUrl)"
            class="btn"
            type="primary"
            size="large"
            >下载</van-button
          >
        </div>
      </van-list>
    </div>
  </div>
</template>
<script lang="ts">
import { queryCategories, queryAppsByCategory } from "../common/api";
export default {
  data() {
    return {
      categories: [],
      apps: [],
      current: 0,
    };
  },
  mounted() {
    this.queryCategories();
  },
  methods: {
    tabSelect: function () {
      this.queryAppsByCategory();
    },
    queryCategories() {
      queryCategories().then((resp) => {
        this.categories = resp.data;
        this.queryAppsByCategory();
      });
    },
    queryAppsByCategory() {
      queryAppsByCategory(this.getCurrentCategoryId()).then((resp) => {
        this.apps = resp.data;
      });
    },

    getCurrentCategoryId() {
      return this.categories[this.current].id;
    },
    gotoSearch() {
      this.$router.push("/appstore/search");
    },
    gotoAppDetail(id) {
      this.$router.push(`/appstore/appDetail?id=${id}`);
    },
    download(apkUrl) {
      location.href = apkUrl;
    },
  },
};
</script>

<style scoped>
.header-search {
  display: flex;
  margin: 10px 0;
  padding: 5px 0;
}
.title-text {
  padding: 0 10px;
  font-size: 20px;
  border-right: 1px solid #f4f4f4;
}
.search_row {
  display: flex;
  flex-direction: row;
  background-color: #f4f4f4;
  border-radius: 10rem;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  align-items: center;
  flex: 1;
}

.search-img {
  height: 20px;
  width: 20px;
  margin-left: 20px;
}

.search-text {
  color: #89939d;
  margin-left: 10px;
}
.row {
  display: flex;
  margin-left: 20px;
  margin-top: 20px;
}
.col {
  margin-left: 20px;
  font-size: 15px;
  flex: 1;
}
.app-name {
  color: #333333;
}
.app-info {
  color: #666666;
}
.logo {
  width: 50px;
  height: 50px;
}
.btn {
  width: 80px;
  height: 40px;
  line-height: 40px;
  border-radius: 2rem;
  background-color: #418df9;
  color: #fff;
  margin-right: 20px;
  text-align: center;
  font-size: 16px;
}
</style>