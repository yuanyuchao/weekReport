var localUrl = 'http://192.168.1.102:8053';
var isxs; //是否为新手标
var time; //期限
var page=1; //期限
// new_element=document.createElement("script");
//
// new_element.setAttribute("type","text/javascript");
// new_element.setAttribute("src","productDetail.js");// 在这里引入了productDetail.js
// document.body.appendChild(new_element);

function readyToRun() {
    $('.isxs').click(function () {
        isxs = $(this).val()
        console.log(isxs)
        if (isxs == -1) {
            isxs = null;
        }
        productListDefault(isxs, time);
    })
    $('.time').click(function () {
        time = $(this).val();
        console.log(time)
        if (time == -1) {
            time = null;
        }
        productListDefault(isxs, time);
    })

}

function productListDefault(xs,ti,clickPage) {
    if(clickPage==null){
        clickPage=page;
    }
    var data = 'page=' + clickPage;
    var x = '&isxs=' + xs;
    var t = '&time=' + ti;
    if (isxs != undefined && isxs != null) {
        data += x
    }
    if (time != undefined && time != null) {
        data += t
    }
    console.log(data)
    $('#products').empty();
    $.ajax({
        async: false,//是否异步请求
        cache: false,
        type: 'POST',//请求方式
        dataType: "json",//数据格式
        data: data,
        url: localUrl + '/pc/product/list',//请求地址
        error: function () {
            // alert("加载失败");
            console.log("加载失败")
        },
        success: function (data) {
            if (data.code == "200") {
                var datas = data.data;
                console.log(datas)

                pageUtil(datas.pages,datas.pageNum,5)
                var htm = '';
                for (var i = 0; i < data.data.list.length; i++) {
                    htm += '<div class="content-item clearfix" data-id='
                        + data.data.list[i].id + '" id="count_' + i + '">'
                        + '<p>' + data.data.list[i].name + '</p>' +
                        '<p class="pull-left col-lg-3">期望年化利率 <i>' + data.data.list[i].apr + '%</i> </p>' +
                        '<p class="pull-left col-lg-2">项目期限 <i>' + data.data.list[i].timeLimitDay + '</i>天</p>' +
                        '<p class="pull-left col-lg-2">剩余金额 <span>' + data.data.list[i].residueAccount + '</span> 元</p>' +
                        ' <p class="pull-left col-lg-3"><span class="dqjd"></span></p>' +
                        '<span class="pull-left">' + data.data.list[i].scales + '%</span> ' +
                        '<div  class="btn pull-right col-lg-2">' +
                        '<div  class="buyBtn" data-id = "'+ data.data.list[i].id + '" onclick="jumpToProductDetailed('+data.data.list[i].id+')">立即投标</div> ' +
                        '</div>' +
                        '</div>'
                }
                $('#products').append(htm);
                for(var i=0 ;i<data.data.list.length;i++){
                    $('.dqjd')[i].style.width = data.data.list[i].scales+'%';
                }

                // pageList(poProductList(datas.hasNextPage, datas.hasPreviousPage, datas.lastPage, datas.list, datas.nextPage, datas.pageNum, datas.pageSize, datas.pages, datas.prePage, datas.total));
            } else {
                // alert(data.msg)
                console.log(data.data.msg)
            }
        }
    });
}

function pageUtil(pageCount,currentPage,perPageNum) {
    var pageNavObj = null;
    // jQuery(document).ready(function($) {
    //初始化
    //pageNavCreate("PageNav",200,1,pageNavCallBack);
    pageNavObj = new PageNavCreate("PageNavId",{
        pageCount:pageCount,//总页数
        currentPage:currentPage,//当前页
        perPageNum:perPageNum//每页按钮数
    });
    pageNavObj.afterClick(pageNavCallBack);
    // });
    console.log(pageNavObj)

//翻页按钮点击后触发的回调函数
    function pageNavCallBack(clickPage){
        //clickPage是被点击的目标页码
        //一般来说可以在这里通过clickPage,执行AJAX请求取数来重写页面
        productListDefault(isxs,time,clickPage);
        //最后别忘了更新一遍翻页导航栏
        //pageNavCreate("PageNav",pageCount,clickPage,pageNavCallBack);
        pageNavObj = new PageNavCreate("PageNavId",{
            pageCount:pageCount,//总页数
            currentPage:clickPage,//当前页
            perPageNum:perPageNum,//每页按钮数
        });
        pageNavObj.afterClick(pageNavCallBack);
    }

}
function poProductList(hasNextPage, hasPreviousPage, lastPage, list, nextPage, pageNum, pageSize, pages, prePage, total) {
    var o = new Object();
    o.nextPage = nextPage;//下一页
    o.hasNextPage = hasNextPage; //是否有下一页
    o.hasPreviousPage = hasPreviousPage; //是否有上一页
    o.lastPage = lastPage; //最后一页
    o.list = list; //具体集合参数
    o.pageNum = pageNum; //页码
    o.pageSize = pageSize; //本页数量
    o.pages = pages; //总页码
    o.prePage = prePage; //上一页
    o.total = total; //总数量
    return o;
}

