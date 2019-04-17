/**
 * 富有支付工具类
 */

//测试
/*var BASE_URL = 'http://www-1.fuiou.com:18670/mobile_pay';
var env_active = 'tst';*/

//生产
var BASE_URL='https://mpay.fuiou.com:16128';
var env_active='oln';

var CONST = {
  
  //INTERFACE_URL_PRE: 'http://www-1.fuiou.com:18880/mobile_pay/fmp/doPay.pay',
  INTERFACE_URL_PRE: BASE_URL+'/fmp/doPay.pay', //验证�?
  //INTERFACE_URL_PRE: 'https://mpay.fuiou.com:16128/fmp/doPay.pay',
  METHOD_QUERY_CARD_BIN: 'queryCardBin',
  METHOD_SEND_MSG: 'sendMesNoSdk',
  INTERFACE_URL_PAY: BASE_URL+'/mbPay/mbPay.pay',
  INTERFACE_URL_PAY_KJ: BASE_URL+'/mbsPay/mbsPay.pay',
  INTERFACE_URL_PAY_NEXT: BASE_URL+'/h5pay/payNextAction.pay',
  //INTERFACE_URL_PAY_KJ: 'https://mpay.fuiou.com:16128/mbPay/mbsPay.pay',
  //INTERFACE_URL_PAY: 'https://mpay.fuiou.com:16128/mbPay/mbPay.pay',
  //-------------------------------hhb
  //h5 test 
  INTERFACE_URL_YZM_CHECK:BASE_URL+'/h5pay/messageAction.pay', 	 	  //新验证码接口地址
  INTERFACE_URL_PAY_NEW:BASE_URL+'/h5pay/h5PayAction.pay', 	 		  //新支付接口地�?
  INTERFACE_URL_CARDINF_LOAD:BASE_URL+'/h5pay/cardInfoAction.pay',	  //加载卡信息地�?
  INTERFACE_URL_CARDINF_DELETE:BASE_URL+'/h5pay/unbindCardAction.pay', //删除卡信息地�?
  INTERFACE_URL_CARDINF_MD5ENCODE:BASE_URL+'/h5pay/encryptAction.pay', //卡加密地�?
  INTERFACE_URL_CARD_SAVE:BASE_URL+'/h5pay/bindCardAction.pay', 	 	  //卡信息保存地�?
  INTERFACE_URL_REINPUT_OPR:BASE_URL+'/h5pay/tranTyidAction.pay',	  //重新输入卡信�?冲至地址
  RSAKEY_PUBLIC_EXPONENT:'10001',
    IMAGE_PUBLIC_URL:BASE_URL+'/newpay',
//RSAKEY_MODULUS:'00ed608d02189c31bb9358eec956c0857a9fcb4f219c3fb9db818de4be6485da8331c9cf79e4e3a5ab318cd56d8f70a74e94f6115fe0d95b55c08fe8d68a83e076dfa15820a9e2aa15a58b1d863dfdddb05f8c876d0ca3c10d2cea81266dde33f683e72378460b23a59410ae59e0cb1b256181235293ded3ddbf7fce9a9659091d'
  RSAKEY_MODULUS:'00ed608d02189c31bb9358eec956c0857a9fcb4f219c3fb9db818de4be6485da8331c9cf79e4e3a5ab318cd56d8f70a74e94f6115fe0d95b55c08fe8d68a83e076dfa15820a9e2aa15a58b1d863dfdddb05f8c876d0ca3c10d2cea81266dde33f683e72378460b23a59410ae59e0cb1b256181235293ded3ddbf7fce9a9659091d',

	  //h5 real
  //RSAKEY_MODULUS:'00c36a64f270dbbe8625056ce5adef2eb51fe6418ae01be53e8d03d84d15e0e893c58edb0e2477a5bc7b318705c6973a85441198ede28a035adc85299b9e07559b232af07a4368c9c12c96d9375639bbd48562c95bb40f948402f5c8ebb035926ab02b0c9b96868cd81a3157764b10428c1ec522a61e31301fcd4d8fdc27195251',
};

$.getConst = function(name){
  return CONST[name];
};

/*
 * @param yuan
 * @returns
 */
function yuan2Fen(yuan) {
    if (yuan == '0') {
        return '0';
    }
    if(yuan.length <= 2)
    {
        return '0.'+ ((yuan.length >1) ? yuan : (+'0'+yuan));
    }
    return yuan.substring(0, yuan.length - 2) + "." + yuan.substring(yuan.length - 2, yuan.length);
}

