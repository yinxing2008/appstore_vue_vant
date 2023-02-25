import axiosInstance, { AxiosResponseProps } from '@/uitls/request';

export const queryCategories = () => {
	return axiosInstance.get('appstore/categories');
}

export const queryAppsByCategory = (categoryId: string) => {
	return axiosInstance.get('appstore/apps?categoryId='+categoryId);
}

export const queryApp = (id: string) => {
	return axiosInstance.get('appstore/app/'+id);
}

export function search(keyword: string) {
	return axiosInstance.get(`appstore/appsBySearch?keyword=${keyword}`);
}