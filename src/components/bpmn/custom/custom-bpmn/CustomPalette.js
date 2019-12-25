/* eslint-disable */
// bpmn流程图左侧工具栏
import {
	assign
} from 'min-dash';
/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
export default function PaletteProvider(bpmnFactory, palette, create, elementFactory, spaceTool, lassoTool) {
	this.bpmnFactory = bpmnFactory;
	this._create = create;
	this._elementFactory = elementFactory;
	// this._spaceTool = spaceTool;
	// this._lassoTool = lassoTool;

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
		// spaceTool = this._spaceTool,
		// lassoTool = this._lassoTool,
		bpmnFactory = this.bpmnFactory;
	function createAction(type, group, className, title, idfixed, options = {}) {
		function createListener(event) {
			const businessObject = bpmnFactory.create(type, {}, idfixed);
			
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
	// function createParticipant(event, collapsed) {
	// 	create.start(event, elementFactory.createParticipantShape(collapsed));
  // }
  let obj = {
    // 开始
		'create.start-event': createAction(
			'bpmn:StartEvent', 'event', 'iconfont iconkaishi end', '开始'
    ),
    // 结束
		'create.end-event': createAction(
			'bpmn:EndEvent', 'event', 'iconfont iconjieshushijian end', '结束'
    ),
    // 分割线
		'event-separator': {
			group: 'event',
			separator: true
    },
    // 互斥网关
		'create.exclusive-gateway': createAction(
			'bpmn:ExclusiveGateway', 'gateway', 'bpmn-icon-gateway-xor green', '创建判断节点'
    ),
    // 并行网关
		// 'create.parallel-gateway': createAction(
		// 	'bpmn:ParallelGateway', 'gateway', 'bpmn-icon-gateway-parallel green', '并行网关'
    // ),
    // 分支节点
		'create.branchNode': createAction(
			'bpmn:ServiceTask', 'activity', 'iconfont iconleixing-fenzhijiedian branchNode', '创建分支节点', 'branchNode', {}
    ),
    // 聚合节点
    'create.polymerizationNode': createAction(
			'bpmn:ServiceTask', 'activity', 'iconfont iconleixing-guibingjiedian polymerizationNode', '创建聚合节点', 'polymerizationNode', {}
    ),
    // 分割线
		'gateway-separator': {
			group: 'gateway',
			separator: true
    },
    // 会签节点
    'create.jointlySignNode': createAction(
			'bpmn:ServiceTask', 'activity', 'iconfont iconhuiqianrenwu jointlySign', '创建会签节点', 'jointlySignNode', {}
    ),
    // 固定人节点
    'create.fixedPersonNode': createAction(
			'bpmn:ServiceTask', 'activity', 'iconfont iconrenshu fixedPerson', '创建固定人节点', 'fixedPersonNode', {}
    ),
    // 候选节点
    'create.candidateNode': createAction(
			'bpmn:ServiceTask', 'activity', 'iconfont iconrenqun candidate', '创建候选节点', 'candidateNode', {}
    ),
	}
  assign(actions, obj);
	return actions;
};