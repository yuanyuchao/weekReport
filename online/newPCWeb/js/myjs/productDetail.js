var localUrl = 'http://192.168.1.102:8053';
var id = document.URL.split('?')[1].split('=')[1];
// var id= 10793;

(function detailed(id) {
    $.ajax({
        async : true,//是否异步请求
        cache : false,
        type : 'POST',//请求方式
        dataType : "json",//数据格式.

        data:{id:id},
        url : localUrl+'/pc/product/detail',//请求地址
        error : function() {
            alert("加载失败");
            console.log("加载失败")
        },
        success : function(data) {
            if (data.code=="200"){
                // var datas = data.data;
                    console.log(data.data.use)
                // console.log($('#apr').text())

                var datas = data.data;
                if(datas.use==0){
                    $('.noRegistration').css('display','none');
                    $('.registration').css('display','block');
                }
                if(datas.use==1){
                    $('.registration').css('display','none');
                    $('.tzRecond').css('display','none');
                    $('.noRegistration').css('display','block')
                }
              $('#apr>p:nth-of-type(1)').html(datas.apr+'<i>%</i>');
                $('#apr>p:nth-of-type(3)').html('起购金额:'+datas.lowestAccount+'元');
                $('#apr>p:nth-of-type(4)').html('项目总额:'+datas.account+'元');
                $('#money>p:nth-of-type(1)').html(''+datas.surplusAccount+'<i>元</i>');
                $('#money>p:nth-of-type(3)').html('项目最大出借额:'+datas.mostAccount+'<i>元</i>');
                $('.dqjd').css('width',datas.scales);
                $('.jdbfb').html(''+datas.scales+'%');
                $('#time>p:nth-of-type(1)').html(''+datas.timeLimitDay+'<i>天</i>');
                //产品详情
                $('.proCon tr:nth-of-type(1) td:nth-of-type(2)').html(datas.financeCompany);
                $('.proCon tr:nth-of-type(2) td:nth-of-type(2)').html(''+datas.account+'元');
                $('.proCon tr:nth-of-type(3) td:nth-of-type(2)').html(''+datas.timeLimitDay+'天');
                $('.proCon tr:nth-of-type(4) td:nth-of-type(2)').html(datas.loanUsage);
                $('.proCon tr:nth-of-type(5) td:nth-of-type(2)').html(datas.payment);
                //项目照片
                // $('#jq22>img:nth-of-type(1)').attr('src',datas.imgurl1);
                // $('#jq22>img:nth-of-type(2)').attr('src',datas.imgurl2);
                // $('#jq22>img:nth-of-type(3)').attr('src',datas.imgurl3);
                // $('#jq22>img:nth-of-type(4)').attr('src',datas.imgurl4);
                // $('#jq22>img:nth-of-type(5)').attr('src',datas.imgurl5);
                // $('#jq22>img:nth-of-type(6)').attr('src',datas.imgurl6);
                // $('#jq22>img:nth-of-type(7)').attr('src',datas.imgurl7);
                // $('#jq22>img:nth-of-type(8)').attr('src',datas.imgurl8);
                // $('#jq22>img:nth-of-type(9)').attr('src',datas.imgurl9);
                // $('#jq22>img:nth-of-type(10)').attr('src',datas.imgurl10);

            }
            else {
                alert(data.msg)
            }

        }
    });
})(id)



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
        records(clickPage);
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



;(function records(page) {
    if(page==null){
        page=1
    }
    $.ajax({
        async : true,//是否异步请求
        cache : false,
        type : 'POST',//请求方式
        dataType : "json",//数据格式
        data:{"page":page,"borrowId":id},
        url : localUrl+'/pc/product/records',//请求地址
        error : function() {
            alert("加载失败");
            console.log("加载失败")
        },
        success : function(data){
            if(data.code=='200'){
                // console.log(data);
                var datas = data.data;
                pageUtil(datas.pages,datas.pageNum,5)
                var str = '';
                var index = 1;
                for(var i=0; i<datas.list.length;i++){
                    str+='<li><span>'+(index++)+'</span>';
                    str+='<span>'+datas.list[i].phone+'</span>';
                    str+='<span>'+datas.list[i].account+'</span>'
                    str+='<span>'+datas.list[i].addtime+'</span>';
                    str+='</li>';
                }
                $('#records').append(str)

            }else{
                alert(data.msg);
            }

        }
    })
})();
