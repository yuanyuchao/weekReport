$('#menu').load('../public/menu2.html');

$(function () {

    //获取用户信息
    $.ajax({
        url:'/patientControllerAPP.do?getPatientInfo',
        type:'post',
        success:function(data) {
            var data = JSON.parse(data);
            if(data.status==0){
                var data = data.data;
                $('.user-name').text(data.patientName);
                if(data.sex=='男性'){
                    $('.sex').attr('src','../../img/index/man@2x.png')
                };
                $('.dialysis-num').text(data.dialysisNo);
                $('.user-age').text(data.age+'岁');
                $('.user-bloodType').text(data.bloodType);
                $('.frist-time').text(data.firstDialysisDate);
                $('.dialysis-age').text(data.dialysisAge);
                $('.total').text(data.dialysisCount);
                $('.attending-doctor').text(data.mainDoctor);
                $('.nurse').text(data.mainNurse);
                $('.diagnose-content').text(data.diagnoses);
            }else if(data.status==2){
                layer.msg(data.msg);
                window.location.href='../login/login.html';
            }
        },
        error:function (data) {
        }
    })


})
// 百度商桥
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?2f5e44f0a71666c236f1de46ee2e25f4";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();