import "./realnameauthentication.component.scss";

class RealnameauthenticationComponent implements angular.IComponentOptions {

  constructor() {
    console.log("创建component");
  }

  controller = RealnameauthenticationComponent;
  templateUrl = function () {
    return "./../components/realnameauthentication/realnameauthentication.component.html";
  }
}


export {RealnameauthenticationComponent};
