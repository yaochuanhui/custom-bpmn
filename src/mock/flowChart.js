const tableList = [{
  id: '1',
  businessNode: 'BX0001',
  createdBy: 'rose',
  createdTime: '2019.08.01',
  mailRule: '工商银行',
  updatedBy: 'jack',
  updatedTime: '2019.08.01'
}
]
// 获取流程图左侧工具栏
export default {
  'get|/operation-ia-mail/rule-mapping/page': (options) => {
    return {
      status: 200,
      message: 'success',
      data: {
        total: 100,
        rows: tableList
      }
    }
  }
}
