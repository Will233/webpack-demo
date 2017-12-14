	function applyInsurance(){	
		if(isErrorDate){
			return;
		}
		var formObj = document.getElementById('bicycleInsurance');
		$('#insuranceBeginTime').val($('#startYear').html()+$("#startMonth").html()+$("#startDay").html());
		$('#insuranceEndTime').val($("#endYear").html()+$("#endMonth").html()+$("#endDay").html());
		$('input[name=taocan]').val($('#taocan').val());
		formObj.action="./applyInsurance.do";
		formObj.target="_self";
		formObj.method = "post";
		formObj.submit();
		$('.loadingDiv').show();

		window.sessionStorage.removeItem('saveDates');
		window.sessionStorage.removeItem('applicantData');	//家财险模板
		window.sessionStorage.removeItem('applicantShow');	//其他模板投保人页面
		saveDateSessionStorage();
	}

	function saveDateSessionStorage(){
		var saveDates={};
		saveDates.startDateYear=$("#startYear").html();
		saveDates.startDateMonth=$("#startMonth").html();
		saveDates.startDateDay=$("#startDay").html();
		saveDates.endDateYear=$("#endYear").html();
		saveDates.endDateMonth=$("#endMonth").html();
		saveDates.endDateDay=$("#endDay").html();
		window.sessionStorage.setItem("saveDates",JSON.stringify(saveDates));
	}

	function agree_02(obj){
		var gotopay = $("#gotopay");
		if(obj.checked){
			gotopay.removeAttr("disabled");
			gotopay.removeClass("submitBut_disabled");
			gotopay.addClass("submitBut");
		}
		else{
			gotopay.attr("disabled","disabled");
			gotopay.removeClass("submitBut");
			gotopay.addClass("submitBut_disabled");
		}
	}


/* 选择投保日期    */
	function setDateTime(num){
	//var newDate = new Date(new Date().getTime() - num*24*60*60*1000);
	//return newDate;
	var dateInput = $('#dateInput') , currentDate = new Date(new Date().getTime() + 1*24*60*60*1000) , curr = currentDate.getFullYear();
	var defaultDate = curr + '-' + handleStr((currentDate.getMonth() + 1)) + '-' + handleStr(currentDate.getDate());
	if(defaultDate!=''){
		defaultDate = new Date(Date.parse(defaultDate.replace(/-/g,'/')));
	}
	var newDate = new Date(defaultDate);
	return newDate;
}
//-->
	//选择日期显示
