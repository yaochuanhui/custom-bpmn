/* eslint-disable */
import dataSource from './dataSource';
export default function CustomPathMap() {
  this.toolData = dataSource.toolData;
	this.getScaledPath = function getScaledPath(pathId, param) {
    var rawPath = {};
    // 获取工具栏icon路径
    this.toolData.forEach(item => {
      if (item.nodeName === pathId) {
        rawPath.d = item.iconD;
        rawPath.height = 14;
        rawPath.width = 14;
      }
    });
		// 计算开始绘图的位置
		var mx, my;
		if (param.abspos) {
			mx = param.abspos.x;
			my = param.abspos.y;
		} else {
			mx = param.containerWidth * param.position.mx;
			my = param.containerHeight * param.position.my;
    }
    // 比例坐标
		var coordinates = {}; // map for the scaled coordinates
		var path = format(
			rawPath.d, {
				mx: mx,
				my: my,
				e: coordinates
			}
    );
		return path;
	};
}
var tokenRegex = /\{([^}]+)\}/g,
	objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g; // matches .xxxxx or ["xxxxx"] to run over object properties
function replacer(all, key, obj) {
	var res = obj;
	key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
		name = name || quotedName;
		if (res) {
			if (name in res) {
				res = res[name];
			}
			typeof res == 'function' && isFunc && (res = res());
		}
	});
	res = (res == null || res == obj ? all : res) + '';
	return res;
}
function format(str, obj) {
	return String(str).replace(tokenRegex, function (all, key) {
		return replacer(all, key, obj);
	});
}