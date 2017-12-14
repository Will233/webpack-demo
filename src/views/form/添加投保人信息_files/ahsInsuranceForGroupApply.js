/* 投保人证件类型选择   */
const queryGroupAhsIndustryData = require('../mock/queryGroupAhsIndustry.json');
console.log(queryGroupAhsIndustryData);
$(function(){

	var industryData=[];


	$.ajax({
		type: "POST",
		contentType: "application/json;utf-8",
		url: '/mobileSinglePlatform/queryGroupAhsIndustry.do',
		async:false,
		dataType: 'json',
		success: function(res){
			industryData=res.industryList;;
		},
		error:function(res){
			industryData=queryGroupAhsIndustryData.industryList;
		}
	});

	var titleArr=['请选择'];
	var selectList=[];
	window.selectIndustry={    			
		createHTML:function(){
			if(!selectList.length){
				selectList=selectIndustry.getData();
			}

			console.log(titleArr,'a')
			var str='<p class="hadSelected">'+titleArr.join('/')+'</p>';    			
			selectList.forEach(function(value,i){
				str+=['<p class="selectList" onclick="window.selectIndustry.changeIndustryHTML('+i+')" datacode="'+value[0]+'" index="'+i+'">',
				'<span>'+value[1]+'</span>',
				'<img class="iconRight" src="../mobileSinglePlatform/images/icon_right.png" >',
				'</p>'].join("");
			});

			$('#selectIndustry').html(str).show();
		},
		getData:function(level1,level2){
			var list=[];
			if(!level1){
				industryData.forEach(function(value,index){
					if(list.length){
						for(var i=0,len=list.length;i<len;i++){
							if(list[i][0]==value.industry_code_level1)return;
						}
					};					
					var ele=[];
					ele.push(value.industry_code_level1);
					ele.push(value.industry_name_level1);
					list.push(ele);				
				})
			}else if(level1&&!level2){
				industryData.forEach(function(value,index){
					var ele=[];
					if(value.industry_name_level1==level1){
						if(list.length){
							for(var i=0,len=list.length;i<len;i++){
								if(list[i][1]==value.industry_name_level2)return;
							}
						};
						ele.push(value.industry_code_level1);
						ele.push(value.industry_name_level2);
						list.push(ele);
					}					
				})
			}else if(level2){
				industryData.forEach(function(value,index){
					var ele=[];
					if(value.industry_name_level1==level1&&value.industry_name_level2==level2){
						if(list.length){
							for(var i=0,len=list.length;i<len;i++){
								if(list[i][1]==value.industry_name_level3)return;
							}
						};
						ele.push(value.industry_code_level1);
						ele.push(value.industry_name_level3);
						ele.push(value.industry_statement);
						list.push(ele);
					}										
				})
			}

			return list;
		},
		changeIndustryHTML:function(i){
			if(titleArr[0]=='请选择'){titleArr.shift()};
			console.log(titleArr,'b')
			var target=$('.selectList').eq(i);
			if(titleArr.length==2){
				$('#industryCode').val(target.attr('datacode'));				
				$('#industry').text(selectList[target.attr('index')][1]);
				if(selectList[target.attr('index')][2]){
					$('#descriptionParent').show();
					$('#description').text(selectList[target.attr('index')][2])
				}else{
					$('#descriptionParent').hide();
				}; 
				titleArr=['请选择'];
				selectList=[];
				window.history.back(-1);
				return
	    	}
			titleArr.push(selectList[target.attr('index')][1]);
			selectList=this.getData(titleArr[0],titleArr[1]);

			console.log(titleArr,'c')
			this.createHTML();
	    }
	}    

	$('#industry').click(function(){
		window.history.pushState({title: '#selectIndustry'}, '#selectIndustry', window.location.href + '#selectIndustry');
		selectIndustry.createHTML();		
	});    

	window.onpopstate = function (e) {
		$('#selectIndustry').hide();
		titleArr=['请选择'];
		selectList=[];		
		if($("#industry").text().trim() != '请选择行业分类'){
			$('#industry').css('color','#0079FB');
		}
	} 
})


