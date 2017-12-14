/**
 * 微信分享
 * xiongyanan
 * 2015-06-03
 */
;(function($, undefined) {

	var WechatUtil = function() {
		//分享内容及相关配置数据
		this.dataForWeixin = {
			appId: '',
			timestamp: '',
			nonceStr: '',
			signature: '',
			title: sessionStorage.getItem('title'),
			desc: sessionStorage.getItem('title'),
			imgUrl: window.location.origin + '/icp/mobileSinglePlatform/images/icon_bao45.png',
			link: sessionStorage.getItem('sharedUrl')
		};

	}

	WechatUtil.prototype.getWechatConfigData = function() {
		var _this = this;
		if (window.tools.isWechat()) {
			if (!window.tools.isInclude('jweixin-1.0.0.js')) {
				$.getScript('https://res.wx.qq.com/open/js/jweixin-1.0.0.js', getWXConfigDataFromInterface(_this));
			} else {
				getWXConfigDataFromInterface(_this);
			}
		}
	}

	/**
	* 微信分享的配置及相关api
	*/
	WechatUtil.prototype.configWechat = function() {
		var _this = this;
		wx.config({
			debug: false,									//false表示关闭调试模式，true表示打开
			appId: _this.dataForWeixin.appId,				//公众号的appid
			timestamp: _this.dataForWeixin.timestamp,		//时间戳
			nonceStr: _this.dataForWeixin.nonceStr,			//随机串
			signature: _this.dataForWeixin.signature,		//签名
			jsApiList: [ 'checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ' ]	//待调用的api
		});

		wx.ready(function() {
			//检测api的版本
			wx.checkJsApi({
				jsApiList : ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ' ],
				fail: function(res) {
					console.log("微信版本过低，请升级到新版本！");
				}
			});

			wx.onMenuShareTimeline({
				title : _this.dataForWeixin.desc,
				link : _this.dataForWeixin.link,
				imgUrl : _this.dataForWeixin.imgUrl,
				success: function (res) {
			        console.log("分享到朋友圈成功！");
			    },
				fail: function(res) {
					console.log("分享到朋友圈失败！");
				}
			});

			wx.onMenuShareAppMessage({
				title: _this.dataForWeixin.title,
				desc: _this.dataForWeixin.desc,
				link: _this.dataForWeixin.link,
				imgUrl: _this.dataForWeixin.imgUrl,
				success: function (res) {
			        console.log("分享到微信好友成功！");
			    },
				fail: function(res) {
					console.log("分享到微信好友失败！");
				}
			});

		    wx.onMenuShareQQ({
		        title: _this.dataForWeixin.title,
		        desc: _this.dataForWeixin.desc,
		        link: _this.dataForWeixin.link,
		        imgUrl: _this.dataForWeixin.imgUrl,
				success: function (res) {
			        console.log("分享到QQ好友成功！");
			    },
				fail: function(res) {
					console.log("分享到QQ好友失败！");
				}
		     });
		});

		wx.error(function(res) {
			console.log(res.errMsg);
		});
	}

	function getWXConfigDataFromInterface(_this) {
		var url = window.location.href.split('#')[0];
		$.ajax({
			url: window.location.origin + '/icp/mobile_single_insurance/wechatShare.do',
			data: {url: url},
			type: 'get',
			datatype: 'json',
			cache: false,
			async: false,
			success: function(response) {
				var data = JSON.parse(response);
				if (data) {
					// _this.dataForWeixin.title = data.title;
					// _this.dataForWeixin.desc = data.desc;
					// _this.dataForWeixin.link += (sessionStorage.getItem('currentUserRecommendCode') ? ('&recommendCode=' + sessionStorage.getItem('currentUserRecommendCode')) : '');
					_this.dataForWeixin.appId = data.appId;
					_this.dataForWeixin.timestamp = data.timestamp;
					_this.dataForWeixin.nonceStr = data.noncestr;
					_this.dataForWeixin.signature = data.signature;

					_this.configWechat();
				}
			},
			error: function(err) {
				console.log('获取自定义分享内容失败！');
			}
		});
	}

	var wechatUtil = new WechatUtil();
	wechatUtil.getWechatConfigData();

})(jQuery);





