! function(a, b, c, d) {
    "use strict";

    function e(b, c) {
        g = this, this.element = a(b), this.options = a.extend({}, h, c), this._defaults = h, this._name = f, this.init()
    }
    var f = "ripples",
        g = null,
        h = {};
    e.prototype.init = function() {
        var c = this.element;
        c.on("mousedown touchstart", function(d) {
            if (!g.isTouch() || "mousedown" !== d.type) {
                c.find(".ripple-wrapper").length || c.append('<div class="ripple-wrapper"></div>');
                var e = c.children(".ripple-wrapper"),
                    f = g.getRelY(e, d),
                    h = g.getRelX(e, d);
                if (f || h) {
                    var i = g.getRipplesColor(c),
                        j = a("<div></div>");
                    j.addClass("ripple").css({
                        left: h,
                        top: f,
                        "background-color": i
                    }), e.append(j),
                        function() {
                            return b.getComputedStyle(j[0]).opacity
                        }(), g.rippleOn(c, j), setTimeout(function() {
                        g.rippleEnd(j)
                    }, 500), c.on("mouseup mouseleave touchend", function() {
                        j.data("mousedown", "off"), "off" === j.data("animating") && g.rippleOut(j)
                    })
                }
            }
        })
    }, e.prototype.getNewSize = function(a, b) {
        return Math.max(a.outerWidth(), a.outerHeight()) / b.outerWidth() * 2.5
    }, e.prototype.getRelX = function(a, b) {
        var c = a.offset();
        return g.isTouch() ? (b = b.originalEvent, 1 !== b.touches.length ? b.touches[0].pageX - c.left : !1) : b.pageX - c.left
    }, e.prototype.getRelY = function(a, b) {
        var c = a.offset();
        return g.isTouch() ? (b = b.originalEvent, 1 !== b.touches.length ? b.touches[0].pageY - c.top : !1) : b.pageY - c.top
    }, e.prototype.getRipplesColor = function(a) {
        var c = a.data("ripple-color") ? a.data("ripple-color") : b.getComputedStyle(a[0]).color;
        return c
    }, e.prototype.hasTransitionSupport = function() {
        var a = c.body || c.documentElement,
            b = a.style,
            e = b.transition !== d || b.WebkitTransition !== d || b.MozTransition !== d || b.MsTransition !== d || b.OTransition !== d;
        return e
    }, e.prototype.isTouch = function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }, e.prototype.rippleEnd = function(a) {
        a.data("animating", "off"), "off" === a.data("mousedown") && g.rippleOut(a)
    }, e.prototype.rippleOut = function(a) {
        a.off(), g.hasTransitionSupport() ? a.addClass("ripple-out") : a.animate({
            opacity: 0
        }, 100, function() {
            a.trigger("transitionend")
        }), a.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
            a.remove()
        })
    }, e.prototype.rippleOn = function(a, b) {
        var c = g.getNewSize(a, b);
        g.hasTransitionSupport() ? b.css({
            "-ms-transform": "scale(" + c + ")",
            "-moz-transform": "scale(" + c + ")",
            "-webkit-transform": "scale(" + c + ")",
            transform: "scale(" + c + ")"
        }).addClass("ripple-on").data("animating", "on").data("mousedown", "on") : b.animate({
            width: 2 * Math.max(a.outerWidth(), a.outerHeight()),
            height: 2 * Math.max(a.outerWidth(), a.outerHeight()),
            "margin-left": -1 * Math.max(a.outerWidth(), a.outerHeight()),
            "margin-top": -1 * Math.max(a.outerWidth(), a.outerHeight()),
            opacity: .2
        }, 500, function() {
            b.trigger("transitionend")
        })
    }, a.fn.ripples = function(b) {
        return this.each(function() {
            a.data(this, "plugin_" + f) || a.data(this, "plugin_" + f, new e(this, b))
        })
    }
}(jQuery, window, document);
//# sourceMappingURL=ripples.min.js.map