var selectFlag;
var lessInsuranceAge,topInsuranceAge;
function changeType(val, ids, obj) {
	var parent = obj.parent().parent().parent();
	if (val == '01') {
		parent.find("#for-paperNo" + ids).show();
		parent.find("#for-paperNo_other" + ids).hide();
		parent.find("#for-paperNo" + ids).removeAttr("disabled");
		parent.find("#for-paperNo_other" + ids)
				.attr("disabled", "disabled");
		selectFlag = 0;//选择身份证
		$('#birthdaybox').hide();
		$('#sexbox').hide();
	} else {
		parent.find("#for-paperNo" + ids).hide();
		parent.find("#for-paperNo_other" + ids).show();
		parent.find("#for-paperNo_other" + ids).removeAttr("disabled");
		parent.find("#for-paperNo" + ids).attr("disabled", "disabled");
		selectFlag = 1;
		$('#birthdaybox').show();
		$('#sexbox').show();
		var birthdayControl = $('#insuredBirthdayNew') , currentDate = new Date(new Date().getTime() + 24*60*60*1000) , curr = currentDate.getFullYear();
		var opt = {};
		opt.date = {preset : 'date'}; 
		if(birthdayControl.val()==""){
			birthdayControl.val(curr-25 + '-' + handleStr((currentDate.getMonth() + 1)) + '-' + handleStr(currentDate.getDate())).scroller('destroy').scroller($.extend(opt.date, {theme: 'default', mode: 'scroller', display: 'modal', lang: 'zh' , startYear: curr-100 , endYear: curr}));
		}
		else{
			birthdayControl.val(birthdayControl.val()).scroller('destroy').scroller($.extend(opt.date, {theme: 'default', mode: 'scroller', display: 'modal', lang: 'zh' , startYear: curr-100 , endYear: curr}));
		}
	}
}
/* 判断身份验证 */
function valiateShenfenz(certNo, flag, showDiv){
	certNo=certNo.replace(/\*/g,'X');
	var booble = valiateLegality(certNo);
	if(!booble){
		return false;
	}
	var description = '';
	if ('1' == flag) {
		description = "投保人";
	} else if ('2' == flag) {
		description = "被保人";
	}
	if(certNo.length!=15 && certNo.length!=18){
		$("#" + showDiv).text(description + "身份证不正确。（只能是15或18位）");
		return false;
	}
	lessInsuranceAge = parseInt($('input[name=leastAcceptInsurAge]').val());
	topInsuranceAge = parseInt($('input[name=topAcceptInsurAge]').val());
	if(certNo.length == 15){
		var year = "19"+certNo.substring(6,8);
		var month = certNo.substring(8,10);
		var day =  certNo.substring(10,12);
		if (window.DateUtil) {
			if (!validateDateRange(year, month, day, lessInsuranceAge, topInsuranceAge)) {
				$('#' + showDiv).text(description + '必须在' + lessInsuranceAge + '到' + topInsuranceAge + '周岁之间');
				return false;
			}
		} else {
			var date1 = (parseInt(year)+lessInsuranceAge)+"-"+month+"-"+day;
			var date3 = (parseInt(year)+topInsuranceAge)+"-"+month+"-"+day;
			var d = new Date();
			var date2 = d.getFullYear()+"-"+ (d.getMonth()+1)+"-"+d.getDate();
			if(dateCompare(date1,date2)||dateCompare(date2,date3)){
				$("#" + showDiv).text(description + "必须在"+lessInsuranceAge+"到"+topInsuranceAge+"周岁之间");
			   	return false;
			}
		}
	} else if(certNo.length == 18){
	    var year = certNo.substring(6,10);
		var month = certNo.substring(10,12);
		var day =  certNo.substring(12,14);
		if (window.DateUtil) {
			if (!validateDateRange(year, month, day, lessInsuranceAge, topInsuranceAge)) {
				$('#' + showDiv).text(description + '必须在' + lessInsuranceAge + '到' + topInsuranceAge + '周岁之间');
				return false;
			}
		} else {
			var date1 = (parseInt(year)+lessInsuranceAge)+"-"+month+"-"+day;
			var date3 = (parseInt(year)+topInsuranceAge)+"-"+month+"-"+day;
			var d = new Date();
			var date2 = d.getFullYear()+"-"+ (d.getMonth()+1)+"-"+d.getDate();
			if(dateCompare(date1,date2)||dateCompare(date2,date3)){
			  	$("#" + showDiv).text(description + "必须在"+lessInsuranceAge+"到"+topInsuranceAge+"周岁之间");
			  	return false;
			}
		}
	}
	return true;
}

function validateDateRange(year, month, day, lessInsuranceAge, topInsuranceAge) {
	//检验规则：9个月是0岁，10岁9个月算成10岁
	//ps:safiri不支持YYYY-MM-DD　hh:mm:ss格式，只支持YYYY/MM/DD　hh:mm:ss
	var beginDate = new Date((parseInt(year) + lessInsuranceAge) + '/' + month + '/' + day + ' 23:59:59');
	var endDate = new Date((parseInt(year) + topInsuranceAge + 1) + '/' + month + '/' + day + ' 23:59:59');
	var now = new Date();
	if (!window.DateUtil.dateCompare(now, beginDate) || !window.DateUtil.dateCompare(endDate, now)) {
		return false;
	}
	return true;
}

