import "./thousandloan.component.scss";

class ThousandloanComponent implements angular.IComponentOptions {
  isagree: boolean = false;
  istrue: string = null;
  isshow: boolean = false;
  // ./../imgs/thousandloan/nav_button_dj.png
  constructor() {
    console.log("创建component");
    this.istrue = "./../imgs/thousandloan/nav_button_dj.png";
  }

  controllerAs = 'vm';
  controller = ThousandloanComponent;
  templateUrl = function () {
    return "./../components/thousandloan/thousandloan.component.html";
    // isagreeimg = "";
  }

  //是否同意协议
  toggleagree(): void {
    this.isagree = !this.isagree;
    if (this.isagree) {
      this.istrue = "./../imgs/thousandloan/nav_button_dw.png";
    } else {

      this.istrue = "./../imgs/thousandloan/nav_button_dj.png";
    }
  }

//点击立即申请
  applyfor(): void {
    this.isshow = true;
  }

  hide(): void {
    this.isshow = false;
  }

  showcontent($event): void {
    $event.stopPropagation();
    this.isshow = true;
  }

  download(): void {
    alert(11);
  }

}


export {ThousandloanComponent};
