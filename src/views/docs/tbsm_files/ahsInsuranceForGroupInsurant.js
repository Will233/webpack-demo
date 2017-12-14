var count = 0;
function addPerson() {
	$('#error').text("");
	var guanxi = document.getElementsByName('relationshipWithInsured');
	var guanxiLength = guanxi.length;
	var doCount;
	var guanxiA = new Array();
	var guanxiS
	for(var i=0;i<guanxiLength;i++){
		var n = guanxi[i].value;
		guanxiA.push(n);
	}
	guanxiS = guanxiA.join(',');
	//alert(guanxiS);
	if(guanxiS.indexOf('1') != -1){
		doCount = 1;
	}else{
		doCount = 2;
	}
	showAlert(1,doCount);

}
function showAlert(m,n) {
	if(m == 1){
		if (n == 1) {
			$.vPopWin({
				"tit" : "新增被保险人信息",
				"winID" : "alertVpopWin",
				"content" : '<div>'
					+ '<table class="dataTable" style="width:100%;font-size:14px;">'
					+ '<tr style="display:none"><td align="right" style="padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">家</span><span class="left tl" style="width:14px">庭</span><span class="left tl" style="width:14px">关</span><span class="left tl" style="width:14px">系</span></td><td style="padding-top:10px;padding-bottom:10px"><select id="relationshipWithInsuredVpopWin" name="relationshipWithInsuredVpopWin" class="inforinput" style="width: 91.3%;height: 2em;padding: 2px 0 2px 0px;" >'
					+ '<option value="00" >请选择</option>'
					+ '<option value="22" >父母</option>'
					+ '<option value="I" >子女</option>'
					+ '<option value="2" >配偶</option>'
					+ '<option value="9" selected="selected">其他</option>'
					+ '</select></td></tr>'
					+'<tr><td align="right" style="width: 33%;padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">姓</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">名</span></td><td style="padding-top:10px;padding-bottom:10px"><input type="text" name="insurantName" class="inforinput" maxlength="20" id="insurantNameVpopWin" value="" style="height: 2em; padding-left: 1px;" /></td></tr>'
					+ '<tr><td align="right" style="padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">证</span><span class="left tl" style="width:14px">件</span><span class="left tl" style="width:14px">类</span><span class="left tl" style="width:14px">型</span></td><td style="padding-top:10px;padding-bottom:10px"><select id="insurantCertTypeVpopWin" name="insurantCertType" style="width: 91.3%;height: 2em;padding: 2px 0 2px 0px;" class="inforinput" onchange="changeType_02($(this).val(),'
					+ "'VpopWin'"
					+ ',$(this))">'
					+ '<option value="01" selected="selected">身份证</option>'
					+ '<option value="02" >护照</option>'
					+ '<option value="03" >军官证</option>'
					+ '<option value="05" >驾驶证</option>'
					+ '<option value="06" >港澳回乡证或台胞证</option>'
					+ '<option value="99" >其他</option>'
					+ '</select></td></tr>'
					+ '<tr><td align="right" style="padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">证</span><span class="left tc" style="width:28px">件</span><span class="left tl" style="width:14px">号</span></td><td style="padding-top:10px;padding-bottom:10px"> <input type="tel" class="inforinput" name="insurantCertNo" id="for-paperNoVpopWin" value=""  placeholder="证件号码中X用*号代替" maxlength="18"  onchange="fucosDate(this)" style="height: 2em; padding-left: 1px;">'
					+ '<input type="text" id="for-paperNo_otherVpopWin"  name="insurantCertNo" maxlength="20"  disabled="disabled" style="display: none;height: 2em; padding-left: 1px;" class="inforinput" placeholder="必填"></td></tr>'
					+'<tr id="birthdaybox" style="display:none"><td align="right" style="width: 33%;padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">出</span><span class="left tl" style="width:14px">生</span><span class="left tl" style="width:14px">日</span><span class="left tl" style="width:14px">期</span></td><td style="padding-top:10px;padding-bottom:10px"><input type="text" class="inforinput" name="insurantCertBirthday" maxlength="20" id="insurantCertBirthdayVpopWin" style="height: 2em; padding-left: 1px;" /></td></tr>'
					+'<tr id="sexbox" style="display:none"><td align="right" style="width: 33%;padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">性</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">别</span></td><td style="padding-top:10px;padding-bottom:10px"><input type="hidden" class="inforinput" name="insurantCertSex" maxlength="20" id="insurantCertSexVpopWin" value="M" /><input name="sex" type="radio" value="M"  checked="checked" style="width:25%;height:20px;line-height:20px;margin-top: 6px;float: left;" onclick="assignmentToInput($(this).val())" /><span style="float: left;margin-top: 7px;">男</span><input name="sex" type="radio" value="F" style="width:25%;height:20px;line-height:20px;margin-top: 6px;float: left;" onclick="assignmentToInput($(this).val())" /><span style="float: left;margin-top: 7px;">女</span></td></tr>'
					+ '</table> <div id="vpopWinError"  align="center" style="color:red;font-weight:bold;font-size:14px;margin-top:10px;" >'
					+ '</div><table style="margin-top:10px;width:100%;height:100%;"><tr><td width="50%"><input type="button"  value="取消" id="cancelVpopWin"  class="submitBut" style="border-radius:14px;border:0;width:60%;margin-left:27%;height:30px;font-size:14px;background-color:#FF7614;color:#FFF"/></td><td width="50%"><input type="button" id="commfirVpopWin" value="确认"  class="submitBut" style="width:60%;margin-left:11%;height:30px;font-size:14px;border:0;background-color:#FF7614;color:#FFF;border-radius:14px;"/></td></tr></table></div>'
			});
			$("#insurantCertTypeVpopWin").children().each(function() {
				if ($(this).val() == $("#applicantCertType").val()) {
					$(this).attr("selected", "selected");
				}
				
			});
			if ($("#insurantCertTypeVpopWin").val() == "01") {
				$("#for-paperNoVpopWin").show();
				$("#for-paperNoVpopWin").removeAttr("disabled");
				$("#for-paperNo_otherVpopWin").hide();
				$("#for-paperNo_otherVpopWin").attr("disabled", "disabled");
				$("#for-paperNoVpopWin").val($("#for-paperNo1").val());
			} else {
				$("#for-paperNo_otherVpopWin").show();
				$("#for-paperNoVpopWin").hide();
				$("#for-paperNo_otherVpopWin").removeAttr("disabled");
				$("#for-paperNoVpopWin").attr("disabled", "disabled");
				$("#for-paperNo_otherVpopWin").val(
				$("#for-paperNo_other1").val());
			}
		} else {
			$.vPopWin({
				"tit" : "新增被保险人信息",
				"winID" : "alertVpopWin",
				"content" : '<div>'
					+ '<table class="dataTable" style="width:100%;font-size:14px;">'
					+ '<tr style="display:none"><td align="right" style="padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">家</span><span class="left tl" style="width:14px">庭</span><span class="left tl" style="width:14px">关</span><span class="left tl" style="width:14px">系</span></td><td style="padding-top:10px;padding-bottom:10px"><select id="relationshipWithInsuredVpopWin" name="relationshipWithInsuredVpopWin" class="inforinput" style="width: 91.3%;height: 2em;padding: 2px 0 2px 0px;" >'
					+ '<option value="00" selected="selected">请选择</option>'
					+ '<option value="1" >本人</option>'
					+ '<option value="22" >父母</option>'
					+ '<option value="I" >子女</option>'
					+ '<option value="2" >配偶</option>'
					+ '<option value="9" selected="selected">其他</option>'
					+ '</select></td></tr>'
					+'<tr><td align="right" style="width: 33%;padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">姓</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">名</span></td><td style="padding-top:10px;padding-bottom:10px"><input type="text" class="inforinput" name="insurantName" maxlength="20" id="insurantNameVpopWin" style="height: 2em; padding-left: 1px;" /></td></tr>'
					+ '<tr><td align="right" style="padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">证</span><span class="left tl" style="width:14px">件</span><span class="left tl" style="width:14px">类</span><span class="left tl" style="width:14px">型</span></td><td style="padding-top:10px;padding-bottom:10px"><select id="insurantCertTypeVpopWin" class="inforinput" name="insurantCertType" style="width: 91.3%;height: 2em;padding: 2px 0 2px 0px;" onchange="changeType_02($(this).val(),'
					+ "'VpopWin'"
					+ ',$(this))">'
					+ '<option value="01" selected="selected">身份证</option>'
					+ '<option value="02" >护照</option>'
					+ '<option value="03" >军官证</option>'
					+ '<option value="05" >驾驶证</option>'
					+ '<option value="06" >港澳回乡证或台胞证</option>'
					+ '<option value="99" >其他</option>'
					+ '</select></td></tr>'
					+ '<tr><td align="right" style="padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">证</span><span class="left tc" style="width:28px">件</span><span class="left tl" style="width:14px">号</span></td><td style="padding-top:10px;padding-bottom:10px"> <input type="tel" class="inforinput" name="insurantCertNo" id="for-paperNoVpopWin" value=""  placeholder="证件号码中X用*号代替" maxlength="18" onchange="fucosDate(this)" style="height: 2em; padding-left: 1px;">'
					+ '<input type="text" id="for-paperNo_otherVpopWin" class="inforinput"  name="insurantCertNo" maxlength="20"  style="display: none;height: 2em; padding-left: 1px;" placeholder="必填"></td></tr>'
					+'<tr id="birthdaybox" style="display:none"><td align="right" style="width: 33%;padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">出</span><span class="left tl" style="width:14px">生</span><span class="left tl" style="width:14px">日</span><span class="left tl" style="width:14px">期</span></td><td style="padding-top:10px;padding-bottom:10px"><input type="text" class="inforinput" name="insurantCertBirthday" maxlength="20" id="insurantCertBirthdayVpopWin" style="height: 2em; padding-left: 1px;" /></td></tr>'
					+'<tr id="sexbox" style="display:none"><td align="right" style="width: 33%;padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">性</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">别</span></td><td style="padding-top:10px;padding-bottom:10px"><input type="hidden" class="inforinput" name="insurantCertSex" maxlength="20" id="insurantCertSexVpopWin" value="M" /><input name="sex" class="man" type="radio" value="M"  checked="checked" style="width:25%;height:20px;line-height:20px;margin-top: 6px;float: left;" onclick="assignmentToInput($(this).val())" /><span style="float: left;margin-top: 7px;">男</span><input name="sex" class="woman" type="radio" value="F" style="width:25%;height:20px;line-height:20px;margin-top: 6px;float: left;" onclick="assignmentToInput($(this).val())" /><span style="float: left;margin-top: 7px;">女</span></td></tr>'
					+ '</table> <div id="vpopWinError"  align="center" style="color:red;font-weight:bold;font-size:14px;margin-top:10px;" >'
					+ '</div><table style="margin-top:10px;width:100%;height:100%;"><tr><td width="50%"><input type="button"  value="取消" id="cancelVpopWin"  class="submitBut" style="border-radius:14px;border:0;width:60%;margin-left:27%;height:30px;font-size:14px;background-color:#FF7614;color:#FFF"/></td><td width="50%"><input type="button" id="commfirVpopWin" value="确认"  class="submitBut" style="width:60%;margin-left:11%;height:30px;font-size:14px;border:0;background-color:#FF7614;color:#FFF;border-radius:14px;"/></td></tr></table></div>'
			});
		}
		$("#commfirVpopWin").click(function() {
			if ($("#insurantNameVpopWin").val() == "") {
				$("#alertVpopWin").find('#vpopWinError').text('被保人姓名不能为空！');
				return;
			}
			if ($("#insurantCertTypeVpopWin").val() == "01"
				&& $("#for-paperNoVpopWin").val() == "") {
				$("#alertVpopWin").find('#vpopWinError').text('被保人证件号码不能为空！');
				
				return;
			}
			if ($("#insurantCertTypeVpopWin").val() != "01"
				&& $("#for-paperNo_otherVpopWin").val() == "") {
				$("#alertVpopWin").find('#vpopWinError').text('被保人证件号码不能为空！');
				return;
			}
			
			if ($("#insurantCertTypeVpopWin").val() == "01"
				&& $("#for-paperNoVpopWin").val() != "") {
				if (!valiateShenfenz($("#for-paperNoVpopWin").val(), '2', 'vpopWinError')) {
					return;
				}
			}
			if ($("#insurantCertTypeVpopWin").val() != "01" && $("#for-paperNo_otherVpopWin").val()){
				if(!valiateOtherType($('#insurantCertBirthdayVpopWin').val(),'2','vpopWinError')){
					return false;
				}
			}
			if ($("#insurantCertTypeVpopWin").val() == "01") {
				var zjhaoma = $("#for-paperNoVpopWin").val();
				// 获取出生日期和性别
				var certMsg = getCertInfoByCertNO(zjhaoma);
				var birthdaydate = certMsg.bothday;
				var sexdata = certMsg.autoSex;
			} else {
				var zjhaoma = $("#for-paperNo_otherVpopWin").val();
				var birthdaydate = $('#insurantCertBirthdayVpopWin').val();
				var sexdata = $('#insurantCertSexVpopWin').val();
			}
			if ($("#relationshipWithInsuredVpopWin").val() == "00") {
				$("#alertVpopWin").find('#vpopWinError').text('请选择关系！');
				return;
			}

			var cert = {};
			cert.certType = $('#insurantCertTypeVpopWin').val();
			if (cert.certType == '01') {
				cert.certNo = $("#for-paperNoVpopWin").val();
			} else {
				cert.certNo = $("#for-paperNo_otherVpopWin").val();
			}
			if (!checkCertNoRepeat(cert, false)) {
				return;
			}

			var tr = $('<p>'
					+'<label id="insurantName_show" class="left color02" style="width: 75%;">'
					+$("#insurantNameVpopWin").val()
					+'</label>'
					+'<input id="insurantCertNo_show" type="hidden" class="left" value="'
					+zjhaoma
					+'" readonly="readonly">'
					+'<input name="insurantName" type="hidden" value="'+$("#insurantNameVpopWin").val()+'" />'
					+'<input name="insurantCertType" type="hidden" value="'+$("#insurantCertTypeVpopWin").val()+'" />'
					+'<input name="insurantCertNo" type="hidden" value="'+zjhaoma+'" />'
					+'<input name="insurantCertBirthday" type="hidden" value="'+birthdaydate+'" />'
					+'<input name="insurantCertSex" type="hidden" value="'+sexdata+'" />'
					+'<input name="relationshipWithInsured" type="hidden" value="'+$('#relationshipWithInsuredVpopWin').val()+'" />'
					+'<span class="right tc" style="margin-right: 3%;"><a href="javascript:;" onclick="deleteThisRows($(this))" class="deleteThisRows">删除</a></span>'
					+'</p>')
					$(".contentnertimeer_2").append(tr);
			$("#alertVpopWin").remove();
			
			count++;
			var edu = $('input[name=amount]').val();
			var dat = $('input[name=discountAmount]').val();
			if(dat != ''){
				$('#allAmount').html((count)*dat);
			}else{
				$('#allAmount').html((count)*edu);
			}
			$('#standardAmount').html((count)*edu);
			
		})
	}else{
		if (n == 1) {
			$.vPopWin({
				"tit" : "新增被保险人信息",
				"winID" : "alertVpopWin",
				"content" : '<div>'
					+ '<table class="dataTable" style="width:100%;font-size:14px;">'
					+ '<tr style="display:none"><td align="right" style="padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">家</span><span class="left tl" style="width:14px">庭</span><span class="left tl" style="width:14px">关</span><span class="left tl" style="width:14px">系</span></td><td style="padding-top:10px;padding-bottom:10px"><select id="relationshipWithInsuredVpopWin" name="relationshipWithInsuredVpopWin" class="inforinput" style="width: 91.3%;height: 2em;padding: 2px 0 2px 0px;" >'
					+ '<option value="00" >请选择</option>'
//					+ '<option value="1" >本人</option>'
					+ '<option value="22" >父母</option>'
					+ '<option value="I" >子女</option>'
					+ '<option value="2" >配偶</option>'
					+ '<option value="9" selected="selected">其他</option>'
					+ '</select></td></tr>'
					+'<tr><td align="right" style="width: 33%;padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">姓</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">名</span></td><td style="padding-top:10px;padding-bottom:10px"><input type="text" name="insurantName" class="inforinput" maxlength="20" id="insurantNameVpopWin" value="" style="height: 2em; padding-left: 1px;"/></td></tr>'
					+ '<tr><td align="right" style="padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">证</span><span class="left tl" style="width:14px">件</span><span class="left tl" style="width:14px">类</span><span class="left tl" style="width:14px">型</span></td><td style="padding-top:10px;padding-bottom:10px"><select id="insurantCertTypeVpopWin" name="insurantCertType" style="width: 91.3%;height: 2em;padding: 2px 0 2px 0px;" class="inforinput" onchange="changeType_02($(this).val(),'
					+ "'VpopWin'"
					+ ',$(this))">'
					+ '<option value="01" selected="selected">身份证</option>'
					+ '<option value="02" >护照</option>'
					+ '<option value="03" >军官证</option>'
					+ '<option value="05" >驾驶证</option>'
					+ '<option value="06" >港澳回乡证或台胞证</option>'
					+ '<option value="99" >其他</option>'
					+ '</select></td></tr>'
					+ '<tr><td align="right" style="padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">证</span><span class="left tc" style="width:28px">件</span><span class="left tl" style="width:14px">号</span></td><td style="padding-top:10px;padding-bottom:10px"> <input type="tel" class="inforinput" name="insurantCertNo" id="for-paperNoVpopWin" value=""  placeholder="证件号码中X用*号代替" maxlength="18"  onchange="fucosDate(this)" style="height: 2em; padding-left: 1px;">'
					+ '<input type="text" id="for-paperNo_otherVpopWin"  name="insurantCertNo" maxlength="20"  disabled="disabled" style="display: none;height: 2em; padding-left: 1px;" class="inforinput" placeholder="必填"></td></tr>'
					+'<tr id="birthdaybox" style="display:none"><td align="right" style="width: 33%;padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">出</span><span class="left tl" style="width:14px">生</span><span class="left tl" style="width:14px">日</span><span class="left tl" style="width:14px">期</span></td><td style="padding-top:10px;padding-bottom:10px"><input type="text" class="inforinput" name="insurantCertBirthday" onfocus="this.blur();" maxlength="20" id="insurantCertBirthdayVpopWin" style="height: 2em; padding-left: 1px;" /></td></tr>'
					+'<tr id="sexbox" style="display:none"><td align="right" style="width: 33%;padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">性</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">别</span></td><td style="padding-top:10px;padding-bottom:10px"><input type="hidden" class="inforinput" name="insurantCertSex" maxlength="20" id="insurantCertSexVpopWin" value="M" /><input name="sex" type="radio" value="M"  checked="checked" style="width:25%;height:20px;line-height:20px;margin-top: 6px;float: left;" onclick="assignmentToInput($(this).val())" /><span style="float: left;margin-top: 7px;">男</span><input name="sex" type="radio" value="F" style="width:25%;height:20px;line-height:20px;margin-top: 6px;float: left;" onclick="assignmentToInput($(this).val())" /><span style="float: left;margin-top: 7px;">女</span></td></tr>'
					+ '</table> <div id="vpopWinError"  align="center" style="color:red;font-weight:bold;font-size:14px;margin-top:10px;" >'
					+ '</div><table style="margin-top:10px;width:100%;height:100%;"><tr><td width="50%"><input type="button"  value="取消" id="cancelVpopWin"  class="submitBut" style="border-radius:14px;border:0;width:60%;margin-left:27%;height:30px;font-size:14px;background-color:#FF7614;color:#FFF"/></td><td width="50%"><input type="button" id="commfirVpopWin" value="确认"  class="submitBut" style="width:60%;margin-left:11%;height:30px;font-size:14px;border:0;background-color:#FF7614;color:#FFF;border-radius:14px;"/></td></tr></table></div>'
			});
			$("#insurantCertTypeVpopWin").children().each(function() {
				if ($(this).val() == $("#applicantCertType").val()) {
					$(this).attr("selected", "selected");
				}
				
			});
			if ($("#insurantCertTypeVpopWin").val() == "01") {
				$("#for-paperNoVpopWin").show();
				$("#for-paperNoVpopWin").removeAttr("disabled");
				$("#for-paperNo_otherVpopWin").hide();
				$("#for-paperNo_otherVpopWin").attr("disabled", "disabled");
				$("#for-paperNoVpopWin").val($("#for-paperNo1").val());
			} else {
				$("#for-paperNo_otherVpopWin").show();
				$("#for-paperNoVpopWin").hide();
				$("#for-paperNo_otherVpopWin").removeAttr("disabled");
				$("#for-paperNoVpopWin").attr("disabled", "disabled");
				$("#for-paperNo_otherVpopWin").val(
						$("#for-paperNo_other1").val());
			}
		} else {
			$.vPopWin({
				"tit" : "新增被保险人信息",
				"winID" : "alertVpopWin",
				"content" : '<div>'
					+ '<table class="dataTable" style="width:100%;font-size:14px;">'
					+ '<tr style="display:none"><td align="right" style="padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">家</span><span class="left tl" style="width:14px">庭</span><span class="left tl" style="width:14px">关</span><span class="left tl" style="width:14px">系</span></td><td style="padding-top:10px;padding-bottom:10px"><select id="relationshipWithInsuredVpopWin" name="relationshipWithInsuredVpopWin" class="inforinput" style="width: 91.3%;height: 2em;padding: 2px 0 2px 0px;" >'
					+ '<option value="00" selected="selected">请选择</option>'
					+ '<option value="1" >本人</option>'
					+ '<option value="22" >父母</option>'
					+ '<option value="I" >子女</option>'
					+ '<option value="2" >配偶</option>'
					+ '<option value="9" selected="selected">其他</option>'
					+ '</select></td></tr>'
					+'<tr><td align="right" style="width: 33%;padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">姓</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">名</span></td><td style="padding-top:10px;padding-bottom:10px"><input type="text" style="height: 2em; padding-left: 1px;" class="inforinput" name="insurantName" maxlength="20" id="insurantNameVpopWin"/></td></tr>'
					+ '<tr><td align="right" style="padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">证</span><span class="left tl" style="width:14px">件</span><span class="left tl" style="width:14px">类</span><span class="left tl" style="width:14px">型</span></td><td style="padding-top:10px;padding-bottom:10px"><select id="insurantCertTypeVpopWin" class="inforinput" name="insurantCertType" style="width: 91.3%;height: 2em;padding: 2px 0 2px 0px;" onchange="changeType_02($(this).val(),'
					+ "'VpopWin'"
					+ ',$(this))">'
					+ '<option value="01" selected="selected">身份证</option>'
					+ '<option value="02" >护照</option>'
					+ '<option value="03" >军官证</option>'
					+ '<option value="05" >驾驶证</option>'
					+ '<option value="06" >港澳回乡证或台胞证</option>'
					+ '<option value="99" >其他</option>'
					+ '</select></td></tr>'
					+ '<tr><td align="right" style="padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">证</span><span class="left tc" style="width:28px">件</span><span class="left tl" style="width:14px">号</span></td><td style="padding-top:10px;padding-bottom:10px"> <input type="tel" class="inforinput" style="height: 2em; padding-left: 1px;" name="insurantCertNo" id="for-paperNoVpopWin" value=""  placeholder="证件号码中X用*号代替" maxlength="18" onchange="fucosDate(this)">'
					+ '<input type="text" id="for-paperNo_otherVpopWin" class="inforinput"  name="insurantCertNo" maxlength="20"   style="display: none;height: 2em; padding-left: 1px;" placeholder="必填"></td></tr>'
					+'<tr id="birthdaybox" style="display:none"><td align="right" style="width: 33%;padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">出</span><span class="left tl" style="width:14px">生</span><span class="left tl" style="width:14px">日</span><span class="left tl" style="width:14px">期</span></td><td style="padding-top:10px;padding-bottom:10px"><input type="text" class="inforinput" name="insurantCertBirthday" onfocus="this.blur();" maxlength="20" id="insurantCertBirthdayVpopWin" style="height: 2em; padding-left: 1px;" /></td></tr>'
					+'<tr id="sexbox" style="display:none"><td align="right" style="width: 33%;padding-top:10px;padding-bottom:10px"><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">性</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">&nbsp;</span><span class="left tl" style="width:14px">别</span></td><td style="padding-top:10px;padding-bottom:10px"><input type="hidden" class="inforinput" name="insurantCertSex" maxlength="20" id="insurantCertSexVpopWin" value="M" /><input name="sex" class="man" type="radio" value="M"  checked="checked" style="width:25%;height:20px;line-height:20px;margin-top: 6px;float: left;" onclick="assignmentToInput($(this).val())" /><span style="float: left;margin-top: 7px;">男</span><input name="sex" class="woman" type="radio" value="F" style="width:25%;height:20px;line-height:20px;margin-top: 6px;float: left;" onclick="assignmentToInput($(this).val())" /><span style="float: left;margin-top: 7px;">女</span></td></tr>'
					+ '</table> <div id="vpopWinError"  align="center" style="color:red;font-weight:bold;font-size:14px;margin-top:10px;" >'
					+ '</div><table style="margin-top:10px;width:100%;height:100%;"><tr><td width="50%"><input type="button"  value="取消" id="cancelVpopWin"  class="submitBut" style="border-radius:14px;border:0;width:60%;margin-left:27%;height:30px;font-size:14px;background-color:#FF7614;color:#FFF"/></td><td width="50%"><input type="button" id="commfirVpopWin" value="确认"  class="submitBut" style="width:60%;margin-left:11%;height:30px;font-size:14px;border:0;background-color:#FF7614;color:#FFF;border-radius:14px;"/></td></tr></table></div>'
			});
		}
	}

	$("#cancelVpopWin").click(function() {
		$("#alertVpopWin").remove();

	})

}
function changeInsuredRelationship(obj){
	if(obj.val() == '1'){
		//当选择本人的时候。赋值
		$('#insurantNameVpopWin').val($('input[name=applicantName]').val());
		$('#insurantCertTypeVpopWin').val($('input[name=applicantCertType]').val());
		if($('#insurantCertTypeVpopWin').val() == '1'){
			$('#for-paperNoVpopWin').val($('input[name=applicantCertNo]').val());
		}else{
			$('#for-paperNo_otherVpopWin').val($('input[name=applicantCertNo]').val());
		}
	}else{
		showAlert();
		//$('#relationshipWithInsured').val();
	}
}

