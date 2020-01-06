/* eslint-disable */
'use strict';
import Vue from 'vue';
var domify = require('min-dom').domify;
var getBusinessObject = require('../../bpmn-js/lib/util/ModelUtil').getBusinessObject;
var is = require('../../bpmn-js/lib/util/ModelUtil').is;
import TaskModal from './components/taskModal';
/**
 * A properties panel implementation.
 *
 * To use it provide a `propertiesProvider` component that knows
 * about which properties to display.
 *
 * Properties edit state / visibility can be intercepted
 * via a custom {@link PropertiesActivator}.
 *
 * @class
 * @constructor
 *
 * @param {Object} config
 * @param {EventBus} eventBus
 * @param {Modeling} modeling
 * @param {PropertiesProvider} propertiesProvider
 * @param {Canvas} canvas
 * @param {CommandStack} commandStack
 */
export default function PropertiesPanel(config, eventBus, modeling,bpmnFactory, commandStack, canvas) {
	this._eventBus = eventBus;
	this._modeling = modeling;
	this._commandStack = commandStack;
	this._canvas = canvas;
	this._bpmnFactory = bpmnFactory
	this.createModal();
	this._init(config);
}
PropertiesPanel.$inject = [
	'config.propertiesPanel',
	'eventBus',
	'modeling',
	'bpmnFactory',
	'commandStack',
	'canvas'
];
PropertiesPanel.prototype.createModal = function () {
	let self = this
	var parent = document.createElement('div');
	document.body.appendChild(parent)
	// 任务弹框
	var taskModalContainer = domify('<div class="task-modal" id="task-modal"></div>');
	parent.appendChild(taskModalContainer)
	let TaskModalCom = (this.TaskModalCom = new Vue({
		el: taskModalContainer,
		components: {
			TaskModal
		},
		data: {
			show: false,
			data: {
				extensionData:[]
			},
		},
		methods: {
			close() {
				this.show = false
				self._commandStack.execute("element.updateLabel", {
					element: self.element,
					newLabel: self.element.businessObject.name
				});
			},
			okFunc(data) {
        var bpmnFactory = self._bpmnFactory
				var element = self.element
        var bo = element.businessObject;
        bo.set('name', data.name)
        // 自定义单选框属性
        // if(data.checkList) {
        //   bo.set('camunda:checkList', data.checkList)
        //   bo['camunda:checkList'] = data.checkList
        // }
        // 自定义扩展属性
        if(bo.extensionElements && bo.extensionElements.values) {
					bo.extensionElements.values = []
        } else {
					var extensionDataProp = (function () {
						var el = bpmnFactory.create('bpmn:ExtensionElements', {values:[]})
						el.$parent = bo;
						return el
          })()
          bo.set('extensionElements', extensionDataProp)
          bo['extensionElements'] = extensionDataProp
        }
        var Properties = (function () {
          var el = bpmnFactory.create('camunda:Properties', {values:[]})
          el.$parent = bo.extensionElements;
          return el
        })()
        bo.extensionElements.values.push(Properties)
        for (let key in data) {
          if (key !== 'name') {
            data[key] = JSON.stringify(data[key]);
            var propertyProps = {};
            propertyProps.name = key;
            propertyProps.value = data[key];
            var Property = (function () {
              var el = bpmnFactory.create('camunda:Property', propertyProps)
              el.$parent = Properties;
              return el
            })()
            Properties.values.push(Property)
          }
        }
				self._commandStack.execute("element.updateLabel", {
					element: self.element,
					newLabel: self.element.businessObject.name
        });
				this.show = false
			}
		},
		mounted() {},
		template: `<task-modal :show="show" :data="data" @handleOk="okFunc" @handleCancel="close" />`
	}))
}
PropertiesPanel.prototype._init = function (config) {
	var canvas = this._canvas,
		eventBus = this._eventBus;
	var self = this;
	/**
	 * Select the root element once it is added to the canvas
	 */
	// eventBus.on('root.added', function (e) {
	// 	var element = e.element;
	// 	if (isImplicitRoot(element)) {
	// 		return;
	// 	}

	// 	self.update(element);
	// });

	//   eventBus.on('selection.changed', function(e) {
	//     var newElement = e.newSelection[0];
	//     var rootElement = canvas.getRootElement();

	//     if (isImplicitRoot(rootElement)) {
	//       return;
	//     }

	//     self.update(newElement);
	//   });
	eventBus.on('element.dblclick', function (e) {
		var newElement = self.element = e.element;
    let nodeType;
		if (is(newElement, "bpmn:Process")) {
      nodeType = 'Process';
		}
		if(is(newElement,"bpmn:ServiceTask")) {
      nodeType = 'ServiceTask';
    }
    var element = getBusinessObject(newElement)
    let extensionData = [];
    let dataObj = {extensionData, name: element.name};
    if(element.extensionElements && element.extensionElements.values.length > 0) {
      var value = element.extensionElements.values[0].values
      value.forEach(item => {
        dataObj[item.name] = JSON.parse(item.value);
      })
    }
    dataObj.nodeType = nodeType;
    self.TaskModalCom.data = dataObj
    self.TaskModalCom.show = true
	});
	// eventBus.on('element.click', function (e) {
	// 	var newElement = e.element;
	// 	var rootElement = canvas.getRootElement();

	// 	if (isImplicitRoot(rootElement)) {
	// 		return;
	// 	}

	// 	self.update(newElement, true);
	// });
};
function isImplicitRoot(element) {
	return element.id === '__implicitroot';
}
// 获取或创建扩展标签
// function getOrCreateExtensionElement(element, bpmnFactory) {
// 	var bo = getBusinessObject(element)
// 	if(!bo.extensionElements) {
// 		var ee = bpmnFactory.create("bpmn:ExtensionElements", {
// 			values: []
// 		})
// 		bo.extensionElements = ee;
// 	}
// 	return bo.extensionElements
// }