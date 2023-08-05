function abort(message) {
    alert(message, 'Abort');
    throw message;
}
(function () {
    function map_factory(data, getLength) {
        if (getLength === void 0) { getLength = function (arr) { return arr['length']; }; }
        var len = getLength(data);
        if (typeof len !== 'number') {
            abort('无法获取数据集长度');
            return;
        }
        return function (getValue) {
            return function (fn, order) {
                var array = [];
                for (var i = len - 1; i >= 0; i--) {
                    var index = order ? len - 1 - i : i;
                    var e = fn(getValue(data, index), index, data);
                    if (e != null) {
                        array[index] = e;
                    }
                }
                return array;
            };
        };
    }
    Array.prototype.map = function (fn, order) {
        return map_factory(this)(function (arr, i) { return arr[i]; })(fn, order);
    };
    Array.prototype.filter = function (fn) {
        var old_array = this;
        var new_array = [];
        for (var i = 0; i < old_array.length; i++) {
            var e = old_array[i];
            if (fn(e, i, old_array)) {
                new_array.push(e);
            }
        }
        return new_array;
    };
    Array.prototype.checkLength = function (message, minLength) {
        if (minLength === void 0) { minLength = 1; }
        if (this.length < minLength) {
            abort(message);
        }
    };
    Array.prototype.removeAll = function () {
        var arr = this;
        var obj = {};
        var group_info_arr = arr.map(function (e, i) {
            if (e instanceof PropertyGroup) {
                var parentProperty = e.parentProperty, propertyIndex = e.propertyIndex;
                return { parentProperty: parentProperty, propertyIndex: propertyIndex };
            }
            else {
                obj[i] = e;
            }
        }).filter(function (e) { return !!e; });
        group_info_arr.map(function (_a) {
            var parentProperty = _a.parentProperty, propertyIndex = _a.propertyIndex;
            parentProperty(propertyIndex).remove();
        });
        obj.map(function (value) { return value.remove(); });
    };
    Object.prototype.is = function (className) {
        if (this instanceof className) {
            return this;
        }
        else {
            abort("\u6570\u636E\u7C7B\u578B\u4E0D\u4E3A ".concat(className));
        }
    };
    Object.prototype.map = function (fn, newObj) {
        if (newObj === void 0) { newObj = {}; }
        var obj = this;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var e = fn(obj[key], key, obj);
                if (e != null) {
                    newObj[key] = e;
                }
            }
        }
        return newObj;
    };
    PropertyGroup.prototype.map = function (fn, order) {
        return map_factory(this, function (arr) { return arr.numProperties; })(function (arr, i) { return arr(i + 1); })(fn, order);
    };
    MaskPropertyGroup.prototype.map = function (fn, order) {
        return map_factory(this, function (arr) { return arr.numProperties; })(function (arr, i) { return arr(i + 1); })(fn, order);
    };
})();
