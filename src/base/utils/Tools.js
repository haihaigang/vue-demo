import moment from 'moment';
moment.locale('zh-cn');

/**
 * 工具类
 **/
class Tools {
    constructor() {}

    /**
     * 按指定格式格式化日期
     */
    format(date, pattern) {
        var that = date;
        var o = {
            "M+": that.getMonth() + 1,
            "d+": that.getDate(),
            "h+": that.getHours(),
            "m+": that.getMinutes(),
            "s+": that.getSeconds(),
            "q+": Math.floor((that.getMonth() + 3) / 3),
            "S": that.getMilliseconds()
        };
        if (/(y+)/.test(pattern)) {
            pattern = pattern.replace(RegExp.$1, (that.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(pattern)) {
                pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return pattern;
    }

    /**
     * 根据时间戳获取日期对象
     */
    getDate(timetick) {
        if (!timetick) return null;

        if (typeof timetick == 'string') {
            timetick = timetick * 1;
        }
        if (timetick < 9999999999) {
            timetick = timetick * 1000;
        }
        
        return moment(timetick);
    }

    /**
     * 时间戳格式化
     */
    formatDate(content, type, defaultValue) {
        if (content == 0) {
            return '--';
        }
        var pattern = type || "yyyy-MM-dd hh:mm:ss";
        if (isNaN(content) || content == null) {
            return defaultValue || content;
        } else if (typeof(content) == 'object') {
            return this.format(content, pattern);
        } else {
            if (typeof content == 'string') {
                content = content * 1;
            }
            if (content < 9999999999) {
                content = content * 1000;
            }
            var date = new Date(parseInt(content));
            return this.format(date, pattern);
        }
    }

    /**
     *  货币格式化，添加货币符号和默认省略符'--'
     */
    formatCurrency(content) {
        if (content == 0) {
            return '¥' + content;
        }

        return content ? '¥' + content : '--'
    }

    /**
     *  默认时间格式化和默认省略符'--'
     */
    formatDefaultDate(content) {
        if (!content || (content && content == '0000-00-00 00:00:00')) {
            return '--';
        } else {
            return content;
        }
    }

    _GET() {
        var e = location.search,
            o = {};
        if ("" === e || void 0 === e) return o;
        e = e.substr(1).split("&");
        for (var n in e) {
            var t = e[n].split("=");
            o[t[0]] = decodeURI(t[1])
        }
        if (o.from) {
            delete o.code
        } //o.from得到的是什么值(类型)
        return o
    }
}

export default new Tools();
