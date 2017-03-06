import {Md5Singer} from "../../utils/Md5Singer";
import {NetworkSerivceName, AclConstants} from "./../../models/AclConstants";
import {SmsVerifyCodeType} from "../../models/SmsVerifyCodeType";
import {VerifyCodeReqBody} from "./../../dto/request/body/VerifyCodeReqBody";
import {AclBaseHeader} from "./../../dto/AclBaseHeader";
import {VerifyCodeRequest} from "./../../dto/request/VerifyCodeRequest";
import {NetworkService} from "./../../services/NetworkService";
import "./forgetpwd.component.scss";
import {SmsUserRole} from "../../models/SmsUserRole";
import {SmsCheckCodeType} from "../../models/SmsCheckCodeType";
import {RespCode} from "../../models/RespCode";
import {ForgetpwdRequest} from "../../dto/request/ForgetpwdRequest";
import {ForgetpwdReqBody} from "../../dto/request/body/ForgetpwdReqBody";
import {ForgetpwdResponse} from "../../dto/response/ForgetpwdResponse";
import {ForgetPwdParamSIGN} from "../../dto/sign/ForgetPwdParamSIGN";
import {ForgetPwdDTOSIGN} from "../../dto/sign/ForgetPwdDTOSIGN";
import {VerifycodeParamSIGN} from "../../dto/signnot/VerifycodeParamSIGN";
import {VerifyCodeResponse} from "../../dto/response/VerifyCodeResponse";
import {VerifycodeDTOSIGN} from "../../dto/signnot/VerifycodeDTOSIGN";
import {AclToast} from "../../services/AclToast";
import {Timedown} from "../../services/Timedown";
import {ObjectSorter} from "../../utils/ObjectSorter";


class ForgetpwdComponent implements angular.IComponentOptions {

  icon_pwd_eyes: string = null;
  icon_pwd_openEyes: boolean = false;
  icon_pwd_type: string = "password";
  palceholder: string = "请输入您的手机号";

  isAgreementChecked = false;

  userMobno: string;    //手机号
  userPwd: string;     //输入密码
  verifyCode: string;  //验证码

  instance: ForgetpwdComponent;
  isFinishTimedown: boolean = true;
  VerfifyCodeTextDefault: string = "获取验证码";
  verifyCodeText: string;

  constructor(private netReq: NetworkService,
              private $ionicPopup: ionic.popup.IonicPopupService,
              private $ionicLoading: ionic.loading.IonicLoadingService) {
    console.log("创建component");
    this.icon_pwd_eyes = "./../imgs/register/denglu_eye_close.png";
    this.verifyCodeText = this.VerfifyCodeTextDefault;
  }

  controllerAs = 'vm';
  controller = ForgetpwdComponent;
  templateUrl = function () {
    return "./../components/forgetpwd/forgetpwd.component.html";
  }


  //默认密码设置
  toggleEyes(): void {
    //此处是写页面的js  在这个里面
    this.icon_pwd_openEyes = !this.icon_pwd_openEyes;
    if (this.icon_pwd_openEyes) {
      this.icon_pwd_type = "text";
      this.icon_pwd_eyes = "./../imgs/register/denglu_eye_open.png";
    } else {
      this.icon_pwd_type = "password";
      this.icon_pwd_eyes = "./../imgs/register/denglu_eye_close.png";
    }
  }


  //发送验证码g
  getVerifyCode(): void {

    if (!this.isFinishTimedown) {
      return;
    }

    var ctrl = this;
    if (this.userMobno == null || this.userMobno.length == 0) {
      AclToast.toast("请填写手机号", AclToast.TOAST_SHORT, ctrl.$ionicLoading);
      return;
    }
    var result = new VerifyCodeReqBody();
    result.mobileNo = this.userMobno;
    result.type = SmsVerifyCodeType.TYPE_SMS;
    result.userRole = SmsUserRole.ROLE_BORROWER
    result.checkCodeType = SmsCheckCodeType.FIND_PWD;

    var signParam = new VerifycodeParamSIGN();
    signParam.mobileNo = result.mobileNo;
    signParam.type = result.type;
    signParam.userRole = result.userRole;
    signParam.checkCodeType = result.checkCodeType;

    var req = new VerifyCodeRequest();
    var header = new AclBaseHeader();
    header.sign = Md5Singer.sign(ObjectSorter.getSortedString(signParam), Md5Singer.SignKey);
    header.token = "virtual-token";
    req.header = header;
    req.result = result;

    var respHeader = new AclBaseHeader();

    this.timedown();
    this.netReq.postVerifyCode(req, respHeader, {
      onSuccess(json: any) {

        var resp: VerifyCodeResponse = json;
        if (resp != null && RespCode.SUCCESS === resp.respCode) {

          var signDto = new VerifycodeDTOSIGN();
          signDto.verifyCode = resp.result.verifyCode;
          signDto.orderId = resp.result.orderId;
          signDto.orderDate = resp.result.orderDate;
          signDto.mobileNo = resp.result.mobileNo;
          signDto.type = resp.result.type;
          signDto.userRole = resp.result.userRole;
          signDto.checkCodeType = resp.result.checkCodeType;

          var signStr = Md5Singer.sign(ObjectSorter.getSortedString(signDto), Md5Singer.SignKey);
          if (AclConstants.HAS_SIGN_FEATURE&&(signStr == null || signStr != respHeader.sign)) {
            return;
          }

          AclToast.toast("短信验证码发送完成", AclToast.TOAST_SHORT, ctrl.$ionicLoading);
        } else {
          AclToast.toast(resp.respMsg, AclToast.TOAST_SHORT, ctrl.$ionicLoading);
        }

      },
      onFailure(e: any) {
        AclToast.toast("短信验证码发送失败", AclToast.TOAST_SHORT, ctrl.$ionicLoading);
      }
    });
  }

