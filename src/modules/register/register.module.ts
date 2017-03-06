import {NetworkSerivceName} from './../../models/AclConstants';
import {NetworkService} from './../../services/NetworkService';
import {RouterName} from './../../models/router.name';
import {RegisterComponent} from "./../../components/register/register.component";   //此处引用的是ts

var registerPage = angular.module(RouterName.registerPage, ['ionic']);

//    套路  调用的是models
registerPage.component("registerComponent", new RegisterComponent(null,null,null));
registerPage.service(NetworkSerivceName, NetworkService);
export {registerPage};     //models里面的helloPage模块



