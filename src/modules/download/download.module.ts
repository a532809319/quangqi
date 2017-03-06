/**
 * Created by allcheer on 2017/1/11.
 */
import {RouterName} from './../../models/router.name';
import {DownloadComponent} from "../../components/download/download.component";
var downloadPage = angular.module(RouterName.downloadPage, ['ionic']);

//    套路  调用的是models
downloadPage.component("downloadComponent", new DownloadComponent());

export {downloadPage};     //models里面的helloPage模块

