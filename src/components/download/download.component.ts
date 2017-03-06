import "./download.component.scss";

class DownloadComponent implements angular.IComponentOptions {

  constructor() {
    console.log("创建component");
  }

  controllerAs = 'vm';
  controller = DownloadComponent;
  templateUrl = function () {
    return "./../components/download/download.component.html";
    // isagreeimg = "";
  }

}


export {DownloadComponent};
