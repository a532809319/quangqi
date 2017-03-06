import "./productintroduce.component.scss";


class ProductintroduceComponent implements angular.IComponentOptions{

  constructor( ){
    console.log("创建component");
  }

  controller=ProductintroduceComponent;
  templateUrl = function(){
    return "./../components/productintroduce/productintroduce.component.html";
  }

  sayHello():void{
    alert("hello");
  }

}



export {ProductintroduceComponent};
