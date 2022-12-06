const repository = require("./repository");
const dateFormat =require("dateformat");

exports.postProduct = async (data, cb) => {
  try {
    let respose = {};

    let insertValue = {
      title: data.title,
      imageUrl: data.imageUrl,
      price: data.price,
      offerPre: data.offerPre,
      sellerId: data.sellerId,
      sellerName: data.sellerName,
      totalQty: data.totalQty,
      skuId: data.skuId,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate)
    };
    console.log("insertValue => ", insertValue)
    let insertRes = await repository.insertProduct(insertValue);
    if (insertRes.error) return cb(insertRes);

    respose = {
      message: `Prodcut post Successfully`,
      error: false,
    };
    return cb(respose);
  } catch (e) {
    console.log("error => ", e);
    respose = {
      message: `Internal Error.`,
      error: true,
    };
    return cb(respose);
  }
};

exports.getAllProduct = async (req, cb) => {
  try {
    let respose = {};
    let productList = await repository.getAllProduct();
    if (productList.error) return cb(productList);
   
    productList.data = JSON.parse(JSON.stringify(productList.data));
    productList.data.map((item) => {
      item.offerPrice = item.offerPre > 0 ? (item.price - ((Number(item.offerPre)/100) * item.price)) : 0;
    })
    respose = {
      message: `Data get Successfully`,
      data: productList.data,
      error: false,
    };
    return cb(respose);
  } catch (e) {
    console.log("error => ", e);
    respose = {
      message: `Internal Error.`,
      error: true,
    };
    return cb(respose);
  }
};

exports.searchAndFilterProduct = async (req, cb) => {
  try {
    let respose = {};
    let key = Object.keys(req.body);
    let productList;
    if(key == 0) {
      productList = await repository.getAllProduct();
    } else {
      let data = req.body;
      let where = {},
          orderBy = {};
  
      if (data.type) {
        switch (data.type) {
          case "active":
            where = {
              startDate: {
                $lte: new Date(new Date().toISOString()),
              },
              endDate: {
                $gte: new Date(new Date().toISOString()),
              },
            };
            break;
          case "toprate":
            where = {
              startDate: {
                $lte: new Date(new Date().toISOString()),
              },
              endDate: {
                $gte: new Date(new Date().toISOString()),
              },
              review: {
                $gte: 3,
              },
            };
            break;
          case "feature":
            where = {
              startDate: {
                $gte: new Date(new Date().toISOString()),
              },
            };
            break;
        }
      }
      if(data.orderBy) {
          let key = Object.keys(data.orderBy); 
          key.map((item) => {
            orderBy[item] = data.orderBy[item] == 'asc' ? '1': '-1'
          })
      }
      if(data.search) {
          where.title =  new RegExp(data.search, 'i');
      }
      let sort = {
        sort:orderBy 
      }
      productList = await repository.searchAndFilterProduct(where,sort); 
    }
   
    if (productList.error) return cb(productList);

    productList.data.map((item) => {
      item.offerPrice = item.offerPre > 0 ? (item.price - ((Number(item.offerPre)/100) * item.price)) : 0;
    })
    respose = {
      message: `Data get Successfully`,
      data: productList.data,
      error: false,
    };
    return cb(respose);
  } catch (e) {
    console.log("error => ", e);
    respose = {
      message: `Internal Error.`,
      error: true,
    };
    return cb(respose);
  }
};