/*card bin begin*/
function crtGetCardBinXml(card_no,mchnt_cd){
    return '<FM><Ono>'+ card_no +'</Ono><Action>queryCardBin</Action><MchntCd>'+mchnt_cd+'</MchntCd></FM>';
}

function getCardBin(card_no,mchnt_cd){
    var reqXml = crtGetCardBinXml(card_no,mchnt_cd);
    var ret;
    $.ajax({
        type:'post',
        url: $.getConst('INTERFACE_URL_PRE'),
        data:{FM:reqXml},
        dataType:'xml',
        async:false,
        success:function(data){
            ret = {
                Rcd: $(data).find('Rcd').text(),
                RDesc: $(data).find('RDesc').text(),
                Ctp:$(data).find('Ctp').text(),
                Cnm:$(data).find('Cnm').text(),
                InsCd:$(data).find('InsCd').text()
            };
        }
    });
    return ret;
}
/*card bin end*/

// ################### IDCARD util begin ############################
var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子
var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位�?10代表X
function IdCardValidate(idCard) {
    idCard = trim(idCard.replace(/ /g, ""));               // 去掉字符串头尾空�?
    if (idCard.length === 15) {
        return isValidityBrithBy15IdCard(idCard);       // 进行15位身份证的验�?
    } else if (idCard.length === 18) {
        var a_idCard = idCard.split("");                // 得到身份证数�?
        if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){   // 进行18位身份证的基本验证和�?8位的验证
            return true;
        }else {
            return false;
        }
    } else {
        return false;
    }
}
/**
 * 判断身份证号码为18位时�?��的验证位是否正确
 *
 * @param a_idCard
 *            身份证号码数�?
 * @return
 */
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0;                             // 声明加权求和变量
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;                    // 将最后位为x的验证码替换�?0方便后续操作
    }
    for ( var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];            // 加权求和
    }
    valCodePosition = sum % 11;                // 得到验证码所位置
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}
/**
 * 验证18位数身份证号码中的生日是否是有效生日
 *
 * @param idCard
 *            18位书身份证字符串
 * @return
 */
function isValidityBrithBy18IdCard(idCard18){
    var year =  idCard18.substring(6,10);
    var month = idCard18.substring(10,12);
    var day = idCard18.substring(12,14);
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题
    if(temp_date.getFullYear()!==parseFloat(year) || temp_date.getMonth()!==parseFloat(month)-1 || temp_date.getDate()!==parseFloat(day)){
        return true;
    }else{
        return true;
    }
}
/**
 * 验证15位数身份证号码中的生日是否是有效生日
 *
 * @param idCard15
 *            15位书身份证字符串
 * @return
 */
function isValidityBrithBy15IdCard(idCard15){
    var year =  idCard15.substring(6,8);
    var month = idCard15.substring(8,10);
    var day = idCard15.substring(10,12);
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题�?使用getYear()方法
    if(temp_date.getYear()!==parseFloat(year) ||temp_date.getMonth()!==parseFloat(month)-1 ||temp_date.getDate()!==parseFloat(day)){
        return false;
    }else{
        return true;
    }
}

//去掉字符串头尾空�?
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
//################### IDCARD util end ############################






//---------------------------------hhb
/**
 * logo的显示或影藏
 */
function logoDisplay(){
	var logoTp = QueryString.GetValue('LOGOTP');
	if(logoTp=='1')
		$(".sj_header").hide();
	else if(logoTp=='0'){
		$(".sj_header").show();
	}
}

/**
 * json数组转xml字符串ORDER�?
 */
function createReqXml(){
	var paramXml = '<ORDER>',paramMap = QueryString.data;
	$.each(paramMap,function(key,val){
		paramXml = paramXml + '<'+key+'>'+val+"</"+key+'>';
	});
	paramXml += '</ORDER>';
	
	return paramXml;
}

/**
 * json数组中指定元素转xml字符串ORDER�?
 */
function createParamedReqXml(keyArr){
	var paramMap = QueryString.data;
	if(isBlank(keyArr) || isBlank(paramMap)) return '';
	var paramXml = '<ORDER>',paramVal;
	$.each(keyArr,function(index,item){
		paramVal = paramMap[item];
		if(isBlank(paramVal)) return true;
		paramXml = paramXml + '<'+item+'>'+paramVal+"</"+item+'>';
	});
	paramXml += '</ORDER>';
	return paramXml;
}