function showSelectDate(type,date,num){
		var reinsuranceDay;
		if($('input[name=underwriteMonth]').val() != ''){//最大可承保日期选择的是月份
			reinsuranceMonth = $('input[name=underwriteMonth]').val();
			var cui_getCurr = new Date(date);
			cui_getDataY = cui_getCurr.getFullYear();
			cui_getDataM = cui_getCurr.getMonth() + 1;
			cui_getDataD = cui_getCurr.getDate();
			reinsuranceDay = getDateYMD(reinsuranceDay,reinsuranceMonth,cui_getDataY,cui_getDataM,0);
			reinsuranceDay = reinsuranceDay -1 ;
			cui_getThisDataD = getMonthsDay(cui_getDataM,cui_getThisDataD,cui_getDataY);
			if(cui_getDataM == '1'){
				if(cui_getDataD == cui_getThisDataD){
					reinsuranceDay = getDateYMD(reinsuranceDay,parseInt(reinsuranceMonth)+1,cui_getDataY,cui_getDataM,1);
				}else{
					reinsuranceDay = getDateYMD(reinsuranceDay,reinsuranceMonth,cui_getDataY,cui_getDataM,0);
				}
				reinsuranceDay = reinsuranceDay -1;
			}else{
				if(cui_getDataM+parseInt(reinsuranceMonth) > 12){
					reinsuranceDay = getDateYMD(reinsuranceDay,parseInt(reinsuranceMonth)+1,cui_getDataY,cui_getDataM,1);
					if((((parseInt(cui_getDataY)+1) % 4)==0) && (((parseInt(cui_getDataY)+1) % 100)!=0) || (((parseInt(cui_getDataY)+1) % 400)==0)){
						if(cui_getDataM+parseInt(reinsuranceMonth) - 12 >= 2){
							reinsuranceDay = reinsuranceDay + 1;
						}
					}
					reinsuranceDay = reinsuranceDay -1;
				}else{
					if(parseInt(reinsuranceMonth) == 8 && cui_getDataM == 3){
						reinsuranceDay = getDateYMD(reinsuranceDay,parseInt(reinsuranceMonth)+1,cui_getDataY,cui_getDataM,1);
					}else{
						reinsuranceDay = getDateYMD(reinsuranceDay,reinsuranceMonth,cui_getDataY,cui_getDataM,0);
					}
					reinsuranceDay = reinsuranceDay -1;
				}
				
			}
			if(reinsuranceMonth == '12'){
				if((((parseInt(cui_getDataY)+1) % 4)==0) && (((parseInt(cui_getDataY)+1) % 100)!=0) || (((parseInt(cui_getDataY)+1) % 400)==0)){
					if(cui_getDataM > '02'){
						reinsuranceDay = 365;
					}else{
						reinsuranceDay = 364;
					}
				}else{
					reinsuranceDay = 364;
				}
				if(((cui_getDataY % 4)==0) && ((cui_getDataY+1 % 100)!=0) || ((cui_getDataY % 400)==0)){
					if(cui_getDataM > '02'){
						reinsuranceDay = 364;
					}else{
						reinsuranceDay = 365;
					}
				}
			}
		}else{//最大可承保日期选择的是日
			reinsuranceDay = $('input[name=underwriteDay]').val();
		}
		var selectDate = month = day = weekArr = week = null;
		//var theFirstData = new Date($('input[name=leastBeginDate]').val());
		date = date || '';
		if(typeof date == 'string'){
			date = date.replace(/-/g,'/');
		}
		if(type == 'start'){
			$('#error').text('');
			selectDate = new Date(date);
			isErrorDate = false;
			if(selectDate.getTime() <= setDateTime(0).getTime()+1*60*60*24*1000){
				$('#error').text('保险起期必须为当天起的两天后');
				isErrorDate = true;
			}else if(selectDate.getTime() > setDateTime(reinsuranceDay).getTime()){
				if($('input[name=underwriteMonth]').val() != ''){
					$('#error').text('保险起期必须在'+reinsuranceMonth+'个月内');
				}else{
					$('#error').text('保险起期必须在'+reinsuranceDay+'天内');
				}
				isErrorDate = true;
			}
		}else if(type == 'end'){
			if(num == 731){
				if($("#startMonth").html() < '03'){
					num = 730;
				}else{
					num = 729;
			}
		}else if(num == 729){
			if($("#startYear").html() == '2018-'){
				if($("#startMonth").html() >= '03'){
					num = 730;
				}
			}
		}
		selectDate = new Date(new Date(date).getTime() + num*24*60*60*1000);
		endDate = selectDate.getFullYear() + '-' + handleStr(selectDate.getMonth() + 1) + '-' + handleStr(selectDate.getDate());
		}
		//做缓存 返回页面
		if(sessionStorage.getItem("saveDates")){
			var saveDates=sessionStorage.getItem("saveDates");
			saveDates=JSON.parse(saveDates);
			if(type == 'start'){
				$('#' + type + 'Day').html(saveDates.startDateDay);
				$('#' + type + 'Year').html(saveDates.startDateYear);
				$('#' + type + 'Month').html(saveDates.startDateMonth);
			}else if(type == 'end'){
				$('#' + type + 'Day').html(saveDates.endDateDay);
				$('#' + type + 'Year').html(saveDates.endDateYear);
				$('#' + type + 'Month').html(saveDates.endDateMonth);
			}
	}else{
		//第一次进入页面
		year = selectDate.getFullYear(), month = selectDate.getMonth() + 1 ,day = selectDate.getDate(), weekArr = ['周日','周一','周二','周三','周四','周五','周六'] , week = weekArr[selectDate.getDay()];
		$('#' + type + 'Day').html(((day < 10) ? ('0' + day) : day));
		$('#' + type + 'Year').html(year+ '-');
		$('#' + type + 'Month').html(((month < 10) ? ('0' + month) : month) + '-');
	}
}

	// 日期格式化
	function handleStr(str){
		var handledStr = str < 10 ? ('0') + str : str;
		return handledStr;
	}

	var daySelect , endDate ,insuranceMonth,cui_getDataY,cui_getDataM,cui_getDataD,cui_getThisDataD;
	$(function (){
		var dateInput = $('#dateInput') , currentDate = new Date(new Date().getTime() + 2*24*60*60*1000) , curr = currentDate.getFullYear();
		var defaultDate = curr + '-' + handleStr((currentDate.getMonth() + 1)) + '-' + handleStr(currentDate.getDate());
		if(defaultDate!=''){
			currentDate = new Date(Date.parse(defaultDate.replace(/-/g,'/')));
			curr = currentDate.getFullYear();
		}
		showSelectDate('start',currentDate);
		if($('input[name=insuranceMonth]').val() != ''){//最大保险期限选择的是月份
			//daySelect = $('input[name=insuranceMonth]').val()*30;
			insuranceMonth = $('input[name=insuranceMonth]').val();
			cui_getDataY = curr;
			cui_getDataM = currentDate.getMonth() + 1;
			cui_getDataD = currentDate.getDate();
			daySelect = getDateYMD(daySelect,insuranceMonth,cui_getDataY,cui_getDataM,0);
			daySelect = daySelect -1 ;
			cui_getThisDataD = getMonthsDay(cui_getDataM,cui_getThisDataD,cui_getDataY);
			if(cui_getDataM == '1'){
				if(cui_getDataD == cui_getThisDataD){
					daySelect = getDateYMD(daySelect,parseInt(insuranceMonth)+1,cui_getDataY,cui_getDataM,1);
				}else{
					daySelect = getDateYMD(daySelect,insuranceMonth,cui_getDataY,cui_getDataM,0);
				}
				daySelect = daySelect -1;
			}else{
				if(cui_getDataM+parseInt(insuranceMonth) > 12){
					daySelect = getDateYMD(daySelect,parseInt(insuranceMonth)+1,cui_getDataY,cui_getDataM,1);
					if((((parseInt(cui_getDataY)+1) % 4)==0) && (((parseInt(cui_getDataY)+1) % 100)!=0) || (((parseInt(cui_getDataY)+1) % 400)==0)){
						if(cui_getDataM+parseInt(insuranceMonth) - 12 >= 2){
							daySelect = daySelect + 1;
						}
					}
					daySelect = daySelect -1;
				}else{
					if(parseInt(insuranceMonth) == 8 && cui_getDataM == 3){
						daySelect = getDateYMD(daySelect,parseInt(insuranceMonth)+1,cui_getDataY,cui_getDataM,1);
					}else{
						daySelect = getDateYMD(daySelect,insuranceMonth,cui_getDataY,cui_getDataM,0);
						var reinsuranceDay01 = getMonthsDay(cui_getDataM,reinsuranceDay01,cui_getDataY);
						var reinsuranceDay02 = getMonthsDay(parseInt(cui_getDataM)+1,reinsuranceDay02,cui_getDataY);
						if(reinsuranceDay01 > reinsuranceDay02){
							daySelect = daySelect -1;
						}
					}
					daySelect = daySelect -1;
				}
				
			}
			if(insuranceMonth == '12'){
				if((((parseInt(cui_getDataY)+1) % 4)==0) && (((parseInt(cui_getDataY)+1) % 100)!=0) || (((parseInt(cui_getDataY)+1) % 400)==0)){
					if(cui_getDataM > '02'){
						daySelect = 365;
					}else{
						daySelect = 364;
					}
				}else{
					daySelect = 364;
				}
				if(((cui_getDataY % 4)==0) && ((cui_getDataY % 100)!=0) || ((cui_getDataY % 400)==0)){
					if(cui_getDataM > '02'){
						daySelect = 364;
					}else{
						daySelect = 365;
					}
				}
			}
		}else{//最大保险期限选择的是日
			daySelect = $('input[name=insuranceDay]').val() - 1;
		}
		
		showSelectDate('end',currentDate,daySelect);
		var opt = {};
		opt.date = {preset : 'date'};
		//dateInput.val(curr + '-' + handleStr((currentDate.getMonth() + 1)) + '-' + handleStr(currentDate.getDate())).scroller('destroy').scroller($.extend(opt.date, {theme: 'default', mode: 'scroller', display: 'modal', lang: 'zh' , startYear: curr , endYear: curr + 2}));
		dateInput.attr("min",curr + '-' + handleStr((currentDate.getMonth() + 1)) + '-' + handleStr(currentDate.getDate()))
        dateInput.val(curr + '-' + handleStr((currentDate.getMonth() + 1)) + '-' + handleStr(currentDate.getDate())).scroller('destroy').scroller($.extend(opt.date, {theme: 'default', mode: 'scroller', display: 'modal', lang: 'zh' , startYear: curr , endYear: curr + 2})); 
		
		dateInput.change(function(){
			// window.sessionStorage.clear();
			window.sessionStorage.removeItem('saveDates');
			var val = $(this).val();
			showSelectDate('start',val);
			if($('input[name=insuranceMonth]').val() != ''){//最大保险期限选择的是月份
				//daySelect = $('input[name=insuranceMonth]').val()*30;
				insuranceMonth = $('input[name=insuranceMonth]').val();
				cui_getDataY = val.substr(0,4);
				cui_getDataM = parseInt(val.substr(5,2));
				cui_getDataD = parseInt(val.substr(8,2));
				
				cui_getThisDataD = getMonthsDay(cui_getDataM,cui_getThisDataD,cui_getDataY);
				if(cui_getDataM == '1'){
					if(cui_getDataD == cui_getThisDataD){
						daySelect = getDateYMD(daySelect,parseInt(insuranceMonth)+1,cui_getDataY,cui_getDataM,1);
					}else{
						daySelect = getDateYMD(daySelect,insuranceMonth,cui_getDataY,cui_getDataM,0);
					}
					daySelect = daySelect -1;
				}else{
					if(cui_getDataM+parseInt(insuranceMonth) > 12){
						daySelect = getDateYMD(daySelect,parseInt(insuranceMonth)+1,cui_getDataY,cui_getDataM,1);
						if((((parseInt(cui_getDataY)+1) % 4)==0) && (((parseInt(cui_getDataY)+1) % 100)!=0) || (((parseInt(cui_getDataY)+1) % 400)==0)){
							if(cui_getDataM+parseInt(insuranceMonth) - 12 >= 2){
								daySelect = daySelect + 1;
							}
						}
						daySelect = daySelect -1;
					}else{
						if(parseInt(insuranceMonth) == 8 && cui_getDataM == 3){
							daySelect = getDateYMD(daySelect,parseInt(insuranceMonth)+1,cui_getDataY,cui_getDataM,1);
						}else{
							daySelect = getDateYMD(daySelect,insuranceMonth,cui_getDataY,cui_getDataM,0);
							var reinsuranceDay01 = getMonthsDay(cui_getDataM,reinsuranceDay01,cui_getDataY);
							var reinsuranceDay02 = getMonthsDay(parseInt(cui_getDataM)+1,reinsuranceDay02,cui_getDataY);
							if(reinsuranceDay01 > reinsuranceDay02){
								daySelect = daySelect -1;
							}
						}
						daySelect = daySelect -1;
					}
					
				}
				if(insuranceMonth == '12'){
					if((((parseInt(cui_getDataY)+1) % 4)==0) && (((parseInt(cui_getDataY)+1) % 100)!=0) || (((parseInt(cui_getDataY)+1) % 400)==0)){
						if(cui_getDataM > '02'){
							daySelect = 365;
						}else{
							daySelect = 364;
						}
					}else{
						daySelect = 364;
					}
					if(((cui_getDataY % 4)==0) && ((cui_getDataY % 100)!=0) || ((cui_getDataY % 400)==0)){
						if(cui_getDataM > '02'){
							daySelect = 364;
						}else{
							daySelect = 365;
						}
					}
				}
			}else{//最大保险期限选择的是日
				daySelect = $('input[name=insuranceDay]').val() - 1;
			}
			showSelectDate('end',val,daySelect);
		});
	});
	//设置日期
	function setDateTime(num){
		var newDate = new Date(new Date().getTime() +num*24*60*60*1000);
		return newDate;
	}
	/* 特约内容的展开和收缩 */
	$(function(){
		var slideHeight= 120;
		var defineHeight = $('#specialInsurance').height();
		if(defineHeight > slideHeight){
			$('#specialInsurance').css('height' , slideHeight + 'px');
			$('#readmore').append('<a href="#">查看详情内容</a>');
			$('#readmore a').click(function(){
	
	            var curHeight = $('#specialInsurance').height();
	            
	            curHeight = Math.floor(curHeight);
	            
	            if(curHeight == slideHeight){
	
	                $('#specialInsurance').animate({
	
	                  height: defineHeight
	
	                }, "normal");
	
	                $('#readmore a').html('收起');
	
	                //$('#gradient').fadeOut();
	
	            }else{
	
	                $('#specialInsurance').animate({
	
	                  height: slideHeight
	
	                }, "normal");
	
	                $('#readmore a').html('查看详情内容');
	
	                //$('#gradient').fadeIn();
	
	            }
	            return false;
			 });    
			
		}
		/*var cuidata = new Date();
		var getDataY = cuidata.getFullYear();
		var getDataM = cuidata.getMonth()+1;
		var dddsadfs = getDateYMD(dddsadfs,5,getDataY,getDataM);
		alert(dddsadfs);*/
	});
	
	function getDateYMD(obj,num,getDataY,getDataM,numI){//传来的有几个月
		var nowday;
		var obj = 0;
		for(var i=numI;i<num;i++){
			obj += getMonthsDay(getDataM+i,nowday,getDataY);
		}
		return obj;
	}
	function getMonthsDay(m,getDay,getDataY){// 每个月的月份对应的天数
		if(m % 12 == 1){ //传进来的月份
			getDay = 31;
		}else if(m % 12 == 2){
			if (((getDataY % 4)==0) && ((getDataY % 100)!=0) || ((getDataY % 400)==0)) {// 是闰年
				getDay = 29;
			} else { // 不是闰年
				getDay = 28;
			}
		}else if(m % 12 == 3){
			getDay = 31;
		}else if(m % 12 == 4){
			getDay = 30;
		}else if(m % 12 == 5){
			getDay = 31;
		}else if(m % 12 == 6){
			getDay = 30;
		}else if(m % 12 == 7){
			getDay = 31;
		}else if(m % 12 == 8){
			getDay = 31;
		}else if(m % 12 == 9){
			getDay = 30;
		}else if(m % 12 == 10){
			getDay = 31;
		}else if(m % 12 == 11){
			getDay = 30;
		}else if(m % 12 == 0){
			getDay = 31;
		}
		return getDay;
	}