function dateCompare(date1,date2){
	date1 = date1.replace(/\-/gi,"/");	
	date2 = date2.replace(/\-/gi,"/");	
	var time1 = new Date(date1).getTime();	
	var time2 = new Date(date2).getTime();	
	if(time1 >= time2){		
		return true;	
	}
	else{	
	    return false;	
	}
}
function valiateLegality(certNo){
	var num = certNo;
	num = num.toUpperCase();
	 //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。    
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))){  
    	$('#error').text('身份证号长度不对或者不符合规定！'); 
        return false;  
    }  
    var len, re;  
    len = num.length; 
    //当身份证为15位时的验证出生日期。 
    if (len == 15){  
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);  
        var arrSplit = num.match(re);  
        //检查生日日期是否正确  
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);  
        var bGoodDay;  
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));  
        if (!bGoodDay){  
        	$('#error').text('输入的15位身份证号里出生日期不对！');    
            return false;  
        }  
    }else if (len == 18){  //当身份证号为18位时，校验出生日期和校验位。 
        var year = num.substr(6,4); 
        var nowDate = new Date(); 
        var nowYear = nowDate.getYear(); 
        if((nowYear - year) > 112){ 
        	$('#error').text("您已经超过112岁，不能投保！"); 
            return false; 
        } 
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);  
        var arrSplit = num.match(re);  
        //检查生日日期是否正确  
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);  
        var bGoodDay;  
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));  
        if (!bGoodDay){  
        	$('#error').text('输入的18位身份证号里出生日期不对！');  
            return false;  
        }else{  
            //检验18位身份证的校验码是否正确。  
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。  
            var valnum;  
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);  
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');  
            var nTemp = 0, i;  
            for(i = 0; i < 17; i ++){  
                nTemp += num.substr(i, 1) * arrInt[i];  
            }  
            valnum = arrCh[nTemp % 11];  
            if (valnum != num.substr(17, 1)){  
            	$('#error').text('18位身份证的最后一位校验码不正确！'); //应该为：' + valnum 
                return false;  
            }  
        }  
    }  
    //验证地区是否有效 
    var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "} 
    if(aCity[parseInt(num.substr(0,2))] == null){ 
    	$('#error').text("输入的身份证号前两位地区不对！"); 
        return false; 
    } 
    return true;
}
function nextStep(){
	$('#error').text('');

	if ($("#groupName").val().trim() == "") {
		$('#error').text('客户名称不能为空！');
		return false;
	}

	if ($("#industry").text().trim() == ""||$("#industry").text().trim() == '请选择行业分类') {
		$('#error').text('行业分类不能为空！');
		return false;
	}

	if ($("#groupCertificateNo").val().trim() == "") {
		$('#error').text('证件号码不能为空！');
		return false;
	}

	if ($("#groupCertificateType").val() == "01") {
		if ($("#groupCertificateNo").val().trim().length > 18) {
			$('#error').text('组织机构代码证长度不能超过18位！');
			return false;
		}
	} else {
		if ($("#groupCertificateNo").val().trim().length > 20) {
			$('#error').text('证件号码长度不能超过20位！');
			return false;
		}
	}

	if ($("#linkManName").val() == "") {
		$('#error').text('联系人姓名不能为空！');
		return false;
	}


	
	if ($("#linkManMobileTelephone").val() == "") {
		$('#error').text('联系人电话不能为空！');
		return false;
	}
	var telNum = $("#linkManMobileTelephone").val();
	var patn = /1[3-8]+\d{9}/;
	if(!patn.test(telNum)){
		$("#error").text("您输入的手机号格式不合规范！");
		return false;
	}
	
    //团意产品
	$('input[name=groupName]').val($('#groupName').val());
	$('input[name=industryCode]').val($('#industryCode').val());
	$('input[name=groupCertificateType]').val($('#groupCertificateType').val());
	$('input[name=groupCertificateNo]').val($('#groupCertificateNo').val());	
	$('input[name=linkManMobileTelephone]').val($('#linkManMobileTelephone').val());	
	$('input[name=linkManName]').val($('#linkManName').val());

	
	$('input[name=applicantNamePY]').val($('#applicantNamePY').val());
	$('input[name=applicantCertType]').val($('#applicantCertType').val());
	if($("#applicantCertType").val() == "01"){
		$('input[name=applicantCertNo]').val($('#for-paperNo1').val());
	}else{
		$('input[name=applicantCertNo]').val($('#for-paperNo_other1').val());
	}
	$('input[name=applicantBirthday]').val($('#insuredBirthdayNew').val());

	if($("#needEmailCheckbox").is(':checked')){
		$('input[name=applicantEmail]').val($('#applicantEmail').val());
	}else{
		$('input[name=applicantEmail]').val("");
	}

	var insuredLimitedSex = $('input[name=insuredLimitedSex]').val();
	var daiTiSex;
	switch(insuredLimitedSex){
		case '0' : 
			daiTiSex = 'N';
			break;
		case '1' : 
			daiTiSex = 'M';
			break;
		case '2' : 
			daiTiSex = 'F';
			break;
	}
	if(daiTiSex == 'M'){
		if($('input[name=applicantSex]').val() != daiTiSex){
			$("#error").text("投保人必须是男性");
			return false;
		}
	}else if(daiTiSex == 'F'){
		if($('input[name=applicantSex]').val() != daiTiSex){
			$("#error").text("投保人必须是女性");
			return false;
		}
	}
	if($('#needEmail').css('display') == 'table-row'){
		if($('#applicantEmail').val() == ''){
			$("#error").text("投保人邮箱不能为空！");
			return false;
		}
		if($("#applicantEmail").val()!=""&&($("#applicantEmail").val()).indexOf("@")<=-1){
			$("#error").text("投保人邮箱格式不正确！");
			return false;
		}
	}

	

	sessionStorage.removeItem('saveDatas');
	sessionStorage.removeItem('allAmount');
	sessionStorage.removeItem('standardAmount');
	saveApplicantInfoToSessionStorage();

	$('.loadingDiv').show();
	var formObj = document.getElementById('savepolicyholder');
	formObj.action="./addInsuredRelationship.do";
	formObj.target="_self";
	formObj.method = "post";
	formObj.submit();
}
function fucosDate(obj) {
	obj.value = obj.value.replace(/\*/g, 'X');
}
function needEmail(checked){
	if(checked){
		$('#needEmail').css('display','table-row');
	}else{
		$('#needEmail').hide();
	}
}
//日期格式化
function handleStr(str){
	var handledStr = str < 10 ? ('0') + str : str;
	return handledStr;
}
function getCertInfoByCertNO(certNo){
	var certInfo = new Object();
	if(certNo.length == 15){
		var year = certNo.substring(4,8);
		var month = certNo.substring(8,10);
		var day =  certNo.substring(10,12);
		certInfo.bothday=year+"-"+month+"-"+day;
		var aSex = certNo.substring(13,14);
		if( aSex % 2 == 1){
			certInfo.autoSex = 'M';
		}else{
			certInfo.autoSex = 'F';
		}
		//certInfo.autoSex = certNo.substring(13,14);
		
	} else if(certNo.length == 18){
	    var year = certNo.substring(6,10);
		var month = certNo.substring(10,12);
		var day =  certNo.substring(12,14);
		certInfo.bothday=year+"-"+month+"-"+day;
		var aSex = certNo.substring(16,17);
		if( aSex % 2 == 1){
			certInfo.autoSex = 'M';
		}else{
			certInfo.autoSex = 'F';
		}
	}
	
	return certInfo;
}
// 验证其他证件类型时生日 insuredBirthdayNew
function valiateOtherType(val,flag,msg){
	var description = '';
	if ('1' == flag) {
		description = "投保人";
	} else if ('2' == flag) {
		description = "被保人";
	}
	lessInsuranceAge = parseInt($('input[name=leastAcceptInsurAge]').val());
	topInsuranceAge = parseInt($('input[name=topAcceptInsurAge]').val());
	var cui_getDataY = val.substr(0,4);
	var cui_getDataM = parseInt(val.substr(5,2));
	var cui_getDataD = parseInt(val.substr(8,2));
	if (window.DateUtil) {
		if (!validateDateRange(cui_getDataY, cui_getDataM, cui_getDataD, lessInsuranceAge, topInsuranceAge)) {
			$('#' + msg).text(description + '必须在' + lessInsuranceAge + '到' + topInsuranceAge + '周岁之间');
			return false;
		}
	} else {
		var date1 = (parseInt(cui_getDataY)+lessInsuranceAge)+"-"+cui_getDataM+"-"+cui_getDataD;
		var date3 = (parseInt(cui_getDataY)+topInsuranceAge)+"-"+cui_getDataM+"-"+cui_getDataD;
		var d = new Date();
		var date2 = d.getFullYear()+"-"+ (d.getMonth()+1)+"-"+d.getDate();
		if(dateCompare(date1,date2)||dateCompare(date2,date3)){
			$("#" + msg).text(description + "必须在"+lessInsuranceAge+"到"+topInsuranceAge+"周岁之间");
			return false;
		}
  	}
  	return true;
}

