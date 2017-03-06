/**
 * Created by allcheer on 2016/12/13.
 */
import {RouterName} from './../../models/router.name';
import {LinkUsComponent} from "../../components/linkus/linkus.compoent";
var linkusPage = angular.module(RouterName.linkusPage, ['ionic']);

//    套路  调用的是models
linkusPage.component("linkusComponent", new LinkUsComponent());

export {linkusPage};     //models里面的helloPage模块




