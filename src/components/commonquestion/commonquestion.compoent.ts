import "./commonquestion.compoent.scss";

class CommonQuestionComponent implements angular.IComponentOptions {
  questionList = [];

  constructor() {
    console.log("创建component");
  }
  controllerAs = 'vm';
  controller = CommonQuestionComponent;
  templateUrl = function () {
    return "./../components/commonquestion/commonquestion.compoent.html";
  }

  sayHello(): void {

  }

  toggleBox(index: number): void {
    var ok = this.questionList[index];
    this.questionList[index] = !ok;
  }

  isItemVisiable(index: number): boolean {
    return this.questionList[index];
  }

  getItemIcon(index: number) {
    if (this.questionList[index]) {
      return "./../imgs/commonquestion/help_back_down.png";
    } else {
      return "./../imgs/commonquestion/help_back_up.png";
    }
  }
}

export {CommonQuestionComponent};