// 修改 被保人信息
function changeThisRows(obj){
	$('#error').empty();
	if($("#theSame").attr("checked")){
		var re_insurantName = obj.parent().parent().parent().find('input[name=applicantName]').val();
		var re_insurantCertType = obj.parent().parent().parent().find('input[name=applicantCertType]').val();
		var re_insurantCertNo = obj.parent().parent().parent().find('input[name=applicantCertNo]').val();
		var re_insurantCertBirthday = obj.parent().parent().parent().find('input[name=applicantBirthday]').val();
		var re_insurantCertSex = obj.parent().parent().parent().find('input[name=applicantSex]').val();
		var re_relationshipWithInsured = obj.parent().parent().parent().find('input[name=applicantrelationshipWithInsured]').val();
		showAlert(2,2);
	}else{
		var re_insurantName = obj.parent().parent().find('input[name=insurantName]').val();
		var re_insurantCertType = obj.parent().parent().find('input[name=insurantCertType]').val();
		var re_insurantCertNo = obj.parent().parent().find('input[name=insurantCertNo]').val();
		var re_insurantCertBirthday = obj.parent().parent().find('input[name=insurantCertBirthday]').val();
		var re_insurantCertSex = obj.parent().parent().find('input[name=insurantCertSex]').val();
		var re_relationshipWithInsured = obj.parent().parent().find('input[name=relationshipWithInsured]').val();
	
		var guanxiVpopWin = document.getElementsByName('relationshipWithInsured');
		var guanxiVpopWinLength = guanxiVpopWin.length;
		var doCountVpopWin;
		var guanxiVpopWinA = new Array(); 
		var guanxiVpopWinS
		for(var i=0;i<guanxiVpopWinLength;i++){
			var n = guanxiVpopWin[i].value;
			guanxiVpopWinA.push(n);
		}
		guanxiVpopWinS = guanxiVpopWinA.join(',');
		//alert(guanxiS);
		if(guanxiVpopWinS.charAt(0) == '1'){
			doCountVpopWin = 2
		}else{
			if(guanxiVpopWinS.indexOf('1') != -1){
				doCountVpopWin = 1;
			}else{
				doCountVpopWin = 2;
			}
		}
		showAlert(2,doCountVpopWin);
	}
	$('#relationshipWithInsuredVpopWin').val(re_relationshipWithInsured);
	$('#insurantNameVpopWin').val(re_insurantName);
	$('#insurantCertTypeVpopWin').val(re_insurantCertType);
	
	if($('#insurantCertTypeVpopWin').val() == '01'){
		$('#for-paperNoVpopWin').css('display','block');
		$('#for-paperNo_otherVpopWin').css('display','none');
		$('#for-paperNo_otherVpopWin').attr("disabled","disabled");
		$('#for-paperNoVpopWin').removeAttr("disabled");
		$("#alertVpopWin").find('#birthdaybox').hide();
		$("#alertVpopWin").find('#sexbox').hide();
		$('.vPopWin-inner').css('top','30%');
		$('#for-paperNoVpopWin').val(re_insurantCertNo);
	}else{
		$('#for-paperNoVpopWin').css('display','none');
		$('#for-paperNoVpopWin').attr("disabled","disabled");
		$('#for-paperNo_otherVpopWin').css('display','block');
		$('#for-paperNo_otherVpopWin').removeAttr("disabled");
		$("#alertVpopWin").find('#birthdaybox').css('display','table-row');
		$("#alertVpopWin").find('#sexbox').css('display','table-row');
		$('.vPopWin-inner').css('top','20%');
		$('#for-paperNo_otherVpopWin').val(re_insurantCertNo);
		$('#insurantCertBirthdayVpopWin').val(re_insurantCertBirthday);
		$('#insurantCertSexVpopWin').val(re_insurantCertSex);
		var sexList = document.getElementsByName('sex');
		if(re_insurantCertSex == 'M'){
			sexList[0].setAttribute('checked','checked');
			sexList[1].removeAttribute('checked');
		}else if(re_insurantCertSex == 'F'){
			sexList[0].removeAttribute('checked');
			sexList[1].setAttribute('checked','checked');
		}
		var stratDate = $('#insurantCertBirthdayVpopWin').val();
		var birthdayControl = $('#insurantCertBirthdayVpopWin') , currentDate = new Date(new Date().getTime() + 24*60*60*1000) , curr = currentDate.getFullYear();
		var opt = {};
		opt.date = {preset : 'date'};
		birthdayControl.val(stratDate).scroller('destroy').scroller($.extend(opt.date, {theme: 'default', mode: 'scroller', display: 'modal', lang: 'zh' , startYear: curr-100 , endYear: curr}));
	}
    /* 如果是修改这行信息   */
	$("#commfirVpopWin").click(function() {
		if ($("#insurantNameVpopWin").val() == "") {
			$("#alertVpopWin").find('#vpopWinError').text('被保人姓名不能为空！');
			return;
		}
		if ($("#insurantCertTypeVpopWin").val() == "01" && $("#for-paperNoVpopWin").val() == "") {
			$("#alertVpopWin").find('#vpopWinError').text('被保人证件号码不能为空！');

			return;
		}
		if ($("#insurantCertTypeVpopWin").val() != "01" && $("#for-paperNo_otherVpopWin").val() == "") {
			$("#alertVpopWin").find('#vpopWinError').text('被保人证件号码不能为空！');
			return;
		}
		if ($("#insurantCertTypeVpopWin").val() == "01" && $("#for-paperNoVpopWin").val() != "") {
			if (!valiateShenfenz($("#for-paperNoVpopWin").val(), '2', 'vpopWinError')) {
				return;
			}
		}
		if($("#insurantCertTypeVpopWin").val() != "01" && $("#for-paperNo_otherVpopWin").val()){
			if(!valiateOtherType($('#insurantCertBirthdayVpopWin').val(),'2','vpopWinError')){
				return false;
			}
		}

		var cert = {};
		cert.certType = $('#insurantCertTypeVpopWin').val();
		if (cert.certType == '01') {
			cert.certNo = $("#for-paperNoVpopWin").val();
		} else {
			cert.certNo = $("#for-paperNo_otherVpopWin").val();
		}
		if (!checkCertNoRepeat(cert, true)) {
			return;
		}

		if ($("#insurantCertTypeVpopWin").val() == "01") {
			var zjhaoma = $("#for-paperNoVpopWin").val();
			var certMsg = getCertInfoByCertNO(zjhaoma);
			var birthdaydate = certMsg.bothday;
			var sexdata = certMsg.autoSex;
		} else {
			var zjhaoma = $("#for-paperNo_otherVpopWin").val();
			var birthdaydate = $('#insurantCertBirthdayVpopWin').val();
			var sexdata = $('#insurantCertSexVpopWin').val();
		}
		obj.parent().parent().find('#insurantName_show').text($("#insurantNameVpopWin").val());
		obj.parent().parent().find('#insurantCertNo_show').val(zjhaoma);
		obj.parent().parent().find('input[name=insurantName]').val($("#insurantNameVpopWin").val());
		obj.parent().parent().find('input[name=insurantCertType]').val($("#insurantCertTypeVpopWin").val());
		obj.parent().parent().find('input[name=insurantCertNo]').val(zjhaoma);
		obj.parent().parent().find('input[name=insurantCertBirthday]').val(birthdaydate);
		obj.parent().parent().find('input[name=insurantCertSex]').val(sexdata);
		obj.parent().parent().find('input[name=relationshipWithInsured]').val($('#relationshipWithInsuredVpopWin').val());
		$("#alertVpopWin").remove();
	})
}
//删除 被保人信息
function deleteThisRows(obj) {	
	$(obj).parent().parent().remove();
	count--;
	var edu = $('input[name=amount]').val();
	var dat = $('input[name=discountAmount]').val();
	if(dat != ''){
		$('#allAmount').html((count)*dat);
	}else{
		$('#allAmount').html((count)*edu);
	}
	$('#standardAmount').html((count)*edu);
	
}
function changerelationship(obj){
	if(obj.val() == '1'){
		$('#insurantNameVpopWin').val($('#savebeinsured input[name=applicantName]').val());
		$('#insurantCertTypeVpopWin').val($('#savebeinsured input[name=applicantCertType]').val());
		if($('#insurantCertTypeVpopWin').val() == '01'){
			$('#for-paperNoVpopWin').val($('#savebeinsured input[name=applicantCertNo]').val());
			$('#for-paperNoVpopWin').css('display','block');
			$('#for-paperNo_otherVpopWin').css('display','none');
			$('tr#birthdaybox').hide();
			$('tr#sexbox').hide();
			$('.vPopWin-inner').css('top','30%');
		}else{
			$('#for-paperNoVpopWin').css('display','none');
			$('#for-paperNo_otherVpopWin').css('display','block');
			$('tr#birthdaybox').css('display','table-row');
			$('tr#sexbox').css('display','table-row');
			$('.vPopWin-inner').css('top','20%');
			$('#for-paperNo_otherVpopWin').val($('#savebeinsured input[name=applicantCertNo]').val());
			$('#insurantCertBirthdayVpopWin').val($('#savebeinsured input[name=applicantBirthday]').val());
			$('#insurantCertSexVpopWin').val($('#savebeinsured input[name=applicantSex]').val());
			if($('#savebeinsured input[name=applicantSex]').val() == 'F'){
				$(".man").removeAttr('checked');
				$(".woman").attr("checked","checked");
			}else{
				$(".woman").removeAttr("checked");
				$(".man").attr('checked','checked');
			}
		}
		
	}/*else{
		$('#insurantNameVpopWin').val('');
		$('#insurantCertTypeVpopWin').val('01');
		$('#for-paperNoVpopWin').val('');
		$('#for-paperNo_otherVpopWin').val('');
	}*/
}

