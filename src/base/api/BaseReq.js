import BaseConfig from '../../config/BaseConfig'
import Storage from '../utils/Storage'

class BaseReq {
    constructor() {
        this._host = BaseConfig.HOST; //接口地址
        this._phpHost = BaseConfig.PHP_HOST; //php接口地址
        this._pageSize = BaseConfig.PAGESIZE; //分页大小
        this._path = BaseConfig.PATH; //路由前缀路径
        this._timeout = 15000; //请求超时时间
        this._cache = true; //是否缓存
        this._isLoading = false; //是否正在请求
        this._queue = {}; //请求队列
        this._onEnd = function() {}; //当请求都完成
        this._timeTick = 0; //每次请求的时间
        this._responseKey = 'body.content'; //默认接口返回的内容结构体
        this._timestamp = undefined; //每次接口返回的当前服务器时间
    }

    assign(options, opts) {
        if ('assign' in Object) {
            return Object.assign(options, opts);
        } else {
            for (var i in opts) {
                options[i] = opts[i];
            }
            return options;
        }
    }


    /**
     * 搜索
     * @param options
     */
    search(options) {
        if (this._isLoading) {
            console.log('search wait is loading')
            return;
        }

        this.extend(options, {
            key: 'id',
            data: {},
            logtype: 'search',
            showLoading: true,
        });

        this.extend(options.data, {
            page: 1,
            size: this._pageSize
        });

        return this._fetch(options);
    }

    /**
     * 保存
     * @param options
     * @param callback－成功回调
     * @param allbackError－失败回调
     */
    save(options, callback, callbackError) {
        if (this._isLoading) {
            console.log('save wait is loading')
            return;
        }

        this.extend(options, {
            type: 'POST',
            logtype: 'save',
            showLoading: true,
            loadingText: '保存中……',
            contentType: 'application/json'
        });

        this._fetch(options, callback, callbackError);
    }

    /**
     * 删除
     * @param options
     * @param callback－成功回调
     * @param allbackError－失败回调
     */
    remove(options) {
        if (this._isLoading) {
            console.log('remove wait is loading')
            return;
        }

        this.extend(options, {
            type: 'POST',
            logtype: 'remove',
            showLoading: true,
            loadingText: '删除中……',
        });

        return this._fetch(options);
    }

    send(options) {
        var opt = {};
        if (typeof options == 'string') {
            opt.url = options;
        } else if (typeof options == 'object') {
            opt = options;
        }
        return this._fetch(options);
    }


    /**
     * 发送请求
     * @param url 请求地址
     * @param options 请求参数
     * {
     *  method: '请求使用的方法，如 GET、 POST'
     *  headers: '请求的头信息'
     *  body: '请求的 body 信息：可能是一个 Blob、 BufferSource、 FormData、 URLSearchParams 或者 USVString 对象。 注意 GET 或 HEAD 方法的请求不能包含 body 信息。'
     *  credentials: '发送包含凭据的请求，include包含、omit不包含'
     *  mode: '请求的模式， 如 cors、 no - cors 或者same - origin。 是否允许跨域请求'
     *  cache: '请求的 cache 模式: default,no-store,reload,no - cache,force - cache,or only -if-cached.'
     * }
     */
    _fetch(options) {
        var that = this,
            headers = {},
            loadingTip,
            startTick = Date.now();
        that._isLoading = true;
        that._queue[options.url] = true;

        options = options || {};
        options.logtype = options.logtype || 'default';

        if (options.showLoading) {
            // loadingTip = Message.loading(options.loadingText || '加载中……', 0);
        }

        var token = Storage.get('AccessToken');
        if (token) {
            headers['X-Auth-Token'] = token;
        }

        //处理成json提交数据，仅在请求头为json时
        if (options.contentType == 'application/json') {
            options.body = JSON.stringify(options.data);
        }

        this.extend(options, {
            method: 'GET',
            credentials: 'include',
            headers: headers
        });

        if ('fetch' in window) {
            return fetch(options.url, options).then((response) => {
                that._isLoading = false;
                delete(that._queue[options.url]);
                if (that.isEmpty(that._queue) && typeof that._onEnd == 'function') {
                    that._onEnd.call(this);
                }

                that._timeTick = Date.now() - startTick;
                that.logged('time', '请求耗时约' + that._timeTick + 'ms', options.url);

                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            }).then((data) => {
                if (data.status == 401) {
                    throw new Error(401);
                    return;
                }
                if (data.status == 500) {
                    throw new Error(500);
                    return;
                }

                if (options.key) {
                    if (options.responseKey) {
                        that._responseKey = options.responseKey;
                    }
                    var content = that.getDataWithKey(data, that._responseKey);
                    //若请求的列表数据，需要添加key键，用于操作栏使用
                    for (var i = 0, len = content.length; i < len; i++) {
                        content[i].okey = content[i][options.key];
                    }
                }
            })
        } else {
            console.error('not supproted fetch')
        }
    }

    /**
     * 扩展参数
     * @param  options 被扩展参数 
     * @param  opt 扩展参数
     */
    extend(options, opt) {
        options = options || {};
        for (var i in opt) {
            options[i] = typeof options[i] == 'undefined' ? opt[i] : options[i];
        }
    }

    /**
     * 记录接口的错误日志
     * @param type 接口请求类型
     * @param message 错误内容
     * @param url 错误地址
     */
    logged(type, message, url) {
        console.info('[' + type + '] ' + message + ' url=' + url);
    }

    /**
     * 判断对象是否为空
     * @param  {[type]}
     * @return {Boolean}
     */
    isEmpty(obj) {
        var flag = true;
        for (var i in obj) {
            flag = false;
            break;
        }

        return flag;
    }

    /**
     * 从数据源中获取目标描述字符串对应的值
     * @param data 数据源
     * @param keyStr 目标描述字符串，eg:a.b.c
     * @return object
     */
    getDataWithKey(data, keyStr) {
        if (keyStr.indexOf('.') == -1 && keyStr.indexOf('[') == -1) {
            return data[keyStr];
        }
        var keyArr = keyStr.split('.'),
            len = keyArr.length,
            i = 0,
            tempObj = data,
            reg = /^(.*)\[(\d+)\]$/;

        while (i < len) {
            if (reg.test(keyArr[i])) {
                var result = reg.exec(keyArr[i]);
                if (!tempObj[result[1]]) {
                    tempObj = '';
                    break;
                }
                tempObj = tempObj[result[1]][result[2]];
            } else {
                tempObj = tempObj[keyArr[i]];
            }
            i++;
        }
        return tempObj;
    }
}


export default BaseReq;
