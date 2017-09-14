'use strict';

var _electron = require('electron');

var _createwindow = require('./createwindow');

var _createwindow2 = _interopRequireDefault(_createwindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.app.on('ready', function () {
  (0, _createwindow2.default)();
});

_electron.app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    _electron.app.quit();
  }
});

_electron.app.on('activate', function (_e, hasVisibleWindows) {
  if (!hasVisibleWindows) {
    (0, _createwindow2.default)();
  }
});