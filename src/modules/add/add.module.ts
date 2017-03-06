/// <reference path="./../../../typings/index.d.ts" />

/*
import { RouterName } from './../../models/router.name';
import {HelloController} from "./../../components/hello/hello.component";
import {HelloComponent} from "./../../components/hello/hello.component";

var helloPage=angular.module(RouterName.addPage,[ 'ionic']);

helloPage.component("add",  {
    template:"<div>tmp</div>",
    controller:HelloController,
    controllerAs:'vm'
} );

helloPage.component("addComponent",new HelloComponent());

export {   helloPage };
*/
import {RouterName} from './../../models/router.name';


var loginPage = angular.module(RouterName.loginPage, ['ionic']);



import {AddComponent} from "../../components/add/add.component";
import {NetworkService} from "../../services/NetworkService";
import {NetworkSerivceName} from "../../models/AclConstants";
var moduleAdd=angular.module("addPage",['ionic']);
moduleAdd.component("addComponent",new AddComponent(null,null));
loginPage.service(NetworkSerivceName, NetworkService);export {moduleAdd};
