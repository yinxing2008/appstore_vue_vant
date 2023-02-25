import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "AppList",
		meta: {
			title: "首页",
			keepAlive: true
		},
		component: () => import("../views/AppList.vue"),
	},{
		path: "/appstore/appDetail",
		name: "appDetail",
		meta: {
			title: "应用详情",
			keepAlive: true
		},
		component: () => import("../views/AppDetail.vue"),
	},{
		path: "/appstore/search",
		name: "searchApp",
		meta: {
			title: "搜索",
			keepAlive: true
		},
		component: () => import("../views/Search.vue"),
	},
];
const router = createRouter({
	history: createWebHashHistory(),
	routes
});
export default router;