export const payStatusOptions = {
  title: '付款狀態',
  name: 'payStatus',
  options: [{
    label: '(預設)', value: ''
  }, {
    label: '未付款', value: 'pending'
  }, {
    label: '完成', value: 'completed'
  }]
}

export const prepareStatusOptions = {
  title: '出餐狀態',
  name: 'prepareStatus',
  options: [{
    label: '(預設)', value: ''
  }, {
    label: '未處理', value: 'pending'
  }, {
    label: '處理中', value: 'confirmed'
  }, {
    label: '完成', value: 'completed'
  }]
}
