import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function createMetahumanAPI(data: any) {
  return request<{
    data: any;
  }>('/sys/metahuman/create', {
    method: 'POST',
    headers: {AuthToken: localStorage.getItem('AuthToken') || ''},
    data
  });
}
