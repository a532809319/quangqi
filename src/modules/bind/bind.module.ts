/**
 * Created by allcheer on 2017/1/4.
 */
import {RouterName} from './../../models/router.name';
import {BindComponent} from "./../../components/bind/bind.compoent";
var bindPage = angular.module(RouterName.bindPage, ['ionic']);

//    套路  调用的是models
bindPage.component("bindComponent", new BindComponent());

export {bindPage};     //models里面的helloPage模块

