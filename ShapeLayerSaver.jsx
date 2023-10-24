(function (that) {
    var KeyframeData = (function () {
        function KeyframeData(property) {
            this.InInterpolationType = KeyframeInterpolationType.LINEAR;
            this.OutInterpolationType = KeyframeInterpolationType.LINEAR;
            this.InTemporalEase = [new KeyframeEase(0, 0.1)];
            this.OutTemporalEase = [new KeyframeEase(0, 0.1)];
            this.TemporalAutoBezier = false;
            this.TemporalContinuous = false;
            this.Time = 0;
            this.Value = {};
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
    var LAYER_PATH = Folder.myDocuments.fsName + '\\ShapeLayerSaver\\layers';
    var b = {
        set_undo_group: function (fn, fn_name) {
            return function () {
                app.beginUndoGroup("ShapeLayerSaver.".concat(fn_name));
                fn();
                app.endUndoGroup();
            };
        },
        get_active_comp: function () {
            var comp = app.project.activeItem;
            if (comp instanceof CompItem) {
                return comp;
            }
            else {
                abort('请在时间轴上打开合成');
            }
        },
        get_selected_layers: function () {
            return b.get_active_comp().selectedLayers;
        },
        add_layer: function () {
            return b.get_active_comp().layers.addShape();
        },
        import_layer: function (data) {
            var layer = b.add_layer();
            l.set_layer(layer, data);
            return layer;
        },
        export_layer: function (layer) {
            if (layer.parent) {
                abort('抱歉，暂不支持导出有父级图层的图层');
            }
            if (layer instanceof ShapeLayer) { }
            else {
                abort('抱歉，目前只支持导出形状层');
                return;
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
            layer.canSetCollapseTransformation && propertyNames.push('collapseTransformation');
            layer.canSetTimeRemapEnabled && propertyNames.push('timeRemapEnabled');
            var data = l.get_layer(layer, propertyNames);
            return JSON.stringify(data).replace(/\[\s+\]/g, '[]').replace(/\{\s+\}/g, '{}');
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
            PropertyGroup.prototype.each.call(group, function (property) {
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
                        property = group.property(name);
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
            function get(key, value) {
                var _a;
                c.set_property_data(key, (_a = property[key]) !== null && _a !== void 0 ? _a : value, data);
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
                        obj[key] = property["key".concat(key)](i + 1);
                    });
                });
                get('keys', keys);
            }
            if (!data['expression'] && !data['keys']) {
                get('value');
            }
            return data;
        },
        set_property: function (property, data) {
            function convert(data) {
                var obj = {};
                data.each(function (value, key) {
                    obj[key] = c.get_property_data(key, data);
                });
                return obj;
            }
            var _a = convert(data), value = _a.value, expression = _a.expression, expressionEnabled = _a.expressionEnabled, keys = _a.keys;
            if (value != null) {
                property.setValue(value);
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
            l.get_group(layer, data, l.recur_factory('get', {
                GroupFn: function (p, d) {
                    switch (p.parentProperty.matchName) {
                        case 'ADBE Root Vectors Group': return fn();
                        case 'ADBE Mask Parade': {
                            [
                                'color',
                                'inverted',
                                'locked',
                                'maskFeatherFalloff',
                                'maskMode',
                                'maskMotionBlur',
                                'rotoBezier'
                            ].map(function (key) {
                                d[key] = p[key];
                            }, true);
                            return true;
                        }
                        case 'ADBE Effect Parade': return true;
                        case 'ADBE Transform Group': return fn();
                        default: return fn();
                    }
                    function fn() {
                        if (p.isModified) {
                            return true;
                        }
                    }
                },
                PropertyFn: function (p, d) {
                    if (p.isModified) {
                        return true;
                    }
                }
            }));
            return data;
        },
        set_layer: function (layer, data) {
            return l.set_group(layer, data, l.recur_factory('set', {}));
        }
    };
    var c = {
        _any2obj: {
            'object[]': function (v) {
                v.map(function (e, i, arr) {
                    c.set_property_data(i + '', arr[i], arr);
                });
                return v;
            },
            'MarkerValue': function (v) { return v; },
            'Shape': function (v) { return v; },
            'TextDocument': function (v) { return v; },
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
                return v.map(function (e, i, arr) { return c.get_property_data(i + '', arr); });
            },
            'MarkerValue': function (v) { return new MarkerValue(''); },
            'Shape': function (v) {
                var obj = new Shape();
                v.each(function (value, key) { obj[key] = value; });
                return obj;
            },
            'TextDocument': function (v) { return new TextDocument(''); },
            'KeyframeEase': function (v) {
                var _a = v, speed = _a.speed, influence = _a.influence;
                return new KeyframeEase(speed, influence < 0.1 ? 0.1 : influence);
            },
            'KeyframeData': function (v) {
                var _obj = {};
                v.each(function (value, key, obj) {
                    _obj[key] = c.get_property_data(key, obj);
                });
                return _obj;
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
    var f = {
        read: function (file) {
            File.isEncodingAvailable('utf-8') || abort('读取文件失败: 系统不支持utf-8');
            file.encoding = 'utf-8';
            file.open('r');
            var text = file.read();
            file.close();
            return text;
        },
        write: function (file, text) {
            File.isEncodingAvailable('utf-8') || abort('写入文件失败: 系统不支持utf-8');
            file.encoding = 'utf-8';
            file.open('w');
            file.write(text);
            file.close();
        },
        multi_open: function (dir) {
            var F = new File(dir);
            var files = F.exists
                ? F.openDlg(void 0, '*.json', true)
                : abort('文件夹路径不存在');
            if (!files)
                return;
            var datas = {};
            files.map(function (file) {
                datas[File.decode(file.name)] = f.read(file);
            });
            return datas;
        },
        multi_save: function (dir, datas) {
            var folder = new Folder(dir).selectDlg();
            if (!folder)
                return;
            if (folder.exists || folder.create()) {
                datas.each(function (text, name) {
                    var filePath = folder.fsName + '/' + name;
                    var file = new File(filePath);
                    if (file.exists) {
                        if (confirm('发现同名文件, 是否覆盖?\n' + name)) {
                            f.write(file, text);
                        }
                    }
                    else {
                        f.write(file, text);
                    }
                });
            }
            else {
                abort('文件夹创建失败\n' + dir);
            }
        }
    };
    var u = {
        show: function (win) {
            win.layout.layout(true);
            win.layout.resize();
            if (win instanceof Window) {
                win.show();
            }
        },
        palette: function () {
            var win = (that instanceof Panel) ? that : new Window("palette", undefined, undefined, { resizeable: true });
            win.orientation = "row";
            win.alignChildren = "center";
            win.margins = 0;
            win.spacing = 5;
            return win;
        },
        button: function (node, text, onClick) {
            if (text === void 0) { text = ''; }
            if (onClick === void 0) { onClick = function () { }; }
            var button = node.add("button");
            button.text = text;
            button.onClick = b.set_undo_group(onClick, text);
            return button;
        }
    };
    var a = {
        import_layers: function (path) {
            var datas = f.multi_open(path);
            if (!datas)
                return;
            datas.each(function (value) {
                b.import_layer(JSON.parse(value));
            });
        },
        export_layers: function (path) {
            var layers = b.get_selected_layers();
            layers.checkLength('请先选择图层');
            var datas = {};
            layers.map(function (layer) {
                datas[layer.name + '.json'] = b.export_layer(layer);
            });
            f.multi_save(path, datas);
        },
        UI: function () {
            var win = u.palette();
            u.button(win, '导入', function () {
                a.import_layers(LAYER_PATH);
            });
            u.button(win, '导出', function () {
                a.export_layers(LAYER_PATH);
                alert("\u5BFC\u51FA\u7ED3\u675F, \u8BF7\u67E5\u770B\u6587\u4EF6\u5939\n".concat(LAYER_PATH));
            });
            win.onResizing = win.onResize = function () {
                win.layout.resize();
            };
            u.show(win);
        }
    };
    return typeof ShapeLayerSaver === "undefined" ? (ShapeLayerSaver = a) : a;
})(this).UI();
