'use strict';

var http = require('http');

var Y = require('./Y');
var WebApp = require('./web/Application');
var InvalidConfigException = require('./core/InvalidConfigException');

var Logger = require('./log/Logger');
var Cookie = require('./web/Cookie');
var WebRestful = require('./web/Restful');
var WebRequest = require('./web/Request');
var WebResponse = require('./web/Response');
var Session = require('./session/Session');
var WebController = require('./web/Controller');

/**
 * 入口
 */
class YNode {
    
    /**
     * constructor
     *
     * @param JSON config 配置信息
     */
    constructor(config) {
        if(undefined === config) {
            throw new InvalidConfigException('The app config is required');
        }
        
        this.config = config;
        this.server = null;
        this.app = null;
    }
    
    // debug
    debug(res, error) {
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(500);
        res.end(true === this.config.debug ? error.message + '\n' + error.stack :
            'The server encountered an internal error');
    }
    
    // 中间层
    requestListener(req, res) {
        try {
            this.app.requestListener(req, res);
            
        } catch(e) {
            this.debug(res, e);
        }
    }
    
    // restful
    requestListenerRestful(req, res) {
        try {
            WebRestful.requestListener(req, res);
            
        } catch(e) {
            this.debug(res, e);
        }
    }
    
    /**
     * 获取 http server
     *
     * @return http server
     */
    getServer() {
        if(true !== this.config.useRestful) {
            this.app = new WebApp(this.config);
        }
        
        return http.createServer( null === this.app ?
            this.requestListenerRestful.bind(this) : this.requestListener.bind(this));
    }
    
    /**
     * listen
     *
     * @param int port
     * @param Function callback
     */
    listen(port, callback) {
        this.server = this.getServer();
        this.server.listen(port, callback);
    }
    
}

/**
 * handler
 */
YNode.Y = Y;

/**
 * Logger
 */
YNode.Logger = Logger;

/**
 * Cookie
 */
YNode.Cookie = Cookie;

/**
 * Web restful
 */
YNode.WebRestful = WebRestful;

/**
 * Web request
 */
YNode.WebRequest = WebRequest;

/**
 * Web response
 */
YNode.WebResponse = WebResponse;

/**
 * Session
 */
YNode.Session = Session;

/**
 * WebController handler
 */
YNode.WebController = WebController;

module.exports = YNode;
