/* eslint-disable */
// 复选框
'use strict';
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import {
  is,
  getBusinessObject
} from './../../../bpmn-js/lib/util/ModelUtil';
export default function(group, element, translate) {
  var bo = getBusinessObject(element);
  if (!bo) {
    return;
  }
  if (is(element, 'bpmn:ServiceTask')) {
    var executableEntry = entryFactory.checkbox({
      id: 'testCheckBox',
      label: '测试新增',
      modelProperty: 'camunda:testCheckBox'
    });
    group.entries.push(executableEntry);
  }
};