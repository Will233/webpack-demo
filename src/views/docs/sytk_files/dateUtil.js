;(function($, undefined) {
	var DateUtil = function() {

	}

	DateUtil.prototype.addSeconds = function(date, nextSeconds) {
		if (!(date instanceof Date) || typeof nextSeconds !== 'number') {
			throw new Error('参数错误');
		}
		var _date = new Date(date);
		return new Date(_date.setSeconds(_date.getSeconds() + nextSeconds));
	}

	DateUtil.prototype.addMinutes = function(date, nextMinutes) {
		if (!(date instanceof Date) || typeof nextMinutes !== 'number') {
			throw new Error('参数错误');
		}
		var _date = new Date(date);
		return new Date(_date.setMinutes(_date.getMinutes() + nextMinutes));
	}

	DateUtil.prototype.addHours = function(date, nextHours) {
		if (!(date instanceof Date) || typeof nextHours !== 'number') {
			throw new Error('参数错误');
		}
		var _date = new Date(date);
		return new Date(_date.setHours(_date.getHours() + nextHours));
	}

	DateUtil.prototype.addDays = function(date, nextDays) {
		if (!(date instanceof Date) || typeof nextDays !== 'number') {
			throw new Error('参数错误');
		}
		var _date = new Date(date);
		return new Date(_date.setDate(_date.getDate() + nextDays));
	}

	DateUtil.prototype.addMonths = function(date, nextMonths) {
		if (!(date instanceof Date) || typeof nextMonths !== 'number') {
			throw new Error('参数错误');
		}
		var _date = new Date(date);
		return new Date(_date.setMonth(_date.getMonth() + nextMonths));
	}

	DateUtil.prototype.addYears = function(date, nextYears) {
		if (!(date instanceof Date) || typeof nextYears !== 'number') {
			throw new Error('参数错误');
		}
		var _date = new Date(date);
		return new Date(_date.setFullYear(_date.getFullYear() + nextYears));
	}

	DateUtil.prototype.format = function(date) {
		if (!(date instanceof Date)) {
			throw new Error('参数错误');
		}
		var _date = new Date(date);
		return  _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + _date.getDate() + " " + _date.getHours() + ":" + _date.getMinutes() + ":" + _date.getSeconds();
	}

	DateUtil.prototype.dateCompare = function(date1, date2) {
		if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
			throw new Error('参数错误');
		}
		return date1 > date2;
	}

	window.DateUtil = new DateUtil();

})(jQuery);