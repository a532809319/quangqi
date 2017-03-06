/**
 * Created by allcheer on 2016/12/6.
 */
import {RouterName} from './../../models/router.name';
import {RevisedrateComponent} from "./../../components/revisedrate/revisedrate.component";   //此处引用的是ts

var revisedratePage = angular.module(RouterName.revisedratePage, ['ionic']);


//    套路  调用的是models
revisedratePage.component("revisedrateComponent", new RevisedrateComponent());

export {revisedratePage};     //models里面的helloPage模块


