/* eslint-disable */
import inherits from 'inherits';

import BaseRenderer from './../../diagram-js/lib/draw/BaseRenderer';

import {
	componentsToPath,
	createLine
} from './../../diagram-js/lib/util/RenderUtil';

import {
	append as svgAppend,
	attr as svgAttr,
	create as svgCreate
} from 'tiny-svg';
import {
	getBusinessObject
} from '../../bpmn-js/lib/util/ModelUtil';

import {
	getFillColor,
	getStrokeColor
} from './../../bpmn-js/lib/draw/BpmnRenderUtil';

/**
 * A renderer that knows how to render custom elements.
 */
export default function CustomRenderer(config, eventBus, styles, bpmnRenderer, customPathMap) {

	BaseRenderer.call(this, eventBus, 1500);
	var defaultFillColor = config && config.defaultFillColor,
		defaultStrokeColor = '#405265';
	var computeStyle = styles.computeStyle;
	this.bpmnRenderer = bpmnRenderer;
  // 开始节点
	this.drawStartPath = function (p, element) {
		var pathData = customPathMap.getScaledPath('START', {
			xScaleFactor: 0.9,
			yScaleFactor: 0.9,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: 0.235,
				my: 0.315
			}
		})
		var attrs;
		attrs = computeStyle(attrs, {
			fill: getFillColor(element, '#FFFFFF'),
			stroke: getStrokeColor(element, defaultStrokeColor),
			strokeWidth: 2,
			transform: 'translate(2.5,33) scale(0.03, -0.03)',
		});
		var polygon = drawPath(p, element, pathData, attrs)
		return polygon;
  }
  // 结束节点
	this.drawEndPath = function (p, element) {
		var pathData = customPathMap.getScaledPath('END', {
			xScaleFactor: 0.9,
			yScaleFactor: 0.9,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: 0.235,
				my: 0.315
			}
		})
		var attrs;
		attrs = computeStyle(attrs, {
			fill: getFillColor(element, '#FFFFFF'),
			stroke: getStrokeColor(element, defaultStrokeColor),
			strokeWidth: 2,
			transform: 'translate(2.5,33) scale(0.03, -0.03)',
		});
		var polygon = drawPath(p, element, pathData, attrs)

		return polygon;
  }
  // 分支节点
  this.drawBranchPath = function (p, element,color) {
		var pathData = customPathMap.getScaledPath('BRANCH', {
			xScaleFactor: 0.9,
			yScaleFactor: 0.9,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: 0.235,
				my: 0.315
			}
		})
		var attrs;
		attrs = computeStyle(attrs, {
			fill: getFillColor(element, '#fff'),
			stroke: getStrokeColor(element, color),
			strokeWidth: 2,
			transform: 'translate(14,57) scale(0.05, -0.05)',
		});
		var polygon = drawPath(p, element, pathData, attrs)

		return polygon;
  }
  // 聚合节点
  this.drawPolymerizationPath = function (p, element,color) {
		var pathData = customPathMap.getScaledPath('polymerization', {
			xScaleFactor: 0.9,
			yScaleFactor: 0.9,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: 0.235,
				my: 0.315
			}
		})
		var attrs;
		attrs = computeStyle(attrs, {
			fill: getFillColor(element, '#fff'),
			stroke: getStrokeColor(element, color),
			strokeWidth: 2,
			transform: 'translate(14,57) scale(0.05, -0.05)',
		});
		var polygon = drawPath(p, element, pathData, attrs)

		return polygon;
  }
  // 会签节点
  this.drawJointlySignNodePath = function (p, element,color) {
		var pathData = customPathMap.getScaledPath('jointlySign', {
			xScaleFactor: 0.9,
			yScaleFactor: 0.9,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: 0.235,
				my: 0.315
			}
		})
		var attrs;
		attrs = computeStyle(attrs, {
			fill: getFillColor(element, '#fff'),
			stroke: getStrokeColor(element, color),
			strokeWidth: 2,
			transform: 'translate(14,57) scale(0.05, -0.05)',
		});
		var polygon = drawPath(p, element, pathData, attrs)

		return polygon;
  }
  // 固定人节点
  this.drawFixedPersonNodePath = function (p, element,color) {
		var pathData = customPathMap.getScaledPath('fixedPerson', {
			xScaleFactor: 0.9,
			yScaleFactor: 0.9,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: 0.235,
				my: 0.315
			}
		})
		var attrs;
		attrs = computeStyle(attrs, {
			fill: getFillColor(element, '#fff'),
			stroke: getStrokeColor(element, color),
			strokeWidth: 2,
			transform: 'translate(14,57) scale(0.05, -0.05)',
		});
		var polygon = drawPath(p, element, pathData, attrs)

		return polygon;
  }
  // 候选节点
  this.drawCandidateNodePath = function (p, element,color) {
		var pathData = customPathMap.getScaledPath('candidate', {
			xScaleFactor: 0.9,
			yScaleFactor: 0.9,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: 0.235,
				my: 0.315
			}
		})
		var attrs;
		attrs = computeStyle(attrs, {
			fill: getFillColor(element, '#fff'),
			stroke: getStrokeColor(element, color),
			strokeWidth: 2,
			transform: 'translate(14,57) scale(0.05, -0.05)',
		});
		var polygon = drawPath(p, element, pathData, attrs)

		return polygon;
  }
	function drawRect(parentGfx, width, height, r, offset, attrs) {

		attrs = computeStyle(attrs, {
			fill: getFillColor(element, defaultFillColor),
			stroke: getStrokeColor(element, defaultStrokeColor),
			strokeWidth: 5,
		});

		var rect = svgCreate('rect');
		svgAttr(rect, {
			x: 0,
			y: 0,
			width: width,
			height: height,
			rx: r,
			ry: r
		});
		svgAttr(rect, attrs);

		svgAppend(parentGfx, rect);

		return rect;
	}

	function drawPath(parentGfx,element, d, attrs) {

		attrs = computeStyle(attrs,{
			strokeWidth: 2,
			fill: getFillColor(element, '#fff'),
			stroke: getStrokeColor(element, '#405265'),
		});
		var path = svgCreate('path');
		svgAttr(path, {
			d: d
		});
		svgAttr(path, attrs);

		svgAppend(parentGfx, path);

		return path;
	}
}
inherits(CustomRenderer, BaseRenderer);
CustomRenderer.$inject = ['config', 'eventBus', 'styles', 'bpmnRenderer', 'customPathMap'];
CustomRenderer.prototype.canRender = function (element) {
	return !element.labelTarget;
};
const CUSTOM_STROKE_COLOR = {
	'branchNode': '#8E95F9',
  'polymerizationNode': '#E6A23C',
  'jointlySignNode': '#3B96D9',
  'fixedPersonNode': '#F56C6C',
  'candidateNode': '#C23AA5'
}
CustomRenderer.prototype.drawShape = function (p, element) {
	var shape; 
	var customId = this.getCustomId(element);
	shape = this.bpmnRenderer.drawShape(p, element,CUSTOM_STROKE_COLOR[customId]);
  // 开始节点
	if(element.type === 'bpmn:StartEvent') {
		this.drawStartPath(p, element, 'START');
  }
  // 结束节点
	if(element.type === 'bpmn:EndEvent') {
		this.drawEndPath(p, element, 'END');
  }
  // 分支节点branchNode
  if (customId === 'branchNode') {
		this.drawBranchPath(p, element,CUSTOM_STROKE_COLOR[customId]);
  }
  // 聚合节点polymerizationNode
  if (customId === 'polymerizationNode') {
		this.drawPolymerizationPath(p, element,CUSTOM_STROKE_COLOR[customId]);
  }
  // 会签节点jointlySignNode
  if (customId === 'jointlySignNode') {
		this.drawJointlySignNodePath(p, element,CUSTOM_STROKE_COLOR[customId]);
  }
  // 固定人节点fixedPersonNode
  if (customId === 'fixedPersonNode') {
		this.drawFixedPersonNodePath(p, element,CUSTOM_STROKE_COLOR[customId]);
  }
  // 候选节点candidateNode
  if (customId === 'candidateNode') {
		this.drawCandidateNodePath(p, element,CUSTOM_STROKE_COLOR[customId]);
  }
	return shape
};
CustomRenderer.prototype.getShapePath = function (shape) {
	var type = shape.type;
	if (type === 'custom:triangle') {
		return this.getTrianglePath(shape);
	}
	if (type === 'custom:circle') {
		return this.getCirclePath(shape);
	}
};
CustomRenderer.prototype.drawConnection = function (p, element) {
	var type = element.type;
	if (type === 'custom:connection') {
		return this.drawCustomConnection(p, element);
	}
};
CustomRenderer.prototype.getConnectionPath = function (connection) {
	var type = connection.type;
	if (type === 'custom:connection') {
		return this.getCustomConnectionPath(connection);
	}
};
CustomRenderer.prototype.getCustomId = function (element) {
	const businessObject = getBusinessObject(element);
	const {id} = businessObject
	return id.split('_')[1]
}
