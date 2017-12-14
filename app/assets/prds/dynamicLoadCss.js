;(function($, undefined) {
	/**
	 * 获取地址栏参数
	 */
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

	/**
	 * 将css文件插入head标签
	 */
	function loadCss(cssFile) {
		var cssTag = document.getElementById('loadCss');
		var head = document.getElementsByTagName('head').item(0);
		if (cssTag) {
			head.removeChild(cssTag);
		}
		var css = document.createElement('link');
		css.href = cssFile;
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.id = 'loadCss';
		head.appendChild(css);
	}

	if (sessionStorage.getItem('cssFile')) {
		loadCss(sessionStorage.getItem('cssFile'));
	} else {
		//通过调用后台接口获取css文件的url
		var url = '../mobile_single_insurance/queryCssInfo.do';
		var account = getUrlParam('account');
		// var plansId = getUrlParam('plansId');
		var productCode = getUrlParam('productCode');
		var data = {
			'account': account ? account : ($('input[name=account]').val() || ''),
			// 'plansId': plansId ? plansId : '',
			'productCode': productCode ? productCode : ($('input[name=productCode]').val() || '')
		};

		$.ajax({
		    type: 'post',
	        dataType: 'json',
	        url: url,
	        data: data,
	        success: function(response) {
	        	if (response && response.resultCode == '0' && response.cssFile) {
	        		var cssFile = response.cssFile;
	        		sessionStorage.setItem('cssFile', cssFile);
					loadCss(cssFile);
	        	} else {
	        		window.console.log('获取到的数据有问题: ' + JSON.stringify(response));
	        	}
	        },
	        error: function() {
	        	window.console.log('系统异常，稍候重试！');
		    }
	    });
	}
})(jQuery);