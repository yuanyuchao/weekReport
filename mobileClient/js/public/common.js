//截取url
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
};

//获取日期
function getStartDay() {
    var mydate = new Date();
    var y = mydate.getFullYear();
    var m = mydate.getMonth() + 1;
    var d = mydate.getDate();
    if (m < 10) {
        m = "0" + m;
    };
    if (d < 10) {
        d = "0" + d;
    };
    return y + "-" + m + "-" + d;
};

/*获取下一天日期*/
function getNextDay(d) {
    d = new Date(d);
    d = +d + 1000 * 60 * 60 * 24;
    d = new Date(d);
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var d = d.getDate();
    if (m < 10) {
        m = "0" + m;
    };
    if (d < 10) {
        d = "0" + d;
    };
    return y + "-" + m + "-" + d;
};

//获取对象长度
function objLength(obj){
    var count = 0;
    for(var i in obj){
        count ++;
    }
    return count;
};

//顶部下拉列表
$(document.body).on("click",".down_list",function(){
    if($(this).hasClass("down_yes")){
        $('.menu').css('display','none');
        $('.mask').css('display','none');
        $('.down_list img').attr('src', '../../img/index/list2@2x.png');
        $('.down_list img').removeClass("down_true").addClass("down_false");
        $('body').css('position', 'static');
        $(this).removeClass("down_yes");
    } else{
        $('.menu').css('display','block');
        $('.mask').css('display','block');
        $('.down_list img').attr('src', '../../img/index/close.png');
        $('.down_list img').removeClass("down_false").addClass("down_true");
        $('body').css('position', 'fixed');
        $(this).addClass("down_yes");
    };
});

//点击筛选事件

function isOpenFilter(el, isHidden, color, position,bg_color,boder_size) {
    $(el).on('click', function () {
        $('.title').css('background-color', color)
        $('.filter-content').css('display', isHidden);
        $('.shadow').css('display', isHidden);
        $('body').css('position', position);
        $(".self_title").css('background-color',bg_color);
        $(".self_title").css('border-top',boder_size);
    });
};
isOpenFilter('.filter', 'block', '#fff', 'fixed',"#fff","0.03rem solid #d9d9d9");
isOpenFilter('.btn-cancle', 'none', '#ededed', 'static',"#ededed","none");
isOpenFilter('.btn-confirm', 'none', '#ededed', 'static',"#ededed","none");

//layer弹窗
layui.use('layer', function () {
    var layer = layui.layer;
});

function picker(el) {
    el.focus(function () {
        document.activeElement.blur();
        var dtpicker = new mui.DtPicker({
            type: "date",//设置日历初始视图模式
            beginDate: new Date(2015, 4, 25),//设置开始日期
            buttons:['取消','完成'],
            endDate: new Date(2016, 4, 25),//设置结束日期
        })
        dtpicker.show(function(e) {
            console.log(e);
            console.log(e.text);
            el.val(e.text);
        })
    })
}
picker( $('#date-start'));
picker( $('#date-end'));

