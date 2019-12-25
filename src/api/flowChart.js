import ajax from '../utils/ajax'
let serverPre = ajax.serverUrlMock
const serverName = '/operation-ia-mail'
// 查询流程图左侧工具栏
export async function getToolData (params) {
  return ajax.get(serverPre(`${serverName}/rule-mapping/page`), params)
}