  // 1.114

  //提交信息
  commitInfo(): void {
    var ctrl = this;

    var result = new ForgetpwdReqBody();
    result.userRole = SmsUserRole.ROLE_BORROWER;  //角色
    result.userMobile = this.userMobno;     //手机号
    result.checkCode = this.verifyCode;     //验证码
    result.newPwd = Md5Singer.sign(this.userPwd, Md5Singer.SignKey);

    var signParam = new ForgetPwdParamSIGN();
    signParam.checkCode = result.checkCode;
    signParam.newPwd = result.newPwd;
    signParam.userMobile = result.userMobile;
    signParam.userRole = result.userRole;


    var req = new ForgetpwdRequest();
    var header = new AclBaseHeader();
    header.sign = Md5Singer.sign(ObjectSorter.getSortedString(signParam), Md5Singer.SignKey);
    header.token = "virtual-token";
    req.header = header;
    req.result = result;
    var respHeader = new AclBaseHeader();
    ctrl.$ionicLoading.show(AclConstants.LoadingOptions);

    this.timedown();
    this.netReq.postForgetpwd(req, respHeader, {
      onSuccess(json: any) {
        ctrl.$ionicLoading.hide();

        console.log("----success#" + angular.toJson(json));
        var resp: ForgetpwdResponse = json;
        if (resp != null && RespCode.SUCCESS === resp.respCode) {

          var signDto = new ForgetPwdDTOSIGN();
          signDto.statusCode = resp.result.statusCode;
          signDto.returnMsg = resp.result.returnMsg;

          var signStr = Md5Singer.sign(ObjectSorter.getSortedString(signDto), Md5Singer.SignKey);
          if (AclConstants.HAS_SIGN_FEATURE&&(signStr == null || signStr != respHeader.sign)) {
            return;
          }
          AclToast.toast("修改密码完成", AclToast.TOAST_SHORT, ctrl.$ionicLoading);

        } else {
          AclToast.toast(resp.respMsg, AclToast.TOAST_SHORT, ctrl.$ionicLoading);

        }


      },
      onFailure(e: any) {
        console.log("----failure#" + angular.toJson(e));
        ctrl.$ionicLoading.hide();
        AclToast.toast("修改密码失败", AclToast.TOAST_SHORT, ctrl.$ionicLoading);
      }
    });
  }

  getCheckboxIcon(): string {
    if (this.isAgreementChecked) {
      return "./../imgs/commons/ic_agree.png";
    } else {
      return "./../imgs/commons/ic_disagree.png";
    }
  }

  toggleCheckbox(): void {
    this.isAgreementChecked = !this.isAgreementChecked;
  }

  timedown() {
    if (!this.isFinishTimedown) {
      return;
    }
    this.isFinishTimedown = false;
    var thizz = this;
    var elem = document.getElementById("ButtonVerify_Forgetpwd");
    var td: Timedown = new Timedown(60, 1000, {
      onInterval(isFinished: boolean, times: number): void {

        thizz.isFinishTimedown = isFinished;
        if (isFinished) {
          thizz.verifyCodeText = thizz.VerfifyCodeTextDefault;
        } else {
          thizz.verifyCodeText = times + "s倒计时";
        }
        elem.innerText = thizz.verifyCodeText;
        elem.textContent = thizz.verifyCodeText;
        console.log(thizz.verifyCodeText);
      }
    });
    td.start();
  }


}

ForgetpwdComponent.$inject = [NetworkSerivceName, "$ionicPopup", "$ionicLoading"];


export {ForgetpwdComponent};

