/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Exception = require('./Exception');

/**
 * 非法调用异常
 */
class InvalidArgumentException extends Exception {}

module.exports = InvalidArgumentException;
