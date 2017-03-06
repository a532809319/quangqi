/**
 * Created by allcheer on 2016/12/13.
 */
import {RouterName} from './../../models/router.name';
import {ProductintroduceComponent} from "./../../components/productintroduce/productintroduce.component";


var productIntroducePage = angular.module(RouterName.productIntroducePage, ['ionic']);

productIntroducePage.component("productIntroduceComponent", new ProductintroduceComponent());

export {productIntroducePage};
