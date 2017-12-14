import './assets/style.css';
import './assets/index.css';
// import './assets/files/manifest.js';
// import './assets/files/vendor.js';
// import './assets/files/app.js';
import './assets/files/app.css';
const jquery = require('jquery');

(function($) {

    // tab点击事件
    function activeIntroBarItem(code) {
        let introContent = document.getElementById('_intro_content');
        let content = '';
        if (code === 0) {
            content = '<p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px; color: rgb(0, 0, 0);">保障企业在职员工的包含工伤、猝死、交通意外在内的一般意外，为企业减负；提供24小时电话医疗咨询及住院费用垫付服务，请拨打热线电话4006506119；3人以上即可投保，团体投保价格更优惠。</span></p>';
        } else if (code == 1) {
            content = '<p><span style="font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(0, 0, 0);">意外伤害身故和残疾--10-50万</span></p><p><span style="font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(0, 0, 0);">汽车意外伤害身故和残疾--10-30万</span></p><p><span style="font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(0, 0, 0);">意外住院和门急诊--1-5万</span></p><p><span style="font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(0, 0, 0);"><br></span></p><p><span style="font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(0, 0, 0);">适用客户：</span></p><p><span style="font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(0, 0, 0);">农、林、牧、渔业；制造业；仓储和邮政业；信息传输、计算机服务和软件业；批发和零售业；住宿和餐饮业；金融业；房地产业；租赁和商务服务业；科学研究、技术服务和地质勘查业；水利、环境和公共设施管理业；居民服务和其他服务业；教育；卫生、社会保障和社会福利业；文化、体育和娱乐业；公共管理、社会组织和通讯行业中的1-4类职业人员</span></p><p><br></p>';
        } else if (code === 2) {
            content = '<p><span style="font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(0, 0, 0);">1、拨打95511电话报案。</span></p><p><span style="font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(0, 0, 0);">2、配合理赔查勘、准备相关材料、证明（查勘人员告知）</span></p><p><span style="font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(0, 0, 0);">3、带齐全部理赔材料去平安门店办理理赔</span></p><p><span style="font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(0, 0, 0);">4、确属保险责任范围，在赔付协议达成后10天赔付。</span></p><p><br></p>';
        }
        // 渲染
        introContent.innerHTML = content;
    }
    // 跳转到购买地址
    function gotoInsurance () {
      console.log('go ...');
      window.location.href = '#'
    }

    function bindEvents() {
      // 绑定tab点击事件
      $('.bar-item').each(function (index, item) {
        $(item).click(function (e) {
          activeIntroBarItem(index);
          $(this).addClass('active').siblings().removeClass('active')
        });
      });
      $('#_buy_btn').click(function (){
        gotoInsurance();
      });
    }
    window.onload = function() {
        bindEvents();

    }
})(jquery);