/**
 * 本地cookie读写
 */
class Cookie {

    get(sname) {
        var sre = "(?:;)?" + sname + "=([^;]*);?";
        var ore = new RegExp(sre);
        if (ore.test(document.cookie)) {
            var tar = null;
            try {
                tar = unescape(RegExp["$1"]);
            } catch (e) {
                // return null;
            }
            try {
                tar = JSON.parse(tar);
            } catch (e) {
                tar = tar;
            }
            return tar;
        } else {
            return null;
        }
    }

    /**
     * 设置Cookie
     * @param {[String]}
     * @param {[String]} 
     * @param {[Number]} 天数
     * @param {[Number]} 小时数
     * @param {[Number]} 分钟数
     * @param {[Number]} 秒数
     */
    _set(c_name, value, days, hours, minutes, seconds) {
        var expires = null;
        var domain = location.host.indexOf("meigo.com") >= 0 ? "domain= meigo.com" : "";
        if (typeof days == 'number' && typeof hours == 'number' && typeof minutes == 'number' && typeof seconds == 'number') {
            if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
                expires = null;
            } else {
                expires = this.getExpDate(days, hours, minutes, seconds);
            }
        } else {
            expires = days || this.getExpDate(7, 0, 0, 0);
        }

        if (typeof value == 'object') {
            value = JSON.stringify(value);
        }

        document.cookie = c_name + "=" + escape(value) + ((expires == null) ? "" : ";expires=" + expires) + "; path=/ ;" + domain;
    }

    /**
     * 设置Cookie
     * @param {[type]} name
     * @param {[type]} value
     * @param {[type]} 天数，默认7天、0不设置、-1移除
     * @param {[type]} 小時，默認0
     */
    set(c_name, value, days, hours, minites) {
        if (!hours) hours = 0;
        if (!minites) minites = 0;
        this._set(c_name, value, days, hours, minites, 0);
    }

    remove(key) {
        this.set(key, '', -1);
    }

    //获取过期时间，d天数、h小时、m分钟、s秒
    getExpDate(d, h, m, s) {
        var r = new Date;
        if (typeof d == "number" && typeof h == "number" && typeof m == "number" && typeof s == 'number')
            return r.setDate(r.getDate() + parseInt(d)), r.setHours(r
                    .getHours() + parseInt(h)), r.setMinutes(r.getMinutes() + parseInt(m)), r.setSeconds(r.getSeconds() + parseInt(s)),
                r.toGMTString()
    }
}

export default new Cookie();
