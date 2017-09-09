/* 
 * System Designer
 * 
 * https://designfirst.io/systemdesigner/
 *
 * Copyright 2017 Erwan Carriou
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 runtime.install(
{
	"name": "designer-runtime",
	"master": false,
	"version": "1.0.0",
	"description": "System Designer Runtime",
	"schemas": {
		"12fa8181ce127a0": {
			"_id": "12fa8181ce127a0",
			"_name": "_Storage",
			"_inherit": [
				"_Component"
			],
			"_core": true,
			"store": "property",
			"get": "method",
			"set": "method",
			"remove": "method",
			"clear": "method",
			"changed": "event"
		},
		"1723516a30132ac": {
			"_name": "_Database",
			"_inherit": [
				"_Component"
			],
			"_core": true,
			"insert": "event",
			"update": "event",
			"remove": "event",
			"_id": "1723516a30132ac"
		},
		"10374180581a41f": {
			"_id": "10374180581a41f",
			"_name": "_Admin",
			"_inherit": [
				"_Component"
			],
			"_core": true,
			"designerWindow": "property"
		},
		"104ad1f48518376": {
			"_id": "104ad1f48518376",
			"_name": "_Channel",
			"_core": true,
			"$editorUpdateSystem": "event",
			"$editorUpdateSchema": "event",
			"$editorUpdateSchemaId": "event",
			"$editorUpdateSchemaName": "event",
			"$editorUpdateModel": "event",
			"$editorUpdateModelId": "event",
			"$editorUpdateType": "event",
			"$editorDeleteType": "event",
			"$editorUpdateBehavior": "event",
			"$editorDeleteBehavior": "event",
			"$editorUpdateComponent": "event",
			"$editorUpdateComponentId": "event",
			"$editorDeleteComponent": "event",
			"$appLogDebug": "event",
			"$appLogInfo": "event",
			"$appLogWarn": "event",
			"$appLogError": "event",
			"$appLoadSystem": "event",
			"$designerSync": "event",
			"$designerCreateBehavior": "event",
			"$designerCreateComponent": "event",
			"$designerCreateType": "event",
			"$designerCreateSchema": "event",
			"$designerCreateModel": "event",
			"$designerDeleteSchema": "event",
			"$designerDeleteModel": "event",
			"$designerDeleteType": "event",
			"$designerDeleteBehavior": "event",
			"$designerDeleteComponent": "event",
			"$designerUpdateComponent": "event",
			"$designerUpdateModel": "event",
			"$designerUpdateBehavior": "event",
			"$designerSetSystem": "event",
			"$runtimeCreateComponent": "event",
			"$runtimeDeleteComponent": "event",
			"$runtimeUpdateComponent": "event",
			"send": "event",
			"_inherit": [
				"_Component"
			]
		},
		"1268f1dddd1fea7": {
			"_name": "_Logger",
			"_core": true,
			"level": "property",
			"debug": "method",
			"info": "method",
			"warn": "method",
			"error": "method",
			"_id": "1268f1dddd1fea7"
		}
	},
	"behaviors": {
		"1ca0f1020412d4f": {
			"_id": "1ca0f1020412d4f",
			"component": "_Storage",
			"state": "get",
			"action": "function get(key) {\n  var result = null;\n\n  if (typeof this.store()[key]) {\n    result = this.store()[key];\n  }\n  return result;\n}",
			"useCoreAPI": false,
			"core": true
		},
		"16764100d51b5f8": {
			"_id": "16764100d51b5f8",
			"component": "_Storage",
			"state": "set",
			"action": "function set(key, value) {\n  var store = this.store(),\n    item = {};\n\n  store[key] = value;\n  this.store(store);\n\n  item[key] = JSON.stringify(value);\n\n  try {\n    switch (true) {\n      case typeof localStorage !== 'undefined':\n        localStorage.setItem(key, JSON.stringify(value));\n        break;\n      default:\n        break;\n    }\n  } catch (e) { }\n}",
			"useCoreAPI": false,
			"core": true
		},
		"134b616b1016f60": {
			"_id": "134b616b1016f60",
			"component": "_Storage",
			"state": "clear",
			"action": "function clear() {\n  this.store({});\n  try {\n    switch (true) {\n      case typeof localStorage !== 'undefined':\n        localStorage.clear();\n        break;\n      default:\n        break;\n    }\n  } catch (e) { }\n}",
			"useCoreAPI": false,
			"core": true
		},
		"14c7f1a8431b3d5": {
			"_id": "14c7f1a8431b3d5",
			"component": "_Storage",
			"state": "init",
			"action": "function init(conf) {\n  try {\n    switch (true) {\n      case typeof localStorage !== 'undefined':\n        // init \n        var keys = Object.keys(localStorage),\n          store = {},\n          i = 0,\n          length = 0;\n\n        length = keys.length;\n        for (i = 0; i < length; i++) {\n          try {\n            store[keys[i]] = JSON.parse(localStorage[keys[i]]);\n          } catch (e) { }\n        }\n        this.store(store);\n\n        // event\n        window.addEventListener('storage', function (e) {\n          var obj = {},\n            store = this.store();\n\n          try {\n            store[e.key] = JSON.parse(e.newValue);\n            this.store(store);\n\n            obj[e.key] = {};\n            obj[e.key].oldValue = JSON.parse(e.oldValue);\n            obj[e.key].newValue = JSON.parse(e.newValue);\n\n            this.changed(obj);\n          } catch (e) { }\n        }.bind(this));\n        break;\n      default:\n        break;\n    }\n  } catch (e) { }\n}",
			"useCoreAPI": false,
			"core": true
		},
		"1a4921ac7112bd4": {
			"_id": "1a4921ac7112bd4",
			"component": "_Storage",
			"state": "remove",
			"action": "function remove(key) {\n  var store = this.store();\n\n  delete store[key];\n  this.store(store);\n\n  try {\n    switch (true) {\n      case typeof localStorage !== 'undefined':\n        localStorage.removeItem(key);\n        break;\n      default:\n        break;\n    }\n  } catch (e) { }\n}",
			"useCoreAPI": false,
			"core": true
		},
		"g198c91f8601d02f": {
			"_id": "g198c91f8601d02f",
			"component": "channel",
			"state": "send",
			"action": "function send(message) { \n  if (this.require('admin').designerWindow()) {\n    this.require('admin').designerWindow().postMessage(JSON.stringify(message), '*');\n  }\n}",
			"useCoreAPI": false,
			"core": true
		},
		"h1b3891699319be4": {
			"_id": "h1b3891699319be4",
			"component": "channel",
			"state": "$designerCreateSchema",
			"action": "function $designerCreateSchema(id, schema) { \n  this.require('logger').level('warn');\n  this.require('metamodel').schema(schema);\n  this.require('metamodel').create();\n  this.require('logger').level('debug');\t\n}",
			"useCoreAPI": false,
			"core": true
		},
		"w161ae196d51f585": {
			"_id": "w161ae196d51f585",
			"component": "channel",
			"state": "$editorUpdateSchema",
			"action": "function $editorUpdateSchema(id, schema) { \n  this.require('logger').level('warn');\n  this.require('metamodel').schema(schema);\n  this.require('metamodel').create();\n  this.require('logger').level('debug');\t\n}",
			"useCoreAPI": false,
			"core": true
		},
		"x12449136a811be2": {
			"_id": "x12449136a811be2",
			"component": "channel",
			"state": "$designerDeleteSchema",
			"action": "function $designerDeleteSchema(id) { \n  this.require('logger').level('warn');\n  var search = $db._Schema.find({ '_id': id }),\n    modelName = '',\n    modelId = '';\n  \n  if (search.length) {\n    modelName = search[0]._name;\n    $db._Schema.remove({ '_id': id });\n  \n    search = $db._Model.find({ '_name': modelName });\n    if (search.length) {\n      modelId = search[0]._id;\n      $db._Model.remove({ '_id': modelId });\n      $component.removeFromMemory(modelName);\n    }\n  \n    search = $db._GeneratedModel.find({ '_name': modelName });\n    if (search.length) {\n      modelId = search[0]._id;\n      $db._GeneratedModel.remove({ '_id': modelId });\n      $component.removeFromMemory(modelName);\n    }\n    this.require('metamodel').create();\n  }\n  this.require('logger').level('debug');\t\n}",
			"useCoreAPI": true,
			"core": true
		},
		"h103b01d9591bbb4": {
			"_id": "h103b01d9591bbb4",
			"component": "channel",
			"state": "$designerCreateModel",
			"action": "function $designerCreateModel(id, model) { \n  this.require('logger').level('warn');\n  this.require('metamodel').model(model);\n  this.require('metamodel').create();\n  this.require('logger').level('debug');\t\n}",
			"useCoreAPI": false,
			"core": true
		},
		"r12c4e1d6cf1cf0e": {
			"_id": "r12c4e1d6cf1cf0e",
			"component": "channel",
			"state": "$editorUpdateModel",
			"action": "function $editorUpdateModel(id, model) { \n  this.require('logger').level('warn');\n  this.require('metamodel').model(model);\n  this.require('metamodel').create();\n  this.require('logger').level('debug');\t\n}",
			"useCoreAPI": false,
			"core": true
		},
		"x1eb4c1d03b1ee34": {
			"_id": "x1eb4c1d03b1ee34",
			"component": "channel",
			"state": "$designerUpdateModel",
			"action": "function $designerUpdateModel(id, model) { \n  this.require('logger').level('warn');\n  this.require('metamodel').model(model);\n  this.require('metamodel').create();\n  this.require('logger').level('debug');\t\n}",
			"useCoreAPI": false,
			"core": true
		},
		"w1c68e1c7aa19326": {
			"_id": "w1c68e1c7aa19326",
			"component": "channel",
			"state": "$designerDeleteModel",
			"action": "function $designerDeleteModel(id) { \n  this.require('logger').level('warn');\n  var search = $db._Model.find({ '_id': id }),\n    modelName = '',\n    modelId = '';\n  \n  if (search.length) {\n    modelName = search[0]._name;\n    $db._Model.remove({ '_id': id });\n    $component.removeFromMemory(modelName);\n  }\n  \n  search = $db._GeneratedModel.find({ '_name': modelName });\n  if (search.length) {\n    modelId = search[0]._id;\n    $db._GeneratedModel.remove({ '_id': modelId });\n    $component.removeFromMemory(modelName);\n  }\n  this.require('metamodel').create();\n  this.require('logger').level('debug');\t\n}",
			"useCoreAPI": true,
			"core": true
		},
		"x1f6bc11b3816de0": {
			"_id": "x1f6bc11b3816de0",
			"component": "channel",
			"state": "$designerCreateType",
			"action": "function $designerCreateType(id, type) { \n  this.require('logger').level('warn');\n  this.require('metamodel').type(type);\n  this.require('metamodel').create();\n  this.require('logger').level('debug');\t\n}",
			"useCoreAPI": false,
			"core": true
		},
		"m1ff4f11d19164c0": {
			"_id": "m1ff4f11d19164c0",
			"component": "channel",
			"state": "$editorUpdateType",
			"action": "function $editorUpdateType(id, type) { \n  this.require('logger').level('warn');\n  this.require('metamodel').type(type);\n  this.require('metamodel').create();\n  this.require('logger').level('debug');\t\n}",
			"useCoreAPI": false,
			"core": true
		},
		"u1e8bd17bdc15d6a": {
			"_id": "u1e8bd17bdc15d6a",
			"component": "channel",
			"state": "$editorDeleteType",
			"action": "function $editorDeleteType(id) { \n  this.require('logger').level('warn');\n  $db._Type.remove({ 'name': id });\n  this.require('metamodel').create();\n  this.require('logger').level('debug');\t\n}",
			"useCoreAPI": true,
			"core": true
		},
		"k18a311f76f1ff2a": {
			"_id": "k18a311f76f1ff2a",
			"component": "channel",
			"state": "$designerDeleteType",
			"action": "function $designerDeleteType(param) { \n  this.require('logger').level('warn');\n  $db._Type.remove({ 'name': id });\n  this.require('metamodel').create();\n  this.require('logger').level('debug');\t\n}",
			"useCoreAPI": true,
			"core": true
		},
		"i1fe2e1f8fe1f3b7": {
			"_id": "i1fe2e1f8fe1f3b7",
			"component": "channel",
			"state": "$designerCreateComponent",
			"action": "function $designerCreateComponent(collection, component) { \n  $db[collection].insert(component);\t\n}",
			"useCoreAPI": true,
			"core": true
		},
		"e1cc381f58818dd4": {
			"_id": "e1cc381f58818dd4",
			"component": "channel",
			"state": "$editorUpdateComponent",
			"action": "function $editorUpdateComponent(id, collection, component) { \n  $db[collection].update({ '_id': id }, component, { 'upsert': true });\t\n}",
			"useCoreAPI": true,
			"core": true
		},
		"r18f80173fe19997": {
			"_id": "r18f80173fe19997",
			"component": "channel",
			"state": "$editorUpdateComponent",
			"action": "function $editorUpdateComponent(id, collection, component) { \n  $db[collection].update({ '_id': id }, component, { 'upsert': true });\t\n}",
			"useCoreAPI": true,
			"core": true
		},
		"o1ed5a1768c181b2": {
			"_id": "o1ed5a1768c181b2",
			"component": "channel",
			"state": "$editorDeleteComponent",
			"action": "function $editorDeleteComponent(id, collection) { \n  $db[collection].remove({ '_id': id });\t\n}",
			"useCoreAPI": true,
			"core": true
		},
		"t18fe213b0718b38": {
			"_id": "t18fe213b0718b38",
			"component": "channel",
			"state": "$designerDeleteComponent",
			"action": "function $designerDeleteComponent(id, collection) { \n  $db[collection].remove({ '_id': id });\t\n}",
			"useCoreAPI": true,
			"core": true
		},
		"p1524e1d2c414a17": {
			"_id": "p1524e1d2c414a17",
			"component": "channel",
			"state": "$designerCreateBehavior",
			"action": "function $designerCreateBehavior(behavior) { \n  $db._Behavior.insert(component);\t\n}",
			"useCoreAPI": true,
			"core": true
		},
		"m154451abb8103f1": {
			"_id": "m154451abb8103f1",
			"component": "channel",
			"state": "$editorUpdateBehavior",
			"action": "function $editorUpdateBehavior(id, behavior) { \n  if (this.require(id)) {\n    this.require(id).action(behavior.action);\n    if (behavior.state === 'start') {\n      this.require(behavior.component).start();\n    }\n  }\t\n}",
			"useCoreAPI": false,
			"core": true
		},
		"i11b6f197d216fec": {
			"_id": "i11b6f197d216fec",
			"component": "channel",
			"state": "$editorUpdateBehavior",
			"action": "function $editorUpdateBehavior(id, behavior) { \n  if (this.require(id)) {\n    this.require(id).action(behavior.action);\n    if (behavior.state === 'start') {\n      this.require(behavior.component).start();\n    }\n  }\t\n}",
			"useCoreAPI": false,
			"core": true
		},
		"q131b819d531053f": {
			"_id": "q131b819d531053f",
			"component": "channel",
			"state": "$editorDeleteBehavior",
			"action": "function $editorDeleteBehavior(id) { \n  $db._Behavior.remove({ '_id': id });\t\n}",
			"useCoreAPI": true,
			"core": true
		},
		"h1214316cb61ea28": {
			"_id": "h1214316cb61ea28",
			"component": "channel",
			"state": "$designerDeleteBehavior",
			"action": "function $designerDeleteBehavior(id) { \n  $db._Behavior.remove({ '_id': id });\t\n}",
			"useCoreAPI": true,
			"core": true
		},
		"h109eb1b4ed148fd": {
			"_id": "h109eb1b4ed148fd",
			"component": "channel",
			"state": "$designerSync",
			"action": "function $designerSync() { \n  var designerWindow = this.require('admin').designerWindow(),\n      system = null;\n\n  this.require('admin').designerWindow(null);\n  system = JSON.parse($db.exportSystem());\n  designerWindow = this.require('admin').designerWindow(designerWindow);\n\n  this.$appLoadSystem(system);\t\n}",
			"useCoreAPI": true,
			"core": true
		},
		"w1a9961205712671": {
			"_id": "w1a9961205712671",
			"component": "db",
			"state": "insert",
			"action": "function insert(event) { \n if (event.collection.indexOf('_') !== 0) {\n    this.require('channel').$runtimeCreateComponent(event.collection, event.document);\n  }\t\n}",
			"useCoreAPI": false,
			"core": true
		},
		"j122701697c19935": {
			"_id": "j122701697c19935",
			"component": "db",
			"state": "remove",
			"action": "function remove(event) { \n if (event.collection.indexOf('_') !== 0) {\n    this.require('channel').$runtimeDeleteComponent(event.id, event.collection);\n  }\t\n}",
			"useCoreAPI": false,
			"core": true
		},
		"t118f61f6d0127e4": {
			"_id": "t118f61f6d0127e4",
			"component": "db",
			"state": "update",
			"action": "function update(event) { \n  if (event.collection.indexOf('_') !== 0) {\n    this.require('channel').$runtimeUpdateComponent(event.id, event.collection, event.field, event.value);\n  }\t\n}",
			"useCoreAPI": false,
			"core": true
		},
		"s1486715d9315862": {
			"_id": "s1486715d9315862",
			"component": "channel",
			"state": "init",
			"action": "function init(conf) { \n  window.addEventListener('message', function message(event) {\n    var data = null;\n    try {\n      data = JSON.parse(event.data);\n      if (data &&\n        typeof data.event !== 'undefined' &&\n        typeof data.from !== 'undefined' &&\n        typeof data.data !== 'undefined') {\n          if (this.require('admin').designerWindow) {\n            this.require('admin').designerWindow(event.source);\n          }\n          $db._Message.insert(data);\n      }\n    } catch (e) {\n    }\n  }.bind(this), false);\t\n}",
			"useCoreAPI": true,
			"core": true
		},
		"e10ba11978d122c5": {
			"_id": "e10ba11978d122c5",
			"component": "admin",
			"state": "init",
			"action": "function init(conf) { \n  // for jquery compatibility in electron\n  if (typeof global !== 'undefined' && typeof window !== 'undefined') {\n    delete module;\n  }\n}",
			"useCoreAPI": false,
			"core": true
		},
		"i139a61d4aa1bea7": {
			"_id": "i139a61d4aa1bea7",
			"component": "logger",
			"state": "info",
			"action": "function info(message) { \n  if (this.level() === 'info' || this.level() === 'debug') {\n    var date = new Date(),\n      time = date.toTimeString(),\n      ms = date.getMilliseconds();\n\n    time = time.split(' ')[0].trim();\n    time = time.replace(':', 'h');\n    time = time.replace(':', 'm');\n    time = time.split('m')[0].trim();\n    time = time + ':' + ms;\n    \n    this.require('channel').$appLogInfo('[' + time + '] ' + message);\n  }\t\n}",
			"useCoreAPI": false,
			"core": true
		},
		"r1c1841a98e1bc15": {
			"_id": "r1c1841a98e1bc15",
			"component": "logger",
			"state": "debug",
			"action": "function debug(message) { \n  if (this.level() === 'debug') {\n    var date = new Date(),\n        time = date.toTimeString(),\n        ms = date.getMilliseconds();\n\n    time = time.split(' ')[0].trim();\n    time = time.replace(':', 'h');\n    time = time.replace(':', 'm');\n    time = time.split('m')[0].trim();\n    time = time + ':' + ms;\n    \n    this.require('channel').$appLogDebug('[' + time + '] ' + message);\n  }\t\n}",
			"useCoreAPI": false,
			"core": true
		},
		"m1d30414ed912a2a": {
			"_id": "m1d30414ed912a2a",
			"component": "logger",
			"state": "error",
			"action": "function error(message) { \n  var date = new Date(),\n      time = date.toTimeString(),\n      ms = date.getMilliseconds();\n\n  time = time.split(' ')[0].trim();\n  time = time.replace(':', 'h');\n  time = time.replace(':', 'm');\n  time = time.split('m')[0].trim();\n  time = time + ':' + ms;\n      \n  this.require('channel').$appLogError('[' + time + '] ' + message);\n}",
			"useCoreAPI": false,
			"core": true
		},
		"d1d19f1ae9a12118": {
			"_id": "d1d19f1ae9a12118",
			"component": "logger",
			"state": "warn",
			"action": "function warn(message) { \n  if (this.level() === 'info' || this.level() === 'warn' || this.level() === 'debug') {\n    var date = new Date(),\n        time = date.toTimeString(),\n        ms = date.getMilliseconds();\n\n      time = time.split(' ')[0].trim();\n      time = time.replace(':', 'h');\n      time = time.replace(':', 'm');\n      time = time.split('m')[0].trim();\n      time = time + ':' + ms;\n                \n    this.require('channel').$appLogWarn('[' + time + '] ' + message);\n  }\n}",
			"useCoreAPI": false,
			"core": true
		},
		"a172ce13a3e1e8ff": {
			"_id": "a172ce13a3e1e8ff",
			"component": "channel",
			"state": "$designerSetSystem",
			"action": "function $designerSetSystem(system) { \n  this.require('logger').level('info');\n\tthis.require('runtime').install(system);\n}",
			"useCoreAPI": false,
			"core": false
		},
		"f1c9d810bdf16d0f": {
			"_id": "f1c9d810bdf16d0f",
			"component": "16d0e138c8170b2",
			"state": "start",
			"action": "function start() { \n  var sysid = '',\n    system = '',\n    params = '',\n    systemID = '';\n            \n  if (typeof global !== 'undefined' && typeof window === 'undefined') {\n    global.require = require;\n  }\n\n  window.messages = []; // TODO find better way\n  window.lastPage = 'index.html'; // TODO find better way\n  \n  function _getParams() {\n    var result = {},\n        urlParams = [],\n        system = null;\n\n    urlParams = document.location.href.split('?');\n\n    if (urlParams.length > 1) {\n      urlParams = urlParams[1].split('&');\n      urlParams.forEach(function (urlParam) {\n        var name = '',\n            value = '';\n\n        name = urlParam.split('=')[0].trim();\n        value = urlParam.split('=')[1].trim();\n\n        result[name] = decodeURIComponent(value);\n      });\n    }\n    return result;\n  }\n\n  // case of cordova    \n  if (typeof cordova !== 'undefined') {\n    params = _getParams();\n    system = null;\n\n    if (Object.keys(params).length) {\n      system = JSON.parse(params.system);\n      this.require('storage').set(system._id, system);\n      lastPage = params.ref;\n    }\n\n    // add back button\n    setTimeout(function () {\n      if (!document.getElementById('system-designer-back')) {\n        var docFragment = null,\n            div = null,\n            a = null,\n            span = null;\n\n        docFragment = document.createDocumentFragment();\n        div = document.createElement('div');\n        div.setAttribute('id', 'system-designer-back');\n        div.setAttribute('style', 'top:5px;left:10px;position:absolute;font-size:18px;font-family:Helvetica,Arial,sans-serif;z-index:999999;background-color:white;');\n\n        a = document.createElement('a');\n        /* jshint -W107 */\n        a.setAttribute('href', 'javascript:systemDesignerBack()');\n        /* jshint +W107 */\n        a.setAttribute('style', 'text-decoration:none; color:#337AB7;');\n\n        span = document.createElement('span');\n        span.setAttribute('style', \"font-family: 'Helvetica Neue';\");\n        span.textContent = ' < System Designer';\n\n        a.appendChild(span);\n        div.appendChild(a);\n        docFragment.appendChild(div);\n\n        document.body.appendChild(docFragment);\n      }\n    }, 1000);\n  }\n\n  // get system\n  sysid = document.location.href.split('#')[1].split('?')[0].split('/')[0];\n  system = this.require('storage').get(sysid);\n  delete system.classInfo;\n  \n  this.require('storage').on('changed', function (obj) {\n    if (typeof obj['system-designer-message'] !== 'undefined') {\n      $db._Message.insert(obj['system-designer-message'].newValue);\n    }\n  }, true, true);\n  \n  this.require('logger').info('loading the system...');\n  systemID = $db.importSystem(system);\n  this.require('logger').info('the system is loaded');\n\n  document.title = system.name;\n  \n  this.require('logger').level('debug');\n  if (this.require(systemID).start) {\n    this.require(systemID).start();\n  }\n}",
			"useCoreAPI": true,
			"core": true
		},
		"c165d41881d11694": {
			"_id": "c165d41881d11694",
			"component": "channel",
			"state": "send",
			"action": "function send(message) { \n  var designer = this.require('designer'),\n      checkStringify = null;\n\n  if (typeof cordova !== 'undefined') {\n    messages.push(message);\n  }\n  try {\n    // test\n    checkStringify = JSON.stringify(message);\n    \n    this.require('storage').set('system-designer-message', message);\n  } catch (e) {\n  }\t\n}",
			"useCoreAPI": false,
			"core": true
		}
	},
	"types": {
		"dbUpdateEvent": {
			"_id": "1f5c41309711752",
			"core": true,
			"name": "dbUpdateEvent",
			"type": "object",
			"schema": {
				"collection": {
					"type": "string",
					"mandatory": true,
					"default": ""
				},
				"id": {
					"type": "string",
					"mandatory": true,
					"default": ""
				},
				"field": {
					"type": "string",
					"mandatory": true,
					"default": ""
				},
				"value": {
					"type": "any",
					"mandatory": true,
					"default": null
				}
			}
		},
		"dbRemoveEvent": {
			"_id": "1952e1ac4213f4a",
			"core": true,
			"name": "dbRemoveEvent",
			"type": "object",
			"schema": {
				"collection": {
					"type": "string",
					"mandatory": true,
					"default": ""
				},
				"id": {
					"type": "string",
					"mandatory": true,
					"default": ""
				}
			}
		},
		"dbInsertEvent": {
			"_id": "148ef1e19810e6d",
			"core": true,
			"name": "dbInsertEvent",
			"type": "object",
			"schema": {
				"collection": {
					"type": "string",
					"mandatory": true,
					"default": ""
				},
				"document": {
					"type": "object",
					"mandatory": true,
					"default": {}
				}
			}
		},
		"message": {
			"name": "message",
			"type": "object",
			"schema": {
				"event": {
					"type": "string",
					"mandatory": true
				},
				"from": {
					"type": "string",
					"mandatory": false
				},
				"data": {
					"type": "object",
					"mandatory": true
				}
			},
			"core": true
		}
	},
	"components": {
		"_Storage": {
			"storage": {
				"_id": "storage",
				"_core": true
			}
		},
		"_Admin": {
			"admin": {
				"_id": "admin",
				"_core": true,
				"designerWindow": null
			}
		},
		"_Channel": {
			"channel": {
				"_id": "channel",
				"_core": true
			}
		},
		"_Database": {
			"db": {
				"_id": "db"
			}
		},
		"_Logger": {
			"logger": {
				"_id": "logger",
				"level": "warn"
			}
		}
	},
	"_id": "16d0e138c8170b2",
	"models": {
		"1f4141671514c2c": {
			"_id": "1f4141671514c2c",
			"_name": "_Storage",
			"get": {
				"params": [
					{
						"name": "key",
						"type": "string",
						"mandatory": true,
						"default": ""
					}
				]
			},
			"set": {
				"params": [
					{
						"name": "key",
						"type": "string",
						"mandatory": true,
						"default": ""
					},
					{
						"name": "value",
						"type": "any",
						"mandatory": true,
						"default": null
					}
				]
			},
			"changed": {
				"params": [
					{
						"name": "obj",
						"type": "object",
						"mandatory": true,
						"default": {}
					}
				]
			},
			"clear": {},
			"remove": {
				"params": [
					{
						"name": "key",
						"type": "string",
						"mandatory": true,
						"default": ""
					}
				]
			},
			"_core": true,
			"store": {
				"type": "object",
				"readOnly": false,
				"mandatory": false,
				"default": {}
			}
		},
		"18a51169d7112d4": {
			"_name": "_Database",
			"_core": true,
			"insert": {
				"params": [
					{
						"name": "event",
						"type": "dbInsertEvent"
					}
				]
			},
			"update": {
				"params": [
					{
						"name": "event",
						"type": "dbUpdateEvent"
					}
				]
			},
			"remove": {
				"params": [
					{
						"name": "event",
						"type": "dbRemoveEvent"
					}
				]
			},
			"_id": "18a51169d7112d4"
		},
		"138a81fa1f16435": {
			"_id": "138a81fa1f16435",
			"_name": "_Admin",
			"_inherit": [
				"_Component"
			],
			"_core": true,
			"designerWindow": {
				"type": "object",
				"readOnly": false,
				"mandatory": false,
				"default": null
			}
		},
		"135c71078810af2": {
			"_id": "135c71078810af2",
			"_name": "_Channel",
			"_inherit": [
				"_Component"
			],
			"_core": true,
			"$editorUpdateSchemaName": {
				"params": [
					{
						"name": "name",
						"type": "string"
					},
					{
						"name": "id",
						"type": "string"
					}
				]
			},
			"$designerSync": {},
			"$appLoadSystem": {
				"params": [
					{
						"name": "system",
						"type": "object"
					}
				]
			},
			"$designerCreateBehavior": {
				"params": [
					{
						"name": "behavior",
						"type": "object"
					}
				]
			},
			"$editorUpdateBehavior": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "behavior",
						"type": "object"
					}
				]
			},
			"$designerUpdateBehavior": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "behavior",
						"type": "object"
					}
				]
			},
			"$editorDeleteBehavior": {
				"params": [
					{
						"name": "id",
						"type": "string"
					}
				]
			},
			"$designerDeleteBehavior": {
				"params": [
					{
						"name": "id",
						"type": "string"
					}
				]
			},
			"$designerCreateComponent": {
				"params": [
					{
						"name": "collection",
						"type": "string"
					},
					{
						"name": "component",
						"type": "object"
					}
				]
			},
			"$editorUpdateComponent": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "collection",
						"type": "string"
					},
					{
						"name": "component",
						"type": "object"
					}
				]
			},
			"$editorUpdateComponentId": {
				"params": [
					{
						"name": "oldId",
						"type": "string"
					},
					{
						"name": "newId",
						"type": "string"
					},
					{
						"name": "collection",
						"type": "string"
					}
				]
			},
			"$designerUpdateComponent": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "collection",
						"type": "string"
					},
					{
						"name": "component",
						"type": "object"
					}
				]
			},
			"$editorDeleteComponent": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "collection",
						"type": "string"
					}
				]
			},
			"$designerDeleteComponent": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "collection",
						"type": "string"
					}
				]
			},
			"$designerCreateType": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "type",
						"type": "object"
					}
				]
			},
			"$editorUpdateType": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "type",
						"type": "object"
					}
				]
			},
			"$editorDeleteType": {
				"params": [
					{
						"name": "id",
						"type": "string"
					}
				]
			},
			"$designerCreateSchema": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "schema",
						"type": "object"
					}
				]
			},
			"$editorUpdateSchema": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "schema",
						"type": "object"
					}
				]
			},
			"$editorUpdateSchemaId": {
				"params": [
					{
						"name": "oldId",
						"type": "string"
					},
					{
						"name": "newId",
						"type": "string"
					}
				]
			},
			"$designerDeleteSchema": {
				"params": [
					{
						"name": "id",
						"type": "string"
					}
				]
			},
			"$designerCreateModel": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "model",
						"type": "object"
					}
				]
			},
			"$editorUpdateModel": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "model",
						"type": "object"
					}
				]
			},
			"$designerUpdateModel": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "model",
						"type": "object"
					}
				]
			},
			"$editorUpdateModelId": {
				"params": [
					{
						"name": "oldId",
						"type": "string"
					},
					{
						"name": "newId",
						"type": "string"
					}
				]
			},
			"$designerDeleteModel": {
				"params": [
					{
						"name": "id",
						"type": "string"
					}
				]
			},
			"$editorUpdateSystem": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "system",
						"type": "object"
					}
				]
			},
			"$appLogDebug": {
				"params": [
					{
						"name": "message",
						"type": "string"
					}
				]
			},
			"$appLogInfo": {
				"params": [
					{
						"name": "message",
						"type": "string"
					}
				]
			},
			"$appLogWarn": {
				"params": [
					{
						"name": "message",
						"type": "string"
					}
				]
			},
			"$appLogError": {
				"params": [
					{
						"name": "message",
						"type": "string"
					}
				]
			},
			"$runtimeCreateComponent": {
				"params": [
					{
						"name": "collection",
						"type": "string"
					},
					{
						"name": "component",
						"type": "object"
					}
				]
			},
			"$runtimeDeleteComponent": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "collection",
						"type": "string"
					}
				]
			},
			"$runtimeUpdateComponent": {
				"params": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "collection",
						"type": "string"
					},
					{
						"name": "field",
						"type": "string"
					},
					{
						"name": "value",
						"type": "any"
					}
				]
			},
			"send": {
				"params": [
					{
						"name": "message",
						"type": "message"
					}
				]
			},
			"$designerSetSystem": {
				"params": [
					{
						"name": "system",
						"type": "object",
						"mandatory": false,
						"default": {}
					}
				]
			},
			"$designerDeleteType": {
				"params": [
					{
						"name": "id",
						"type": "string"
					}
				]
			},
			"$systemInstalled": {
				"params": [
					{
						"name": "id",
						"type": "string",
						"mandatory": true,
						"default": ""
					}
				]
			},
			"$systemResolved": {
				"params": [
					{
						"name": "id",
						"type": "string",
						"mandatory": true,
						"default": ""
					}
				]
			},
			"$systemUninstalled": {
				"params": [
					{
						"name": "id",
						"type": "string",
						"mandatory": true,
						"default": ""
					}
				]
			},
			"$systemStarted": {
				"params": [
					{
						"name": "id",
						"type": "string",
						"mandatory": true,
						"default": ""
					}
				]
			},
			"$systemStopped": {
				"params": [
					{
						"name": "id",
						"type": "string",
						"mandatory": true,
						"default": ""
					}
				]
			}
		},
		"16b9d1ac2216ffe": {
			"_id": "16b9d1ac2216ffe",
			"_name": "_Logger",
			"_core": true,
			"level": {
				"type": "log",
				"readOnly": false,
				"mandatory": false,
				"default": "warn"
			},
			"debug": {
				"params": [
					{
						"name": "message",
						"type": "any"
					}
				]
			},
			"info": {
				"params": [
					{
						"name": "message",
						"type": "any"
					}
				]
			},
			"warn": {
				"params": [
					{
						"name": "message",
						"type": "any"
					}
				]
			},
			"error": {
				"params": [
					{
						"name": "message",
						"type": "any"
					}
				]
			}
		}
	}
}
);