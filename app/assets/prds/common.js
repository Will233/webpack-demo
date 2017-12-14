document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
	//hideToolbar
	// WeixinJSBridge.call('hideToolbar'); //微信已不支持此接口
});
;(function($){

	var $mask = null;

	/**
	 * ÏÔÊ¾loading
	 * @param
	 */
	$.showLoading = function(isShow, hasOverlay){
		var loading = $("#js-loading"),
			$body = $("body");

		if (isShow === true) {
			if (loading.length < 1) {
				$body.append("<div class='loading js-loading' id='js-loading' style='display:block'></div>");
			}
			if (hasOverlay === true) {
				$body.append("<div class='overlay' id='loadingOverlay'></div>");
			}
		} else if (isShow === false) {
			loading.remove();
			$("#loadingOverlay").remove();
		}
		showMask();
	};

    /********************************************************************************************
     * 添加蒙板 <div class="mod_pop_$mask"></div>
     *******************************************************************************************/
    function showMask() {
        $mask = $('<div class="dialog-pop-mask"></div>');
        resizeMask();
        $mask.appendTo($('body'));
    };


    /********************************************************************************************
     * 调整蒙板大小
     *******************************************************************************************/
    function resizeMask() {
        var doc = document;
        var width = Math.max(doc.documentElement.scrollWidth, doc.body.scrollWidth);
        var height = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
        var clientHeight = (doc.compatMode == 'CSS1Compat') ? doc.documentElement.clientHeight : doc.body.clientHeight;
        height = Math.max(height, clientHeight);
        $mask.css({width: width + 'px', height: height + 'px'});
    };


})(jQuery);

;(function($){
	/**
	 * mask ÕÚÕÖ²ã
	 * @return $layer
	 */
	$.overlay = function(options,callback){
		var defaults = {
			"effect": null,
			"speed": "normal",
			"opacity": 0,
			"background": "rgb(0,0,0)"
		};
		
		var settings = $.extend(defaults,options);
		
		var $overlay = $(".overlay");
		if($overlay.length > 0){
			$overlay.remove();
		}
		
		var $layer = $("<div />")
					.addClass("overlay")
					.css({
						"opacity": settings.opacity,
						"background": settings.background
					});
					
		switch(settings.effect){
			case "fadeIn":
				$layer.fadeIn(settings.speed);
				break;
			case "fadeOut":
				$layer.fadeOut(settings.speed);
				break;
			case "slideDown":
				$layer.slideDown(settings.speed);
				break;
			case "slideUp":
				$layer.slideUp(settings.speed);
				break;
			default:
				$layer.show(settings.speed);
		}
		
		$("body").append($layer);
		
		//callback
		if(typeof callback === "function"){
			callback();
		}
		
		return $layer;
	}
})(jQuery);

;(function($){
	/**
	 * mask ·ÖÏí²ã
	 * @return $layer
	 */
	$.share = function(options,callback){
		var defaults = {
			"effect": null,
			"speed": "normal",
			"opacity": 0,
			"background": "rgb(0,0,0)"
		};
		
		var settings = $.extend(defaults,options);
		
		var $share = $(".share");
		if($share.length > 0){
			$share.remove();
		}
		
		var $sharelayer = $("<div onclick='$(this).hide()'><div style='width: 100%;height: 32.4%;' ><img src='images/jiantuo.png' height='100%' width='100%' /></div> </div>")
					.addClass("share")
					.css({
						"opacity": settings.opacity,
						"background": settings.background
					});
					
		switch(settings.effect){
			case "fadeIn":
				$sharelayer.fadeIn(settings.speed);
				break;
			case "fadeOut":
				$sharelayer.fadeOut(settings.speed);
				break;
			case "slideDown":
				$sharelayer.slideDown(settings.speed);
				break;
			case "slideUp":
				$sharelayer.slideUp(settings.speed);
				break;
			default:
				$sharelayer.show(settings.speed);
		}
		
		$("body").append($sharelayer);
		
		//callback
		if(typeof callback === "function"){
			callback();
		}
		
		return $sharelayer;
	}
})(jQuery);

