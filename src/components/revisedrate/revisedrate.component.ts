import "./revisedrate.component.scss";


class RevisedrateComponent implements angular.IComponentOptions {

  constructor() {
    console.log("创建component");
  }

  controller = RevisedrateComponent;
  templateUrl = function () {
    return "./../components/revisedrate/revisedrate.component.html";
  }

  sayHello(): void {

    //此处是写页面的js  在这个里面
    alert("hello");

  }

}



export {RevisedrateComponent};
