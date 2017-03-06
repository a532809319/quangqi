/**
 * Created by allcheer on 2016/12/6.
 */
import {RouterName} from './../../models/router.name';
import {ThousandloanComponent} from "./../../components/thousandloan/thousandloan.component";   //此处引用的是ts

var thousandloanPage = angular.module(RouterName.thousandloanPage, ['ionic']);


//    套路  调用的是models
thousandloanPage.component("thousandloanComponent", new ThousandloanComponent());

export {thousandloanPage};     //models里面的helloPage模块