;(function($){
	/**
	 * µ¯´° vPopWin
	 */
	$.vPopWin = function(options,callback){
		var setting = {
			"content": null,
			"tit": null,
			"btn": "ok",
			"winClass": "",
			"winID": "",
			"isRemove": true,
			"fullScreen": false
		};
		
		var settings = $.extend(setting,options);
		
		if($("#"+settings.winID).length > 0 && !settings.isRemove){
			$("#"+settings.winID).show();
		}else{
			var $vPopWinWrap = $("<div class='vPopWin "+settings.winClass+"' id="+settings.winID+">" +
					"<div class='vPopWin-inner'>" +
					"<div class='vPopWin-title'>" +
					"<span class='vPopWin-title-name'>"+settings.tit+"</span>" +
					"<span class='vPopWin-title-btn'><i class='flat-icon-"+settings.btn+"'></i></span>" +
					"</div>" +
					"<div class='vPopWin-content'>"+settings.content+"</div>" +
					"</div>" +
			"</div>");
			
			if(options && typeof settings.content === "object"){
				$vPopWinWrap.find(".vPopWin-content").html(settings.content);
			}
			
			if(settings.fullScreen){
				$vPopWinWrap.addClass("fullScreen");
			}
			
			$vPopWinWrap.find(".vPopWin-title-btn").click(function(){
				//callback
				if(typeof callback === "function"){
					callback();
				}
				if(settings.isRemove){
					//remove
					$vPopWinWrap.remove();
				}
				if(!settings.isRemove){
					//hide
					$vPopWinWrap.hide();
				}
				
			});
			
			$("body").append($vPopWinWrap);
		}

	};
})(jQuery);


var changeImgFlag = false ;
var srcTmp ;
//Á©¸öÍ¼Æ¬ÇÐ»»Í¼Æ¬µÄSRC
function changeImg(changeObj,src){
	if(!changeImgFlag){
	  srcTmp = changeObj.src;
	  changeObj.src=src;
	  changeImgFlag = true;
	}
	else{
		changeObj.src = srcTmp;
		changeImgFlag = false;
	}
}


/**
 * 保存form表单到sessionStorage
 */
function saveFormDataToSessionStorage() {
	$pElements = $('#beInsuredList').children();
	var index = 0;
	var length = $pElements.length;
	var saveData = {};
	var saveDatas = new Array(length);
	for (index = 0; index < length; index++) {
		var insurantName_show = $($pElements[index]).children('label#insurantName_show').html();
		var insurantCertNo_show = $($pElements[index]).children('input#insurantCertNo_show').val();
		var insurantName = $($pElements[index]).children('input[name=insurantName]').val();
		var insurantNamePY = $($pElements[index]).children('input[name=insurantNamePY]').val();
		var insurantCertType = $($pElements[index]).children('input[name=insurantCertType]').val();
		var insurantCertNo = $($pElements[index]).children('input[name=insurantCertNo]').val();
		var insurantCertBirthday = $($pElements[index]).children('input[name=insurantCertBirthday]').val();
		var insurantCertSex = $($pElements[index]).children('input[name=insurantCertSex]').val();
		var relationshipWithInsured = $($pElements[index]).children('input[name=relationshipWithInsured]').val();
		saveData.insurantName_show = insurantName_show;
		saveData.insurantCertNo_show = insurantCertNo_show;
		saveData.insurantName = insurantName;
		saveData.insurantNamePY = insurantNamePY;
		saveData.insurantCertType = insurantCertType;
		saveData.insurantCertNo = insurantCertNo;
		saveData.insurantCertBirthday = insurantCertBirthday;
		saveData.insurantCertSex = insurantCertSex;
		saveData.relationshipWithInsured = relationshipWithInsured;
		saveDatas[index] = saveData;
		saveData = {};
	}
	sessionStorage.setItem('saveDatas', JSON.stringify(saveDatas));
	sessionStorage.setItem('allAmount', $('#allAmount').html());
	if ($('#standardAmount').length) {
		sessionStorage.setItem('standardAmount', $('#standardAmount').html());
	}
}

/**
 * 从sessionStorage中取数据并显示在页面
 * @return {[type]} [description]
 */
