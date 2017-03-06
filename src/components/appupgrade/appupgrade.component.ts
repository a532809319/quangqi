import "./appupgrade.component.scss";
export class AppupgradeComponent implements angular.IComponentOptions {

    platformCode = 0;

    templateUrl = function () {
        return "./../components/appupgrade/appupgrade.component.html";
    }
    controllerAs = "vm";
    controller = AppupgradeComponent;

    constructor() {
        var thizz = this;
        ionic.Platform.ready(function () {
            var isIPad = ionic.Platform.isIPad();
            var isIOS = ionic.Platform.isIOS();
            var isAndroid = ionic.Platform.isAndroid();

            if (isAndroid) {
                thizz.platformCode = 1;
            }
            if (isIOS || isIPad) {
                thizz.platformCode = 2;
            }

          /*  var deviceInformation = ionic.Platform.device();

            var isWebView = ionic.Platform.isWebView();

            var isWindowsPhone = ionic.Platform.isWindowsPhone();

            var currentPlatform = ionic.Platform.platform();
            var currentPlatformVersion = ionic.Platform.version();

            alert("isWebView=" + isWebView
                + "/isIPad=" + isIPad
                + "/isIOS=" + isIOS
                + "/isAndroid=" + isAndroid
                + "/isWindowsPhone=" + isWindowsPhone
                + "/currentPlatform=" + currentPlatform
                + "/currentPlatformVersion=" + currentPlatformVersion);
                */
        });
    }
}
