 ; (function (OfficeAPI, window, document, undefined) {
  var _self;
  var CustomizationHandler = function (_options, _sendCommand) {
      _self = this;
      _self.options = _options;
      _self.sendCommand = _sendCommand;
      _self.textNotWord = "此接口仅对Word文档开放；This Function Is Open For Word Only!";
  };
  CustomizationHandler.prototype = {
      constructor: CustomizationHandler,

      createXHR : function(){
          if (typeof XMLHttpRequest != "undefined"){
              return new XMLHttpRequest();
          } else if (typeof ActiveXObject != "undefined"){
              if (typeof arguments.callee.activeXString != "string"){
                  var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"], i, len;
                  for (i=0,len=versions.length; i < len; i++){
                      try {
                          new ActiveXObject(versions[i]);
                          arguments.callee.activeXString = versions[i];
                          break;
                      } catch (ex){

                      }
                  }
              }
              return new ActiveXObject(arguments.callee.activeXString);
          } else {
              throw new Error("No XHR object available.");
          }
      },

      checkUrlForOSS : function (uri) {
          if (!uri) return false;
          var us = uri.split('://');
          us[0] = us[0].toLowerCase();
          if (us[0] == 'desk' || us[0].indexOf('oss') != -1 ||
              us[0] == 'bos' || us[0] == 'cos') return true;
          return false;
      },

      sync : function(cmd){
          return new Promise(function (resolved, rejected) {
              _self.sendCommand(cmd, function(data){
                  if (!data)
                  {
                      rejected();
                  }
                  else
                  {
                      try {
                          data = typeof data === 'string' ? JSON.parse(data) : data;
                          resolved(data.data);
                      } catch (err) {
                          rejected(err);
                      }
                  }
              });
          });
      },

      notifyBuilder: function(_options, event, callFn){
          if (!_options.editorConfig.customization.notify || !_options.editorConfig.customization.notify.enable) {
              _options.editorConfig.customization.notify = { enable : false };
              return false;
          }
          if (!_options.editorConfig.customization.notify.fn && !_options.editorConfig.customization.notify.url){
              return false;
          }
          if (!_options.editorConfig.customization.notify.fn) {
              _options.events[event] = function (data) {
                  var xhr = _self.createXHR();
                  xhr.onreadystatechange = function(){
                      if (xhr.readyState == 4){
                          console.log('notify result:' + JSON.stringify({responseText: xhr.responseText, responseStatus: xhr.status}));
                      }
                  };
                  xhr.open("post", _options.editorConfig.customization.notify.url, true);
                  xhr.setRequestHeader("Content-Type", "application/json");
                  xhr.send(JSON.stringify({data: {'callFn': callFn, data: data.data }}));
              }
          } else {
              _options.events[event] = function (data) {
                  _options.editorConfig.customization.notify.fn(JSON.stringify({data: {'callFn': callFn, data: data.data }}));
              }
          }
          return true;
      },

      initConfig: function(isChinese){
          var _options = _self.options, params;
          _options.editorConfig.customization.downloadWithFormatNotify = _self.notifyBuilder(_options, 'spire_onDownloadWithFormat', 'onDownloadWithFormat');
          _options.editorConfig.canUseHistory = _options.events && !!_options.events.onRequestHistory;
          _options.editorConfig.canHistoryClose = _options.events && !!_options.events.onRequestHistoryClose;
          _options.editorConfig.canHistoryRestore = _options.events && !!_options.events.onRequestRestore;
          _options.editorConfig.canSendEmailAddresses = _options.events && !!_options.events.onRequestEmailAddresses;
          _options.editorConfig.canRequestEditRights = _options.events && !!_options.events.onRequestEditRights;
          if (!_self.checkUrlForOSS(_options.document.url)) {
              if (_options.editorConfig.callbackUrl) {
                  _options.events["spire_onSave"] = function (result){
                      var xhr = _self.createXHR();
                      xhr.onreadystatechange = function(){
                          if (xhr.readyState == 4){
                              var code = ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) ? 0 : 1;
                              _self.sendCommand({
                                  command: 'onSaveResultChange',
                                  data: {code: code}
                              });
                              notied = true;
                          }
                      };
                      xhr.open("post", _options.editorConfig.callbackUrl, true);
                      xhr.setRequestHeader("Content-Type", "application/json");
                      xhr.send(JSON.stringify({status:2, url:result.data[1], key: _options.document.key }));
                      var notied = false;
                      var saveTimeout = setTimeout(function () {
                          if (!notied) {
                              _self.sendCommand({
                                  command: 'onSaveResultChange',
                                  data: {code: 3}
                              });
                          }
                          clearTimeout(saveTimeout);
                      }, 12000);
                  };
              } else if (_options.events && _options.events["onSave"] &&
                  typeof _options.events["onSave"] === "function"){
                  _options.events["spire_onSave"] = function(data){
                      var code;
                      try {
                          data.key = _options.document.key;
                          _options.events["onSave"](data);
                          code = 0;
                      } catch (e) {
                          code = 1;
                      }
                      _self.sendCommand({
                          command: 'onSaveResultChange',
                          data: {code: code}
                      });
                  };
              } else {
                  _options.editorConfig.user.canSave = false;
                  _options.events["spire_onSave"] = function (result){
                      alert(isChinese ? "您未定义回调函数和回调url,二者至少存在一个才能使用保存功能,回调url优先级高于回调函数!" :
                          "You have not defined a callback function and a callback url. There is at least one of them to use the save function. The callback url has a higher priority than the callback function!");
                  }
              }
          }
          if (_options.events.onDownload && typeof _options.events.onDownload === "function" ){
              _options.events.spire_onDownload = _options.events.onDownload;
              _options.editorConfig.spire_onDownload = true;
          }
          if (_options.editorConfig.customization.intercept) {
              var intercept = _options.editorConfig.customization.intercept;
              _options.events['spire_onIntercept'] = intercept["callback"];
          }
          if (_options.editorConfig.customization.document) {
              params = _options.editorConfig.customization.document;
              if (params["headers"] && params["headers"]['itemCallback']) {
                  _options.events['spire_headerItemsClick'] = params["headers"]['itemCallback'];
                  _options.editorConfig.customization.document['events'] = 'spire_headerItemsClick';
              }
          }
          if (_options.editorConfig.customization.excel) {
              params = _options.editorConfig.customization.excel;
              if (params['sendSelectionRanges']) {
                  params = params['sendSelectionRanges'];
                  if (params['events'] && params['events']['eventstype'] == 'function') {
                      if (typeof params['events']['success'] !== 'function' ||
                          typeof params['events']['error'] !== 'function') {
                          if (!confirm(isChinese ? '自定义事件错误，标注事件类型为function时，success和error参数请使用js function定义回调函数！依然进入编辑吗？' :
                              'Custom event error. Please use javascript function to define callback function for success and error parameters when the event type is function!Still enter edit?')) {
                              return ;
                          }
                      }
                  } else {
                      params['events']['success'] = function (props){
                          var xhr = _self.createXHR();
                          xhr.onreadystatechange = function(){
                              if (xhr.readyState == 4){
                                  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){

                                  } else {

                                  }
                              }
                          };
                          xhr.open("post", _options.editorConfig.customization.excel.success, true);
                          xhr.setRequestHeader("Content-Type", "application/json");
                          xhr.send(JSON.stringify({ranges:props,msg:''}));
                      };
                      params['events']['error'] = function (msg){
                          var xhr = _self.createXHR();
                          xhr.onreadystatechange = function(){
                              if (xhr.readyState == 4){
                                  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){

                                  } else {

                                  }
                              }
                          };
                          xhr.open("post", _options.editorConfig.customization.excel.error, true);
                          xhr.setRequestHeader("Content-Type", "application/json");
                          xhr.send(JSON.stringify({ranges:[],msg:msg}));
                      };
                  }
                  _options.events['spire_onSendSelectionRangesSuccess'] = params['events']['success'];
                  _options.events['spire_onSendSelectionRangesError'] = params['events']['error'];
              }
          }
          if (_options.editorConfig.customization.powerpoint) {
              params = _options.editorConfig.customization.powerpoint;
              if (params['rememberPlayTime']) {
                  if (params['rememberPlayTime'].callbackUrl) {
                      _options.events['spire_onSendPlayTime'] = function (msg) {
                          var xhr = _self.createXHR();
                          xhr.onreadystatechange = function () {
                              if (xhr.readyState == 4) {
                                  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {

                                  } else {

                                  }
                              }
                          };
                          xhr.open("post", params['rememberPlayTime'].callbackUrl, true);
                          xhr.setRequestHeader("Content-Type", "application/json");
                          xhr.send(msg);
                      };
                      _options.editorConfig.customization.powerpoint['events'] = 'spire_onSendPlayTime';
                  } else if (params['rememberPlayTime'].callbackfn) {
                      _options.events['spire_onSendPlayTime'] = params['rememberPlayTime'].callbackfn;
                      _options.editorConfig.customization.powerpoint['events'] = 'spire_onSendPlayTime';
                  }
              }
          }
          _self.inited = true;
          _self = _self;
          return _options;
      }
  };

  OfficeAPI.DocumentEditor = function (placeholderId, options) {
      var _that = this,
          _options = options || {},
          isChinese = (GetLanguage() == 'zh');

      extend(_options, OfficeAPI.DocumentEditor.defaultOptions);

      _options.type = options.editorType;
      _options.editorConfig.mode = options.editorConfig.mode ? options.editorConfig.mode : (options.isReadOnly === "true"? "view":"edit");
      _options.editorConfig.lang = options.editorConfig.lang || GetLanguage();

      if (_options.editorConfig.user) {
          _options.editorConfig.user.canSave = true;

    _options.editorConfig.user.token_url = "";//null; //'https://hostname//connect/token';
          _options.editorConfig.user.verify_url = "";//null; //'https://hostname//connect/VerifyToken';
          if (_options.editorConfig.user.socket_url) _options.editorConfig.user.token = "test";
          else _options.editorConfig.user.socket_url = null; //'https://hostname/beta/connect';
          _options.editorConfig.user.base_url = null; //'https://hostname/preview';

          if (_options.editorConfig.user.token_url &&
              _options.editorConfig.user.verify_url &&
              _options.editorConfig.user.token_url.indexOf('http') != -1 &&
              _options.editorConfig.user.verify_url.indexOf('http') != -1) {
              if (!_options.editorConfig.user.token){
                  if (!_options.editorConfig.user.appid ||
                      !_options.editorConfig.user.appkey) {
                      alert(isChinese ? '"appid"和"appkey"不能为空！' : '\'appid\' and \'appkey\' can not Empty！');
                      return null;
                  }
              }
          }
      } else {
          alert(isChinese ? '"user"对象不能为空！' : 'Object \'user\' can not Empty！');
          return null;
      }
      if (!_options.editorConfig.customization) {
          _options.editorConfig.customization = new Object();
          _options.editorConfig.customization.goback = options.goback;
          _options.editorConfig.customization.about = true;
          _options.editorConfig.customization.chat = true;
      }
      if (options.document) {
          var documentInfo = options.document;
          _options.documentType = options.documentType || GetDocumentType(documentInfo.url);
          if (!documentInfo) {
              alert(isChinese ? '"document"对象不能为空！' : 'Object \'document\' can not Empty！');
              return null;
          }
          if (!documentInfo.url) {
              alert(isChinese ? '"url"不能为空！' : '\'url\' can not Empty！');
              return null;
          }

          _options.editorConfig.user.DocumentUrl = documentInfo.url;
          _options.document = new Object();
          _options.document.url = documentInfo.url;
          _options.document.key = documentInfo.key || uuid();
          _options.document.title = documentInfo.title || GetDocumentName(documentInfo.url);
          if (!_options.editorConfig.embedded) {
              _options.editorConfig.embedded = new Object();
              _options.editorConfig.embedded.saveUrl = options.editorConfig.embedded.saveUrl || documentInfo.url;
              _options.editorConfig.embedded.embedUrl = options.editorConfig.embedded.embedUrl || documentInfo.url;
              _options.editorConfig.embedded.shareUrl = options.editorConfig.embedded.shareUrl || documentInfo.url;
          }

          _options.document.fileType = documentInfo.fileType || GetFileExtension(documentInfo.url);
          _options.document.fileType = (_options.document.fileType != undefined) ? _options.document.fileType.toLowerCase() : null;
          if (!_options.document.info) {
              _options.document.info = new Object();
              _options.document.info.author = documentInfo.info && documentInfo.info.author || 'Me';
              _options.document.info.created = documentInfo.info && documentInfo.info.created || new Date();
          }
      }
      if (!_options.events) {
          _options.events = {};
      }
      if (!_options.editorConfig.customization.notify) {
          _options.editorConfig.customization.notify = {};
          _options.editorConfig.customization.notify.enable = false;
      }

      var _sendCommand = function (cmd, callback) {
          if (callback && typeof callback === 'function') {
              var event = cmd.event || uuid();
              if (!cmd.data) cmd.data = {};
              cmd.data.event = event;
              _options.events[event] = function (data) {
                  callback(JSON.stringify({data: {'callFn': cmd.command, data: data.data }}));
                  if (!cmd.event) {
                      delete _options.events[event];
                  }
              }
          }
          if (iframe && iframe.contentWindow)
              postMessage(iframe.contentWindow, cmd);
      };

      _options.frameEditorId = placeholderId;

      var resultApi = {};
      var customizationHandler = new CustomizationHandler(_options, _sendCommand);
      _options = customizationHandler.initConfig(isChinese);
      var oApi = {
          options : _options,
          asyncCommand: customizationHandler.sendCommand,
          syncCommand: customizationHandler.sync,
          notifyBuilder: customizationHandler.notifyBuilder,
          getBool : function(val){
              if (this.isEmpty(val)) return false;
              return (true === val || 'true' === val) ? true : false;
          }, isEmpty : function(val){
              return (val === null || val === undefined);
          }, isFunction : function(val){
              if (this.isEmpty(val)) return false;
              return (typeof val === 'function');
          }, isArray : function(val){
              if (this.isEmpty(val)) return false;
              return Object.prototype.toString.call(val) === '[object Array]';
          }, isString : function(val){
              if (this.isEmpty(val)) return false;
              return (typeof val === 'string');
          }, isObject : function(val){
              if (this.isEmpty(val)) return false;
              return Object.prototype.toString.call(val) === '[object Object]';
          }
      };

      resultApi.GetOpenApi = function() {
          return oApi;
      };

      var onMouseUp = function (evt) {
          //_processMouse(evt);
      };

      var _attachMouseEvents = function () {
          if (window.addEventListener) {
              window.addEventListener("mouseup", onMouseUp, false)
          } else if (window.attachEvent) {
              window.attachEvent("onmouseup", onMouseUp);
          }
      };

      var _detachMouseEvents = function () {
          if (window.removeEventListener) {
              window.removeEventListener("mouseup", onMouseUp, false)
          } else if (window.detachEvent) {
              window.detachEvent("onmouseup", onMouseUp);
          }
      };

      var _onReady = function () {
          if (_options.type === 'mobile') {
              document.body.onfocus = function (e) {
                  setTimeout(function () {
                      iframe.contentWindow.focus();

                      _sendCommand({
                          command: 'resetFocus',
                          data: {}
                      })
                  }, 10);
              };
          }

          _attachMouseEvents();

          if (_options.editorConfig) {
              _init(_options.editorConfig);
          }

          if (_options.document) {
              _openDocument(_options.document);
          }
      };

      var _callLocalStorage = function (data) {
          if (data.cmd == 'get') {
              if (data.keys && data.keys.length) {
                  var af = data.keys.split(','), re = af[0];
                  for (i = 0; ++i < af.length;)
                      re += '|' + af[i];

                  re = new RegExp(re); k = {};
                  for (i in localStorage)
                      if (re.test(i)) k[i] = localStorage[i];
              } else {
                  k = localStorage;
              }

              _sendCommand({
                  command: 'internalCommand',
                  data: {
                      type: 'localstorage',
                      keys: k
                  }
              });
          } else
              if (data.cmd == 'set') {
                  var k = data.keys, i;
                  for (i in k) {
                      localStorage.setItem(i, k[i]);
                  }
              }
      };

      var _onMessage = function (msg) {
          if (msg) {
              if (msg.type === "onExternalPluginMessage") {
                  _sendCommand(msg);
              } else
                  if (msg.frameEditorId == placeholderId) {
                      var events = _options.events || {},
                          handler = events[msg.event],
                          res;

                      if (msg.event === 'onRequestEditRights' && !handler) {
                          _applyEditRights(false, 'handler isn\'t defined');
                      } else if (msg.event === 'onInternalMessage' && msg.data && msg.data.type == 'localstorage') {
                          _callLocalStorage(msg.data.data);
                      } else {
                          if (msg.event === 'onReady') {
                              _onReady();
                          }

                          if (handler) {
                              res = handler.call(_that, { data: msg.data });
                          }
                      }
                  }
          }
      };

      var _checkConfigParams = function () {
          if (_options.document) {
              if (!_options.document.url || ((typeof _options.document.fileType !== 'string' || _options.document.fileType == '') &&
                  (typeof _options.documentType !== 'string' || _options.documentType == ''))) {
                  window.alert("One or more required parameters for the configuration object are not set.");
                  return false;
              }

              var appMap = {
                  'document': 'docx',
                  'pdf': 'pdf',
                  'spreadsheet': 'xlsx',
                  'presentation': 'pptx'
              }, app;

              if (typeof _options.documentType === 'string' && _options.documentType != '') {
                  app = appMap[_options.documentType.toLowerCase()];
                  if (!app) {
                      window.alert("The \"documentType \" parameter of the configuration object is invalid.");
                      return false;
                  } else if (typeof _options.document.fileType !== 'string' || _options.document.fileType == '') {
                      _options.document.fileType = app;
                  }
              }

              if (typeof _options.document.fileType === 'string' && _options.document.fileType != '') {
                  var type = /^(?:(xls|xlsx|ods|csv|xlst|xlsy|gsheet)|(pps|ppsx|ppt|pptx|odp|pptt|ppty|gslides)|(doc|docx|doct|odt|gdoc|txt|rtf|pdf|mht|htm|html|epub|djvu|xps))$/
                      .exec(_options.document.fileType.toLowerCase());
                  if (!type) {
                      window.alert("The \"FileType\" parameter of the configuration object is invalid.");
                      return false;
                  } else if (typeof _options.documentType !== 'string' || _options.documentType == '') {
                      if (typeof type[1] === 'string') _options.documentType = 'spreadsheet'; else
                          if (typeof type[2] === 'string') _options.documentType = 'presentation'; else
                              if (typeof type[3] === 'string') _options.documentType = 'text';
                  }
              }

              var type = /^(?:(pdf|djvu|xps))$/.exec(_options.document.fileType);
              if (type && typeof type[1] === 'string') {
                  if (!_options.document.permissions)
                      _options.document.permissions = {};
                  _options.document.permissions.edit = _options.document.permissions.review = false;
                  _options.editorConfig.canUseHistory = false;
              }

              if (!_options.document.title || _options.document.title == '')
                  _options.document.title = 'Unnamed.' + _options.document.fileType;

              if (!_options.document.key) {
                  _options.document.key = 'xxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function (c) { var r = Math.random() * 16 | 0; return r.toString(16); });
              } else if (typeof _options.document.key !== 'string') {
                  window.alert("The \"documentId \" parameter of the configuration object is invalid.");
                  return false;
              }

              _options.document.token = _options.token;
          }

          return true;
      };

      (function () {
          var result = /[\?\&]placement=(\w+)&?/.exec(window.location.search);
          if (!!result && result.length) {
              if (result[1] == 'desktop') {
                  _options.editorConfig.targetApp = result[1];
                  _options.editorConfig.canBackToFolder = false;
                  _options.editorConfig.canUseHistory = false;
                  if (!_options.editorConfig.customization) _options.editorConfig.customization = {};
                  _options.editorConfig.customization.about = false;
              }
          }
      })();

      var target = document.getElementById(placeholderId), iframe;

      if (target && _checkConfigParams()) {
          iframe = createIframe(_options);
          target.parentNode && target.parentNode.replaceChild(iframe, target);
          var _msgDispatcher = new MessageDispatcher(_onMessage, this);
      }

      var _cacheFonts = function (data) {
          _sendCommand({
              command: 'cacheFonts',
              data: data
          });
      };

      var _destroyEditor = function (cmd) {
          var target = document.createElement("div");
          target.setAttribute('id', placeholderId);

          if (iframe) {
              _msgDispatcher && _msgDispatcher.unbindEvents();
              _detachMouseEvents();
              iframe.parentNode && iframe.parentNode.replaceChild(target, iframe);
          }
      };

      var _reload = function () {
          if (iframe && iframe.contentWindow)
              window.open(iframe.src,iframe.name);
      };

      var _init = function (editorConfig) {
          _sendCommand({
              command: 'init',
              data: {
                  config: editorConfig
              }
          });
      };

      var _openDocument = function (doc) {
          _sendCommand({
              command: 'openDocument',
              data: {
                  doc: doc
              }
          });
      };

      var _showMessage = function (title, msg) {
          msg = msg || title;
          _sendCommand({
              command: 'showMessage',
              data: {
                  msg: msg
              }
          });
      };

      var _applyEditRights = function (allowed, message) {
          _sendCommand({
              command: 'applyEditRights',
              data: {
                  allowed: allowed,
                  message: message
              }
          });
      };

      var _processSaveResult = function (result, message) {
          _sendCommand({
              command: 'processSaveResult',
              data: {
                  result: result,
                  message: message
              }
          });
      };

      var _processRightsChange = function (enabled, message) {
          _sendCommand({
              command: 'processRightsChange',
              data: {
                  enabled: enabled,
                  message: message
              }
          });
      };

      var _denyEditingRights = function (message) {
          _sendCommand({
              command: 'processRightsChange',
              data: {
                  enabled: false,
                  message: message
              }
          });
      };

      var _refreshHistory = function (data, message) {
          _sendCommand({
              command: 'refreshHistory',
              data: {
                  data: data,
                  message: message
              }
          });
      };

      var _setHistoryData = function (data, message) {
          _sendCommand({
              command: 'setHistoryData',
              data: {
                  data: data,
                  message: message
              }
          });
      };

      var _setEmailAddresses = function (data) {
          _sendCommand({
              command: 'setEmailAddresses',
              data: {
                  data: data
              }
          });
      };

      var _processMailMerge = function (enabled, message) {
          _sendCommand({
              command: 'processMailMerge',
              data: {
                  enabled: enabled,
                  message: message
              }
          });
      };

      var _onSaveClick = function () {
          _sendCommand({
              command: 'onSaveClick'
          });
      };

      var _downloadAs = function (data, callback) {
          _sendCommand({
              command: 'downloadAs',
              data: data
          }, callback);
      };

      var _processMouse = function (evt) {
          var r = iframe.getBoundingClientRect();
          var data = {
              type: evt.type,
              x: evt.x - r.left,
              y: evt.y - r.top,
              event: evt
          };

          _sendCommand({
              command: 'processMouse',
              data: data
          });
      };

      var _serviceCommand = function (command, data) {
          _sendCommand({
              command: 'internalCommand',
              data: {
                  command: command,
                  data: data
              }
          });
      };

      var _appendText = function (data, callback) {
          if ('document' !== _options.documentType)
          {
              if (callback)
              {
                  callback(customizationHandler.textNotWord);
              }
              else
              {
                  alert(customizationHandler.textNotWord);
              }
              return;
          }
          if (!customizationHandler.notifyBuilder(_options, 'spire_onAppendText', 'appendText')){
              _options.events['spire_onAppendText'] = function(data){
                  if (callback)
                  {
                      callback(data);
                  }
              };
          }
          _sendCommand({
              command: 'appendText',
              data: typeof data === 'string' ? data : JSON.stringify(data)
          });
      };

      var _appendTextSync = function (data) {
          return new Promise(function (resolved, rejected){
              if ('document' !== _options.documentType) {
                  rejected(customizationHandler.textNotWord);
              } else {
                  customizationHandler.sync({
                      command: 'appendText', event: 'spire_onAppendText', data: typeof data === 'string' ? data : JSON.stringify(data)
                  }).then(function(res){
                      resolved(res);
                  }).catch(function(err){
                      rejected(err);
                  });
              }
          });
      };

      var _intercept = function () {
          _sendCommand({
              command: 'onIntercept'
          });
      };

      var defaultApi = {
          showMessage: _showMessage,
          processSaveResult: _processSaveResult,
          processRightsChange: _processRightsChange,
          denyEditingRights: _denyEditingRights,
          refreshHistory: _refreshHistory,
          setHistoryData: _setHistoryData,
          setEmailAddresses: _setEmailAddresses,
          processMailMerge: _processMailMerge,
          downloadAs: _downloadAs,
          serviceCommand: _serviceCommand,
          attachMouseEvents: _attachMouseEvents,
          detachMouseEvents: _detachMouseEvents,
          destroyEditor: _destroyEditor,
          onSaveClick:_onSaveClick,
          reload:_reload,
          appendText: _appendText,
          appendTextSync: _appendTextSync,
          intercept: _intercept
      };
      if (options.editorConfig.customization.cacheFontOnly) {
          defaultApi.cacheFonts = _cacheFonts;
      }
      for (var a in defaultApi) {
          resultApi[a] = defaultApi[a];
      }
      delete defaultApi;
      return resultApi;
  };

  OfficeAPI.DocumentEditor.defaultOptions = {
      editorConfig: {
          lang: 'en',
          canOfficeServer: true
      },
  type: 'desktop',
      width: '100%',
      height: '100%'
  };

  OfficeAPI.DocumentEditor.version = function () {
      return '7.6.28';
  };

  MessageDispatcher = function (fn, scope) {
      var _fn = fn,
          _scope = scope || window,
          eventFn = function (msg) {
              _onMessage(msg);
          };

      var _bindEvents = function () {
          if (window.addEventListener) {
              window.addEventListener("message", eventFn, false)
          }
          else if (window.attachEvent) {
              window.attachEvent("onmessage", eventFn);
          }
      };

      var _unbindEvents = function () {
          if (window.removeEventListener) {
              window.removeEventListener("message", eventFn, false)
          }
          else if (window.detachEvent) {
              window.detachEvent("onmessage", eventFn);
          }
      };

      var _onMessage = function (msg) {
          // TODO: check message origin
          if (msg && window.JSON) {

              try {
                  var msg = window.JSON.parse(msg.data);
                  if (_fn) {
                      _fn.call(_scope, msg);
                  }
              } catch (e) {
                  console.log(e);
              }
          }
      };

      _bindEvents.call(this);

      return {
          unbindEvents: _unbindEvents
      }
  };

  function getBasePath() {
      var scripts = document.getElementsByTagName('script'),
          match;

      for (var i = scripts.length - 1; i >= 0; i--) {
          match = scripts[i].src.match(/(.*)api\/documenteditor.js/i);
          if (match) {
              return match[1];
          }
      }

      return "";
  }

  function getExtensionPath() {
      if ("undefined" == typeof (extensionParams) || null == extensionParams["url"])
          return null;
      return extensionParams["url"] + "apps/";
  }

  function getAppPath(config) {
      var extensionPath = getExtensionPath(),
          path = extensionPath ? extensionPath : getBasePath(),
          appMap = {
              'document': 'documenteditor',
              'pdf': 'documenteditor',
              'spreadsheet': 'spreadsheeteditor',
              'presentation': 'presentationeditor'
          },
          app = appMap['text'];

      if (typeof config.documentType === 'string') {
          app = appMap[config.documentType.toLowerCase()];
      } else
          if (!!config.document && typeof config.document.fileType === 'string') {
              var type = /^(?:(xls|xlsx|ods|csv|xlst|xlsy|gsheet)|(pps|ppsx|ppt|pptx|odp|pptt|ppty|gslides))$/
                  .exec(config.document.fileType);
              if (type) {
                  if (typeof type[1] === 'string') app = appMap['spreadsheet']; else
                      if (typeof type[2] === 'string') app = appMap['presentation'];
              }
          }

      path += app + "/";
      path += config.type === "mobile"
          ? "mobile"
          : config.type === "embedded"
              ? "embed"
              : "main";
      path += "/index.html";

      return path;
  }

  function getAppParameters(config) {
      var params = "?_dc=0";

      if (config.editorConfig && config.editorConfig.lang)
          params += "&lang=" + config.editorConfig.lang;

      if (config.editorConfig && config.editorConfig.targetApp !== 'desktop') {
          if ((typeof (config.editorConfig.customization) == 'object') && config.editorConfig.customization.loaderName) {
              if (config.editorConfig.customization.loaderName !== 'none') params += "&customer=" + config.editorConfig.customization.loaderName;
          } else
              params += "&customer=Spire.Office";
          if ((typeof (config.editorConfig.customization) == 'object') && config.editorConfig.customization.loaderLogo) {
              if (config.editorConfig.customization.loaderLogo !== '') params += "&logo=" + config.editorConfig.customization.loaderLogo;
          }
      }

      if (config.frameEditorId)
          params += "&frameEditorId=" + config.frameEditorId;

      return params;
  }

  function createIframe(config) {
      var iframe = document.createElement("iframe");

      iframe.src = getAppPath(config) + getAppParameters(config);
      iframe.width = config.width;
      iframe.height = config.height;
      iframe.align = "top";
      iframe.frameBorder = 0;
      iframe.name = "frameEditor";
      iframe.allowFullscreen = true;
      iframe.setAttribute("allowfullscreen", ""); // for IE11
      iframe.setAttribute("onmousewheel", ""); // for Safari on Mac
      return iframe;
  }

  function postMessage(wnd, msg) {
      if (wnd && wnd.postMessage && window.JSON) {
          // TODO: specify explicit origin
          wnd.postMessage(window.JSON.stringify(msg), "*");
      }

  }

  function extend(dest, src) {
      for (var prop in src) {
          if (src.hasOwnProperty(prop)) {
              if (typeof dest[prop] === 'undefined') {
                  dest[prop] = src[prop];
              } else
                  if (typeof dest[prop] === 'object' &&
                      typeof src[prop] === 'object') {
                      extend(dest[prop], src[prop]);
                  }
          }
      }
      return dest;
  }

  function GetFileExtension(sName) {
      var nIndex = sName ? sName.lastIndexOf(".") : -1;
      if (-1 != nIndex)
          return sName.substring(nIndex + 1).toLowerCase();
      return null;
  }

  function GetLanguage() {
      var langNav = navigator.language||navigator.userLanguage,
          langNav = langNav.substr(0, 2);
      return langNav;
  }

  function GetDocumentName(url) {
      return url.substr(url.lastIndexOf('/') + 1,url.length);
  }

  function GetDocumentType(url) {
      var documentUrl = unescape(url)
          ,ext = GetFileExtension(documentUrl);
      ext = ext.toLowerCase();
      if (ExtsDocument[ext]) return "document";
      if (ExtsSpreadsheet[ext]) return "spreadsheet";
      if (ExtsPresentation[ext]) return "presentation";
      return null;
  }

  var ExtsSpreadsheet = {
      "xls": "xls", "xlsx": "xlsx", "xlsm": "xlsm",
      "xlt": "xlt", "xltx": "xltx", "xltm": "xltm",
      "ods": "ods", "fods": "fods", "ots": "ots", "csv": "csv"
  }, ExtsPresentation = {
      "pps":"pps", "ppsx":"ppsx", "ppsm":"ppsm",
      "ppt":"ppt", "pptx":"pptx", "pptm":"pptm",
      "pot":"pot", "potx":"potx", "potm":"potm",
      "odp":"odp", "fodp":"fodp", "otp":"otp"
  }, ExtsDocument = {
      "doc": "doc", "docx":"docx",
      "docm": "docm", "dot":"dot",
      "dotx":"dotx", "dotm":"dotm",
      "odt":"odt", "fodt":"fodt",
      "ott":"ott", "rtf":"rtf",
      "txt":"txt","html":"html",
      "htm":"htm", "mht":"mht",
      "pdf":"pdf", "fb2":"fb2",
      "epub":"epub", "xps":"xps"
  };

  function uuid(len, radix) {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      var uuid = [], i;
      radix = radix || chars.length;

      if (len) {
          for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
      } else {
          var r;
          uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
          uuid[14] = '4';
          for (i = 0; i < 36; i++) {
              if (!uuid[i]) {
                  r = 0 | Math.random() * 16;
                  uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
              }
          }
      }
      uuid = uuid.join('');
      uuid = uuid.replace(/-/g,'');
      uuid = uuid.substr(uuid.length - Math.min(uuid.length, 20));
      uuid = uuid.toLowerCase();
      return uuid;
  }

})(window.OfficeAPI = window.OfficeAPI || {}, window, document);