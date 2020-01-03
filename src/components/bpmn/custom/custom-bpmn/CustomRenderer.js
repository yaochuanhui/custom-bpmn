/* eslint-disable */
import inherits from 'inherits';
import BaseRenderer from './../../diagram-js/lib/draw/BaseRenderer';
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
import dataSource from './dataSource';
/**
 * A renderer that knows how to render custom elements.
 */
export default function CustomRenderer(config, eventBus, styles, bpmnRenderer, customPathMap) {
	BaseRenderer.call(this, eventBus, 1500);
	var defaultStrokeColor = '#405265';
	var computeStyle = styles.computeStyle;
  this.bpmnRenderer = bpmnRenderer;
  // 画节点
  this.drawCustomPath = function(p, element, item) {
    var pathData = customPathMap.getScaledPath(item.nodeName, {
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
			strokeWidth: 2
    });
    if (item.type === 'ServiceTask') {
      attrs.transform = 'translate(14,57) scale(0.05, -0.05)';
    } else if (item.type === 'EndEvent' || item.type === 'StartEvent') {
      attrs.transform = 'translate(2.5,33) scale(0.03, -0.03)';
    } else if (item.type === 'ExclusiveGateway') {
      attrs.transform = 'translate(10,36) scale(0.03, -0.03)';
    } else {
      attrs.transform = 'translate(14,57) scale(0.05, -0.05)';
    }
		var polygon = drawPath(p, element, pathData, attrs)
		return polygon;
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
let toolData = dataSource.toolData;
CustomRenderer.prototype.drawShape = function (p, element) {
	var shape; 
	var customId = this.getCustomId(element);
  shape = this.bpmnRenderer.drawShape(p, element,'#8F99AA');
  toolData.forEach(item => {
    if (customId === item.nodeName) {
      this.drawCustomPath(p, element, item);
    }
  });
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
