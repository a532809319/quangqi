'use strict';
module.exports = function () {
  this.modules = moduleList;
};

var moduleList = {
  ModuleHello: ['./src/modules/hello/hello.module.ts'],

  //todo: 在这儿添加,名称和取值格式要求,要求大小写和取值 (模块名称:['模块路径']) 和所给出的一致
  //Add ... here!
 ModuleRegister: ['./src/modules/register/register.module.ts'], //注册
  ModuleRevisedrate: ['./src/modules/revisedrate/revisedrate.module.ts'], //费率计算
  ModuleForgetPassword: ['./src/modules/forgetpwd/forgetpwd.module.ts'], //忘记密码
  ModuleCommonQuestion: ['./src/modules/commonquestion/commonquestion.module.ts'], //常见问题
  ModulecLinkUs: ['./src/modules/linkus/linkus.module.ts'], //联系客服
  ModulecProductIntroduce: ['./src/modules/productintroduce/productintroduce.module.ts'], //产品介绍
  ModulecOperatorPwd: ['./src/modules/operatorpwd/operatorpwd.module.ts'], //忘记运营商密码步骤
  ModuleSlider: ['./src/modules/slider/slider.module.ts'], //slider
  ModulecRealnameauthentication: ['./src/modules/realnameauthentication/realnameauthentication.module.ts'], //忘记运营商密码步骤
  ModuleLogin: ['./src/modules/login/login.module.ts'], //登录
  Modulethousandloan: ['./src/modules/thousandloan/thousandloan.module.ts'], //千元贷
  ModuleAppUpgrade: ['./src/modules/appupgrade/appupgrade.module.ts'], //应用更新
  Moduledownload: ['./src/modules/download/download.module.ts'], //下载页
  Moduleloanagreement: ['./src/modules/loanagreement/loanagreement.module.ts'], //借款协议

  ModuleBind: ['./src/modules/bind/bind.module.ts'],
  ModuleAdd: ['./src/modules/add/add.module.ts']

}