! function(a) {
    function b(a) {
        return "undefined" == typeof a.which ? !0 : "number" == typeof a.which && a.which > 0 ? !a.ctrlKey && !a.metaKey && !a.altKey && 8 != a.which && 9 != a.which : !1
    }
    a.expr[":"].notmdproc = function(b) {
        return a(b).data("mdproc") ? !1 : !0
    }, a.material = {
        options: {
            input: !0,
            ripples: !0,
            checkbox: !0,
            togglebutton: !0,
            radio: !0,
            arrive: !0,
            autofill: !1,
            withRipples: [".btn:not(.btn-link)", ".card-image", ".navbar a:not(.withoutripple)", ".dropdown-menu a", ".nav-tabs a:not(.withoutripple)", ".withripple"].join(","),
            inputElements: "input.form-control, textarea.form-control, select.form-control",
            checkboxElements: ".checkbox > label > input[type=checkbox]",
            togglebuttonElements: ".togglebutton > label > input[type=checkbox]",
            radioElements: ".radio > label > input[type=radio]"
        },
        checkbox: function(b) {
            a(b ? b : this.options.checkboxElements).filter(":notmdproc").data("mdproc", !0).after("<span class=checkbox-material><span class=check></span></span>")
        },
        togglebutton: function(b) {
            a(b ? b : this.options.togglebuttonElements).filter(":notmdproc").data("mdproc", !0).after("<span class=toggle></span>")
        },
        radio: function(b) {
            a(b ? b : this.options.radioElements).filter(":notmdproc").data("mdproc", !0).after("<span class=circle></span><span class=check></span>")
        },
        input: function(c) {
            a(c ? c : this.options.inputElements).filter(":notmdproc").data("mdproc", !0).each(function() {
                var b = a(this);
                if (a(this).attr("data-hint") || b.hasClass("floating-label")) {
                    if (b.wrap("<div class=form-control-wrapper></div>"), b.after("<span class=material-input></span>"), b.hasClass("floating-label")) {
                        var c = b.attr("placeholder");
                        b.attr("placeholder", null).removeClass("floating-label"), b.after("<div class=floating-label>" + c + "</div>")
                    }
                    if (b.attr("data-hint") && b.after("<div class=hint>" + b.attr("data-hint") + "</div>"), (null === b.val() || "undefined" == b.val() || "" === b.val()) && b.addClass("empty"), b.parent().next().is("[type=file]")) {
                        b.parent().addClass("fileinput");
                        var d = b.parent().next().detach();
                        b.after(d)
                    }
                }
            }), a(document).on("change", ".checkbox input[type=checkbox]", function() {
                a(this).blur()
            }).on("keydown paste", ".form-control", function(c) {
                b(c) && a(this).removeClass("empty")
            }).on("keyup change", ".form-control", function() {
                var b = a(this);
                "" === b.val() && "undefined" != typeof b[0].checkValidity && b[0].checkValidity() ? b.addClass("empty") : b.removeClass("empty")
            }).on("focus", ".form-control-wrapper.fileinput", function() {
                a(this).find("input").addClass("focus")
            }).on("blur", ".form-control-wrapper.fileinput", function() {
                a(this).find("input").removeClass("focus")
            }).on("change", ".form-control-wrapper.fileinput [type=file]", function() {
                var b = "";
                a.each(a(this)[0].files, function(a, c) {
                    b += c.name + ", "
                }), b = b.substring(0, b.length - 2), b ? a(this).prev().removeClass("empty") : a(this).prev().addClass("empty"), a(this).prev().val(b)
            })
        },
        ripples: function(b) {
            a(b ? b : this.options.withRipples).ripples()
        },
        autofill: function() {
            var b = setInterval(function() {
                a("input[type!=checkbox]").each(function() {
                    a(this).val() && a(this).val() !== a(this).attr("value") && a(this).trigger("change")
                })
            }, 100);
            setTimeout(function() {
                clearInterval(b)
            }, 1e4);
            var c;
            a(document).on("focus", "input", function() {
                var b = a(this).parents("form").find("input").not("[type=file]");
                c = setInterval(function() {
                    b.each(function() {
                        a(this).val() !== a(this).attr("value") && a(this).trigger("change")
                    })
                }, 100)
            }).on("blur", "input", function() {
                clearInterval(c)
            })
        },
        init: function() {
            a.fn.ripples && this.options.ripples && this.ripples(), this.options.input && this.input(), this.options.checkbox && this.checkbox(), this.options.togglebutton && this.togglebutton(), this.options.radio && this.radio(), this.options.autofill && this.autofill(), document.arrive && this.options.arrive && (a.fn.ripples && this.options.ripples && a(document).arrive(this.options.withRipples, function() {
                a.material.ripples(a(this))
            }), this.options.input && a(document).arrive(this.options.inputElements, function() {
                a.material.input(a(this))
            }), this.options.checkbox && a(document).arrive(this.options.checkboxElements, function() {
                a.material.checkbox(a(this))
            }), this.options.radio && a(document).arrive(this.options.radioElements, function() {
                a.material.radio(a(this))
            }), this.options.togglebutton && a(document).arrive(this.options.togglebuttonElements, function() {
                a.material.togglebutton(a(this))
            }))
        }
    }
}(jQuery);
//# sourceMappingURL=material.min.js.map