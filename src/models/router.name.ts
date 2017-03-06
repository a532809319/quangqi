export class RouterName {
  public static newUrl(name: string) {
    return "/" + name;
  }

  static helloPage = "helloPage";    //此处以模块划分 eg:register模块 套路
  static addPage = "addPage";    //此处以模块划分 eg:register模块 套路
  static registerPage = "registerPage";   //注册
  static forgetpwdPage = 'forgetpwdPage';   //忘记密码
  static revisedratePage = "revisedratePage";     //费率计算
  static commonQuestionPage = "commonQuestionPage";// 常见问题
  static linkusPage = "linkusPage";// 客服
  static productIntroducePage = "productIntroducePage";// 产品介绍
  static operatorPwdPage = "operatorPwdPage";// 忘记密码操作步骤
  static realnameauthenticationPage = "realnameauthenticationPage";//实名认证
  static loginPage = "loginPage";//登录
  static bindPage = "bindPage";//绑定
  static slidemainPage = "slidemainPage";   //首页滑动
  static thousandloanPage = "thousandloanPage";   //千元贷

  static downloadPage = "downloadPage";//下载页
  static appUpgradePage = "appUpgradePage";//应用升级
  static loanagreementPage = "loanagreementPage";//借款协议

}