function saveApplicantInfoToSessionStorage() {
	var applicantShow = {};
	// var applicantHidden = {};	

	applicantShow.groupName=$('#groupName').val();
	applicantShow.industryCode=$('#industryCode').val();
	applicantShow.industry=$('#industry').text();
	applicantShow.groupCertificateType=$('#groupCertificateType').val();
	applicantShow.groupCertificateNo=$('#groupCertificateNo').val();

	applicantShow.linkManName = $('#linkManName').val();
	applicantShow.applicantNamePY = $('#applicantNamePY').val();
	applicantShow.applicantCertType = $('#applicantCertType').children('option:selected').val();
	applicantShow.for_paperNo1 = $('#for-paperNo1').val();
	applicantShow.for_paperNo_other1 = $('#for-paperNo_other1').val();
	applicantShow.insuredBirthdayNew = $('#insuredBirthdayNew').val();
	applicantShow.applicantSex = $('#savepolicyholder input[name=applicantSex]').val();
	applicantShow.linkManMobileTelephone = $('#linkManMobileTelephone').val();
	applicantShow.needEmailCheckbox = $('#needEmailCheckbox').is(':checked') ? 1 : 0;
	applicantShow.applicantEmail = $('#applicantEmail').val();

	sessionStorage.setItem('applicantShow', JSON.stringify(applicantShow));
}

