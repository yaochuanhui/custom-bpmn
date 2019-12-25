/* eslint-disable */
import eventBus from './../event-bus';
import {
	domify,
	query as domQuery,
	attr as domAttr,
	clear as domClear,
	classes as domClasses,
	matches as domMatches,
	delegate as domDelegate,
	event as domEvent
} from 'min-dom';
import {
	isFunction,
	isArray,
	forEach,
	assign
} from 'min-dash';
import {
	append as svgAppend,
	attr as svgAttr,
	create as svgCreate,
	classes as svgClasses
} from 'tiny-svg';
const HTML_MARKUP = '<div class="dg-palette">' +
	'<div class="dg-palette-entries"></div>' +
	'<div class="dg-palette-toggle"></div>' +
	'</div>';
export default class Palete {
	constructor(canvas) {
		this._eventBus = eventBus
		this._canvas = canvas
		this._providers = []

		var self = this;
		self._diagramInitialized = true;
		self._init()
		self._update()
	}
	_init = () => {
		var canvas = this._canvas,
			eventBus = this._eventBus;
		var parent = canvas.getContainer(),
			container = this._container = domify(HTML_MARKUP),
			self = this;
		parent.appendChild(container)
		// 绑定事件
		domDelegate.bind(container, '.entry', 'click', function (event) {
			var target = event.delegateTarget;
			self.trigger('click', event)
		})
		domEvent.bind(container, 'mousedown', function (event) {
			event.stopPropagation();
		});
		domDelegate.bind(container, '.entry', 'dragstart', function (event) {
			self.trigger('dragstart', event);
		});
	}
	trigger = (action, event, autoActivate) => {
		var entries = this._entries,
			entry, handler, originalEvent, button = event.delegateTarget || event.target;
		if (!button) {
			return event.preventDefault();
		}
		// 根据data-action来获取节点信息
		entry = entries[domAttr(button, 'data-action')];
		if (!entry) return;
		handler = entry.action;
		originalEvent = event.originalEvent || event;
		if (isFunction(handler)) {
			if (action == 'click') {
				handler(originalEvent, autoActivate)
			}
		} else {
			if (handler[action]) {
				handler[action](originalEvent, autoActivate)
			}
		}
		// 其他事件都禁止掉
		event.preventDefault();
	}
	_update = () => {
		var entriesContainer = domQuery('.dg-palette-entries', this._container),
			entries = this._entries = this.getEntries();
		domClear(entriesContainer);
		forEach(entries, function (entry, id) {
			var grouping = entry.group || 'default';

			var container = domQuery('[data-group=' + grouping + ']', entriesContainer);
			if (!container) {
				container = domify('<div class="group" data-group="' + grouping + '"></div>')
				entriesContainer.appendChild(container)
			}
			// 插入类型
			var html = entry.html || (
				entry.separator ?
				'<hr class="separator" />' :
				'<div class="entry" draggable="true"></div>');
			var control = domify(html);
			container.appendChild(control);
			if (!entry.separator) {
				domAttr(control, 'data-action', id);
				if (entry.title) {
					domAttr(control, 'title', entry.title);
				}
				if (entry.className) {
					addClasses(control, entry.className);
				}
				if (entry.imageUrl) {
					control.appendChild(domify('<img src="' + entry.imageUrl + '">'));
				}
			}
		})
	}
	getEntries = () => {
		var self = this
		function createListener(type) {
			eventBus.fire('task.create')
			return function (event) {
				self.createShape(assign({
					type
				}))
			}
		}
		var entries = {
      // 开始节点
			'create.start-event': {
				group: 'activity',
				className: 'iconfont icon-kaishi end',
				title: '开始',
				action: {
					dragstart: createListener('StartEvent'),
					click: createListener('StartEvent')
				}
      },
      // 结束节点
			'create.end-event': {
				group: 'activity',
				className: 'iconfont icon-jieshu end',
				title: '结束',
				action: {
					dragstart: createListener('EndEvent'),
					click: createListener('EndEvent')
				}
      },
      // 互斥网关
			'create.exclusive-gateway': {
				group: 'activity',
				className: 'bpmn-icon-gateway-xor green',
				title: '互斥网关',
				action: {
					dragstart: createListener('ExclusiveGateway'),
					click: createListener('ExclusiveGateway')
				}
      },
      // 并行网关
			'create.parallel-gateway': {
				group: 'activity',
				className: 'bpmn-icon-gateway-parallel green',
				title: '并行网关',
				action: {
					dragstart: createListener('ParallelGateway'),
					click: createListener('ParallelGateway')
				}
      },
      // 流程审批
			'create.approvalNode': {
				group: 'activity',
				className: 'iconfont iconshenpi approval',
				title: '流程审批',
				action: {
					dragstart: createListener('approvalNode'),
					click: createListener('approvalNode')
				}
      },
      // 添加子节点
      'create.addChildNode': {
				group: 'activity',
				className: 'iconfont icontianjiazijiedian childNode',
				title: '添加子节点',
				action: {
					dragstart: createListener('addChildNode'),
					click: createListener('addChildNode')
				}
      },
      // 发送邮件
      'create.sendEmail': {
				group: 'activity',
				className: 'iconfont iconjiedianyoujian email',
				title: '发送邮件',
				action: {
					dragstart: createListener('sendEmail'),
					click: createListener('sendEmail')
				}
      },
		};
		return entries;
	}

	createShape = (options) => {
		this.createContainer(type, childrenGfx, parentIndex, isFrame)
		var size = this._getDefaultSize(type);
		if (/Gateway$/.test(type)) {

		}
		if ((/Event$/i).test(type)) {
			drawCircle(size)
		} else {

		}
	}
	_getDefaultSize = (type) => {
		var size = {
			width: 80,
			height: 80
		}
		if (/Gateway$/.test(type)) {
			return {
				width: 50,
				height: 50
			}
		}
		if ((/Event$/i).test(type)) {
			return {
				width: 36,
				height: 36
			}
		}
		return size
	}
}

function drawCircle(parentGfx, size) {
	var cx = size.width / 2,
		cy = size.height / 2;
	var attrs = {
		stroke: 'black',
		strokeWidth: 2,
		fill: 'white'
	}
	var circle = svgCreate('circle');
	svgAttr(circle, {
		cx: cx,
		cy: cy,
		r: Math.round((size.width + size.height) / 4)
	});
	svgAttr(circle, attrs);

	svgAppend(parentGfx, circle);

	return circle;
}

function addClasses(element, classNames) {
	var classes = domClasses(element);

	var actualClassNames = isArray(classNames) ? classNames : classNames.split(/\s+/g);
	actualClassNames.forEach(cls => {
		classes.add(cls)
	})
}