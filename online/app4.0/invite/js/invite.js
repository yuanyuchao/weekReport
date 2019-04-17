$(function () {
    $('.tab li:nth-of-type(1)').addClass('tab-bgc');
    $('.tab li').on('click', function () {
        var index = $(this).index();
        $(this).addClass('tab-bgc').siblings().removeClass('tab-bgc');
        $('.tab-content').eq(index).css('display', 'block').siblings().css('display', 'none');
    })


    function slide(a, b, c, d) {
        $(a).on('click', function () {
            $(b).slideToggle();
            if ($(c).attr('src') == '../img/down.png') {
                $(c).attr('src', '../img/up.png');
            } else {
                $(c).attr('src', '../img/down.png');
            }
            if ($(d).text() == '展开') {
                $(d).text('收起');
            } else {
                $(d).text('展开');
            }
        })
    }

    slide('.yjj', '.yjj-content', '.yjj>p>img', '.yjj>p:nth-of-type(2)>span');
    slide('.jmj', '.jmj-content', '.jmj>p>img', '.jmj>p:nth-of-type(2)>span');
    slide('.rmj', '.rmj-content', '.rmj>p>img', '.rmj>p:nth-of-type(2)>span');
    $('.yjj-content').on('click', '#li', function () {
        var index = $(this).index();
        $('.jdc').eq(index).slideToggle();
        if ($('.yjj-content-right img').eq(index).attr('src') == '../img/down.png') {
            $('.yjj-content-right img').eq(index).attr('src', '../img/up.png').siblings().attr('src', '../img/down.png');
        } else {
            $('.yjj-content-right img').eq(index).attr('src', '../img/down.png').siblings().attr('src', '../img/up.png');
        }
    })
})
//获取奖励列表
function bonusRecord(uid, token) {
    $.ajax({
        type: 'POST',//请求方式
        dataType: "json",//数据格式
        headers: {
            "uid": uid,
            "token": token
        },
        url:url + "/activity/gifts/auth",//请求地址
        error: function () {
            console.log("加载失败")
        },
        success: function (data) {
            console.log(data);
            if (data.code == "200") {
                console.log(data.data);
                var datas = data.data;
                var str = '';
                var jmj = '';
                var rmj = '';

                function filter(para) {
                    if (para == null || para == undefined) {
                        para = 0;
                    }
                    return para;
                }

                $('.ljhq-left>p:nth-of-type(1)').html(filter(datas.jdCardMoneyAmt) + '元');
                $('.ljhq-right>p:nth-of-type(1)').html(filter(datas.userJiangPinPOList) + '个');
                for (var i = 0; i < datas.list.length; i++) {
                    console.log(datas.list[i].code);
                    if (datas.list[i].code == 2) {
                        str += '<li id="li">';
                        str += '<div class="yjj-content-top">';
                        str += '<div class="yjj-content-left">';
                        str += ' <p>' + datas.list[i].phone + '</p>';
                        str += ' </div>';
                        str += ' <div class="yjj-content-mid">';
                        str += ' <p>累计出借' + filter(datas.list[i].money) + '元</p>';
                        str += '</div>';
                        str += '<div class="yjj-content-right">';
                        str += '<p>' + datas.list[i].jiangPinName + '<span><img src="../img/down.png" alt="" id="changeImg"></span></p>';
                        str += '</div>';
                        str += '<div class="clear"></div>';
                        str += ' </div>';
                        str += '<ul class="jdc" style="display: none">';
                        str += '   <li><img src="../img/jd.png" alt="" class="frist-img" >';
                        str += '<p class="frist-item">' + datas.list[i].send[0] + '</p></li>';
                        str += '<li><img src="../img/jd.png" alt="" class="second-img" >';
                        str += '   <p class="second-item">' + datas.list[i].send[1] + '</p></li>';
                        str += '<li><img src="../img/jd.png" alt="" class="third-img" >';
                        str += '  <p class="third-item">' + datas.list[i].send[2]+ '</p></li>';
                        str += '<div class="clear"></div>';
                        str += '   </ul>';
                        str += '   </li>';

                    } else if (datas.list[i].code == 1) {
                        jmj += '<li>';
                        jmj += '<div class="yjj-content-left">';
                        jmj += '<p>' + datas.list[i].phone + '</p>';
                        jmj += ' </div>';
                        jmj += ' <div class="yjj-content-mid">';
                        jmj += ' <p>累计出借' + filter(datas.list[i].money) + '元</p>';
                        jmj += '</div>';
                        jmj += '<div class="yjj-content-right">';
                        jmj += '<p>已发放</p>';
                        jmj += '<p>' + datas.list[i].jiangPinName + ' </p>';
                        jmj += ' </div>';
                        jmj += ' </li>';
                    } else if (datas.list[i].code == 3) {
                        rmj += ' <li class="liBorder">';
                        rmj += ' <div class="yjj-content-left">';
                        rmj += ' <p>' + datas.list[i].phone + '</p>';
                        rmj += ' </div>';
                        rmj += ' <div class="yjj-content-mid">';
                        rmj += '  <p>累计出借' + filter(datas.list[i].money) + '元</p>';
                        rmj += ' </div>';
                        rmj += '  <div class="yjj-content-right show" style="display: none">';
                        rmj += '<p class="status">' + datas.list[i].isSend + '</p>';
                        rmj += ' <p class="jiangpin">' + datas.list[i].jiangPinName + ' </p>';
                        rmj += '</div>';
                        rmj += ' </li>';
                    }
                }
                $('.yjj-content').html(str);
                $('.yjj-content').append('<div class="clear"></div>');
                $('.jmj-content').html(jmj);
                $('.jmj-content').append('<div class="clear"></div>');
                $('.rmj-content').html(rmj);
                $('.rmj-content').append('<div class="clear"></div>');
//佣金奖图片控制
                var frLength = $('.frist-item').length;
                for(var i=0;i<frLength;i++){
                    if ($(".frist-item")[i].innerHTML =="undefined" ) {
                        $('.frist-img')[i].parentNode.style.display = "none";
                    } else {
                        $('.frist-img')[i].parentNode.style.display = "block";
                    }
                }
                var scLength = $('.second-item').length;
                for(var i=0;i<scLength;i++){
                    if ($(".second-item")[i].innerHTML == "undefined") {
                        $('.second-img')[i].parentNode.style.display = "none";
                    } else {
                        $('.second-img')[i].parentNode.style.display = "block";
                    }
                }
                var thLength = $('.third-item').length;
                for(var i=0;i<thLength;i++){
                    if ($(".third-item")[i].innerHTML == "undefined") {
                        $('.third-img')[i].parentNode.style.display = "none";
                    } else {
                        $('.third-img')[i].parentNode.style.display = "block";
                    }
                }


//人脉奖右边栏三合一
                var group = $('.status').length / 3;
                for (var i = 1; i < group + 1; i++) {
                    var show = 3 * (i  - 1) + 1;
                    $('.show').eq(show).css('display', 'block');
                }

                var abb = JSON.stringify(datas.list);
                if (abb.indexOf('"code":1') == -1) {
                    $('.jmj-content').html('<p class="zwjl">暂无奖励</p>');
                }
                if (abb.indexOf('"code":2') == -1) {
                    $('.yjj-content').html('<p class="zwjl">暂无奖励</p>');
                }
                if (abb.indexOf('"code":3') == -1) {
                    $('.rmj-content').html('<p class="zwjl">暂无奖励</p>');
                }
                if (datas.list.length == 0) {
                    $('.jmj-content').html('<p class="zwjl">暂无奖励</p>');
                    $('.yjj-content').html('<p class="zwjl">暂无奖励</p>');
                    $('.rmj-content').html('<p class="zwjl">暂无奖励</p>');
                }
            }
        }
    })


}

