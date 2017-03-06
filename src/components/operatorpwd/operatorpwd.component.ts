import "./operatorpwd.component.scss";


class OperatorPwdComponent implements angular.IComponentOptions{

  constructor( ){
    console.log("创建component");
  }

  controller=OperatorPwdComponent;
  templateUrl = function(){
    return "./../components/operatorpwd/operatorpwd.component.html";
  }

  sayHello():void{
    alert("hello");
  }

}



export {OperatorPwdComponent};
