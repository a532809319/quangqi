import "./login.component.scss";
import {AclBaseHeader} from "../../dto/AclBaseHeader";
import {LoginRequest} from "../../dto/request/LoginRequest";
import {LoginReqBody} from "../../dto/request/body/LoginReqBody";
import {NetworkService} from "../../services/NetworkService";
import {NetworkSerivceName, AclConstants} from "./../../models/AclConstants";


class LoginComponent implements angular.IComponentOptions {


  palceholder: string = "请输入用户名";
  userMobno: string;  //用户名
  userPwd: string;//密码
  icon_pwd_type: string = "password";  //眼睛是否睁开
  icon_pwd_openEyes: boolean;
  icon_pwd_eyes: string;

  isAgreementChecked = false;

  constructor(private netReq: NetworkService,
              private $ionicPopup: ionic.popup.IonicPopupService,
              private $ionicLoading: ionic.loading.IonicLoadingService) {
    console.log("创建component");
    this.icon_pwd_eyes = "./../imgs/register/denglu_eye_close.png";
  }

  controllerAs = 'vm';
  controller = LoginComponent;

  templateUrl = function () {
    return "./../components/login/login.component.html";
  }

  sayHello(): void {

  }

  commitInfo(): void {
    var ctrl = this;
    var req = new LoginRequest();  //什么什么token
    var header = new AclBaseHeader();
    header.sign = "virtual-sign";
    header.token = "virtual-token";
    req.header = header;


    var result = new LoginReqBody();  //要传给后台的参数
    result.loginId = this.userMobno;
    result.userPasswd = this.userPwd;
    req.result = result;
    var respHeader = new AclBaseHeader();

    ctrl.$ionicLoading.show(AclConstants.LoadingOptions);

    this.netReq.postMe(req, respHeader, {
      onSuccess(json: any) {
        console.log('json');
        ctrl.$ionicLoading.hide();
      },
      onFailure(e: any) {
        ctrl.$ionicLoading.hide();
      }
    });

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

  bghide(): void {

  }
}
LoginComponent.$inject = [NetworkSerivceName, "$ionicPopup", "$ionicLoading"];

export {LoginComponent};
