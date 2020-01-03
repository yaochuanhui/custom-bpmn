/* eslint-disable */
// bpmn流程图左侧工具栏
import {
	assign
} from 'min-dash';
import dataSource from './dataSource';
/**
 * 允许创建BPMN和自定义元素的调色板。
 */
let toolData = dataSource.toolData
export default function PaletteProvider(bpmnFactory, palette, create, elementFactory, spaceTool, lassoTool) {
	this.bpmnFactory = bpmnFactory;
	this._create = create;
	this._elementFactory = elementFactory;
	palette.registerProvider(this);
}
PaletteProvider.$inject = [
	'bpmnFactory',
	'palette',
	'create',
	'elementFactory'
	// 'spaceTool',
	// 'lassoTool'
];
PaletteProvider.prototype.getPaletteEntries = function (element) {
	var actions = {},
		create = this._create,
		elementFactory = this._elementFactory,
		bpmnFactory = this.bpmnFactory;
	function createAction(type, group, className, title, idfixed, options = {}) {
    // 创建监听事件，流程节点拖拽，画布渲染流程节点
		function createListener(event) {
			const businessObject = bpmnFactory.create(type, {}, idfixed);
			// 当前拖拽节点
			var shape = elementFactory.createShape(assign({
				type: type,
				businessObject
			}, options));
			if (options) {
				shape.businessObject.di.isExpanded = options.isExpanded;
      }
			create.start(event, shape);
		}
    var shortType = type.replace(/^bpmn:/, '');
		return {
			group: group,
			className: className,
			title: title || 'Create ' + shortType,
			action: {
				dragstart: createListener,
				click: createListener
			}
		};
	}
  let toolObj = {}
  toolData.forEach(item => {
    toolObj['create.' + item.nodeName] = createAction('bpmn:' + item.type, item.group, item.className, item.title, item.nodeName)
  });
  assign(actions, toolObj);
	return actions;
};