/**
 * url链接特殊字符加密
 */
function encode(value){
	return encodeURIComponent(encodeURIComponent(value));
}

/**
 * json Array中数据，转化为url请求参数
 */
function createUrlParam(){
	var paramMap = QueryString.data;
	if(isBlank(paramMap)) return '';
	var urlParam = '';
	$.each(paramMap,function(key,val){
		urlParam = urlParam + key + '=' + encode(val) + '&';
	});
	return urlParam.substr(0,urlParam.length-1);
}

function createUrlParamWithparamMap(paramMap){
	if(isBlank(paramMap)) return '';
	var urlParam = '';
	$.each(paramMap,function(key,val){
		urlParam = urlParam + key + '=' + encode(val) + '&';
	});
	return urlParam.substr(0,urlParam.length-1);
}



QueryString = {
    data: {},
    Initial: function(url) {
        var aPairs, aTmp;
//        var queryString = new String(window.location.search);
        if (url.indexOf("?") != -1) {  
        	 url = url.substr(url.indexOf("?"), url.length);
        }
        var queryString = new String(url);
        queryString = queryString.substr(1, queryString.length); //remove "?"
        aPairs = queryString.split("&");
        for (var i = 0; i < aPairs.length; i++) {
            aTmp = aPairs[i].split("=");
            this.data[aTmp[0]] = decodeURIComponent(decodeURIComponent(aTmp[1]));
        }
    },
    GetValue: function(key) {
    	var result = this.data[key];
    	if(isBlank(result)) return '';
        return result;
    },
    SetValue: function(key,val){
    	this.data[key] = val;
    }
};

function maxLengthCheck(object){
	if (object.value.length > object.maxLength){
		object.value = object.value.slice(0, object.maxLength);
	}
}

function validatemobile(mobile){  
	var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[89]{1})|166)+\d{8})$/; 
    if(mobile.length!=11 || !reg.test(mobile)){
        return false; 
    }
    return true;
}

function validateYZM(yzm){
	var reg = /^\S+$/;
	return reg.test(yzm);
}

function isBlank(val){
	if (typeof(val) == 'undefined' || val == null || val.length==0 || val == 'null' || val == 'NULL' ){
		return true;
	}
	return false;
}

//加密 cvv2
function getEncrypted_Rsa(plainText){
	if("tst"==env_active){
		return plainText;
	}
    var rsa = new RSAKey();
    rsa.setPublic($.getConst('RSAKEY_MODULUS'), $.getConst('RSAKEY_PUBLIC_EXPONENT'));
    var res = rsa.encrypt(plainText);
    return linebrk(hex2b64(res), 64);
}

//stringXML to XML
function String2XML(xmlString){
	if (window.ActiveXObject) {
		var xmlobject = new ActiveXObject("Microsoft.XMLDOM");
		xmlobject.async = "false";
		xmlobject.loadXML(xmlString);
		return xmlobject;
	}else{
		var parser = new DOMParser();
		var xmlobject = parser.parseFromString(xmlString, "text/xml");
		return xmlobject;
	} 
}

//获得带有指定参数paramArr的urlPa地址
function createMchntUrl(urlPa,paramArr){
	var urlPre = QueryString.GetValue(urlPa),urlParam;
	if(isBlank(urlPre)) return '';
	var paramJsonArr = {};
	$.each(paramArr,function(index,item){
		paramJsonArr[item] = QueryString.GetValue(item);
	});
	urlParam = createUrlParamWithparamMap(paramJsonArr);
	if(urlPre.indexOf('?')>0)
		return urlPre + '&' + urlParam;
	else
		return urlPre + '?' + urlParam;
}

function strNvl(str){
    if (isBlank(str))  return "";
    else return str;
}


function getMaskedStr(str,pre,suf){
	if(isBlank(str)) return "";
	var result = "";
	for(var i=0;i<str.length;i++){
		if(i<pre || i>str.length-suf-1) result += str.charAt(i);
		else result += "*";
	}
	return result;
}

/**
 * 判断是否为中信银行信用卡
 * @param insCd
 * @returns
 */
function validateCiticBankCredit(insCd) { 
	var pattern = /08\d302\d{4}/; 
	return pattern.test(insCd); 
} 