function getUrlParam(name) {
	if(name != "callBackUrl"){
		 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		 var r = window.location.search.substr(1).match(reg);
		 if (r != null)
			return unescape(r[2]);
		 return null;
     }else{
     	 var reg = new RegExp("(^|&)"+ name +"=(.*)");
		 var r = window.location.search.substr(1).match(reg);
		 if (r != null)
			return unescape(r[2]);
		 return null;
     }
}

function goBack() {
	var callBackUrl = sessionStorage.getItem('callBackUrl');
	if (callBackUrl) {
		window.location.href = callBackUrl;
	} else {
		window.history.back(-1);
	}
}

$(function() {
	window.sessionStorage.removeItem('saveDates');
	var userId = getUrlParam('userId') || '';
	var mediaSource = getUrlParam('mediaSource') || '';
	var orderNo = getUrlParam('orderNo') || '';
	var callBackUrl = getUrlParam('callBackUrl') || '';
	var salesManCode = getUrlParam('salesManCode') || '';
	var saleCode = getUrlParam('saleCode') || '';
	var applicantIdNo = getUrlParam('applicantIdNo') || '';
	var remark =  getUrlParam('remark') || '';
	$('#bicycleInsurance input[name=secondMediaSource]').val(decodeURIComponent(userId));
	$('#bicycleInsurance input[name=mediaSource]').val(mediaSource);
	$('#bicycleInsurance input[name=orderNo]').val(orderNo);
	$('#bicycleInsurance input[name=salesManCode]').val(salesManCode);
	$('#bicycleInsurance input[name=saleCode]').val(saleCode);
	$('#bicycleInsurance input[name=applicantIdNo]').val(decodeURIComponent(applicantIdNo));
	$('#bicycleInsurance input[name=remark]').val(remark);
	if (callBackUrl) {
		sessionStorage.setItem('callBackUrl', decodeURIComponent(callBackUrl));
	} else {
		sessionStorage.setItem('callBackUrl', window.location.href);
	}
});