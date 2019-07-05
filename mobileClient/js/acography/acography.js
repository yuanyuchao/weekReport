$('#menu').load('../public/menu2.html');

$(function () {
    //默认加载数据
    getData();

    //控制item显示隐藏

    $('body').on('click','.isOpen', function () {
        var itemIndex = $(this).parents('.item').index();
        var parentIndex = $(this).parents('.monthly').index();
        $('.monthly').eq(parentIndex).find('.item-content').eq(itemIndex).slideToggle("slow");
        if ($(this).hasClass("open_yes")) {
            $(this).text('展开');
            $(this).removeClass("open_yes");
        } else {
            $(this).text('收起');
            $(this).addClass("open_yes");
        };
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


    // 筛选请求数据
    $('.btn-confirm').on('click', function () {
        $('.main-content').empty();
        getData($('#date-start').val(), $('#date-end').val(), $('li[typeCode]').attr('typeCode'));
    });

    function getData(startDate, endDate, dialysisType) {
        layui.use('flow', function () {
            var flow = layui.flow;
            flow.load({
                elem: '.main-content', //流加载容器
                done: function (page, next) { //执行下一页的回调
                    $.ajax({
                        type: 'post',
                        url: '/patientControllerAPP.do?getCureRecordList',
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
                            if(data.status==0){
                                var lis = [];
                                var datas = data.data.CureRecordList;
                                var month = '';
                                var str = '';
                                var total = data.data.Total;
                                setTimeout(function () {
                                    for (var i = 0; i < datas.length; i++) {
                                        month += ` <div class="monthly"><div class="month">${datas[i].date}</div> <ul id="list">`;
                                        var data = datas[i];
                                        for (var j = 0; j < data.list.length; j++) {
                                            str += `<li class="item">
                            <div class="item-top">
                            <span>透析日期：<span class="dialysis_date">${data.list[j].dialysis_date}</span></span>
                        <span class="isOpen">展开</span>
                            </div>
                            <div class="item-bottom">
                            <span>班次：<span>${data.list[j].class_name}</span></span>
                        <span>区域：<span>${data.list[j].area_name}</span></span>
                        <span>机号：<span>${data.list[j].number}</span></span>
                        <div class="item-content">
                            <ul>
                            <li><span>透析模式：<span class="dialysis_type">${data.list[j].dialysis_type}</span></span><span>透析时长：<span
                    class="dialysis_hour">${data.list[j].dialysis_hour}</span>h</span></li>
                        <li><span>超滤总量：<span class="dehydration_amount_total">${data.list[j].dehydration_amount_total}</span>L</span><span>透前血压：<span
                    class="bp_first_before">${data.list[j].bp_first_before}</span>/ <span class="bp_second_before">${data.list[j].bp_first_before}</span>mmHg</span>
                        </li>
                        <li><span>干体重：<span>${data.list[j].number}</span>kg</span><span>透后血压：<span class="bp_first_after">${data.list[j].bp_first_after}</span>/ <span
                    class="bp_second_after">${data.list[j].bp_second_after}</span>mmHg</span></li>
                        <li><span>透前体重：<span class="before_weight_all">${data.list[j].before_weight_all}</span>KG</span><span>透前心率：<span
                    class="p_before">${data.list[j].p_before}</span>（次/分）</span></li>
                        <li><span>透后体重：<span class="after_weight">${data.list[j].after_weight}</span>kg</span><span>透后心率：<span
                    class="p_after">${data.list[j].p_after}</span>（次/分）</span></li>
                        <li><span>血管通路：<span>${data.list[j].access_name}</span></span></li>
                        </ul>
                        <ul>
                        <li><span>抗凝剂：<span class="anticoagulant_name">${data.list[j].anticoagulant_name}</span></span></li>
                        <li><span>类型：<span class="anticoagulant_type">${data.list[j].anticoagulant_type}</span></span><span>首剂：<span
                    class="first_doses">${data.list[j].first_doses}</span></span></li>
                        <li><span>维持：<span class="add_doses">${data.list[j].add_doses}</span></span><span>总量：<span
                    class="total_doses">${data.list[j].total_doses}</span></span></li>
                        </ul>
                        <ul>
                        <li><span>透析器型号：<span class="device_type">${data.list[j].device_type}</span></span><span>钾：<span
                    class="k">${data.list[j].k}</span>mmol/L</span>
                        </li>
                        <li><span>钠：<span class="na">${data.list[j].na}</span>mmol/L</span><span>钙：<span
                    class="ca">${data.list[j].number}</span>mmol/L</span></li>
                        <li><span>主治医生：<span class="doctor_name">${data.list[j].doctor_name}</span></span><span class="nurse_name">主管护士：<span>${data.list[j].nurse_name}</span></span>
                        </li>
                        </ul>
                        </div>
                        </div>
                        </li>`
                                        }
                                        month += str + '</ul></div>';
                                        str = "";
                                    }
                                    lis.push(month);
                                    next(lis.join(''), page < parseInt(total / 10) + 1);
                                }, 500);
                            } else if(data.status==2){
                                layer.msg(data.msg);
                                window.location.href='../login/login.html';
                            }

                        },
                        error: function () {

                        }

                    })
                }
            });
        });
    }
});
