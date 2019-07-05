$('#menu').load('../public/menu2.html');
$(function () {
    //默认加载数据
    getData();

    //控制item显示隐藏
    $('body').on('click', '.isOpen', function () {
        var itemIndex = $(this).parents('.item').index();
        var parentIndex = $(this).parents('.monthly').index();
        $('.monthly').eq(parentIndex).find('.item-content').eq(itemIndex).slideToggle("slow");
        if ($(this).hasClass("open_yes")) {
            $(this).text('展开');
            $(this).removeClass("open_yes");
        } else {
            $(this).text('收起');
            $(this).addClass("open_yes");
        }
        ;
    });

    // 控制筛选内容显示
    function isOpenFilter(el, isHidden, color, position) {
        $(el).on('click', function () {
            $('.title').css('background-color', color)
            $('.filter-content').css('display', isHidden);
            $('.shadow').css('display', isHidden);
            $('body').css('position', position);
        });
    };
    isOpenFilter('.filter', 'block', '#fff', 'fixed');
    isOpenFilter('.btn-cancle', 'none', '#ededed', 'static');
    isOpenFilter('.btn-confirm', 'none', '#ededed', 'static');

    //点击添加背景颜色
    $('.mode-select li').on('click', function () {
        $(this).parents('.mode-select').find('li').removeClass();
        $(this).addClass('type-bgc');
    });

    //阿拉伯数字转汉字
    function SectionToChinese(section) {
        var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        var chnUnitChar = ["", "十", "百", "千", "万", "亿", "万亿", "亿亿"];
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        while (section > 0) {
            var v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            } else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    }

    // 筛选请求数据
    $('.btn-confirm').on('click', function () {
        $('.main-content').empty();
        getData($('#date-start').val(), $('#date-end').val(), $('li[typeCode]').attr('typeCode'));
    });

    function getData(startDate, endDate, dialysisType) {
        //上划加载插件
        layui.use('flow', function () {
            var flow = layui.flow;
            flow.load({
                elem: '.main-content', //流加载容器
                done: function (page, next) { //执行下一页的回调
                    $.ajax({
                        type: 'post',
                        url: '/patientControllerAPP.do?getMonitorRecordList',
                        xhrFields: {
                            withCredentials: true
                        },
                        data: {
                            page: page,
                            rows: 10,
                            dialysisType: dialysisType,
                            startDate: startDate,
                            endDate: endDate,
                        },
                        success: function (data) {
                            var data = JSON.parse(data);
                            if (data.status == 0) {
                                var lis = [];
                                var datas = data.data.MonitorRecordList;//月份列表
                                var month = '';
                                var list = '';//item
                                var total = data.data.Total;
                                setTimeout(function () {
                                    for (var i = 0; i < datas.length; i++) {
                                        month += ` <div class="monthly"><div class="month">${datas[i].date}</div><ul>`;
                                        var item = datas[i].list;
                                        for (var j = 0; j < item.length; j++) {
                                            list += `<li class="item">
                    <div class="item-top">
                        <span>透析日期：<span class="dialysis_date">${item[j].dialysis_date}</span></span>
                        <span class="isOpen">展开</span>
                    </div>
                    <div class="item-bottom">
                        <span>机号：<span>${item[j].number}</span></span>
                        <span>透析模式：<span>${item[j].dialysis_type}</span></span>
                        <div class="item-content">
                            <ul>
                                <li><span>血压（mmHg）</span><span class="dialysis_type">${item[j].pressure}</span></li>
                                <li><span>KT/V（在线）</span><span class="dialysis_hour">${item[j].ktv}</span></li>
                                <li><span>静脉压（mmHg）</span><span class="dehydration_amount_total">${item[j].venous_pressure}</span></li>
                                <li><span>动脉压（mmHg）</span><span class="dehydration_amount_total">${item[j].arterial_pressure}</span></li>
                                <li><span>跨膜压（mmHg）</span><span class="dehydration_amount_total">${item[j].transmembrane_pressure}</span></li>
                                <li><span>超滤率（ml/h）</span><span class="dehydration_amount_total">${item[j].ultrafiltration_rate}</span></li>
                                <li><span>超滤量（ml）</span><span class="dehydration_amount_total">${item[j].ultrafiltration}</span></li>
                                <li><span>钠浓度（mmol/L）</span><span class="dehydration_amount_total">${item[j].na_concentration}</span></li>
                                <li><span>透析液温度（℃）</span><span class="dehydration_amount_total">${item[j].temperature}</span></li>
                                <li><span>置换率（ml/min）</span><span class="dehydration_amount_total">${item[j].substitution_rate}</span></li>
                                <li><span>置换量（L）</span><span class="dehydration_amount_total">${item[j].substitution_quantity}</span></li>
                                <li><span>症状</span><span class="dehydration_amount_total">${item[j].symptom}</span></li>
                                <li><span>处理</span><span class="dehydration_amount_total">${item[j].dispose}</span></li>
                                <li><span>结果</span><span class="dehydration_amount_total">${item[j].result}</span></li>
                                <li><span>护士</span><span class="dehydration_amount_total">${item[j].nurse_name}</span></li>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                </li>`
                                        }
                                        month += list + '</ul></div>';
                                        list = "";//加载完一个item后，清空本条item
                                    }
                                    ;
                                    lis.push(month);
                                    next(lis.join(''), page < parseInt(total / 10) + 1);
                                }, 500);
                            } else if (data.status == 2) {
                                layer.msg(data.msg);
                                window.location.href = '../login/login.html';
                            }

                        },
                        error: function () {
                        }

                    })
                }
            });
        });
    };

})