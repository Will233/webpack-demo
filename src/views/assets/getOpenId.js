/**
 * xiongyanan211
 * 2016-06-04
 * 获取openId，实际为获取推荐码，推荐码与openId是一一对应关系，用于分享发红包
 */
;(function($, undefined) {
	var sharedUserRecommendCode = window.tools.getUrlParam('recommendCode') || sessionStorage.getItem('sharedUserRecommendCode') || '';
	sessionStorage.setItem('sharedUserRecommendCode', sharedUserRecommendCode);
	if (window.tools.isWechat()) {
		var currentUserRecommendCode = sessionStorage.getItem('currentUserRecommendCode');
		if (!currentUserRecommendCode) {
			var code = window.tools.getUrlParam('code');

			if (code) {
				$.ajax({
					url: window.location.origin + '/icp/mobile_single_insurance/getWechatOpenId.do',
					type: 'post',
					data: {code: code},
					datatype: 'json',
					cache: false,
					async: false,
					success: function(response) {
						var result = JSON.parse(response || '{}');
						if (result && result.resultCode == '00') {
							currentUserRecommendCode = result.recommendCode || '';
							sessionStorage.setItem('currentUserRecommendCode', currentUserRecommendCode);
							sessionStorage.setItem('title', $('header div.contaitenttitle').text());
							var recommendCode = sharedUserRecommendCode || currentUserRecommendCode;
							var sharedUrl = window.location.href.split('&code')[0].split('&state')[0].split('&recommendCode')[0]
																.split('code')[0].split('state')[0].split('recommendCode')[0];
							sharedUrl += (sharedUrl.indexOf('?') > 0 ? ('&recommendCode=' + recommendCode) : ('?recommendCode=' + currentUserRecommendCode));
							sessionStorage.setItem('sharedUrl',
								window.location.origin + '/icp/mobile_single_insurance/getWechatOpenId.do' + '?url=' + encodeURIComponent(sharedUrl));

							//既有分享者的推荐码，又有当前点击用户的推荐码表明是从分享链接进入的
							if (sharedUserRecommendCode && currentUserRecommendCode 
								&& sharedUserRecommendCode != currentUserRecommendCode ) {
								var data = {
									recomCode: sharedUserRecommendCode,	//分享者的推荐码
									extendedUser: currentUserRecommendCode,	//浏览页面用户的推荐码
									plansId: (window.tools && window.tools.getUrlParam('plansId')) || 'D80', //页面编码 , 用于标识不同的页面
									account: (window.tools && window.tools.getUrlParam('account')) || 'ICP'	  //账号
								}
								$.ajax({
									url: window.location.origin + '/icp/wxtc/browse.do',
									type: 'post',
									data: data,
									cache: false,
									success: function(response) {
										console.log('record openId info success!');
										console.log('result: ' + response);
									},
									error: function(XMLHttpRequest, textStatus, errorThrown) {
										console.log('status: ' + XMLHttpRequest.status);
										console.log('readyState: ' + XMLHttpRequest.readyState);
										console.log('textStatus: ' + textStatus);
									}
								});
							}
						}
					},
					error: function() {
						console.log('获取openId失败');
						sessionStorage.setItem('title', $('header div.contaitenttitle').text());
						sessionStorage.setItem('sharedUrl', window.location.href);
					}
				});
			} else {
				sessionStorage.setItem('title', $('header div.contaitenttitle').text());
				sessionStorage.setItem('sharedUrl', window.location.href);
			}
		}
	}
})(jQuery);