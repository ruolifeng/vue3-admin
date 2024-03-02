// 商品条件查询
declare interface GoodsQuery {
    keyword: string,
    status: number
}

// 商品实体类型
declare interface GoodsType {
    id: number //初始值1开始，每条+1
    code: string
    name: string,
    imageUrl: string,
    quickCode: string,
    specsName: string, // 规格名称
    unitName: string,
    categoryId: number,
    categoryName: string,
    cost: number, // 成本价
    stockNum: number, // 随机生成 100到2000
    price: number, // 随机生成300到6000, 有2位小数
    discountPrice: number, // 优惠价
    score: number, // 可获得积分
    address: string // 生产地址，省市县
    brand: string, // 品牌
    status: number, // 状态：0下架，1上架
    sort: number,
    remark: string,
    goodsDetail: string, // 一段中文文本(10到30个字)
    createTime: string,
    updateTime: string,
    loading: boolean
}


// 商品分类条件查询类型
declare interface GoodsCategoryQuery {
    name: string; // 分类名称
}
// 商品分类实体类型
declare interface GoodsCategoryType {
    id: string;
    name: string;
    status: boolean;
    sort: number;
    remark: string;
}
