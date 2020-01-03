/* eslint-disable */
import inherits from 'inherits';
import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';
// 节点ID
// import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps';
// 节点名称
import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps';
// 自定义属性
// 自定义下拉
import serviceTaskDelegateProps from './components/serviceTaskDelegateProps';
// 自定义输入框
import testInput from './components/testInput';
// 自定义复选框
import checkBox from './components/checkBox';
// 自定义扩展属性
import extensionProps from './components/extensionProps';
// 第一个tab页属性
function createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate) {
  // 基本信息属性
	var generalGroup = {
		id: 'general',
		label: '基本信息',
		entries: []
	};
  nameProps(generalGroup, element, bpmnFactory, canvas, translate);
  // 详细信息属性
	var detailsGroup = {
		id: 'details',
		label: '详细信息',
		entries: []
  };
  // 服务任务
  // 自定义输入框
  testInput(detailsGroup, element, bpmnFactory, translate);
  // 自定义复选框
  checkBox(detailsGroup, element, translate);
  // 自定义下拉框
  serviceTaskDelegateProps(detailsGroup, element, bpmnFactory, translate);
	return [
		generalGroup,
		detailsGroup
	];
}
// 第二个tab页属性
function createExtensionElementsGroups(element, bpmnFactory, elementRegistry, translate) {
	var propertiesGroup = {
		id: 'extensionElements-properties',
		label: '属性',
		entries: []
	};
	extensionProps(propertiesGroup, element,bpmnFactory);
	return [
		propertiesGroup
	];
}
// 自定义tab页——页面所展示最终的属性
export default function CustomPropertiesProvider(eventBus, bpmnFactory, canvas, elementRegistry, translate) {
	PropertiesActivator.call(this, eventBus);
	this.getTabs = function (element) {
		var generalTab = {
			id: 'general',
			label: '基本信息',
			groups: createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate)
		};
		var extensionsTab = {
			id: 'extensionElements',
			label: '扩展测试',
			groups: createExtensionElementsGroups(element, bpmnFactory, elementRegistry, translate)
		};
		return [
			generalTab,
			extensionsTab
		];
	};
}
inherits(CustomPropertiesProvider, PropertiesActivator)