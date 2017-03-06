import "./slidemain.component.scss";

class SlidemainComponent implements angular.IComponentOptions {
  questionList = [];
  progress: any;
  options: any;

  constructor() {
    console.log("创建component");
    this.slide();

  }

  controllerAs = 'vm';
  controller = SlidemainComponent;
  templateUrl = function () {
    return "./../components/slidemain/slidemain.component.html";
  }

  //滚动事件
  slide(): void {
    var eg = this;
    var min = 1;
    eg.progress = min;
    var value=eg.progress;
    eg.options = {
      floor: min,
      ceil: 30,
      //vertical:true, //垂直方向
      hidePointerLabels: true,
      hideLimitLabels: true,
      autoHideLimitLabels: true,
      showTicks: false,
      getTickColor: true,
      showSelectionBar:true,

      onStart: function () {
        console.log('开始滑动--->' + eg.progress);
      },
      onChange: function () {
        console.log('正在滑动--->' + eg.progress);

      },
      onEnd: function () {
        console.log('完成滑动--->' + eg.progress);
      },
    }
  }

}

export {SlidemainComponent};