function getDataFromSessionStorage() {
	var $beInsuredList = $('#beInsuredList');
	var saveDatas = sessionStorage.getItem('saveDatas');
	if (saveDatas) {
		saveDatas = JSON.parse(saveDatas);
		var index = 0;
		var length = saveDatas.length;
		count = length;
		for (index = 0; index < length; index++) {
			if (index === 0) {
				var $firstPElement = $($beInsuredList).children('p#benrenxinxi');
				$($firstPElement).children('label#insurantName_show').html(saveDatas[index].insurantName_show);
				$($firstPElement).children('input#insurantCertNo_show').val(saveDatas[index].insurantCertNo_show);
				$($firstPElement).children('input[name=insurantName]').val(saveDatas[index].insurantName);
				$($firstPElement).children('input[name=insurantNamePY]').val(saveDatas[index].insurantNamePY);
				$($firstPElement).children('input[name=insurantCertType]').val(saveDatas[index].insurantCertType);
				$($firstPElement).children('input[name=insurantCertNo]').val(saveDatas[index].insurantCertNo);
				$($firstPElement).children('input[name=insurantCertBirthday]').val(saveDatas[index].insurantCertBirthday);
				$($firstPElement).children('input[name=insurantCertSex]').val(saveDatas[index].insurantCertSex);
				$($firstPElement).children('input[name=relationshipWithInsured]').val(saveDatas[index].relationshipWithInsured);
			} else {
				var pElement = '<p>'
							   + '<label id="insurantName_show" class="left color02" style="width: 75%;">' + saveDatas[index].insurantName_show + '</label>'
							   + '<input id="insurantCertNo_show" type="hidden" class="left" value="' + saveDatas[index].insurantCertNo_show + '" readonly="readonly">'
							   + '<input name="insurantName" type="hidden" value="' + saveDatas[index].insurantName + '">'
							   + '<input name="insurantNamePY" id="insurantNamePY" type="hidden" value="' + saveDatas[index].insurantNamePY + '">'
							   + '<input name="insurantCertType" type="hidden" value="' + saveDatas[index].insurantCertType + '">'
							   + '<input name="insurantCertNo" type="hidden" value="' + saveDatas[index].insurantCertNo + '">'
							   + '<input name="insurantCertBirthday" type="hidden" value="' + saveDatas[index].insurantCertBirthday + '">'
							   + '<input name="insurantCertSex" type="hidden" value="' + saveDatas[index].insurantCertSex + '">'
							   + '<input name="relationshipWithInsured" type="hidden" value="' + saveDatas[index].relationshipWithInsured + '">'
							   + '<span class="right tc" style="margin-right: 3%;"><a href="javascript:;" onclick="deleteThisRows($(this))" class="deleteThisRows">删除</a></span>';
				$($beInsuredList).append(pElement);
				if ('undefined' != typeof birthDays) {
					birthDays.push(saveDatas[index].insurantCertBirthday);
				}
				if ('undefined' != typeof sexs) {
					sexs.push(saveDatas[index].insurantCertSex);
				}
			}
		}
		$('#allAmount').html(sessionStorage.getItem('allAmount'));
		if ($('#standardAmount').length) {
			$('#standardAmount').html(sessionStorage.getItem('standardAmount'));
		}
	}

	var gotopay = $("#gotopay");
	if ($('#isagreeinsuredbox').attr('checked')) {
		gotopay.removeAttr("disabled");
		gotopay.removeClass("submitBut_disabled");
		gotopay.addClass("submitBut");
	} else {
		gotopay.attr("disabled","disabled");
		gotopay.removeClass("submitBut");
		gotopay.addClass("submitBut_disabled");
	}
}

/**
 * 检测当前添加的被保人信息是否与已有的人员信息相同
 */
function checkCertNoRepeat(cert, isModified) {
	var certType = cert.certType;
	var certNo = cert.certNo;
	var certTypes = $('input[name=insurantCertType]');
	var certNos = $('input[name=insurantCertNo]');
	//判断是否与被保人证件号相同
	var length = $('input[name=insurantCertType]').length;
	var index = (isModified ? 1 : 0);

	for (index; index < length; index++) {
		if (certType == certTypes[index].value
			&& certNo == certNos[index].value) {
			$('#vpopWinError').text('证件号码与第' + (index + 1) + '个被保人相同！');
			return false;
		}
	}
	return true;
}

