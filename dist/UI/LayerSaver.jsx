(function (that) {
    var b = cubx.b, u = cubx.u, f = cubx.f;
    var config = {
        user: {
            auto_updata: true
        },
        name: 'LayerSaver',
        version: 'v1.0',
        updata_url: 'https://raw.githubusercontent.com/Cubxx/My-AfterEffect-Script/main/dist/UI/LayerSaver.jsx',
        root_path: Folder.myDocuments.fsName,
        icons: {
            'import': "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%06%00%00%00%C3%A0w%3D%C3%B8%00%00%00%09pHYs%00%00%0E%C3%83%00%00%0E%C3%83%01%C3%87o%C2%A8d%00%00%00%19tEXtSoftware%00www.inkscape.org%C2%9B%C3%AE%3C%1A%00%00%01%06IDATH%C2%89%C3%AD%C3%95%C2%B1J%C3%83P%14%06%C3%A0%C2%AF%C2%AD%08%C2%82%C2%AB%C3%AD%23%18PQp%C3%AB%22%05_%C3%87%07%C3%AB%C3%A0%C3%AA%26%C3%A2%03%08%1D%C2%AB%2FPpvq%C3%90%C3%AB%C3%A0%09%C3%9Eh%C2%9A%26%C2%81%C2%82C%7F%C3%B89I%C3%8E9%C3%BF%7F%C3%AF!%C2%B9%19%C2%A4%C2%94l%13%C3%83%C2%AD%C2%AA%C3%B70%C2%B8%09%C2%B6%C3%86%C2%A0%C3%A3%C2%88%1E%22%C3%8E%C3%9A6%C3%BC%C2%BB%11%C3%AD%0Cv%06%C3%9D%0C%C3%86%C2%B8E%C3%91PSD%C3%8D%C2%B8%C2%8F%01L%7D%7F%5Cu%26E%C3%A4%C2%A6M%02M%06%C2%AF%C2%B8%C3%82'%1Eq%C2%92%C3%A5%C2%8Eq%C2%8F%01%C2%AE%C2%A3%C2%B6%16m%C2%8E%C2%8Ar%C2%A5%C3%B0%16%C3%B10%C3%A2%0C%C3%8B%C3%86%C3%AE%C2%94R%C3%89%C2%A3%C2%A0%1A%16)%C2%A5U%C3%BA%C3%81*%C2%9E%C3%95%C3%95Vt%C3%B2%C3%84%5D%C2%B0%C2%AE)7i%12%C3%BF%C2%A3%C2%B3%C2%97m%C3%A6%60%C3%83%C2%A8%C2%968%C2%8F%C3%AB%C2%B53%C3%BF%C2%AD%C2%93%1B%24%C2%8C6%C2%984%09%C2%97%18%C3%A2%23%C2%BF)%C3%B1%C2%82SLZ%C2%88%C2%AC%C3%83%04g%C2%A1%C2%85%C3%AA%5BT%C3%A0%09%C3%AFX%C3%A4%C2%ABh%C2%89%11.%C2%B0%C2%8FK%3CS%C3%9D%C3%812%12%C3%B3%1E%C3%A2%C2%A2g%C2%9E%C2%8B%C3%93%C3%BD%C2%97%C3%99%19%5B%3F%C3%AC%C2%BE%00%7B%7D%C3%87%C2%97%C3%97%C3%B7%05%0E%00%00%00%00IEND%C2%AEB%60%C2%82",
            'export': "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%06%00%00%00%C3%A0w%3D%C3%B8%00%00%00%09pHYs%00%00%0E%C3%83%00%00%0E%C3%83%01%C3%87o%C2%A8d%00%00%00%19tEXtSoftware%00www.inkscape.org%C2%9B%C3%AE%3C%1A%00%00%00%C3%ACIDATH%C2%89%C3%AD%C2%95%C3%81%09%C3%82%40%10E_%C2%8C%08%16%20%C2%B6%20b%40%C2%B0%0B%C2%9B%C2%B0%13%C2%AFzK%0D%1E%C2%ADB%1B%10%3C%C2%89%C3%9A%C2%82%05%C2%88%C2%88%C2%8C%C2%97%C2%91%C3%8CJ4cd%C3%81%C2%83%1F%C2%86%C2%B0%C3%99%C2%9D%C3%B7%C2%B2%C2%B0K%12%11!f%1AQ%C3%A95%04S-%7FD%C3%84%5B%C2%B9%14%C3%89%C2%BD%7D%C2%9F%C3%82%C2%AFZn%C2%89%07%3E7%C3%80%C2%B5%C2%88%C2%ACDdf%C3%9E%25%C3%9F%08r%03B%C3%A1%C2%AB%17s%1F%0B%C2%B2%12%C2%80%15XIVw%07%C3%BD%C2%A7%C3%B1%C2%B3%C2%A0lMPU%C3%87t%C3%A78%C2%88o%C3%97%C3%BC%C3%9CE%C3%BB%0B%C3%A2%0A%3AZ%C3%9F%26%C3%A04%C3%8D%C3%84B%C2%9F%C3%A37%C3%8Dg%C2%87%20%C3%A0XA%C3%9B%C3%91%3Cq%C2%AC%098V%20%40Z%C3%91%7Cr%08%1A%C3%80%C3%8D%0E%1E9%02%03%C2%A0%C3%AB%C2%80%C2%BCJ%17%C3%88%C2%94%05%40%22%C3%85%3F%C2%B9%07l%C2%80%0B%C2%B0%C2%B5_%C3%A1L%0A%0C%C2%81%160%02%0E%10%C3%AE%60%C2%AF%13%C3%8B%1Ap%C2%B4gi%C3%A1%10%C3%AE%20J%C2%A2_%C2%B4%3B%C3%81n%C3%A7%C2%99%C3%97X!%20%00%00%00%00IEND%C2%AEB%60%C2%82",
            'setting': "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%06%00%00%00%C3%A0w%3D%C3%B8%00%00%00%09pHYs%00%00%0E%C3%83%00%00%0E%C3%83%01%C3%87o%C2%A8d%00%00%00%19tEXtSoftware%00www.inkscape.org%C2%9B%C3%AE%3C%1A%00%00%01%C3%8AIDATH%C2%89%C2%B5%C2%961OTA%10%C3%87%7F%C3%8F%1C%0D%C3%98%5C%C2%BCB%13%40L%2C%C3%BD%02%C3%84%0Eb)%C2%85V%C2%B4B%C3%81%C3%A9U%C3%9A%C3%B3%254%C3%A1%1B(%C2%B1C%0B*%0B!!%C3%81%C2%B34jabB%C2%A3%05t'R%20%3F%C2%8B%1B%C3%A2%C3%B2%C3%9Cw%C3%AF%12%C3%B2%26%C2%99%C3%A4%C3%AD%7F%C3%BF%3B%C2%B3%3B%3B3%C3%BB%0A%C2%95%26%C3%A5J%C2%A3%C3%96%C2%81%C3%96%C2%98%C2%BC%C2%BB%40%0F%C3%A8%C3%84%C3%B8%10x%0E%C3%AC%C3%95-%2C%C3%86%08%C3%91U%C3%A0%1B0%00%C2%BE%07v%2B%C3%B0%C3%9B%C2%81W%C2%8BZ%C2%A7%0B%0Ee%C2%A1%06%C3%8Bj%0E%5CT%C3%B7%C3%95%1D%C3%B5%C2%A9%C2%BA%C2%AD%C3%BEV%C3%9B%09%C2%A7%1D%C3%98vpvb%C3%8D%C2%BD%3A%07%C2%B3%C3%AA%2F%C2%B5%C2%AF~%C2%88%5D%0E%C3%94G%C2%99%C2%8D%C2%AC%C3%84%C2%9C%C3%81%C3%AD%C2%AB%C3%87%C3%AA%C3%8DQ%0E%5E%C2%85%C2%83%C2%99%18w%C3%94%C3%89%11!%C2%98%0A%0E%C3%AAt8%C3%9C%C2%ACr0%C2%A7%C2%9E%C2%A9%C3%AB%19C-uM%7D%1D%C2%BA%16X%C2%99%C2%B7%1E6%C3%A6%C3%8E%C2%B1%C2%B4%0En%00E%C2%A4%60*-%C3%A0%1D%C2%B0%01%C3%9C%09%C3%9D%08%C2%AC%C2%9C%C3%A6Ga%C3%A3zU%16%C2%BD%C2%89%1D%C3%B4%12%C2%AC%1B%C3%98r%C2%82-%07%C3%96M%C2%B0%5E%60%5B%C2%A3%C3%AE%60B%7D%C2%AB%1E%C2%96%C3%AE%C3%A5K%26%1C_%C3%95%C2%97%C3%89%C3%B8(%C3%96N%C2%A4%C2%BC%C2%AAVa%C3%A9%C2%BB%C3%88p%C2%8A%0C%2Fc%C3%A9%C3%A2%C2%AE%C2%B6%C2%9A%0C%C3%91%C2%BCCy%C2%9C%C3%89%C2%A0%C3%B71%C3%B79%C3%94%C3%80%C3%8A%C2%99%C3%B4%24%C3%A6%C3%A6s!%C3%BA%11%C3%87%C3%AC%C2%94%0Ey%0A%2C%02%5D%C3%A0Sh7%C2%B0%C3%93%12%C3%B7Z%C3%98%C3%B8Y%15%C2%A2M%C2%87%C2%856%C3%AD%C2%BFB%C2%9B%C3%8A%5Cp%C2%AE%C3%90fbme%C2%A1%C2%9D%C2%B7%C2%8Ac%C3%BFo%15%2B%19%C3%A3%C2%AB%5El%15%1F%C3%83%C3%81%C3%AC%C2%A8%2C%3A%00%C3%AE%03g%C3%80%09%C3%B0%0C%C3%98%05%5E%00%C3%AD%C2%84%C3%97f%C3%B8%1E%C3%AC%06%C3%A7%04%C3%B8%03%2C%C2%85%C2%8D%C3%8A%2C%C3%8A%C3%A9%C2%A5%C3%9Au%C3%A3%0F%C3%8E8o%C3%B2%00x%08%C3%B4%13%C2%AC%0F%3C%C2%A83%0E%C3%A3%3D%C2%99%C2%97%C2%92%C3%86%C3%BF*%C3%BE%02%1D%C3%95%C3%A0%C3%AE%C2%95%C3%9E%02%C3%92%00%00%00%00IEND%C2%AEB%60%C2%82"
        }
    };
    var KeyframeData = (function () {
        function KeyframeData(property) {
            this.InInterpolationType = KeyframeInterpolationType.LINEAR;
            this.OutInterpolationType = KeyframeInterpolationType.LINEAR;
            this.InTemporalEase = [new KeyframeEase(0, 0.1)];
            this.OutTemporalEase = [new KeyframeEase(0, 0.1)];
            this.TemporalAutoBezier = false;
            this.TemporalContinuous = false;
            this.Time = 0;
            this.Value = null;
            if (KeyframeData.isSpatial(property)) {
                this.SpatialAutoBezier = false;
                this.SpatialContinuous = false;
                this.InSpatialTangent = [0, 0];
                this.OutSpatialTangent = [0, 0];
                this.Roving = false;
            }
        }
        KeyframeData.isSpatial = function (property) {
            return !![PropertyValueType.TwoD_SPATIAL, PropertyValueType.ThreeD_SPATIAL].filter(function (e) { return e === property.propertyValueType; }).length;
        };
        return KeyframeData;
    }());
    var c = {
        _any2obj: {
            'object[]': function (v) {
                v.map(function (e, i, arr) {
                    c.set_property_data(i, arr[i], arr);
                });
                return v;
            },
            'MarkerValue': function (v) { return v; },
            'Shape': function (v) { return v; },
            'TextDocument': function (v) {
                var obj = {};
                [
                    'applyFill',
                    'applyStroke',
                    'fillColor',
                    'font',
                    'fontSize',
                    'justification',
                    'leading',
                    'strokeColor',
                    'strokeOverFill',
                    'strokeWidth',
                    'text',
                    'tracking',
                ].concat(v.boxText ? [
                    'boxTextPos',
                    'boxTextSize',
                ] : []).map(function (key) {
                    obj[key] = v[key];
                });
                return obj;
            },
            'KeyframeEase': function (v) { return v; },
            'KeyframeData': function (v) {
                v.each(function (value, key, obj) {
                    c.set_property_data(key, obj[key], obj);
                });
                return v;
            }
        },
        _obj2any: {
            'object[]': function (v) {
                return v.map(function (e, i, arr) { return c.get_property_data(i, arr); });
            },
            'MarkerValue': function (v) { return new MarkerValue(''); },
            'Shape': function (v) {
                var obj = new Shape();
                v.each(function (value, key) { obj[key] = value; });
                return obj;
            },
            'TextDocument': function (v) { return v; },
            'KeyframeEase': function (v) {
                var speed = v.speed, influence = v.influence;
                return new KeyframeEase(speed, influence < 0.1 ? 0.1 : influence);
            },
            'KeyframeData': function (v) {
                var obj = {};
                v.each(function (value, key) {
                    obj[key] = c.get_property_data(key, v);
                });
                return obj;
            }
        },
        type: function (value) {
            var type = value.constructor.name;
            switch (type) {
                case 'MarkerValue': return type;
                case 'Shape': return type;
                case 'TextDocument': return type;
                case 'KeyframeEase': return type;
                case 'KeyframeData': return type;
            }
            if (value instanceof Array) {
                if (value.length === 0) {
                    return;
                }
                else if (value.filter(function (e) { return typeof e === 'object'; }).length === value.length) {
                    return 'object[]';
                }
            }
        },
        set_property_data: function (key, value, data) {
            var type = c.type(value);
            if (type) {
                data[key] = c._any2obj[type](value);
                data[key]['@type'] = type;
            }
            else {
                data[key] = value;
            }
        },
        get_property_data: function (key, data) {
            var value = data[key];
            var type = value['@type'];
            if (type) {
                delete value['@type'];
                return c._obj2any[type](value);
            }
            else if (c.type(value) === 'object[]') {
                return c._obj2any['object[]'](value);
            }
            return value;
        }
    };
    var l = {
        recur_factory: (function (mode, _a) {
            var _b = _a.GroupFn, GroupFn = _b === void 0 ? function (p, d) { return true; } : _b, _c = _a.PropertyFn, PropertyFn = _c === void 0 ? function (p, d) { return true; } : _c;
            var group_fn = mode + '_group', property_fn = mode + '_property';
            return function recur(p, d) {
                if (p instanceof PropertyGroup || p instanceof MaskPropertyGroup) {
                    if (!GroupFn(p, d))
                        return;
                    return l[group_fn](p, d, recur);
                }
                else if (p instanceof Property) {
                    if (!PropertyFn(p, d))
                        return;
                    switch (p.propertyValueType) {
                        case PropertyValueType.NO_VALUE: return;
                        default: return l[property_fn](p, d);
                    }
                }
            };
        }),
        get_group: function (group, data, recur) {
            data['@matchName'] = group.matchName;
            PropertyGroup.prototype.map.call(group, function (property) {
                var value = recur(property, {});
                if (value != null) {
                    data[property.name] = value;
                }
            }, true);
            return data;
        },
        set_group: function (group, data, recur) {
            data.each(function (sub_data, key) {
                if (key[0] === '@') {
                    return;
                }
                if (typeof sub_data !== 'object') {
                    group[key] = sub_data;
                    return;
                }
                var property;
                var matchName = sub_data['@matchName'], name = key;
                if (matchName) {
                    if (group.canAddProperty(matchName)) {
                        property = group.addProperty(matchName);
                        if (group.propertyType === PropertyType.INDEXED_GROUP) {
                            property.name = name;
                        }
                    }
                    else {
                        property = group.property(matchName);
                    }
                }
                else if (name) {
                    property = group.property(name);
                }
                else {
                    abort('属性创建/获取失败:' + name);
                }
                recur(property, sub_data);
            });
            return group;
        },
        get_property: function (property, data) {
            if (data === void 0) { data = {}; }
            function get(key, defalutValue) {
                var _a;
                c.set_property_data(key, (_a = property[key]) !== null && _a !== void 0 ? _a : defalutValue, data);
            }
            if (!property.canVaryOverTime) {
                get('value');
                return data;
            }
            if (property.canSetExpression && property.expression) {
                get('expression');
                get('expressionEnabled');
            }
            if (property.numKeys) {
                var keys = Array(property.numKeys);
                keys.map(function (e, i, arr) {
                    var obj = arr[i] = new KeyframeData(property);
                    obj.each(function (value, key, obj) {
                        obj[key] = property['key' + key](i + 1);
                    });
                });
                get('keys', keys);
            }
            else {
                get('value');
            }
            return data;
        },
        set_property: function (property, data) {
            function convert() {
                var obj = {};
                data.each(function (value, key) {
                    obj[key] = c.get_property_data(key, data);
                });
                return obj;
            }
            var _a = convert(), value = _a.value, expression = _a.expression, expressionEnabled = _a.expressionEnabled, keys = _a.keys;
            if (value != null) {
                if (property.name === 'Source Text') {
                    var val = value;
                    property.setValue(new TextDocument(val.text));
                    val.each(function (v, k) { property.value[k] = v; });
                }
                else {
                    property.setValue(value);
                }
            }
            if (expression) {
                property.expression = expression;
                property.expressionEnabled = expressionEnabled;
            }
            if (keys) {
                if (keys.length === 0)
                    alert('关键帧获取失败', '脚本警告');
                keys.map(function (_a) {
                    var Time = _a.Time, Value = _a.Value;
                    property.setValueAtTime(Time, Value);
                }, true);
                var isSpatial_1 = KeyframeData.isSpatial(property);
                keys.map(function (_a, i) {
                    var InInterpolationType = _a.InInterpolationType, OutInterpolationType = _a.OutInterpolationType, InTemporalEase = _a.InTemporalEase, OutTemporalEase = _a.OutTemporalEase, TemporalAutoBezier = _a.TemporalAutoBezier, TemporalContinuous = _a.TemporalContinuous, SpatialAutoBezier = _a.SpatialAutoBezier, SpatialContinuous = _a.SpatialContinuous, InSpatialTangent = _a.InSpatialTangent, OutSpatialTangent = _a.OutSpatialTangent, Roving = _a.Roving;
                    property.setInterpolationTypeAtKey(i + 1, InInterpolationType, OutInterpolationType);
                    property.setTemporalEaseAtKey(i + 1, InTemporalEase, OutTemporalEase);
                    property.setTemporalAutoBezierAtKey(i + 1, TemporalAutoBezier);
                    property.setTemporalContinuousAtKey(i + 1, TemporalContinuous);
                    if (isSpatial_1) {
                        property.setSpatialTangentsAtKey(i + 1, InSpatialTangent, OutSpatialTangent);
                        property.setSpatialAutoBezierAtKey(i + 1, SpatialAutoBezier);
                        property.setSpatialContinuousAtKey(i + 1, SpatialContinuous);
                        property.setRovingAtKey(i + 1, Roving);
                    }
                }, true);
            }
            return property;
        },
        get_layer: function (layer, propertyNames) {
            if (propertyNames === void 0) { propertyNames = ['']; }
            var data = {};
            [
                'name',
                'comment',
                'startTime',
                'inPoint',
                'outPoint',
                'label',
                'locked',
                'shy',
                'solo',
                'stretch',
                'outPoint',
            ].concat(propertyNames).map(function (key) {
                data[key] = layer[key];
            }, true);
            function defaultFn(p, d) {
                if (p.isModified) {
                    if (p.canSetEnabled && !p.enabled) {
                        d['enabled'] = false;
                    }
                    return true;
                }
            }
            l.get_group(layer, data, l.recur_factory('get', {
                GroupFn: function (p, d) {
                    switch (p.parentProperty.matchName) {
                        case 'ADBE Root Vectors Group': return defaultFn(p, d);
                        case 'ADBE Mask Parade': {
                            [
                                'color',
                                'inverted',
                                'locked',
                                'maskFeatherFalloff',
                                'maskMode',
                                'maskMotionBlur',
                                'rotoBezier',
                            ].map(function (key) {
                                d[key] = p[key];
                            }, true);
                            return true;
                        }
                        case 'ADBE Effect Parade': return true;
                        case 'ADBE Transform Group': return defaultFn(p, d);
                        default: return defaultFn(p, d);
                    }
                },
                PropertyFn: function (p, d) {
                    switch (p.parentProperty.matchName) {
                        case 'ADBE Text Animator Properties': {
                            d['@matchName'] = p.matchName;
                            return defaultFn(p, d);
                        }
                        case 'ADBE Transform Group': {
                            return defaultFn(p, d) && [
                                'X Position',
                                'Y Position',
                            ].filter(function (e) { return e === p.name; })
                                .length === 0;
                        }
                        default: return defaultFn(p, d);
                    }
                }
            }));
            return data;
        },
        set_layer: function (layer, data) {
            return l.set_group(layer, data, l.recur_factory('set', {}));
        }
    };
    var matchTypes = {
        'ADBE Vector Layer': 'Shape',
        'ADBE Text Layer': 'Text',
        'ADBE Camera Layer': 'Camera',
        'ADBE Light Layer': 'Light'
    };
    var h = {
        import_layer: function (data) {
            var layer = b.add_layer(matchTypes[data['@matchName']]);
            l.set_layer(layer, data);
            return layer;
        },
        export_layer: function (layer) {
            if (layer.parent) {
                abort('抱歉，暂不支持导出有父级图层的图层');
            }
            var propertyNames = [
                'adjustmentLayer',
                'autoOrient',
                'blendingMode',
                'effectsActive',
                'frameBlendingType',
                'guideLayer',
                'motionBlur',
                'preserveTransparency',
                'quality',
                'samplingQuality',
                'threeDLayer',
                'trackMatteType',
            ];
            var type = matchTypes[layer.matchName];
            switch (type) {
                case 'Text': {
                    propertyNames.push('threeDPerChar');
                }
                case 'Shape': {
                    layer.canSetCollapseTransformation && propertyNames.push('collapseTransformation');
                    layer.canSetTimeRemapEnabled && propertyNames.push('timeRemapEnabled');
                    break;
                }
                case 'Camera': ;
                case 'Light': ;
                default: abort('图层类型错误: ' + layer.matchName);
            }
            return l.get_layer(layer, propertyNames);
        },
        config_read: function () { config.user = JSON.parse(f.read(p.user_config())); },
        config_write: function () { f.write(p.user_config(), JSON.stringify(config.user)); }
    };
    var p = {
        layers: function () { return [config.root_path, config.name, 'layers'].join('\\'); },
        download: function () { return [config.root_path, config.name, config.name + '.jsx'].join('\\'); },
        local: function () { return [Folder.appPackage.fsName, 'Scripts', 'ScriptUI Panels', config.name + '.jsx'].join('\\'); },
        user_config: function () { return [config.root_path, config.name, 'user.cfg'].join('\\'); }
    };
    var a = {
        init: function () {
            var file = f.repair_path(p.user_config());
            file.exists ? h.config_read() : h.config_write();
            config.user.auto_updata && a.update();
        },
        "import": function () {
            var datas = f.open({ path: p.layers(), filter: '*.json', multi: true });
            if (!datas)
                return;
            datas.each(function (value) {
                h.import_layer(JSON.parse(value));
            });
        },
        "export": function () {
            var layers = b.get_selected_layers();
            var datas = {};
            layers.map(function (layer) {
                var data = h.export_layer(layer);
                datas[layer.name + '.json'] = JSON.stringify(data).replace(/\[\s+\]/g, '[]').replace(/\{\s+\}/g, '{}');
            });
            f.save(datas, { path: p.layers() });
        },
        UI: function () {
            function btn(node, icon, fn) {
                return u.iconbutton(node, icon).assign({
                    preferredSize: [30, 30],
                    onClick: fn && b.set_undo_group(fn)
                });
            }
            var win = u.palette(that).assign({ spacing: -10 });
            btn(win, File.decode(config.icons["import"]), a["import"]);
            btn(win, File.decode(config.icons["export"]), a["export"]);
            btn(win, File.decode(config.icons.setting)).onClick = function () {
                h.config_read();
                var user = config.user;
                var win = u.dialog(void 0, config.name + ' ' + config.version).assign({
                    margins: 10
                });
                var panel = u.panel(win, '更新');
                u.button(panel, '检查更新').assign({
                    alignment: 'fill',
                    onClick: a.update
                });
                u.checkbox(panel, '每次启动时检查更新').assign({
                    value: user.auto_updata,
                    onClick: function () {
                        user.auto_updata = this.value;
                    }
                });
                u.button(win, 'OK').assign({
                    alignment: 'fill',
                    onClick: function () {
                        h.config_write();
                        win.close();
                    }
                });
                u.show(win);
            };
            u.show(win);
        },
        update: function () {
            if ($.os.indexOf('Windows') === -1) {
                return alert('更新失败: 只支持Windows系统');
            }
            var filePath = p.download();
            system.callSystem('cmd /c powershell -Command "echo ' + config.name + '检查更新; Invoke-WebRequest -Uri ' + config.updata_url + ' -OutFile ' + filePath + '"');
            var file = new File(filePath);
            if (!file.exists) {
                return alert('更新失败: 无法下载新脚本');
            }
            var version = f.read(file).match(/version: \'([\s\S]+?)\'/)[1];
            if (typeof version !== 'string') {
                return alert('更新失败: 无法获取版本号');
            }
            if (version === config.version) {
                file.remove();
                alert('已是最新版', version);
            }
            else if (file.copy(p.local())) {
                file.remove();
                alert('更新完成: 请重启程序', version);
            }
            else {
                alert('已下载最新脚本, 请手动覆盖旧脚本\n' + file.fsName, version);
            }
        }
    };
    a.init();
    a.UI();
})(this);
