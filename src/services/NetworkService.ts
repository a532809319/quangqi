
import {AclConstants} from './../models/AclConstants';
import {BorrowerRegisterRequest} from './../dto/request/BorrowerRegisterRequest';
import {NetworkCallback} from './NetworkCallback';
import {AclBaseHeader} from './../dto/AclBaseHeader';
import {VerifyCodeRequest} from './../dto/request/VerifyCodeRequest';
import {LoginRequest} from './../dto/request/LoginRequest';
import {ForgetpwdRequest} from "../dto/request/ForgetpwdRequest";
import {PersonainforRequest} from "../dto/request/PersonainforRequest";


export class NetworkService {
  private static KEY_TOKEN: string = "token";
  private static KEY_SIGN: string = "sign";

  constructor(private $http: angular.IHttpService) {

  }

  private getHttpConfiguration(urlPath: string, reqHeader: AclBaseHeader): angular.IRequestConfig {
    var config: angular.IRequestConfig = {
      cache:false,
      method: 'jsonp',
      url: urlPath + "?callback=JSON_CALLBACK",
      headers: {}
    };
    if (reqHeader != null) {
      if (reqHeader.token != null) {
        config.headers[NetworkService.KEY_TOKEN] = reqHeader.token;
      }
      if (reqHeader.sign != null) {
        config.headers[NetworkService.KEY_SIGN] = reqHeader.sign;
      }
    }
    return config;
  }

  private postHttpConfiguration(urlPath: string, reqHeader: AclBaseHeader): angular.IRequestConfig {
    var config: angular.IRequestConfig = {
      cache:false,
      method: "post",
      url: urlPath,
      headers: {
        "Access-Control-Allow-Origin":"*"
      }
    };
    if (reqHeader != null) {
      if (reqHeader.token != null) {
        config.headers[NetworkService.KEY_TOKEN] = reqHeader.token;
      }
      if (reqHeader.sign != null) {
        config.headers[NetworkService.KEY_SIGN] = reqHeader.sign;
      }
    }

    return config;
  }


  post(url: string, data: any, respHeader:AclBaseHeader,config: angular.IRequestShortcutConfig, callback: NetworkCallback): void {
    /**
     * Shortcut method to perform PATCH request.
     *
     * @param url Relative or absolute URL specifying the destination of the request
     * @param data Request content
     * @param config Optional configuration object
     */

    this.$http.post(url, data, config)
      .success(function (data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) {
        let response=headers();
       // console.log("response---"+angular.toJson(response));
         if(respHeader!=null){
           respHeader.sign=response==null?null:response[NetworkService.KEY_SIGN];
           respHeader.token=response==null?null:response[NetworkService.KEY_TOKEN];
         }
        if (callback != null) {
          callback.onSuccess(data);
        }
      }).error(function (e) {
      if (callback != null) {
        callback.onFailure(e);
      }
    });
  }

  //发送手机校验码
  postVerifyCode(req: VerifyCodeRequest, respHeader: AclBaseHeader, callback: NetworkCallback): void {
    var url = AclConstants.HOST + "/send_verify_code";
    var data = angular.toJson(req.result);
    var config: angular.IRequestShortcutConfig = this.postHttpConfiguration(url, req.header);
    config.data = data;

    this.post(url, data, respHeader,config, callback);
  }

  //借款人注册
  postBorrowerRegister(req: BorrowerRegisterRequest, respHeader: AclBaseHeader, callback: NetworkCallback): void {
    var url = AclConstants.HOST + "/borrower_sign";
    var data = angular.toJson(req.result);
    var config: angular.IRequestShortcutConfig = this.postHttpConfiguration(url, req.header);
    config.data = data;
    this.post(url, data, respHeader,config, callback);

  }
  //登录
  postMe(req:LoginRequest,respHeader:AclBaseHeader,callback:NetworkCallback):void{
    var url = AclConstants.HOST + "/borrower_login";
    var data = angular.toJson(req.result);
    var config: angular.IRequestShortcutConfig = this.postHttpConfiguration(url, req.header);
    config.data = data;
    this.post(url, data,respHeader, config, callback);
  }
  //忘记密码
  postForgetpwd(req:ForgetpwdRequest,respHeader:AclBaseHeader,callback:NetworkCallback):void{
    var url = AclConstants.HOST + "/forget_pwd";  //此处地方是地址
    var data = angular.toJson(req.result);
    var config: angular.IRequestShortcutConfig = this.postHttpConfiguration(url, req.header);
    config.data = data;
    this.post(url, data, respHeader,config, callback);
  }
  //个人资料
  postPersonalInfor(req:PersonainforRequest,respHeader:AclBaseHeader,callback:NetworkCallback):void{
    var url = AclConstants.HOST + "/user_info_query";  //此处地方是地址
    var data = angular.toJson(req.result);
    var config: angular.IRequestShortcutConfig = this.postHttpConfiguration(url, req.header);
    config.data = data;
    this.post(url, data, respHeader,config, callback);
  }

}

NetworkService.$inject = ["$http"];
