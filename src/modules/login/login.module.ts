/**
 * Created by allcheer on 2016/12/26.
 */
"use strict";
import {RouterName} from './../../models/router.name';
import {LoginComponent} from "./../../components/login/login.component";
import {NetworkSerivceName} from "../../models/AclConstants";
import {NetworkService} from "../../services/NetworkService";


var loginPage = angular.module(RouterName.loginPage, ['ionic']);

loginPage.component("loginComponent", new LoginComponent(null,null,null));
loginPage.service(NetworkSerivceName, NetworkService);
export {loginPage};     //models里面的helloPage模块

