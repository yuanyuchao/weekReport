var issendmes = 0;
$(function() {
	/*yzmClickOpr();
	payClickOpr();
	pageDomInitial();
	inputListenFun();
	yzmClickOpr();
	payClickOpr();
	reInputClickOpr();*/
	//ajaxGenerateMd5();
});

/**
 * 初始化
 */
/*function pageDomInitial(){
	issendmes = 0;
	$('#amt').html(yuan2Fen(QueryString.GetValue('AMT')));//初始化金额
	if(QueryString.GetValue('LOCALINPUTCARD')=="1"){
		$("input[name='b_card']").val(QueryString.GetValue('BANKCARD'));//初始化卡号
	}else{
		$("input[name='b_card']").val(getMaskedStr(QueryString.GetValue('BANKCARD'),6,4));//初始化卡号
	}
	var custName = QueryString.GetValue('NAME'),custIdNo = QueryString.GetValue('IDNO');
	if(!isBlank(custName) && QueryString.GetValue('LOCALINPUTCARD')!="1"){
		$("input[name='b_name']").val(getMaskedStr(custName,1,0));//初始化姓名
		$("input[name='b_name']").attr('readonly',true);
	}else{
		$("input[name='b_name']").val(custName);//初始化姓名
	}
	if(!isBlank(custIdNo) && QueryString.GetValue('LOCALINPUTCARD')!="1"){
		$("input[name='b_idno']").val(getMaskedStr(custIdNo,8,4));//初始化身份证
		$("input[name='b_idno']").attr('readonly',true);
	}else{
		$("input[name='b_idno']").val(custIdNo);//初始化身份证
	}
	var ret = getCardBin(QueryString.GetValue('BANKCARD'),QueryString.GetValue('MCHNTCD'));
	bank_logo_url = 'images/bank_logo/' + ret.InsCd.substring(3, 6) + '.png';
	$('#bank_type').html('借记卡');
	$('#bank_name').html(ret.Cnm);
	if(ret.InsCd == '0801040000'){
		$('#agreement').html('同意<a href="payment.html">《支付服务协议》</a>及<a href="boc_agreement.html">《中国银行股份有限公司借记卡快捷支付服务协议》</a>');
	}
	else{
		$('#agreement').html('同意<a href="payment.html">《支付服务协议》</a>');
	}
	
	
	QueryString.Initial();
	logoDisplay();
	$('#amt').html(yuan2Fen(QueryString.GetValue('AMT')));//初始化金额
	var ctp = QueryString.GetValue('CTP');
	var cnm=QueryString.GetValue('CNM');
	$('#bank_name').html(cnm+'(' + QueryString.GetValue('BANKCARD').substring( QueryString.GetValue('BANKCARD').length -4)+')');
	if (ctp =='01') $('#bank_type').html('借记卡');
	if (ctp =='02') $('#bank_type').html('信用卡');
	$('#mobileNmb').html(QueryString.GetValue('MOBILE').substring(0,3)+'****'+QueryString.GetValue('MOBILE').substring(7));
	$('#getYzm').attr('disabled',false);
	$("button[name='paybtn']").attr('disabled', true);
	$("button[name='paybtn']").addClass('grey');
}*/

/**
 * 点击验证码的操作
 */
