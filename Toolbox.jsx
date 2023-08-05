!function (that) {
    function capture(err, message) {
        if (message === void 0) { message = ''; }
    }
    var b = {
        set_fns_name: function () {
            b.map(function (fn, key) {
                if (fn instanceof Function) {
                    fn._name = key;
                }
            });
        },
        set_undo_group: function (fn) {
            return function () {
                app.beginUndoGroup("ToolBox.".concat(fn._name));
                fn.call(b);
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
        get_selected_comps: function () {
            var comps = app.project.selection.filter(function (e) { return e instanceof CompItem; });
            comps.checkLength('请在项目面板中选择合成');
            return comps;
        },
        get_selected_layers: function () {
            return b.get_active_comp().selectedLayers;
        },
        get_selected_properties: function () {
            var layers = b.get_selected_layers();
            var properties = [];
            layers.map(function (layer) {
                properties = properties.concat(layer.selectedProperties);
            });
            return properties;
        },
        add_layer: function () {
            return b.get_active_comp().layers.addShape();
        },
        add_solid_layer: function (bgColor) {
            if (bgColor === void 0) { bgColor = [0.5, 0.5, 0.5, 1]; }
            var layer = b.add_layer();
            layer.name = 'Solid';
            var contents = layer.property('ADBE Root Vectors Group').is(PropertyGroup);
            contents.addProperty('ADBE Vector Shape - Rect').property('Size').is(Property).setValue([layer.width, layer.height]);
            contents.addProperty('ADBE Vector Graphic - Fill').property('Color').is(Property).setValue(bgColor);
            return layer;
        },
        add_adjustment_layer: function () {
            var layer = b.add_solid_layer();
            layer.name = 'Adjustment';
            layer.label = 5;
            layer.adjustmentLayer = true;
            return layer;
        },
        add_null_layer: function () {
            var layer = b.add_layer();
            layer.name = 'Null';
            layer.label = 1;
            layer.transform.opacity.setValue(0);
            var contents = layer.property('ADBE Root Vectors Group').is(PropertyGroup);
            contents.addProperty('ADBE Vector Shape - Rect');
            return layer;
        },
        add_layer_from_group: function (group) {
            var layer = group.propertyGroup(2);
            if (!(layer instanceof ShapeLayer)) {
                abort('请选择 形状层 - 内容(Contents) 的子属性组');
            }
            var new_layer = layer.duplicate();
            new_layer.name = [layer.name, group.name].join(' - ');
            var contents = new_layer.property('ADBE Root Vectors Group').is(PropertyGroup);
            contents.map(function (e, i) {
                if (i + 1 != group.propertyIndex) {
                    return e;
                }
            }).filter(function (e) { return !!e; }).removeAll();
            return new_layer;
        },
        add_layers_from_selected_groups: function () {
            var properties = b.get_selected_properties();
            var groups = properties.filter(function (e) { return e instanceof PropertyGroup && !(e instanceof MaskPropertyGroup); });
            groups.checkLength('请选择属性组(除蒙版以外)');
            groups.map(function (e) { return (b.add_layer_from_group(e), e); }).removeAll();
        },
        unpack_comp: function (comp_layer) {
            comp_layer.selected = true;
            var containingComp = comp_layer.containingComp, startTime = comp_layer.startTime;
            var layers = comp_layer.source.layers;
            for (var i = 1; i <= layers.length; i++) {
                layers[i].copyToComp(containingComp);
                containingComp.layers[comp_layer.index - 1].startTime += startTime;
            }
            comp_layer.selected = false;
        },
        unpack_selected_comps: function () {
            var layers = b.get_selected_layers();
            var comp_layers = layers.filter(function (layer) {
                layer.selected = false;
                return layer instanceof AVLayer && layer.source instanceof CompItem;
            });
            comp_layers.checkLength('请选择合成图层');
            comp_layers.map(function (e, i) { return (b.unpack_comp(e), e.source); }).removeAll();
        },
        unpack_layer: function (layer) {
            layer.selected = true;
            var contents = layer.property('ADBE Root Vectors Group').is(PropertyGroup);
            var group_array = contents.map(function (e) {
                if (e instanceof PropertyGroup && !(e instanceof MaskPropertyGroup)) {
                    return e;
                }
            });
            group_array.checkLength("".concat(layer.name, " \u56FE\u5C42\u53EA\u6709 ").concat(group_array.length, " \u4E2A\u5C5E\u6027\u7EC4"), 2);
            group_array.map(b.add_layer_from_group, true);
            layer.selected = false;
        },
        unpack_selected_layers: function () {
            var layers = b.get_selected_layers();
            var shape_layers = layers.filter(function (e) {
                e.selected = false;
                return e instanceof ShapeLayer;
            });
            shape_layers.checkLength('请选择形状图层');
            shape_layers.map(function (e) { return (b.unpack_layer(e), e); }).removeAll();
        },
        render: function () {
            app.project.renderQueue.showWindow(true);
            app.project.renderQueue.render();
        },
        render_active_comp: function () {
            b.render_comp(b.get_active_comp());
        },
        render_selected_comps: function () {
            b.get_selected_comps().map(b.render_comp);
        },
        render_comp: function (comp) {
            var item = app.project.renderQueue.items.add(comp);
            b.render_setting(item);
            item.render = true;
        },
        render_setting: function (item) {
            item.outputModule(1).setSettings({
                "Output File Info": {
                    "Base Path": app.project.file.fsName.replace(/\\[^\\]+$/, ''),
                    "Subfolder Path": "render",
                    "File Name": item.comp.name
                }
            });
        },
        fix_expression: function () {
            var maps = [
                ['点', 'Point'],
                ['3D点', '3D Point'],
                ['角度', 'Angle'],
                ['滑块', 'Slider'],
                ['颜色', 'Color'],
                ['复选框', 'Checkbox'],
                ['菜单', 'Menu'],
                ['图层', 'Layer'],
            ];
            switch (app.isoLanguage) {
                case 'zh_CN':
                    maps.map(function (_a) {
                        var zh = _a[0], en = _a[1];
                        return app.project.autoFixExpressions(en, zh);
                    });
                    break;
                case 'en_US':
                    maps.map(function (_a) {
                        var zh = _a[0], en = _a[1];
                        return app.project.autoFixExpressions(zh, en);
                    });
                    break;
                default: break;
            }
        },
        open_lib: function (libName) {
            var lib = $.global[libName];
            lib
                ? (typeof lib.UI === 'function'
                    ? lib.UI()
                    : abort("".concat(libName, " \u5E93\u6CA1\u6709UI\u754C\u9762")))
                : abort("\u7F3A\u5C11\u4F9D\u8D56\u5E93 ".concat(libName, "\n\u8BF7\u628A\u5E93\u6587\u4EF6\u653E\u81F3 Startup \u6587\u4EF6\u5939"));
        },
        open_fn_factory: function (libName) {
            function fn() {
                b.open_lib(libName);
            }
            fn._name = "open_".concat(libName);
            return fn;
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
            win.orientation = "column";
            win.alignChildren = "left";
            win.spacing = -10;
            win.margins = 0;
            return win;
        },
        panel: function (node, text) {
            if (text === void 0) { text = ''; }
            var panel = node.add("panel");
            panel.text = text;
            panel.orientation = "column";
            panel.alignChildren = "left";
            return panel;
        },
        group: function (node) {
            var group = node.add("group");
            group.orientation = "column";
            group.alignChildren = ["left", "center"];
            return group;
        },
        button: function (node, text, onClick) {
            if (text === void 0) { text = ''; }
            if (onClick === void 0) { onClick = function () { }; }
            var button = node.add("button");
            button.text = text;
            button.preferredSize.width = 30;
            button.preferredSize.height = 30;
            button.helpTip = onClick._name || '';
            button.onClick = b.set_undo_group(onClick);
            return button;
        }
    };
    var a = {
        UI: function () {
            var win = u.palette();
            u.button(win, "UC", b.unpack_selected_comps);
            u.button(win, "UL", b.unpack_selected_layers);
            u.button(win, "SS", b.open_fn_factory('ShapeLayerSaver'));
            u.button(win, "AS", b.add_solid_layer);
            u.button(win, "AA", b.add_adjustment_layer);
            u.button(win, "AN", b.add_null_layer);
            u.button(win, "AG", b.add_layers_from_selected_groups);
            u.button(win, "R", b.render_selected_comps);
            u.button(win, "F", b.fix_expression);
            u.show(win);
        },
        init: function () {
            b.set_fns_name();
        },
        test: function () {
            b.set_undo_group(b.unpack_selected_layers)();
        },
        run: function () {
            a.init();
            a.UI();
        }
    };
    a.run();
}(this);
