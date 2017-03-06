import "./bind.compoent.scss";

class BindComponent implements angular.IComponentOptions {
  questionList = [];
  palceholder: string = "请输入您的手机号";


  userMobno: string;    //手机号
  verifyCode: string;  //验证码


  constructor() {
    console.log("创建component");
  }
  controllerAs = 'vm';
  controller = BindComponent;
  templateUrl = function () {
    return "./../components/bind/bind.compoent.html";
  }

  //点击获取验证码
  getVerifyCode(): void {

  }
  //点击绑定
  commitInfo():void{

  }
}
export {BindComponent};