// 支付
function gotoPay(){	

	if($('#beInsuredList p').length<3){
		$('#error').text('被保险人不得少于三人');
		return false;
	}else if($('#beInsuredList p').length>50){
		$('#error').text('被保险人不得多于五十人');
		return false;
	}

	var limitedSex = $('input[name=applicantLimitedSex]').val();
	var presetSex;
	if(limitedSex == '1'){
		presetSex = 'M';
	}else if(limitedSex == '2'){
		presetSex = 'F';
	}else{
		presetSex = 'N';
	}
	var judgeSex = document.getElementsByName('insurantCertSex');
	var judgeSexLength = judgeSex.length;
	for(var i = 0;i<judgeSexLength;i++){
		if(presetSex == 'M'){
			if(judgeSex[i].value != presetSex){
				$('#error').text('第'+(i+1)+'被保人必须是男性');
				return false;
			}
		}else if(presetSex == 'F'){
			if(judgeSex[i].value != presetSex){
				$('#error').text('第'+(i+1)+'被保人必须是女性');
				return false;
			}
		}
	}

	var judgeAge = $('input[name=insurantCertBirthday]');
	var judgeAgeLength = judgeAge.length;
	for (var index = 0; index < judgeAgeLength; index++) {
		var birthday = $(judgeAge[index]).val();
		if (!valiateOtherType(birthday, '2', 'error')) {
			return false;
		}
	}

	window.sessionStorage.removeItem("applicantData");
	saveFormDataToSessionStorage();
	$("input[name=recommendCode]").val(sessionStorage.getItem('sharedUserRecommendCode'));
	$("input[name=currentUserRecommendCode]").val(sessionStorage.getItem('currentUserRecommendCode'));

	$('.loadingDiv').show();
	$('#gotopay').attr('disabled', 'disabled');
	var formObj = document.getElementById('savebeinsured');
	formObj.action="./confirmInsurance.do";
	formObj.target="_self";
	formObj.method = "post";
	formObj.submit();
}

