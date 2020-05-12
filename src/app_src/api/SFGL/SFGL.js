import request from '@/frame_src/utils/request'

export function GetFeeResult(query) {
  return request({
    url: '/FeeResult/GetFeeResult',
    method: 'get',
    params: query
  })
}
export function GetShopInfo(query) {
  return request({
    url: '/FeeResult/GetShopInfo',
    method: 'get',
    params: query
  })
}

export function CreateNotification(query) {
  return request({
    url: '/FeeResult/CreateNotification',
    method: 'get',
    params: query
  })
}


export function DeleteRecord(query) {
  return request({
    url: '/FeeResult/DeleteRecord',
    method: 'get',
    params: query
  })
}


export function ConfirmNotificationList(data) {
  return request({
    url: '/FeeResult/ConfirmNotificationList',
    method: 'post',
    data
  })
}

export function PushNotification(data) {
  return request({
    url: '/FeeResult/PushNotification',
    method: 'post',
    data
  })
}

export function GetHistoryFeeResult(query) {
  return request({
    url: '/FeeResult/GetHistoryFeeResult',
    method: 'get',
    params: query
  })
}
export function GetBadFeeResult(query) {
  return request({
    url: '/FeeResult/GetBadFeeResult',
    method: 'get',
    params: query
  })
}

export function ConfirmFee(query) {
  return request({
    url: '/FeeResult/ConfirmFee',
    method: 'get',
    params: query
  })
}

export function ConfirmReciveMoney(data) {
  return request({
    url: '/FeeResult/ConfirmReciveMoney',
    method: 'post',
    data
  })
}

export function PayOff(data) {
  return request({
    url: '/FeeResult/PayOff',
    method: 'post',
    data
  })
}

export function ExportFeeResult(query) {
  return request({
    url: '/FeeResult/ExportFeeResult',
    method: 'get',
    params: query
  })
}