// function yzmClickOpr(){
// //	$("#getYzm").on("click",function() {
// 		//$('.sj_concent').showLoading();
// 	    setParamVal();
// 		var reqXml = createReqXml();
// 		var ret = new Array(2);
// 		$.ajax({
// 			type : 'post',
// 			url : $.getConst('INTERFACE_URL_YZM_CHECK'),
// 			data : {FM : reqXml},
// 			dataType : 'xml',
// 			async : true,
// 			success : function(data) {
// 				//$('.sj_concent').hideLoading();
// 				ret[0] = $(data).find('RESPONSECODE').text();
// 				ret[1] = $(data).find('RESPONSEMSG').text();
// 				if (ret[0] != '0000') {
// 					/*$('#error_msg').html("<img src='images/b_error.png' />"+ ret[1]);
// 					$(".sj_fixedbox").popfixed();*/
// 					return false;
// 				} else {
// 					QueryString.SetValue('SIGN',$(data).find('SIGN').text());
// 					QueryString.SetValue('SIGNPAY',$(data).find('SIGNPAY').text());
//                 	QueryString.SetValue('TYPEID',$(data).find('TYPEID').text());
// 					issendmes = 1;
// 					/*$("#getYzm").css({
// 						"background-color" : "#f3f3f3"
// 					});
// 					$("#getYzm").attr('disabled', true);
// 					var times = 180;
// 					$("#getYzm").html("180");
// 					var timer = window.setInterval(function() {
// 						times--;
// 						$("#getYzm").html(times);
// 						if (times <= 0) {
// 							window.clearInterval(timer);
// 							$("#getYzm").css({
// 								"background-color" : "#fff"
// 							});
// 							$("#getYzm").html("获取验证码");
// 							$("#getYzm").attr('disabled', false);
// 						}
// 					}, 1000);*/
// 				}
// 			},
// 			error : function(data) {
// 				/*$('.sj_concent').hideLoading();
// 				$('#error_msg').html("<img src='images/b_error.png' />"+ "网络异常，请稍后重试");
// 				$(".sj_fixedbox").popfixed();*/
// 				return false;
// 			}
// 		});
// //	});
// }


/**
 * 电击重新支付操作按钮
 */
function reInputClickOpr(){
	$("#reInputData").on("click",function() {
		if(QueryString.GetValue('TYPE')=='10'){
    		location.href = "pay_debit.html?" + createUrlParam();
    	}else if(QueryString.GetValue('TYPE')=='11'){
    		location.href = "pay_nocard.html?" + createUrlParam();
    	}
	});
}

/**
 * 输入变化控制支付按钮样式
 */
function inputListenFun(){
	$("input[name='yzm']").bind('input propertychange blur',function(){
		if(validateYZM($(this).val())){
			$("button[name='paybtn']").attr('disabled',false);
		    $("button[name='paybtn']").removeClass('grey');
		}else{
			$("button[name='paybtn']").attr('disabled',true);
		    $("button[name='paybtn']").addClass('grey');
		}
	});
}

function setParamVal(){
	QueryString.SetValue('MOBILE',$("input[name='mobile']").val());
	QueryString.SetValue('VERCD',$("input[name='yzm']").val());
	
	
	if($("span[name='b_name']").text().indexOf("*")==-1){
		QueryString.SetValue('NAME',$("input[name='b_name']").val());
	}
	if($("span[name='b_idno']").text().indexOf("*")==-1){
		QueryString.SetValue('IDNO',$("input[name='b_idno']").val());
	}
	if($("span[name='b_card']").text().indexOf("*")==-1){
 		QueryString.SetValue('BANKCARD',$("input[name='b_card']").val());
	}
}

function checkInputBeforeOpr(){
	var b_name = $("input[name='b_name']").val(),
		b_idno = $("input[name='b_idno']").val(),
		mobile = $("input[name='mobile']").val();
	if(isBlank(QueryString.GetValue('NAME')) && isBlank(b_name)){
		$('#error_msg').html("<img src='images/b_error.png' />" + '请输入姓名');
		$(".sj_fixedbox").popfixed();
		return false;
	}
	if(isBlank(QueryString.GetValue('IDNO')) && !IdCardValidate(b_idno)){
		$('#error_msg').html("<img src='images/b_error.png' />" + '请输入正确的身份证号');
		$(".sj_fixedbox").popfixed();
		return false;
	}
	if(!validatemobile(mobile)){
		$('#error_msg').html("<img src='images/b_error.png' />" + '请输入正确的手机号');
		$(".sj_fixedbox").popfixed();
		return false;
	}
	return true;
}