// bonusRecord()
// 安卓端
function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function () {
                callback(WebViewJavascriptBridge)
            },
            false
        );
    }
}

// iOS端
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
    }, 0)
}

var u = navigator.userAgent;
if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
    connectWebViewJavascriptBridge(function (bridge) {
        //document.getElementById("show").innerHTML = "android WebViewJavascriptBridge inited"
        window.WebViewJavascriptBridge.callHandler(
            'getUserTokenAndUUID',
            '999999'
            , function (responseData) {
                var responseData = JSON.parse(responseData);
                console.log(responseData);
                token = responseData.token;
                uid = responseData.uuid;
                // fuiouPayUrl = responseData.fuiouPayUrl;
                bonusRecord(uid, token);
                // friend(uid,token);
                doInvestmentRecords(uid, token)
            }
        );
    })
} else {
    setupWebViewJavascriptBridge(function (bridge) {
        //document.getElementById("show").innerHTML = "iOS WebViewJavascriptBridge inited"
        window.WebViewJavascriptBridge.callHandler(
            'getUserTokenAndUUID',
            '999999'
            , function (responseData) {
                token = responseData.token;
                uid = responseData.uuid;
                // fuiouPayUrl = responseData.fuiouPayUrl;
                // console.log(fuiouPayUrl);
                bonusRecord(uid, token);
                // friend(uid,token);
                doInvestmentRecords(uid, token)
            }
        );
    })
}

