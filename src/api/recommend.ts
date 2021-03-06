import jsonp from '@/common/js/jsonp'
import { commonParams, options } from './config'
import axios, { AxiosResponse } from 'axios'
import { RecommendListResponse, DiscListResponse, SongListResponse } from '@/api/apiInterface'

const debug = process.env.NODE_ENV !== 'production'

export function getRecommend(): Promise<RecommendListResponse> {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
  })

  return jsonp(url, data, options)
}

export function getDiscList(): Promise<DiscListResponse> {
  const url = debug
    ? '/api/getDiscList'
    : 'http://127.0.0.1:7729/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json', // 需要修改format,不然是jsonp
  })

  return axios.get(url, {
    params: data,
  }).then((rsp: AxiosResponse) => {
    return Promise.resolve(rsp.data)
  })
}

export function getSongList(disstid: string): Promise<SongListResponse> {
  const url = debug
    ? '/api/getCdInfo/'
    : 'http://127.0.0.1:7729/api/getCdInfo'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
  })

  return axios
    .get(url, {
      params: data,
    })
    .then((res: AxiosResponse) => {
      return Promise.resolve(res.data)
    })
}
