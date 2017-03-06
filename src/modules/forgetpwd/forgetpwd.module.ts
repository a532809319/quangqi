/**
 * Created by allcheer on 2016/12/9.
 */
import {RouterName} from './../../models/router.name';
import {ForgetpwdComponent} from "./../../components/forgetpwd/forgetpwd.component";   //此处引用的是ts
import {NetworkSerivceName} from "../../models/AclConstants";
import {NetworkService} from "../../services/NetworkService";

var forgetpwdPage = angular.module(RouterName.forgetpwdPage, ['ionic']);
forgetpwdPage.service(NetworkSerivceName, NetworkService);
forgetpwdPage.component("forgetpwdComponent", new ForgetpwdComponent(null,null,null));
export {forgetpwdPage};     //models里面的helloPage模块
