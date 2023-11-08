(function (that) {
    var b = cubx.b, u = cubx.u;
    function btn(node, text, fn) {
        u.button(node, text).assign({
            preferredSize: [30, 30],
            onClick: b.set_undo_group(fn)
        });
    }
    var win = u.palette(that).assign({ spacing: -10 });
    btn(win, "UC", b.unpack_selected_comps);
    btn(win, "UL", b.unpack_selected_layers);
    btn(win, "AS", b.add_solid_layer);
    btn(win, "AA", b.add_adjustment_layer);
    btn(win, "AN", b.add_null_layer);
    btn(win, "AG", b.add_layers_from_selected_groups);
    btn(win, "R", b.render_selected_comps);
    btn(win, "F", b.fix_expression);
    u.show(win);
})(this);