$(function() {
	var applicantInfo = sessionStorage.getItem('applicantShow');
	if (applicantInfo) {
		applicantInfo = JSON.parse(applicantInfo);

        $('#industry').css('color','#0079FB');
        
		$('#linkManName').val(applicantInfo.linkManName);		
		$('#linkManMobileTelephone').val(applicantInfo.linkManMobileTelephone);
		$('#industryCode').val(applicantInfo.industryCode);
		$('#industry').text(applicantInfo.industry);
		$('#groupName').val(applicantInfo.groupName);
		$('#groupCertificateType').val(applicantInfo.groupCertificateType);
		$('#groupCertificateNo').val(applicantInfo.groupCertificateNo);

		$('#applicantNamePY').val(applicantInfo.applicantNamePY);
		$('#applicantCertType').find('option[value=' + applicantInfo.applicantCertType + ']').attr('selected', true);
		if (applicantInfo.applicantCertType == '01') {
			$('#for-paperNo1').show();
			$('#for-paperNo_other1').hide();
		} else {
			$('#for-paperNo1').hide();
			$('#for-paperNo_other1').show();
		}
		$('#for-paperNo1').val(applicantInfo.for_paperNo1);
		$('#for-paperNo_other1').val(applicantInfo.for_paperNo_other1);
		$('#insuredBirthdayNew').val(applicantInfo.insuredBirthdayNew);
		if ($('#sexbox .left input[name=applicantSexOther]').length == 2) {
			if (applicantInfo.applicantSex == 'M') {
				$($('#sexbox .left input[name=applicantSexOther]')[0]).attr('checked', 'checked');
				$($('#sexbox .left input[name=applicantSexOther]')[1]).removeAttr('checked');
			} else {
				$($('#sexbox .left input[name=applicantSexOther]')[0]).removeAttr('checked');
				$($('#sexbox .left input[name=applicantSexOther]')[1]).attr('checked', 'checked');
			}
			$('#savepolicyholder input[name=applicantSex]').val(applicantInfo.applicantSex);
		}
		if (applicantInfo.needEmailCheckbox) {
			$('#needEmailCheckbox').attr('checked', 'checked');
			$('#applicantEmail').show();
		} else {
			$('#needEmailCheckbox').removeAttr('checked');
		}
		$('#applicantEmail').val(applicantInfo.applicantEmail);
	}
});

function validateApplicantIdNo(cbwApplicantIdNo, inputApplicantIdNo) {
	var isOK = true;
	var data = {
		'cbwApplicantIdNo': cbwApplicantIdNo,
		'inputApplicantIdNo': inputApplicantIdNo
	};

	$.ajax({
		url: 'validateApplicantIdNo.do',
		data: data,
		type: 'get',
		dataType: 'json',
		async: false,
		success: function(response) {
			response = response || {};
			if ('01' == response.resultCode || '02' == response.resultCode) {
				$('#error').height('60px').text(response.resultMsg);
				isOK = false;
			} else {
				$('#error').height('30px');
			}
		},
		error: function() {
			console.error('调用验证身份证接口异常！');
			$('#error').text('调用验证身份证接口异常！');
			isOK = false;
		}
	});

	return isOK;
}