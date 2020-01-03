/* eslint-disable */
'use strict';
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import {
  is,
  getBusinessObject
} from './../../../bpmn-js/lib/util/ModelUtil';
import cmdHelper from './CmdHelper';
export default function(group, element, translate, options) {
  if (is(element, 'bpmn:ServiceTask')) {
    // 自定义输入框textBox
    group.entries.push(entryFactory.textBox({
      id: 'testInput',
      label: '测试新增输入框',
      modelProperty: 'camunda:testInput',
      getProperty: function(element) {
        return getBusinessObject(element).modelProperty;
      },
      setProperty: function(element, properties) {
        element = element.labelTarget || element;
        return cmdHelper.updateProperties(element, properties);
      }
    }));
  }
};