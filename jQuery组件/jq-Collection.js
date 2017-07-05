/* 
 * @Author: zhg
 * @Date:   2017-04-15 09:13:08
 * @Last Modified by:   anchen
 * @Last Modified time: 2017-07-05 22:23:01
 */
;$(function(undefined) {

    var activeAssembly = {
        dialog: {},
        _html: {},
        mask: {}
    };
    window.activeAssembly = activeAssembly;

    var $window = $(window);
    var $body = $("body");

    activeAssembly.mask.creatMask = function(item, id) {
        var _html = $("<div id='globalMarkDiv'>").css({
            "position": "absolute",
            "top": 0,
            "left": 0,
            "bottom": 0,
            "right": 0,
            "z-index": 999
        })
        if ($(document).find($(id)).length != 0) {
            return;
        }
        _html.append(item);
        $body.append(_html);
        var dynamicMarginTop = ($window.height() / 2) - ($(id).height() / 2);
        $(id).css({
            "margin-top": (dynamicMarginTop - 20) + "px"
        })
    }

    activeAssembly.mask.hidemask = function() {
        $("#globalMarkDiv").stop(true).fadeOut('fast');
        setTimeout(function() {
            $("#globalMarkDiv").remove();
        }, 300)
    }

    activeAssembly.dragEffect = function(box, drag) {
        var top, left, disX, disY, flag = false;
        var clientW = $(box).width();
        var clientH = $(box).height();
        $(drag).on({
            "mousedown": function(event) {
                event.stopPropagation();
                $(drag).css("cursor", "move");
                disX = event.pageX - parseInt($(box).css("left"));
                disY = event.pageY - parseInt($(box).css("top"));
                flag = true;
            }
        });
        $(document).on({
            "mousemove": function(event) {
                if (flag === true) {
                    left = event.pageX - disX;
                    top = event.pageY - disY;
                    var maxX = $window.width() - clientW / 2;
                    var maxY = $window.height() - clientH / 2;
                    left = Math.min(maxX, Math.max(0, left));
                    top = Math.min(maxY, Math.max(0, top));
                    $(box).css({
                        "left": left + "px",
                        "top": top + "px"
                    });
                };
            },
            "mouseup": function(event) {
                $(drag).css("cursor", "default");
                flag = false;
            }
        });
    }

    activeAssembly.miniFrame = function(parameter) {
        var defaults = {
            prefix: "miniFrame",
            content: "内容",
            title: "标题",
            width: 500,
            left: 10,
            top: 10,
            background: '#FFFFFF',
            beforeOpen: function() {},
            afterClose: function() {}
        };
        var options = $.extend({}, defaults, parameter);
        var domStorage = $(options.content).clone();
        return this.each(function() {
            var _this = $(this);
            if (_this.next().hasClass('miniFrame')) {
                return;
            }
            var offLeft = _this.offset().left;
            var offTop = _this.offset().top;
            var $closeBtn = $("<span class='close-btn'></span>");
            $closeBtn.on("click", function(e) {
                e.stopPropagation();
                $(this).parent().parent().remove();
                if (options.afterClose) {
                    options.afterClose()
                }
            })
            var $title = $("<div class='drag-to'>").text(options.title).append($closeBtn);
            var $container = $('<div id="' + options.prefix + '" class="miniFrame">').css({
                "top": offTop + options.top,
                "left": offLeft + _this.width() + options.left,
                "width": options.width,
                "height": 200,
                "z-index": 999,
                "background": options.background
            }).append($title).append($(domStorage).show());
            if (options.beforeOpen) {
                options.beforeOpen();
            }
            _this.after($container);
            var dragTarget = "#" + options.prefix;
            activeAssembly.dragEffect(dragTarget, ".drag-to")
        })
    }
    activeAssembly.passwordFrame = function() {
        return this.each(function() {
            var _html = '<div id="mark">' + '<div class="ope">' + '<p class="tid">输入密码</p>' + '<div class="jsip">' + '<label for="code">ow</label>' + '<input type="password" id="code"/>' + '<span class="eye">小</span>' + '</div>' + '<p class="btn">' + '<button class="success-btn">确定</button>' + '</p>' + '</div>' + '</div>';
            $(_html).show().addClass("animated flipInX").appendTo($body);
            $(".eye").on("click", function() {
                ($("#code").attr("type") == "password") ? $("#code").prop("type", "text"): $("#code").prop("type", "password");
            })
            $(".ope").on("click", function(e) {
                e.stopPropagation();
            })
            $("#mark").click(function() {
                $(".ope").toggleClass("animated shake")
            })
        })
    }
    activeAssembly.timeFrame = function(element,callback) {
        return this.each(function() {
            
            var $this = $(this);
            $this.css("position","relative");
            
            var hour = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
                minutes = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
            var _this = $(this),
                offLeft = _this.offset().left,
                offTop = _this.offset().top;
            var html = '<div id="chooseTime">' + '<div class="time-head">' + '<span>选择时间</span>' + '<input type="text" class="one"/>' + '<span>至</span>' + '<input type="text" class="two"/>' + '</div>' + '<ul class="minute">';
            $.each(hour, function() {
                html += '<li>' + this + '</li>'
            })
            html += '<p class="describe">小时</p>' + '</ul>' + '<ul class="hour">';
            $.each(minutes, function() {
                html += '<li>' + this + '</li>'
            })
            html += '<p class="describe">分钟</p>' + '</ul>' + '</div>';
            if ($body.find("#chooseTime").length != 0) {
                $body.find("#chooseTime").remove();
            }
            if ($this.find("#chooseTime").length != 0) {
                return;
            }
            $(html).show().appendTo($this);
        
            $("#chooseTime").css({
                "position": "absolute",
                "left":  10 + "px",
                "top": 40 + "px",
                "z-index": 999
            })
            
            var flag, min, hou, time;
            $(".one").trigger('focus');
            $(".two").focus(function() {
                if ($(".one").val() == '') {
                    $(document).prompt("fail", "请选择开始时间");
                    $(".one").trigger('focus');
                    return;
                }
                flag = 2;
            });
            $(".minute").click(function(event) {
                event.stopPropagation();
                if (event.target.nodeName == "LI") {
                    min = event.target.innerText;
                }
                (flag == 2) ? $(".two").attr("value", min): $(".one").attr("value", min);
            })
            $(".hour").click(function(event) {
                event.stopPropagation();
                if (!min) {
                    $(document).prompt("fail", "请先选择小时！");
                    return;
                }
                if (event.target.nodeName == "LI") {
                    hou = event.target.innerText;
                } else {
                    return;
                }
                time = min + ":" + hou;
                if (flag == 2) {
                    $(".two").attr("value", time);
                    if(arguments.length == 1){
                          $(element).find(".end").attr("data-time", time).val(time);
                    }
           
                    window.timeFrameAboutEndTime = time;
                    
                    if(callback && typeof callback == "function"){
                        callback();
                    };
                    
                    setTimeout(function() {
                        $("#chooseTime").stop().fadeOut();
                        $("#chooseTime").remove();
                    }, 100)
                } else {
                    $(".one").attr("value", time);
                    min = '';
                    if(arguments.length == 1){
                        $(element).find(".start").attr("data-time", time).val(time);
                      }
                      window.timeFrameAboutStartTime = time;
                      
                    $(".two").focus();
                }
            })
            $("#chooseTime").on("click", function(event) {
                event.stopPropagation();
            })
        })
    }
    activeAssembly._html.dialogCommonHtml = function(message) {
        var params = {
            title: "标题",
            content: "内容",
            ok: {
                name: "ok",
                method: "hideMark"
            },
            cancel: {
                name: "cancel",
                method: "hideMark"
            }
        }
        var options = $.extend({}, params, message);
        var dialogCommonHtml = '<div class="alert shadow">' + '<div class="inner">' + '<p class="title">' + options.title + '</p>' + '<div class="content">' + options.content + '</div>' + '<p class="btn-box">';
        if (options.cancel && options.cancel.name !== "cancel") {
            dialogCommonHtml += '<button id="cancelMethod">' + options.cancel.name + '</button>';
        };
        dialogCommonHtml += '<button id="okMethod">' + options.ok.name + '</button>' + '</p>' + '</div>' + '</div>';
        return dialogCommonHtml;
    }
    activeAssembly.dialog.alert = function(message) {
        return this.each(function() {
            activeAssembly.mask.creatMask(activeAssembly._html.dialogCommonHtml(message), ".alert");
            $("#okMethod").on("click", function() {
                if (message.ok.method) {
                    message.ok.method();
                    activeAssembly.mask.hidemask();
                } else {
                    activeAssembly.mask.hidemask();
                }
            })
            $("#cancelMethod").on("click", function() {
                if (message.cancel.method) {
                    message.cancel.method();
                    activeAssembly.mask.hidemask();
                } else {
                    activeAssembly.mask.hidemask();
                }
            })
        })
    }
    activeAssembly.dialog.tips = function(message) {
        var _this = $(this),
            _width = _this.offset().left,
            _height = _this.offset().top;
        _this.css("position", "relative");
        return this.each(function() {
            var _html = $("<p id='tipsBox'>").css({
                "right": _width + 10 + "px",
                "top": _height + 10 + "px"
            });
            _html.html(message);
            _this.after(_html);
            _this.hover(function() {
                _html.stop(true).fadeIn(700);
            }, function() {
                _html.stop(true).fadeOut(700);
            })
        })
    }
    activeAssembly.dialog.prompt = function(type, message) {
        return this.each(function() {
            var _html = $("<div id='promptDiv'>").html(message);
            if (type && type == "success") {
                _html.css({
                    "border": "1px solid #518fe2"
                })
            } else if (type && type == "fail") {
                _html.css({
                    "border": "1px solid red"
                })
            }
            activeAssembly.mask.creatMask(_html, "#promptDiv");
            setTimeout(function() {
                activeAssembly.mask.hidemask();
            }, 1000)
        })
    }
    activeAssembly.dialog.loading = function(message) {
        return this.each(function() {
            var loadingBox = $("<div class='loadingBox'>");
            var _html = $("<div id='loadingMask'>").text(message);
            _html.prepend(loadingBox);
            activeAssembly.mask.creatMask(_html, "#loadingMask");
        })
    }
    activeAssembly.detailsFrame = function(params) {
        var defaults = {
            id: '', // id建议后缀增加字段 DF
            type: params.type, // type 选型为 text,html,page
            top: '',
            left: '',
            title: "标题",
            content: params.content,
            btn: {
                name: "确定",
                callback: params.btn.callback
            }
        }
        var options = $.extend({}, defaults, params);
        return this.each(function() {
            var _html = '<div id='+options.id+'><div class="weiyi">' + 
            '<p class="title">' + options.title + '<span class="weiyi-close">X</span>' + 
            '<span class="weiyi-explain">图标</span>' + '</p>' + '<div class="contentbox">' + 
            '<div class="content">' + '</div>' + '<p class="btn-footer">' + 
            '<button id="btn">' + options.btn.name + '</button>' +
            '</p></div></div></div>';
            var curId = '#' + options.id;
            if ($(document).find(curId).length != 0) {
                return
            };
            $("body").append(_html);
            
            $(curId).css({
                "position":'fixed',
                "width":"100%",
                "height":"100%",
                "opacity":"0",
                "top":0,
                "left":0,
                "z-index":99
            })
            var list;
            if (options.type == "text") {
                list = options.content;
                $(curId).find(".weiyi").find(".content").html(list);
                $(curId).find(".weiyi").css({
                    "top": "50%",
                    "margin-top": -($(curId).find(".weiyi").height() / 2) + "px",
                    "margin-left": -($(curId).find(".weiyi").width() / 2) + "px"
                })
                 $(curId).css({
                "opacity":1
            })
            } else if (options.type == "html") {
                list = $(options.content).clone();
                $(list).css("display", "block");
                $(curId).find(".weiyi").find(".content").html(list);
                $(curId).find(".weiyi").css({
                    "top": "50%",
                    "margin-top": -($(curId).find(".weiyi").height() / 2) + "px",
                    "margin-left": -($(curId).find(".weiyi").width() / 2) + "px"
                })
                 $(curId).css({
                "opacity":1
            })
            } else if (options.type == "page") {
                list = options.content;
                $(curId).find(".weiyi").find(".content").load(list, function(response, status, xhr) {
                    if (status == "success") {
                        if (options.top) {
                            $(curId).find(".weiyi").css({
                                "top": options.top + "px",
                                "margin-left": -($(curId).find(".weiyi").width() / 2) + "px"
                            })
                        } else {
                            $(curId).find(".weiyi").css({
                                "top": "50%",
                                "margin-top": -($(curId).find(".weiyi").height() / 2) + "px",
                                "margin-left": -($(curId).find(".weiyi").width() / 2) + "px"
                            })
                        }
                        if (options.left) {
                            $(curId).find(".weiyi").css({
                                "left": $window.width() / 2 + options.left + "px",
                                "margin-left": -($(curId).find(".weiyi").width() / 2) + "px"
                            })
                        }
                        $(curId).css({
                            "opacity":1
                        })
                    }
                });
            }
            var $str_i = curId+" "+".weiyi";
            activeAssembly.dragEffect($str_i, ".title");
            $(curId).find("#btn").on("click", function() {
                options.btn.callback();
            })
            $(curId).find(".weiyi-close").on("click", function() {
                $(curId).remove();
            })
        })
    }
    activeAssembly.calendar = function(parameter, getApi) {
        if (typeof parameter == 'function') {
            getApi = parameter;
            parameter = {};
        } else {
            parameter = parameter || {};
            getApi = getApi || function() {};
        }
        var defaults = {
            prefix: 'widget', //生成日历的class前缀
            isRange: false, //是否选择范围
            limitRange: [], //有效选择区域的范围
            highlightRange: [], //指定日期范围高亮
            onChange: function() {}, //当前选中月份修改时触发
            onSelect: function() {} //选择日期时触发
        };
        var options = $.extend({}, defaults, parameter);
        return this.each(function() {
            var $this = $(this);
            if ($("body").find(".calendar").length != 0) {
                $(".calendar").remove();
            }
            if ($this.children(".calendar").length != 0) {
                return;
            }
            var $div = $('<div class="calendar">').appendTo($this);
            var $table = $('<table id="calendar-table">').appendTo($div);
            var $caption = $('<caption>').appendTo($table);
            var $prevYear = $('<a class="' + options.prefix + '-prevYear" href="javascript:;">&lt;&lt;</a>').appendTo($caption);
            var $prevMonth = $('<a class="' + options.prefix + '-prevMonth" href="javascript:;">&lt;</a>').appendTo($caption);
            var $title = $('<span>').appendTo($caption);
            var $nextMonth = $('<a class="' + options.prefix + '-nextMonth" href="javascript:;">&gt;</a>').appendTo($caption);
            var $nextYear = $('<a class="' + options.prefix + '-nextYear" href="javascript:;">&gt;&gt;</a>').appendTo($caption);
            var $back = $('<a class="' + options.prefix + '-back" href="javascript:;">今天</a>').appendTo($caption);
            // 定位
            $this.css({
                "position": "relative"
            })
            $div.css({
                "position": "absolute",
                "top": "36px",
                "left": 0,
                "z-index": 999
            })

            var _today, //当天
                _data, //日期数据
                _day, //日历状态
                _range = []; //当前选择范围
  
            $table.append('<thead><tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr></thead>');
            var $tbody = $('<tbody>').appendTo($table);

            var getDateObj = function(year, month, day) {
                var date = arguments.length && year ? new Date(year, month - 1, day) : new Date();
                var obj = {
                    'year': date.getFullYear(),
                    'month': date.getMonth() + 1,
                    'day': date.getDate(),
                    'week': date.getDay()
                };
                obj['code'] = '' + obj['year'] + (obj['month'] > 9 ? obj['month'] : '0' + obj['month']) + (obj['day'] > 9 ? obj['day'] : '0' + obj['day']);
                return obj;
            };
            //获取当月天数
            var getMonthDays = function(obj) {
                var day = new Date(obj.year, obj.month, 0);
                return day.getDate();
            };
            //获取某天日期信息
            var getDateInfo = function(obj) {
                if (options.limitRange.length) {
                    obj['status'] = 'disabled';
                    for (var i = 0; i < options.limitRange.length; i++) {
                        var start = options.limitRange[i][0];
                        var end = options.limitRange[i][1];
                        if (start == 'today') {
                            start = _today['code'];
                        }
                        if (end == 'today') {
                            end = _today['code'];
                        }
                        if (start > end) {
                            start = [end, end = start][0];
                        }
                        if (obj['code'] >= start && obj['code'] <= end) {
                            obj['status'] = '';
                            break;
                        }
                    }
                }
                obj['sign'] = [];
                if (options.highlightRange.length) {
                    for (var i = 0; i < options.highlightRange.length; i++) {
                        var start = options.highlightRange[i][0];
                        var end = options.highlightRange[i][1];
                        if (start == 'today') {
                            start = _today['code'];
                        }
                        if (end == 'today') {
                            end = _today['code'];
                        }
                        if (start > end) {
                            start = [end, end = start][0];
                        }
                        if (obj['code'] >= start && obj['code'] <= end) {
                            obj['sign'].push('highlight');
                            break;
                        }
                    }
                }
                if (obj['code'] == _today['code']) {
                    obj['sign'].push('today');
                }
                return obj;
            };
            var getData = function(obj) {
                if (typeof obj == 'undefined') {
                    obj = _today;
                }
                _day = getDateObj(obj['year'], obj['month'], 1); //当月第一天
                console.log("获得整月日期数据，_day",_day);
                var days = getMonthDays(_day); //当月天数
                var data = []; //日历信息
                var obj = {};
                //上月日期
                for (var i = _day['week']; i > 0; i--) {
                    obj = getDateObj(_day['year'], _day['month'], _day['day'] - i);
                    var info = getDateInfo(obj);
                    if (!options.limitRange.length) {
                        info['status'] = 'disabled';
                    }
                    data.push(info);
                }
                //当月日期
                for (var i = 0; i < days; i++) {
                    obj = {
                        'year': _day['year'],
                        'month': _day['month'],
                        'day': _day['day'] + i,
                        'week': (_day['week'] + i) % 7
                    };
                    obj['code'] = '' + obj['year'] + (obj['month'] > 9 ? obj['month'] : '0' + obj['month']) + (obj['day'] > 9 ? obj['day'] : '0' + obj['day']);
                    var info = getDateInfo(obj);
                    data.push(info);
                }
                //下月日期
                var last = obj;
                for (var i = 1; last['week'] + i < 7; i++) {
                    obj = getDateObj(last['year'], last['month'], last['day'] + i);
                    var info = getDateInfo(obj);
                    if (!options.limitRange.length) {
                        info['status'] = 'disabled';
                    }
                    data.push(info);
                }
                return data;
            };
            var format = function(data) {
                options.onChange(_day);
                for (var i = 0; i < data.length; i++) {
                    var d = data[i];
                    if (d['status'] == 'active') {
                        d['status'] = '';
                    }
                }
                if (options.isRange) {
                    for (var i = 0; i < data.length; i++) {
                        var d = data[i];
                        for(var s=0;s<_range.length;s++){
                            if(d['code'] == _range[s]['code']){
                                  d['status'] = 'active';
                            }
                        }
                    }
                }else if (_range.length == 1 && !options.isRange){
                    for (var i = 0; i < data.length; i++) {
                        var d = data[i];
                        if (d['code'] == _range[0]['code']) {
                            d['status'] = 'active';
                        }
                    }
                }
                var html = '<tr>';
                for (var i = 0, len = data.length; i < len; i++) {
                    var day = data[i];
                    var arr = [];
                    for (var s = 0; s < day['sign'].length; s++) {
                        arr.push(options.prefix + '-' + day['sign'][s]);
                    }
                    if (day['status']) {
                        arr.push(options.prefix + '-' + day['status']);
                    }
                    var className = arr.join(' ');
                    html += '<td' + (className ? ' class="' + className + '"' : '') + ' data-id="' + i + '">\
                                    ' + (day['link'] ? '<a href="' + day['link'] + '">' + day['day'] + '</a>' : '<span>' + parseInt(day['day']) + '</span>') + '\
                                </td>';
                    if (i % 7 == 6 && i < len - 1) {
                        html += '</tr><tr>';
                    }
                }
                html += '</tr>';
                $title.html(_day['year'] + '年' + _day['month'] + '月');
                $tbody.html(html);
            };
            _today = getDateObj();
            _day = {
                'year': _today['year'],
                'month': _today['month']
            };
            $prevMonth.click(function() {
                _day['month'] --;
                _data = getData(_day);
                format(_data);
            });
            $nextMonth.click(function() {
                _day['month'] ++;
                _data = getData(_day);
                format(_data);
            });
            $prevYear.click(function() {
                _day['year'] --;
                _data = getData(_day);
                format(_data);
            });
            $nextYear.click(function() {
                _day['year'] ++;
                _data = getData(_day);
                format(_data);
            });
            $back.click(function() {
                _data = getData();
                format(_data);
            });

            function zero(arr) {
                $.each(arr, function(i, item) {
                    item.month = (item.month > 9) ? parseInt(item.month) : "0" + parseInt(item.month);
                    item.day = (item.day > 9) ? parseInt(item.day) : "0" + parseInt(item.day);
                })
                return arr;
            }
            $(".calendar").on('click', 'td', function(event) {
                event.stopPropagation();
                var $this = $(this);
                var index = $(this).data('id');
                var day = _data[index];
                if (day['status'] != 'disabled') {
                    if (options.isRange) {

                            if($this.hasClass("widget-active")){
                                for(var m=0;m<_range.length;m++){
                                    if(_range[m]['code'] == day["code"]){
                                        _range.splice(m,1);
                                    }
                                }
                            }else{
                                 _range.push(day); 
                            }       
                            if(_range.length >= 2){
                                _range.sort(function(a, b) {
                                    return a['code'] > b['code'];
                                });
                            }
                            format(_data);
                            zero(_range);
                            options.onSelect(_range);
                    } else {
                        _range = [day];
                        format(_data);
                        zero(_range);
                        options.onSelect(_range);
                    }
                }
            });
            $(".calendar").on("click", function(event) {
                event.stopPropagation();
            })
            _data = getData();
            format(_data);
        });
    }
    var creatPage = {
        init: function(obj, args) {
            return (function() {
                creatPage.fillHtml(obj, args);
                creatPage.bindEvent(obj, args);
            })();
        },
        fillHtml: function(obj, args) {
            return (function() {
                obj.empty();
                // 去第几页
                if (args.current <= args.pageCount) {
                    obj.append('<span class="goPage">去<input class="go-page" type="text"/>页</span>');
                }
                //上一页
                if (args.current > 1) {
                    obj.append('<a href="javascript:;" class="prevPage">上一页</a>');
                } else {
                    obj.remove('.prevPage');
                    obj.append('<span class="disabled">上一页</span>');
                }
                //中间页码
                if (args.current != 1 && args.current >= 4 && args.pageCount != 4) {
                    obj.append('<a href="javascript:;" class="tcdNumber">' + 1 + '</a>');
                }
                if (args.current - 2 > 2 && args.current <= args.pageCount && args.pageCount > 5) {
                    obj.append('<span>...</span>');
                }
                var start = args.current - 2,
                    end = args.current + 2;
                if ((start > 1 && args.current < 4) || args.current == 1) {
                    end++;
                }
                if (args.current > args.pageCount - 4 && args.current >= args.pageCount) {
                    start--;
                }
                for (; start <= end; start++) {
                    if (start <= args.pageCount && start >= 1) {
                        if (start != args.current) {
                            obj.append('<a href="javascript:;" class="tcdNumber">' + start + '</a>');
                        } else {
                            obj.append('<span class="currentPage">' + start + '</span>');
                        }
                    }
                }
                if (args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5) {
                    obj.append('<span>...</span>');
                }
                if (args.current != args.pageCount && args.current < args.pageCount - 2 && args.pageCount != 4) {
                    obj.append('<a href="javascript:;" class="tcdNumber">' + args.pageCount + '</a>');
                }
                //下一页
                if (args.current < args.pageCount) {
                    obj.append('<a href="javascript:;" class="nextPage">下一页</a>');
                } else {
                    obj.remove('.nextPage');
                    obj.append('<span class="disabled">下一页</span>');
                }
            })();
        },
        //绑定事件
        bindEvent: function(obj, args) {
            return (function() {
                obj.on("click", "a.tcdNumber", function() {
                    var current = parseInt($(this).text());
                    creatPage.fillHtml(obj, {
                        "current": current,
                        "pageCount": args.pageCount
                    });
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current);
                    }
                });
                //上一页
                obj.on("click", "a.prevPage", function() {
                    var current = parseInt(obj.children("span.currentPage").text());
                    creatPage.fillHtml(obj, {
                        "current": current - 1,
                        "pageCount": args.pageCount
                    });
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current - 1);
                    }
                });
                //下一页
                obj.on("click", "a.nextPage", function() {
                    var current = parseInt(obj.children("span.currentPage").text());
                    creatPage.fillHtml(obj, {
                        "current": current + 1,
                        "pageCount": args.pageCount
                    });
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current + 1);
                    }
                });
                //去第几页
                obj.on("blur", ".go-page", function() {
                    var current = parseInt($(".go-page").val());
                    if (isNaN(current)) {
                        return;
                    }
                    if (current == 0) {
                        $(document).prompt("fail", "跳转页码不能等于0");
                        $(".go-page").val('');
                        return;
                    }
                    if (current > args.pageCount) {
                        $(document).prompt("fail", "跳转页码不能大于总页码数");
                        $(".go-page").val('');
                        return;
                    }
                    creatPage.fillHtml(obj, {
                        "current": current,
                        "pageCount": args.pageCount
                    });
                    $(".go-page").val(current);
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current);
                    }
                });
            })();
        }
    };
    $.fn.extend({
        miniFrame: activeAssembly.miniFrame,
        passwordFrame: activeAssembly.passwordFrame,
        timeFrame: activeAssembly.timeFrame,
        alert: activeAssembly.dialog.alert,
        tips: activeAssembly.dialog.tips,
        prompt: activeAssembly.dialog.prompt,
        loading: activeAssembly.dialog.loading,
        detailsFrame: activeAssembly.detailsFrame,
        calendar: activeAssembly.calendar
    });
    $.fn.page = function(options) {
        var args = $.extend({
            pageCount: 15,
            current: 1,
            backFn: function() {}
        }, options);
        creatPage.init(this, args);
    };
    jQuery.extend({
         hOv:function(target,trigger,text){
             if(arguments.length && target && trigger){
                 $(target).hover(function(){
                     $(trigger).toggle();
                 })
             } 
             if(text){
                 $(trigger).html(text);
             }
         },
         ReplaceSeperator:function(){
                var i;
                var result = "";
                var c;
                for (i = 0; i < mobiles.length; i++) {
                    c = mobiles.substr(i, 1);
                    if (c == "\n")
                        result = result + "<br/>";
                    else if (c != "\r")
                        result = result + c;
                }
                return result;
         }
    })
         
}())