$('#menu').load('../public/menu2.html');

$(function () {
    var tablaName = decodeURI(window.location.href.split('?')[1].split('&')[0].split('=')[1]);
    var name = decodeURI(window.location.href.split('?')[1].split('&')[1].split('=')[1]);
    $('.name').text(name);
    document.title = name;
    //默认加载数据
    getData(tablaName);

    //控制item显示隐藏

    $('body').on('click','.isOpen', function () {
        var itemIndex = $(this).parents('.item').index();
        var parentIndex = $(this).parents('.monthly').index();
        $('.monthly').eq(parentIndex).find('.item').eq(itemIndex).find('p:nth-of-type(n+4)').slideToggle("slow");
        if ($(this).hasClass("open_yes")) {
            $(this).text('点击展开');
            $(this).removeClass("open_yes");
        } else {
            $(this).text('点击收起');
            $(this).addClass("open_yes");
        };
    });


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

    $('.btn-confirm').on('click', function () {
        $('.main-content').empty();
        getData(tablaName, $('#date-start').val(), $('#date-end').val());
    });

    function getData(Name, startDate, endDate) {
        layui.use('flow', function () {
            var flow = layui.flow;
            flow.load({
                elem: '.main-content', //流加载容器
                done: function (page, next) { //执行下一页的回调
                    $.ajax({
                        type: 'post',
                        url: '/patientControllerAPP.do?getTestListByProject',
                        xhrFields: {
                            withCredentials: true
                        },
                        data: {
                            page: page,
                            tableName: Name,
                            rows: 10,
                            startDate: startDate,
                            endDate: endDate,
                        },
                        success: function (data) {
                            var data = JSON.parse(data);
                            if(data.status==0){
                                var lis = [];
                                var datas = data.data.TestList;
                                var month = '';
                                var list = '';
                                var str = '';
                                setTimeout(function () {
                                    for (var i = 0; i < datas.length; i++) {
                                        month += `<div class="monthly"><div class="month">${datas[i].date}</div><ul>`;
                                        var item = datas[i].list;
                                        for (var j = 0; j < item.length; j++) {
                                            list += `<li class="item">`;
                                            var li = item[j];
                                            for (var k in li) {
                                                str += `<p><span>${k}</span><span>${li[k]}</span></p>`;
                                            }
                                            list += str + `<span class="isOpen">点击展开</span></li>`;
                                            str = '';
                                        }
                                        month += list + '</ul></div>';
                                        list = '';
                                    }
                                    lis.push(month);
                                    next(lis.join(''), page < parseInt(data.data.Total / 10) + 1);
                                    if($('.monthly:nth-of-type(1)>ul:nth-of-type(1)>.item:nth-of-type(1)>p').length<=3){
                                        $('.item>span').css('display','none');
                                    };

                                }, 500);
                            }else if(data.status==2){
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
})