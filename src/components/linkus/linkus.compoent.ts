import "./linkus.compoent.scss";


class LinkUsComponent implements angular.IComponentOptions{

  constructor( ){
    console.log("创建component");
  }

  controller=LinkUsComponent;
  templateUrl = function(){
    return "./../components/linkus/linkus.compoent.html";
  }

  sayHello():void{
    alert("hello");
  }

}



export {LinkUsComponent};
