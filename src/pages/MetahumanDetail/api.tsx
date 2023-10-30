import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function quryMetahuman(id: number) {
  return request<{
    data: API.CurrentUser;
  }>('/sys/metahuman/' + id, {
    method: 'GET',
    headers: {AuthToken: localStorage.getItem('AuthToken') || ''}
  });
}

export async function updateMetahuman(id:number, data: any) {
    return request<{
      data: API.CurrentUser;
    }>('/sys/metahuman/' + id, {
      method: 'PUT',
      headers: {AuthToken: localStorage.getItem('AuthToken') || ''},
      data
    });
  }
  
export interface metahumanBody {
  category: string;
  createTime: string;
  description: string;
  emotion: string;
  gender: string;
  name: string;
  pitch: number;
  speaker: string;
  speed: number;
  status: string;
  subname: string;
  updateTime: string;
  voicesource: string;
}