$('.btn').on('click',function () {
    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener(
                'WebViewJavascriptBridgeReady'
                , function () {
                    callback(WebViewJavascriptBridge)
                },
                false
            );
        }
    }

// iOS端
    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    }

    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
        connectWebViewJavascriptBridge(function (bridge) {
            //document.getElementById("show").innerHTML = "android WebViewJavascriptBridge inited"
            window.WebViewJavascriptBridge.callHandler(
                'ShareNative',
                '999999'
                , function (responseData) {
                }
            );
        })
    } else {
        setupWebViewJavascriptBridge(function (bridge) {
            //document.getElementById("show").innerHTML = "iOS WebViewJavascriptBridge inited"
            window.WebViewJavascriptBridge.callHandler(
                'ShareNative',
                '999999'
                , function (responseData) {
                }
            );
        })
    }
})

function doInvestmentRecords(uid, token) {
    //console.log("investement----"+localStorage.getItem("uid"));
    layui.use('flow', function () {
        var flow = layui.flow;
        flow.load({
            elem: '#pages', //流加载容器
            //scrollElem: '#LAY_demo1', //滚动条所在元素，一般不用填，此处只是演示需要。
            done: function (page, next) { //执行下一页的回调
                $.ajax({
                    type: 'POST',
                    url: url + "/activity/friends/auth",
                    headers: {
                        "uid": uid,
                        "token": token
                    },
                    data: {"page": page},
                    success: function (data) {
                        var lis = [];
                        console.log(data);
                        if (data.data.total == 0 && lis.length == 0) {
                            // location = 'invite1.html';
                            $('#null').css('display','block')
                        } else {
                            // 安卓端
                            $('.box').css('display', 'block')

                            function connectWebViewJavascriptBridge(callback) {
                                if (window.WebViewJavascriptBridge) {
                                    callback(WebViewJavascriptBridge)
                                } else {
                                    document.addEventListener(
                                        'WebViewJavascriptBridgeReady'
                                        , function () {
                                            callback(WebViewJavascriptBridge)
                                        },
                                        false
                                    );
                                }
                            }

// iOS端
                            function setupWebViewJavascriptBridge(callback) {
                                if (window.WebViewJavascriptBridge) {
                                    return callback(WebViewJavascriptBridge);
                                }
                                if (window.WVJBCallbacks) {
                                    return window.WVJBCallbacks.push(callback);
                                }
                                window.WVJBCallbacks = [callback];
                                var WVJBIframe = document.createElement('iframe');
                                WVJBIframe.style.display = 'none';
                                WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                                document.documentElement.appendChild(WVJBIframe);
                                setTimeout(function () {
                                    document.documentElement.removeChild(WVJBIframe)
                                }, 0)
                            }

                            var u = navigator.userAgent;
                            if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
                                connectWebViewJavascriptBridge(function (bridge) {
                                    //document.getElementById("show").innerHTML = "android WebViewJavascriptBridge inited"
                                    window.WebViewJavascriptBridge.callHandler(
                                        'ShowInviteRuleNative',
                                        '999999'
                                        , function (responseData) {
                                            var responseData = JSON.parse(responseData);
                                            console.log(responseData);
                                        }
                                    );
                                })
                            } else {
                                setupWebViewJavascriptBridge(function (bridge) {
                                    //document.getElementById("show").innerHTML = "iOS WebViewJavascriptBridge inited"
                                    window.WebViewJavascriptBridge.callHandler(
                                        'ShowInviteRuleNative',
                                        '999999'
                                        , function (responseData) {
                                        }
                                    );
                                })
                            }
                        }
                        setTimeout(function () {
                            var datas = data.data;
                            var str = '';
                            for (var i = 0; i < datas.list.length ; i++) {
                                str += '<li><span>' + datas.list[i].phone + '</span><span>' + timeFormat(datas.list[i].time) + '</span><span>' + datas.list[i].type + '</span></li>'
                            }

                            function add0(m) {
                                return m < 10 ? '0' + m : m
                            }

                            function timeFormat(timestamp) {
                                var time = JSON.parse(timestamp * 1000);
                                var time = new Date(time);
                                var year = time.getFullYear();
                                var month = time.getMonth() + 1;
                                var date = time.getDate();
                                return year + '-' + add0(month) + '-' + add0(date);
                            };
                            lis.push(str);
                            next(lis.join(''), page < parseInt(datas.total / 10) + 1); //假设总页数为 10  jsonData["totalSize"]
                        }, 500);
                    },
                    error: function () {
                        // location = 'invite1.html';
                    }

                })
            }
        });
    });
};

