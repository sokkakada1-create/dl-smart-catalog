const SETTINGS = {
  telegramUsername: "YOUR_TELEGRAM_USERNAME",
  facebookUrl: "https://facebook.com/YOUR_PAGE",
  phone: "+85500000000",
  currency: "USD"
};

const CATEGORIES = [
  { id: "all", km: "ទាំងអស់", en: "All", zh: "全部", icon: "▦" },
  { id: "signboard", km: "ស្លាកយីហោ", en: "Signboards", zh: "招牌", icon: "🪧" },
  { id: "coffee-cart", km: "ទូកាហ្វេ", en: "Coffee Carts", zh: "咖啡车", icon: "☕" },
  { id: "retail-cart", km: "រទេះលក់", en: "Retail Carts", zh: "售货车", icon: "🛒" },
  { id: "tshirt", km: "បោះពុម្ពអាវ", en: "T-Shirt Printing", zh: "T恤印刷", icon: "👕" },
  { id: "sticker", km: "Sticker & Label", en: "Stickers & Labels", zh: "贴纸与标签", icon: "🏷️" },
  { id: "lightbox", km: "ប្រអប់ភ្លើង", en: "Light Boxes", zh: "灯箱", icon: "💡" },
  { id: "awning", km: "សំយ៉ាប", en: "Awnings", zh: "雨棚", icon: "🏠" },
  { id: "wedding", km: "ធៀបការ", en: "Wedding Printing", zh: "婚礼印刷", icon: "💍" }
];

const PRODUCTS = [
  {id:"DL001",category:"coffee-cart",name:{km:"ទូកាហ្វេ Premium",en:"Premium Coffee Cart",zh:"高级咖啡车"},price:650,size:"1500 × 700 × 2000 mm",material:{km:"ដែក Powder Coating + Stainless Steel",en:"Powder-coated steel + Stainless steel",zh:"喷粉钢材 + 不锈钢"},description:{km:"ទូកាហ្វេរចនាទំនើប មានកន្លែងទុកសម្ភារៈ និងអាចប្តូរពណ៌តាម Brand។",en:"Modern coffee cart with storage and customizable brand colors.",zh:"现代咖啡车，带储物空间，可按品牌定制颜色。"},image:"coffee-cart.jpg",badge:{km:"ពេញនិយម",en:"Popular",zh:"热门"}},
  {id:"DL002",category:"signboard",name:{km:"ស្លាកអក្សរភ្លើង 3D",en:"3D LED Letter Sign",zh:"3D LED 发光字"},price:180,size:"1200 × 600 mm",material:{km:"Acrylic + LED + PVC",en:"Acrylic + LED + PVC",zh:"亚克力 + LED + PVC"},description:{km:"អក្សរ 3D មានភ្លើង LED មើលច្បាស់ពេលយប់ សាកសមសម្រាប់ហាង និងក្រុមហ៊ុន។",en:"Illuminated 3D letters suitable for shops and offices.",zh:"适合商店和办公室的 3D LED 发光字。"},image:"signboard.jpg",badge:{km:"ថ្មី",en:"New",zh:"新品"}},
  {id:"DL003",category:"retail-cart",name:{km:"រទេះលក់អាហារ",en:"Street Food Cart",zh:"街头餐车"},price:520,size:"1800 × 800 × 2100 mm",material:{km:"ដែក + Stainless Steel",en:"Steel + Stainless steel",zh:"钢材 + 不锈钢"},description:{km:"រទេះសម្រាប់លក់អាហារ ភេសជ្ជៈ និងអាជីវកម្មចល័ត។",en:"Mobile cart for food, drinks and street retail.",zh:"适合食品、饮料及流动零售业务。"},image:"retail-cart.jpg",badge:{km:"Custom",en:"Custom",zh:"定制"}},
  {id:"DL004",category:"tshirt",name:{km:"បោះពុម្ពអាវយឺត",en:"T-Shirt Printing",zh:"T恤印刷"},price:6,size:"S–XXL",material:{km:"Cotton / Dry-fit",en:"Cotton / Dry-fit",zh:"棉 / 速干面料"},description:{km:"បោះពុម្ព Logo រូបភាព និងអក្សរ សម្រាប់ក្រុមហ៊ុន ព្រឹត្តិការណ៍ និងក្រុមកីឡា។",en:"Logo and artwork printing for companies, events and sports teams.",zh:"为公司、活动和运动队印刷标志、图案和文字。"},image:"tshirt.jpg",badge:{km:"ចាប់ពី",en:"From",zh:"起"}},
  {id:"DL005",category:"sticker",name:{km:"Sticker Label ផលិតផល",en:"Product Sticker Label",zh:"产品贴纸标签"},price:15,size:"A3 Sheet / Custom",material:{km:"Vinyl / PP / Transparent",en:"Vinyl / PP / Transparent",zh:"乙烯基 / PP / 透明材质"},description:{km:"Sticker សម្រាប់ផលិតផល កាហ្វេ អាហារ និង Packaging ផ្សេងៗ។",en:"Labels for products, coffee, food and packaging.",zh:"适用于产品、咖啡、食品和包装。"},image:"sticker.jpg",badge:{km:"លក់ដាច់",en:"Best Seller",zh:"畅销"}},
  {id:"DL006",category:"lightbox",name:{km:"ប្រអប់ភ្លើងមុខហាង",en:"Shop Front Light Box",zh:"店面灯箱"},price:95,size:"1000 × 500 mm",material:{km:"Aluminum + Flex + LED",en:"Aluminum + Flex + LED",zh:"铝材 + 灯布 + LED"},description:{km:"ប្រអប់ភ្លើងសម្រាប់មុខហាង ភ្លឺស្អាត និងមើលឃើញពីចម្ងាយ។",en:"Bright shop-front light box visible from a distance.",zh:"明亮醒目的店面灯箱，远距离也清晰可见。"},image:"lightbox.jpg",badge:{km:"តម្លៃល្អ",en:"Value",zh:"高性价比"}},
  {id:"DL007",category:"awning",name:{km:"សំយ៉ាបដែក",en:"Metal Awning",zh:"金属雨棚"},price:220,size:"Custom Size",material:{km:"ដែក + Alu-Zinc",en:"Steel + Alu-Zinc",zh:"钢材 + 铝锌板"},description:{km:"សំយ៉ាបការពារកម្ដៅ និងភ្លៀង សម្រាប់ផ្ទះ ហាង និងឃ្លាំង។",en:"Weather protection awning for homes, shops and warehouses.",zh:"适用于住宅、商店和仓库的遮阳防雨棚。"},image:"awning.jpg",badge:{km:"ដំឡើងជូន",en:"Installation",zh:"含安装"}},
  {id:"DL008",category:"wedding",name:{km:"ធៀបការរចនាពិសេស",en:"Custom Wedding Invitation",zh:"定制婚礼请柬"},price:0.8,size:"Custom",material:{km:"Art Paper / Premium Paper",en:"Art Paper / Premium Paper",zh:"艺术纸 / 高级纸"},description:{km:"រចនា និងបោះពុម្ពធៀបការតាមពណ៌ និងរចនាប័ទ្មដែលអតិថិជនចង់បាន។",en:"Custom-designed invitations in your preferred style and colors.",zh:"按客户喜欢的风格和颜色定制设计与印刷。"},image:"wedding.jpg",badge:{km:"ចាប់ពី",en:"From",zh:"起"}}
];
