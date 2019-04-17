var localUrl = 'http://192.168.1.102:8053';


    $.ajax({
        async: true,//是否异步请求
        cache: false,
        type: 'POST',//请求方式
        dataType: "json",//数据格式
        url: localUrl + '/pc/data/collection',//请求地址
        error: function () {
            alert("加载失败");
            console.log("加载失败")
        },
        success: function (data) {
            if (data.code == "200") {
                console.log(data.data)
                var datas = data.data;
                $("#ljcjje").html(datas.ljcjje);
                $("#ljyhsy").html(datas.ljyhsy);
                $("#ljzcyh").html(datas.ljzcyh);

                $("#ljcjbs").html(datas.ljcjbs);
                $("#ljcjrzs").html(datas.ljcjrzs);
                $("#bncjje").html(datas.bncjje);


                $("#ljjkrzs").html(datas.ljjkrzs);
                $("#dhje").html(datas.dhje);
                $("#dhjebs").html(datas.dhjebs);
                $("#xmyql").html(datas.xmyql);

                $("#yqje").html(datas.yqje);
                $("#jeyql").html(datas.jeyql);
                $("#jstysyql").html(datas.jstysyql);
                $("#jstysyqje").html(datas.jstysyqje);
                $("#jstysljyql").html(datas.jstysljyql);
                var zddh = (datas.zddhcjyezb).toString().substr(0,2);
                var zdsh = (datas.zdshtzcjzb).toString().substr(0,2);
                var xbnan = (datas.xbnan).toString().substr(0,3);
                var xbnv = (datas.xbnv).toString().substr(0,3);
                var qydh =( Math.abs(datas.qydhcjyezb)).toString().substr(0,2);
                var qyyh =( Math.abs(datas.qyyhcjyezb)).toString().substr(0,2);

                $('.zddh').html(zddh);
                $('.qydh').html(qydh);
                $('.zdsh').html(zdsh);
                $('.qyyh').html(qyyh);
                $('.xbnan').html(xbnan);
                $('.xbnv').html(xbnv);
                eacharts(zddh,zdsh,qydh,qyyh,xbnan,xbnv);




            } else {
                alert(data.msg)
            }

        }
    });
