
function getOffsetDays(time1, time2) {
    var offsetTime = Math.abs(time1 - time2);
    return Math.floor(offsetTime / (3600 * 24 * 1e3));
}
// 获取相隔天数
var offsetDay = getOffsetDays(Date.now(), (new Date(2015, 4, 15)).getTime());
$(".offsetDay").text(offsetDay);


$.ajax({
        type : 'POST',//请求方式
        dataType : "json",//数据格式
        url : 'http://192.168.1.102:8053/pc/index',//请求地址
        error : function() {
            console.log("加载失败")
        },
        success : function(data) {
            if (data.code=="200"){
                console.log(data.data);
                var data = data.data;

                //轮播图
                var imgLength = data.imagesTypePOList.length;
                console.log(imgLength);
                for(var i=0;i<imgLength;i++){

                    if(i == 0){
                        var imgDemo = "<div class='item active'><img src='"+ data.imagesTypePOList[i].imgurl +"' alt='...'><div class='carousel-caption'></div></div>";
                        var liDemo = "<li data-target='#carousel-example-generic' data-slide-to='" +i+" ' class='active'></li>";
                    }else{
                        var imgDemo = "<div class='item'><img src='"+ data.imagesTypePOList[i].imgurl +"' alt='...'><div class='carousel-caption'></div></div>";
                        var liDemo = "<li data-target='#carousel-example-generic' data-slide-to='" +i+" '></li>";
                    }
                    $(".carousel-indicators").append(liDemo);
                    $(".carousel-inner").append(imgDemo);
                }

                $(".addUpMoney").text(data.addUpMoney);
                $(".addUpInterest").text(data.addUpInterest);
                $(".sevenGetMoney").text(data.sevenGetMoney);
                console.log(data.xsProduct);
                //新手标信息
                $(".xsName").text(data.xsProduct.name);
                $(".xsApr").text(data.xsProduct.apr);
                $(".xsTimeLimitDay").text(data.xsProduct.timeLimitDay);
                $(".xsJindu").animate({width:data.xsProduct.scales+"%"},1000);
                $(".xsScales").text(data.xsProduct.scales+"%");
                $(".buyBtn").attr("data-id",data.xsProduct.id);
                var length = data.productResponseList.length;
                var ptLength = data.list3.length;
                var yyLength = data.list1.length;
                var zxLength =data.list2.length;
                //精选标信息
                for(var i=0;i<length;i++){
                    var jxDemo = "<div class='xinshouContent marginB xsContent xsDiv'><p class='xinshouTitle clearfix'><span class='pull-left jxName'>"
                        + data.productResponseList[i].name +"</span><span class='jxTehui pull-left'>"+ "双十二特惠" +"</span></p><div class='pull-left nianhuaDiv'><p class='nianhua jxApr'>"+data.productResponseList[i].apr+"<span class='beifen'>"+"%"+"</span></p><span class='nianhuaZi'>"+ "期望年化利率" +"</span></div><div class='nianhuaDivT pull-left'><p class='nianhuaTwo nianhuaTwos'><span class='tianshu jx'>"+ data.productResponseList[i].timeLimitDay+"</span><span class='tianZi'>"+"天" +"</span></p><p class='nianhuaZi'>"+"项目期限"+"</p></div><div class='nianhuaDivS pull-left'><p class='syMoney'><span class='nianhuaZi'>"+"剩余金额"+"</span><span class='jxShengyu'>"+ data.productResponseList[i].surplusAccount +"</span>"+"元"+"</p><div class='jindu'><span class='jinduAll pull-left jxAll'><span class='jinduNow pull-left jxJindu'></span></span><p class='pull-left jinduBaifen'>"+data.productResponseList[i].scales+"%"+"</p></div></div><div onclick=jumpToProductDetailed("+ data.productResponseList[i].id +") class='buyBtn pull-left' data-id='"+ data.productResponseList[i].id +  "\'>立即购买</div></div>";
                    /*$(".jxJindu").animate({width:data.productResponseList[i].scales+"%"},1000);*/
                    console.log($(".jxJindu"));
                    $(".jxList").append(jxDemo);
                }
                for(var i=0;i<length;i++){
                    if(data.productResponseList[i].litpic != ""){
                        $(".jxTehui").css("display","block");
                        $(".jxTehui").text(data.productResponseList[i].litpic);
                    }else{
                        $(".jxTehui").css("display","none");
                    }
                    $(".jxJindu")[i].style.width = data.productResponseList[i].scales+"%";
                }

                //平台公告
                for(var i=0;i<ptLength;i++){
                    $(".ptgg p")[i].innerText = data.list3[i].topic;
                    $(".ptgg p")[i].setAttribute("data-url",data.list3[i].msg);
                }

                //运营报告
                for(var i=0;i<yyLength;i++){
                    console.log(data.list1[i].name);
                    $(".yybg p")[i].innerText = data.list1[i].name;
                    $(".yybg p")[i].setAttribute("data-url",data.list1[i].jumurl);
                }

                //最新动态
                for(var i=0;i<zxLength;i++){
                    $(".zxdt p")[i].innerText = data.list2[i].name;
                    $(".zxdt p")[i].setAttribute("data-url",data.list2[i].jumurl);
                }

                $("#xsBiao").click(function(){
                    var dataId =$(this).attr("data-id");
                    jumpToProductDetailed(dataId);
                })

                //文章跳转
                $(".ptTitle").click(function(){
                    var newUrl = $(this).attr("data-url");
                    window.location.href="dongtaiDetail.html?url="+newUrl+"";
                })

            }else {
                alert(data.msg)
            }
        }
    });
