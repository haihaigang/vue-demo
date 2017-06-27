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
        this._queue = {}; //请求队列
        this._onEnd = function() {}; //当请求都完成
        this._responseKey = 'body.content'; //默认接口返回的内容结构体
        this._timestamp = undefined; //每次接口返回的当前服务器时间
    }

    /**
     * 搜索
     * @param options
     */
    search(options) {
        this._processOptions(options, {
            key: 'id',
            data: {},
            logtype: 'search',
            showLoading: true,
        });

        this._extend(options.data, {
            page: 1,
            size: this._pageSize
        });

        return this._fetch(options);
    }

    /**
     * 保存
     * @param options
     */
    save(options) {
        this._processOptions(options, {
            method: 'POST',
            logtype: 'save',
            showLoading: true,
            loadingText: '保存中……',
            contentType: 'application/json'
        });

        this._fetch(options);
    }

    /**
     * 删除
     * @param options
     */
    remove(options) {
        this._processOptions(options, {
            method: 'POST',
            logtype: 'remove',
            showLoading: true,
            loadingText: '删除中……',
        });

        return this._fetch(options);
    }

    /**
     * 自定义请求
     * @param options 
     */
    send(options) {
        this._processOptions(options, {
            method: 'GET',
            logtype: 'default',
            showLoading: false,
            loadingText: '加载中……',
        });

        return this._fetch(options);
    }

    /**
     * 通用处理异步请求的参数
     * @param options 参数
     * @param defOptions 默认参数
     * @return 处理后的参数
     */
    _processOptions(options, defOptions) {
        if (typeof options == 'string') {
            options = {
                url: options
            }
        } else if (typeof options == 'object') {}

        this._extend(options, defOptions);

        return options;
    }

    /**
     * 发送请求
     * @param options 请求参数
     * {
     *  url: '请求地址',
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

        that._queue[options.url] = true;

        options = options || {};
        options.logtype = options.logtype || 'default';

        if (options.showLoading) {
            // loadingTip = Message.loading(options.loadingText || '加载中……', 0);
        }

        var token = Storage.get('AccessToken');
        if (token) {
            headers['X-Auth-Token'] = token;
            headers['UserToken'] = token;
        }

        //处理成json提交数据，仅在请求头为json时
        if (options.contentType == 'application/json') {
            options.body = JSON.stringify(options.data);
        }

        this._extend(options, {
            method: 'GET',
            credentials: 'include',
            headers: headers
        });

        if ('fetch' in window) {
            var url = this._processUrl(options.url, options.params);

            return fetch(url, options).then((response) => {
                delete(that._queue[options.url]);
                if (that._isEmpty(that._queue) && typeof that._onEnd == 'function') {
                    that._onEnd.call(this);
                }

                that._logged('time', '请求耗时约' + (Date.now() - startTick) + 'ms', options.url);

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
                    var content = that._getDataWithKey(data, that._responseKey);
                    //若请求的列表数据，需要添加key键，用于操作栏使用
                    for (var i = 0, len = content.length; i < len; i++) {
                        content[i].okey = content[i][options.key];
                    }

                    return content;
                }

                if ('body' in data) {
                    return data.body;
                }

                return data;
            })
        } else {
            console.error('fetch not supproted')
        }
    }

    /**
     * 扩展参数
     * @param  options 被扩展参数 
     * @param  opt 扩展参数
     */
    _extend(options, opt) {
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
    _logged(type, message, url) {
        console.info('[' + type + '] ' + message + ' url=' + url);
    }

    /**
     * 判断对象是否为空
     * @param  {[type]}
     * @return {Boolean}
     */
    _isEmpty(obj) {
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
    _getDataWithKey(data, keyStr) {
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

    /**
     * 处理url
     * @param url 请求地址
     * @param params 参数
     * @return 拼接后的请求地址
     */
    _processUrl(url, params) {
        var paramArr = [];

        if (params) {
            for (var i in params) {
                paramArr.push(i + '=' + params[i]);
            }
        }

        var paramStr = paramArr.join('&');

        if (url.indexOf('?') >= 0) {
            return url + '&' + paramStr;
        } else {
            return url + '?' + paramStr;
        }
    }
}


export default BaseReq;
