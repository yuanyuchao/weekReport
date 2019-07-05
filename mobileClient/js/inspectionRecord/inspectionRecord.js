$('#menu').load('../public/menu2.html');
$(function () {
    $.ajax({
        url:'/patientControllerAPP.do?getTestCountList',
        type:'post',
        xhrFields: {
            withCredentials: true
        },
        success:function(data) {
            var data = JSON.parse(data);
            var str = '';
            if(data.status==0){
                var datas = data.data;
                for( var i in datas ){
                    str += `<li>
                                <a href="detail.html?table_name=${datas[i].table_name}&name=${datas[i].name}"><span>${datas[i].name}</span>
                                <div><span >${datas[i].count}次</span>
                                <img src="../../img/inspectionRecord/enter@2x.png" alt="">
                                </div>
                                </a>
                                </li>`;
                }
                $('.record-content').html(str);
            }else if(data.status==2){
                layer.msg(data.msg);
                window.location.href='../login/login.html';
            }
        },
        error:function (data) {
            var data = JSON.parse(data);
            console.log(data.msg);
        }
    })
})