import {RespCode} from "./../../models/RespCode";
import {UrlParser} from "./../../utils/UrlParser";
import {Timedown} from "./../../services/Timedown";
import {BorrowerRegisterReqBody} from "./../../dto/request/body/BorrowerRegisterReqBody";
import {BorrowerRegisterRequest} from "./../../dto/request/BorrowerRegisterRequest";
import {Md5Singer} from "../../utils/Md5Singer";
import {NetworkSerivceName, AclConstants} from "./../../models/AclConstants";
import {SmsVerifyCodeType} from "../../models/SmsVerifyCodeType";
import {VerifyCodeReqBody} from "./../../dto/request/body/VerifyCodeReqBody";
import {AclBaseHeader} from "./../../dto/AclBaseHeader";
import {VerifyCodeRequest} from "./../../dto/request/VerifyCodeRequest";
import {NetworkService} from "./../../services/NetworkService";
import "./register.component.scss";
import {SmsUserRole} from "../../models/SmsUserRole";
import {SmsCheckCodeType} from "../../models/SmsCheckCodeType";
import {BorrowerSignResponse} from "../../dto/response/BorrowerSignResponse";
import {CmdNativeSender} from "../../native/CmdNativeSender";
import {CmdId} from "../../native/CmdId";
import {AclToast} from "../../services/AclToast";
import {VerifycodeParamSIGN} from "../../dto/signnot/VerifycodeParamSIGN";
import {VerifyCodeResponse} from "../../dto/response/VerifyCodeResponse";
import {VerifycodeDTOSIGN} from "../../dto/signnot/VerifycodeDTOSIGN";
import {registerParamSIGN} from "../../dto/signregister/registerParamSIGN";
import {registerDTOSIGN} from "../../dto/signregister/registerDTOSIGN";
import {ObjectSorter} from "../../utils/ObjectSorter";

class RegisterComponent implements angular.IComponentOptions {

  icon_pwd_eyes: string = null;
  icon_pwd_openEyes: boolean = false;
  icon_pwd_type: string = "password";
  palceholder: string = "请输入您的手机号";

  isAgreementChecked = false;

  userMobno: string;    //手机号
  userPwd: string;     //输入密码
  verifyCode: string;  //验证码

  instance: RegisterComponent;
  isFinishTimedown: boolean = true;
  VerfifyCodeTextDefault: string = "获取验证码";
  verifyCodeText: string;
  salesId: string = AclConstants.NATIVE_REGISTER_SALESID;

  constructor(private netReq: NetworkService, private $ionicPopup: ionic.popup.IonicPopupService, private $ionicLoading: ionic.loading.IonicLoadingService) {
    // console.log("创建component");
    this.icon_pwd_eyes = "./../imgs/register/denglu_eye_close.png";
    this.verifyCodeText = this.VerfifyCodeTextDefault;

    this.parseLocation();

  }

  controllerAs = 'vm';
  controller = RegisterComponent;
  templateUrl = function () {
    return "./../components/register/register.component.html";
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


  //发送验证码
  getVerifyCode(): void {
    if (!this.isFinishTimedown) {
      return;
    }
    var ctrl = this;
    if (this.userMobno == null || this.userMobno.length == 0) {
      AclToast.toast("请填写手机号", AclToast.TOAST_SHORT, ctrl.$ionicLoading);
      return;
    }
    //发送验证码
    var result = new VerifyCodeReqBody();
    result.mobileNo = this.userMobno;
    result.type = SmsVerifyCodeType.TYPE_SMS;
    result.userRole = SmsUserRole.ROLE_BORROWER
    result.checkCodeType = SmsCheckCodeType.SIGN;

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
          if (AclConstants.HAS_SIGN_FEATURE && (signStr == null || signStr != respHeader.sign)) {
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

  //提交注册信息
  commitInfo(): void {

    var ctrl = this;
    if (!this.isAgreementChecked) {
      AclToast.toast("请同意相关协议", AclToast.TOAST_SHORT, ctrl.$ionicLoading);
      return;
    }


    var result = new BorrowerRegisterReqBody();
    result.loginId = this.userMobno;
    result.verifyCode = this.verifyCode;
    result.userPasswd = Md5Singer.sign(this.userPwd, Md5Singer.SignKey);
    result.salesId = this.salesId;

    var signParam = new registerParamSIGN();
    signParam.loginId = result.loginId;
    signParam.salesId = result.salesId;
    signParam.userPasswd = result.userPasswd;
    signParam.verifyCode = result.verifyCode;

    var req = new BorrowerRegisterRequest();
    var header = new AclBaseHeader();
    header.sign = Md5Singer.sign(ObjectSorter.getSortedString(signParam), Md5Singer.SignKey);
    header.token = "virtual-token";
    req.header = header;
    req.result = result;

    var respHeader = new AclBaseHeader();
    ctrl.$ionicLoading.show(AclConstants.LoadingOptions);

    this.netReq.postBorrowerRegister(req, respHeader, {
      onSuccess(json: any) {
        ctrl.$ionicLoading.hide();
        console.log("----success#" + angular.toJson(json));
        var resp: BorrowerSignResponse = json;
        if (resp != null && RespCode.USER_EXISTS == resp.respCode) {
          if (!AclConstants.IS_NATIVE) {
            window.location.href = "appupgrade.html";
            return;
          }
        }
        if (resp != null && RespCode.SUCCESS === resp.respCode) {

          var signDto = new registerDTOSIGN();
          signDto.userId = resp.result.userId;

          var signStr = Md5Singer.sign(ObjectSorter.getSortedString(signDto), Md5Singer.SignKey);
          if (AclConstants.HAS_SIGN_FEATURE && (signStr == null || signStr != respHeader.sign)) {
            return;
          }

          if (AclConstants.IS_NATIVE) {
            CmdNativeSender.sendCmd(CmdId.id_0_register, resp);
          } else {
            window.location.href = "appupgrade.html";
          }

        } else {
          AclToast.toast(resp.respMsg, AclToast.TOAST_SHORT, ctrl.$ionicLoading);

        }
      },
      onFailure(e: any) {
        console.log("----failure#" + angular.toJson(e));
        ctrl.$ionicLoading.hide();
        AclToast.toast("注册处理失败", AclToast.TOAST_SHORT, ctrl.$ionicLoading);
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
    var elem = document.getElementById("ButtonVerify_Register");
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

  parseLocation() {
    var result: string = UrlParser.GetQueryString("salesId");
    if (result != null && result.length > 0) {
      this.salesId = result;
    }
    if (AclConstants.IS_NATIVE) {
      this.salesId = AclConstants.NATIVE_REGISTER_SALESID;
    }

  }

  showRegisterAgreementDialog() {

    var alertOptions: ionic.popup.IonicPopupAlertOptions = {
      okText: "我知道了",
      templateUrl: "./../components/register/register.agreement.html",
      title: "借财童子用户协议",
      cssClass: "popwidth"
    };
    this.$ionicPopup.alert(alertOptions);


  }
}

RegisterComponent.$inject = [NetworkSerivceName, "$ionicPopup", "$ionicLoading"];


export {RegisterComponent};