/**
 * 点击支付
 */
// function payClickOpr(){
// //	$("button[name='paybtn']").bind('click',function(){
// 		if(issendmes==0){
//             /*$('#error_msg').html("<img src='images/b_error.png' />" + '请点击获取验证码');
//             $(".sj_fixedbox").popfixed();*/
//             return false;
// 		}
// 		/*$("button[name='paybtn']").attr('disabled',true);
// 	    $("button[name='paybtn']").addClass('grey');
// 	    $('.sj_concent').showLoading();*/
// 	    QueryString.SetValue('VERCD',$("input[name='yzm']").val());
// 	    setParamVal();
// 	    var reqXml = createReqXml(),ret;
// 	    var reqUrl = $.getConst('INTERFACE_URL_PAY_NEW');
// 	    $.ajax({
//             type:'post',
//             url: reqUrl,
//             data:{FM:reqXml},
//             dataType:'xml',
//             async:true,
//             success:function(data){
            	
//                 ret = {
//                     Rcd: $(data).find('RESPONSECODE').text(),
//                     RDesc: $(data).find('RESPONSEMSG').text()
//                 };
// //                $('.sj_concent').hideLoading();
//                 QueryString.SetValue('RESPONSECODE',ret.Rcd);
//         		QueryString.SetValue('RESPONSEMSG',ret.RDesc);
//                 if (ret.Rcd=='8110' || ret.Rcd=='8143' || ret.Rcd=='8010') {
//                     /*$('#error_msg').html("<img src='images/b_error.png' />" + ret.RDesc);
//                     $(".sj_fixedbox").popfixed();
//                     $("button[name='paybtn']").attr('disabled',false);
//                     $("button[name='paybtn']").removeClass('grey');*/
//                 	//location.href = "error.html?" + createUrlParam();
//                 	alert(ret.RDesc);
//                 }else{
//                 	if (ret.Rcd !='0000') { //失败跳转界面
//                           location.href = "error.html?" + createUrlParam();
//                     }else{ //成功调整界面\
//                     	  QueryString.SetValue('SIGN',$(data).find('SIGN').text());
//                     	  QueryString.SetValue('TYPEID',$(data).find('TYPEID').text());
//                           location.href = "success.html?" + createUrlParam();
//                     }
//                 }
//             },
//             error:function(data){
//             	/*$('.sj_concent').hideLoading();
//             	$('#error_msg').html("<img src='images/b_error.png' />" + "网络异常，请稍后重试");
//                 $(".sj_fixedbox").popfixed();*/
//                 return false;
//             }
// //        }); 
// 	});
// }

/**
 * 载入执行，异步获取卡号加密
 */
function ajaxGenerateMd5(){
	if(QueryString.GetValue('TYPEID')!='01') return;
    var reqXml = createReqXml(),ret;
    var reqUrl = $.getConst('INTERFACE_URL_CARDINF_MD5ENCODE');
	$.ajax({
        type:'post',
        url: reqUrl,
        data:{FM:reqXml},
        dataType:'xml',
        async:true,
        success:function(data){
            ret = {
                Rcd: $(data).find('RESPONSECODE').text(),
                RDesc: $(data).find('RESPONSEMSG').text()
            };
            if (ret.Rcd=='0000') {
            	QueryString.SetValue('SIGN',$(data).find('SIGN').text());
            	QueryString.SetValue('TYPEID',$(data).find('TYPEID').text());
            }else{
            	$('#error_msg').html("<img src='images/b_error.png' />"+ ret[1]);
				$(".sj_fixedbox").popfixed();
				return false;
            }
        },
        error:function(data){
        	$('.sj_concent').hideLoading(); 
        	$('#error_msg').html("<img src='images/b_error.png' />" + "网络异常，获得银行卡加密密文失败，请稍后重试");
            $(".sj_fixedbox").popfixed();
            return false;
        }
    });
}