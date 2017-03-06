//reference to  http://angular-slider.github.io/angularjs-slider/
//editor:anhaoz 
//date:20161217

var sliderPage = angular.module("sliderPage", ['ionic', 'rzModule']);
sliderPage.component("sliderComponent", {
    template: " <rzslider rz-slider-options='vm.options' rz-slider-model='vm.progress'></rzslider>",
    controller: function () {
        var eg = this;
        var min=7;
        eg.progress = min;
        eg.options = {
            floor: min,   
            ceil: 100,
            //vertical:true, //垂直方向
            hidePointerLabels: true,
            hideLimitLabels: true,
            autoHideLimitLabels: true,
            showSelectionBar: true,
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
    },
    controllerAs: 'vm'
});

export { sliderPage };