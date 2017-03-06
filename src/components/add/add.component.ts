import "./add.component.scss";
import {NetworkService} from "../../services/NetworkService";
import {NetworkSerivceName} from "../../models/AclConstants";



class AddComponent implements angular.IComponentOptions {
     test = {
    phone: "",
    password: "",
    yzm: ""


  }


  private eye: any = document.getElementById('eye');
  public eyeion: boolean = true;
  private inputType: any = document.getElementById('passwordInput');

//   这是眼睛看密码
  eyePassword(): void {
    // alert(1)
    if (this.eyeion) {
      this.eye.src = './../imgs/add/denglu_eye_open.png';
      this.eyeion = false
      this.inputType.type = 'text';

    } else {
      this.eye.src = './../imgs/add/denglu_eye_close.png';
      this.eyeion = true;
      this.inputType.type = 'password';
    }

  }

  private check: boolean = true;
  private oBox: any = document.getElementById('red-check');

  img(): void {
    if (this.check) {
      this.oBox.src = './../imgs/add/denglu_disagree.png';
      this.check = false;
    } else {
      this.oBox.src = './../imgs/add/denglu_agree.png';
      this.check = true;
      this.$ionicPopup.confirm({
        title: '是否同意',
        template: '借款服务。。。。。。。。。。。'
      });


    }
  }



  constructor(
              private $ionicPopup: ionic.popup.IonicPopupService,
              private $ionicLoading: ionic.loading.IonicLoadingService) {
    console.log("创建component");

  }

  controller = AddComponent;
  templateUrl = function () {
    return "./../components/add/add.component.html";
  }
  controllerAs = "vm";

}


AddComponent.$inject = [ "$ionicPopup", "$ionicLoading"];
export {AddComponent};