function valiateLegality(certNo,showDiv){
	var num = certNo;
	num = num.toUpperCase();
	var showMessageDiv;
	if (showDiv) {
		showMessageDiv = $("#"+showDiv);
	} else {
		showMessageDiv = $("#vpopWinError").length ? $("#vpopWinError") : $('#error');
	}
	 //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。    
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))){  
    	showMessageDiv.text('输入的身份证号长度不对，或者号码不符合规定！\n身份证号码为15位时，应全为数字，\n身份证号码为18位时，末位可以为数字或X。'); 
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
        	showMessageDiv.text('输入的15位身份证号里出生日期不对！');    
            return false;  
        }  
    }else if (len == 18){  //当身份证号为18位时，校验出生日期和校验位。 
        var year = num.substr(6,4); 
        var nowDate = new Date(); 
        var nowYear = nowDate.getYear(); 
        if((nowYear - year) > 112){ 
        	showMessageDiv.text("依照输入的身份证出生日期截止到当前，本人已经超过112岁！"); 
            return false; 
        } 
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);  
        var arrSplit = num.match(re);  
        //检查生日日期是否正确  
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);  
        var bGoodDay;  
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));  
        if (!bGoodDay){  
        	showMessageDiv.text('输入的18位身份证号里出生日期不对！');  
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
            	showMessageDiv.text('18位身份证的最后一位校验码不正确！'); //应该为：' + valnum 
                return false;  
            }  
        }  
    }  
    //验证地区是否有效 
    var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "} 
    if(aCity[parseInt(num.substr(0,2))] == null){ 
    	showMessageDiv.text("输入的身份证号前两位地区不对！"); 
        return false; 
    } 
    return true;
}
function showInsuredlincet() {
	$('header #contaitentTitle').html('投保人声明');
	$('#cui_tbsm_container').html($('#cuiStatement').val());

	window.history.pushState({title: '#tbsm'}, '#tbsm', window.location.href + '#tbsm');
	window.onpopstate = function(e) {
		$('#cui_tbsm_container').html('');
		$('#sytkInfo').hide();
		$('#mainInfo').show();
	}

	$('#sytkInfo').show();
	$('#mainInfo').hide();
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

function miuiProvision() {
	var productCode = $('input[name=productCode]').val();
	var miuisProvision = document.createElement('iframe');
	var protocal = window.location.href.indexOf('https') === 0 ? 'https' : 'http';
	var urls = protocal + '://'+window.location.host+'/icp_core_dmz/web/'+ productCode + '.html';
	miuisProvision.setAttribute('id', 'miuisProvision');
	document.body.appendChild(miuisProvision);
	$('#miuisProvision').attr('src', urls);
	$('header #contaitentTitle').html('保险条款');

	window.history.pushState({title: '#sytk'}, '#sytk', window.location.href + '#sytk');
	window.onpopstate = function(e) {
		document.body.removeChild(document.getElementById('miuisProvision'));
		$('#sytkInfo').hide();
		$('#mainInfo').show();
	}

	$('#sytkInfo').show();
	$('#mainInfo').hide();
}
//机构告知书及偿付能力告知
function agentAndSolvencyTell(id) {
	var productCode = $('input[name=productCode]').val();
	var miuisProvision = document.createElement('iframe');
	var protocal = window.location.href.indexOf('https') === 0 ? 'https' : 'http';
	var urls = id === 1 ? protocal + '://'+window.location.host+'/icp_core_dmz/web/agentTell.html' : protocal + '://'+window.location.host+'/icp_core_dmz/web/solvencyTell.html';
	var title = id === 1 ? '保险代理机构客户告知书':'偿付能力披露';
	miuisProvision.setAttribute('id', 'miuisProvision');
	document.body.appendChild(miuisProvision);
	$('#miuisProvision').attr('src', urls);
	$('header #contaitentTitle').html(title);

	window.history.pushState({title: '#ast'}, '#ast', window.location.href + '#ast');
	window.onpopstate = function(e) {
		document.body.removeChild(document.getElementById('miuisProvision'));
		$('#sytkInfo').hide();
		$('#mainInfo').show();
	}

	$('#sytkInfo').show();
	$('#mainInfo').hide();
}

function assignmentToInput(val){
	$('#insurantCertSexVpopWin').val(val);
}
/* 投保人证件类型选择   */
var selectFlag;
function changeType_02(val, ids, obj) {
	var parent = obj.parent().parent().parent();
	if (val == '01') {
		parent.find("#for-paperNo" + ids).show();
		parent.find("#for-paperNo_other" + ids).hide();
		parent.find("#for-paperNo" + ids).removeAttr("disabled");
		parent.find("#for-paperNo_other" + ids)
				.attr("disabled", "disabled");
		selectFlag = 0;//选择身份证
		$("#alertVpopWin").find('#birthdaybox').hide();
		$("#alertVpopWin").find('#sexbox').hide();
	} else {
		parent.find("#for-paperNo" + ids).hide();
		parent.find("#for-paperNo_other" + ids).show();
		parent.find("#for-paperNo_other" + ids).removeAttr("disabled");
		parent.find("#for-paperNo" + ids).attr("disabled", "disabled");
		selectFlag = 1;
		$('.vPopWin-inner').css('top','16%')
		$("#alertVpopWin").find('#birthdaybox').css('display','table-row');
		$("#alertVpopWin").find('#sexbox').css('display','table-row');
		var birthdayControl = $('#insurantCertBirthdayVpopWin') , currentDate = new Date(new Date().getTime() + 24*60*60*1000) , curr = currentDate.getFullYear();
		var opt = {};
		opt.date = {preset : 'date'}; 
		birthdayControl.val(curr-25 + '-' + handleStr((currentDate.getMonth() + 1)) + '-' + handleStr(currentDate.getDate())).scroller('destroy').scroller($.extend(opt.date, {theme: 'default', mode: 'scroller', display: 'modal', lang: 'zh' , startYear: curr-100 , endYear: curr}));
	}
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