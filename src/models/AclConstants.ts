export const NetworkSerivceName = "NetworkSerivce";
export class AclConstants {
  static IS_DEBUG_MODE = true;                   //调试模式
  static IS_NATIVE = false;                      //是否为Native版本的
  static HAS_SIGN_FEATURE=true;                  //是否需要签名

  static app_name: string = "小贷客户端";
  static TEST_HOST: string = "http://192.168.2.221";//test
  // static TEST_HOST: string = "http://192.168.2.199:8081/";//PC
  static OFFICE_HOST: string = "http://122.144.182.8:80";//office
  static HOST: string = AclConstants.IS_DEBUG_MODE ? AclConstants.TEST_HOST : AclConstants.OFFICE_HOST;

  static LoadingOptions: ionic.loading.IonicLoadingOptions = {
    template: "请稍候",
    noBackdrop: true,
    hideOnStateChange: true
  };

  static NATIVE_REGISTER_SALESID = "00000000001";
}
