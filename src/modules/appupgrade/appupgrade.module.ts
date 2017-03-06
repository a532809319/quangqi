import { AppupgradeComponent } from './../../components/appupgrade/appupgrade.component';
import { NetworkService } from './../../services/NetworkService';
import { AclConstants, NetworkSerivceName } from './../../models/AclConstants';
import { RouterName } from './../../models/router.name';


var appupgradePage=angular.module(RouterName.appUpgradePage,["ionic"]);
appupgradePage.component("appupgradeComponent",new AppupgradeComponent());
appupgradePage.service(NetworkSerivceName,NetworkService);
export{appupgradePage}