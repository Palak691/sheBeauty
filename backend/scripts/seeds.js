import dotenv from 'dotenv';
// dotenv.config({ path: '../.env' });
dotenv.config({path : '../.env'});
import mongoose from "mongoose";
import slugify from 'slugify';
import Product from "../models/productSchema.js";

const TOTAL_PRODUCTS = 100_000 ;
const BATCH_SIZE = 2_000;

const MONGO_URL = process.env.MONGO_URL;


const categories = {
  skincare: ["cleanser", "serum", "moisturizer", "sunscreen", "toner", "face-mask"],
  haircare: ["shampoo", "conditioner", "hair-oil", "hair-mask"],
  makeup: ["foundation", "lipstick", "concealer", "blush", "mascara" , "highlighter"],
  tools: ["jade-roller", "gua-sha", "makeup-brush", "beauty-blender"]
};

const skinTypes = ["oily", "dry", "combination", "sensitive", "normal", "all"];

const ingredientPool = [
  "niacinamide", "salicylic acid", "hyaluronic acid", "vitamin c",
  "retinol", "glycolic acid", "ceramides", "peptides",
  "aloe vera", "green tea extract", "zinc oxide", "squalane"
];

const brandPrefixes = [
  "Glow", "Pure", "Derma", "Luxe", "Bloom", "Radiant", "Fresh", "Bare" ,"rare", "rhode" , "mamaearth",
  "sugar", "k-Beauty"
];
const productTypeNames = {
  cleanser: "Foaming Cleanser", serum: "Serum", moisturizer: "Moisturizer", sunscreen: "Sunscreen SPF 50",
  toner: "Hydrating Toner", "face-mask": "Clay Mask", shampoo: "Shampoo", conditioner: "Conditioner",
 "hair-oil": "Hair Oil","hair-mask": "Hair Mask",foundation: "Foundation",highlighter: "Highlighter",
  lipstick: "Matte Lipstick", concealer: "Concealer", blush: "Blush", mascara: "Mascara", "jade-roller": "Jade Roller",
  "gua-sha": "Gua Sha Tool", "makeup-brush": "Makeup Brush Set", "beauty-blender": "Beauty Blender"
};

const productImages = {
 'beauty-blender' : [
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844020/helio-antimicrobial-makeup-sponge-v02_umndh4.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844019/besties-glitter-blend-cleanse-starter-set_drxihk.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844019/S_Mbeautysponge-2_apcjns.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786345761/beautyblender2_e8l247.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786345761/beautyblender-original_wkdrn4.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786345871/71AyXyzkPsL._AC_UF1000_1000_QL80__js0ex6.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786345870/81rh34cz3gL._AC_UF1000_1000_QL80__hvblmp.jpg'

],
sunscreen : [
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844003/PH_TK_42806_TUBE_R0724_oz5vgs.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844002/WhatsApp-Image-2024-10-14-at-08.34.37_jolv1v.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783843999/shoot_b0ae5c13-dfb7-4d2f-a594-251e9d0823e2_qsralx.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783843998/27_wbcetq.jpg'
],
'jade-roller': [
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844174/71nRYaqHvYL_roufif.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844166/8801Ci-Product-Shot-2000x2000px_lomt9x.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786347361/Jade-Roller-Seek-Bamboo_w8kt8l.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786347361/Jade-Roller-Seek-Bamboo_w8kt8l.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786347359/JADE-ROLLER-4_hay8b6.jpg,'
],
concealer : [
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783851361/mac_sku_MGT916_1x1_0_bpc1j4.png',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783851360/B_Radiant_Cream_Concealer_applicator_1208_ginger_a_k1w78o.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786347497/618C4U_suWL._AC_UF1000_1000_QL80__rhphe2.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786347495/mac_sku_SYP947_1x1_0_qk8ic9.png',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786347494/18_ekecaj.jpg'
],
lipstick : [
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783843918/Madness_1st_image_PI_2-min_u8ccc7.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783843916/velvetly-matt-lipstick-mocca_yeihzh.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783843915/SatinShimmer-Divine-Defaultlip_x0r725.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783843817/NARS_FA24_ExplicitLipstick_PDPCrop_Soldier_Open_Closed_Excess_Sephora_US_B_xfpfqi.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783843817/NARS_FA24_ExplicitLipstick_PDPCrop_Soldier_Open_Closed_Excess_Sephora_US_B_xfpfqi.jpg'
]
,
foundation: [
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783843964/NARS_SP22_LightReflectingFoundation_PDPCrop_Soldier08_VIENNA_GLBL_2400x2400_B_sioxha.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783843963/Beautifully-Flawless-Foundation-Update-Cart-Image-Product-Stylized_jtl214.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786347247/foundation-group_ef227054-1d4f-4948-824b-fafe02bc8349_mzet3f.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786347245/mac_sku_SCC201_1x1_2_qvo3h7.png',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786347245/Laura_Geller_Double_Take_Baked_Soldier-Ecomm_Porcelain_yfepyo.jpg'
],
cleanser : [
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844153/morning_burst_1_ozmoee.webp',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844151/1-PRQL_PDP_Product_GleanserSA_SOA-NEA-NPF_d34rbv.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786345939/083421_GC_CACC_4-2oz-Front_z1dbbq.png',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786345938/25_0214_Cleanse_LHA_Cleanser_240ml_2000x2000_jddykt.jpg',
   'https://res.cloudinary.com/djbvudn3u/image/upload/v1786345938/maintain-Feminine-Cleanser-Boric-Acid2_lwprqp.png',
],
highlighter:[
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844126/61t_FvLR1TL_yaxws3.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844123/16-10-24_EYE_PALETTE_ECOM_STILLS_PDP_DAY_1_HILLIER_Shot_8_AFTER_LIV_DIGITAL_LILAC_3736_viucwj.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844076/8904341211946_IMG.main_wckgzk.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844075/soft-glow-highlighter-01-champagne-shimmer-2369043-en_zw3lvs.jpg'
],
serum : [
 'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844055/05.FCASRe-PushThumbnailRefresh_SALESDATA__Brand.com_1080px1_1ratio_uno64s.jpg',
 'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844054/1_Pro_Growth___Peptide_Serum_Mist_6.5oz_nwuuc8.webp',
 'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844053/TNR_glycerin-acid-serum-watermark-scaled_vpswmz.jpg',
 'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844050/Nova_Serum_4x5_Carousel_1_tdzaon.png',
 'https://res.cloudinary.com/djbvudn3u/image/upload/v1783844048/SSSR-150-SuperSkinnySerum-5.1-oz_81421f85-9533-4998-8c80-8093141d4da1_qfdufh.jpg'
],
'makeup-brush' : [
 'https://res.cloudinary.com/djbvudn3u/image/upload/v1783852906/mac_sku_S7JE01_1x1_0_prjje1.png',
 'https://res.cloudinary.com/djbvudn3u/image/upload/v1783852903/20004300_ECT_BlurringFaceBrush_OOPFront_ogp9b5.jpg',
 'https://res.cloudinary.com/djbvudn3u/image/upload/v1783852900/10031200_RT_FACE_ExtraBigPowderBrush_OOPFRONT_gb0z7h.jpg',
 'https://res.cloudinary.com/djbvudn3u/image/upload/v1786347763/M_ReadySetPro_Brushset_Shadow_Bag_V2_8889ca73-b134-408a-a418-67abe7b424f4_myz11g.jpg',
 'https://res.cloudinary.com/djbvudn3u/image/upload/v1786347766/s2906204-main-zoom_rew115.jpg',
 'https://res.cloudinary.com/djbvudn3u/image/upload/v1786347761/s2449809-main-zoom_kxilci.jpg'
],
'gua-sha' : [
 'https://res.cloudinary.com/djbvudn3u/image/upload/v1783852916/evolve-organic-beauty-accessories-rose-quartz-gua-sha-1153174214_grande_rtzvfc.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346415/GuaSha1_700x_fl6ypi.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346413/Rose-Quartz-Gua-Sha-Packs-Shubhanjali-4_gggfnj.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346412/71UqAFsoK5L_eynz86.jpg'
],
'mascara' : [
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783852941/WY_60SLEM-Bailey_062023_1_esaho6.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783852939/lash-therapy-australia-volumising-lash-mascara_d5xvb8.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346521/mac_sku_SLEH01_1x1_0_i4gjyv.png',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346519/maybelline-lashsensationalbodymascara-wtp-us-904-veryblack-41554100006-primary-rectangular_dv3a9n.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346518/maybelline-great-lash-lash-formula.jpg_dyd620.jpg'
],
'hair-mask' : [
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783852959/1-front_new_si4ycj.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783852957/51_Td55XX7L._AC_UF1000_1000_QL80__yxznth.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346303/this-hair-mask-v0-d3udn43ubyjc1_njehqo.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346301/HIHM_230ml_PDP_M_D2_fov33m.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346300/1_1_54_32bbf09a-9120-4264-ab21-f67169305eca_nhggta.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346300/s2758142-main-zoom_gxyolr.jpg'
],
'hair-oil' : [
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783852981/dosage_c0295784-f8f9-4312-b2f8-be3487630996_gmux4h.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783852978/153_TREATMENT_ORIGINAL_100mL_v3_z0b0i5.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346746/Hair-Oil-200-ml_dgt6qj.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346746/Hair-Oil-200-ml_dgt6qj.jpg',
   'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346743/0edc997c839a--FAQ_uuimge.jpg'
],
conditioner : [
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783853005/TheLeave-InConditioner-GTK1_n1a0cd.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783853002/36_iuo8kt.jpg',

],
shampoo : [
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783853023/impecca-blonde_package-front_r6sun2.webp',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783853020/Biotin_collagen_packaging_update_shampoo_front_tvcrne.webp',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346623/Wella-Professionals_Ultimate-Color_e-comm_PDP_Shampoo-250ml_PI_2_isqhpi.jpg',
   'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346625/22209---Swimmers-Wellness-Shampoo-_9-oz_-by-Malibu-C_1000x_cuq3k1.jpg',
   'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346622/vitamino-color-spectrum-shampoo-slider1_veeler.jpg',
   'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346621/45_DRY-SHAMPOO_DARK-TONES_205mL_v2_wljovs.jpg',
],
'face-mask' : [
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783853044/ECOMIMAGESCLEANSLATE01_1_rvupwm.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783853040/71DwJryUsAL._AC_UF1000_1000_QL80__pcie6o.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783853037/ECOMIMAGESCLEANSLATE01_1_oqbti8.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786347638/BEST-RED-LIGHT-DEVICES-0478_ui84wy.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786347636/codage-paris-product-collection-hydrogel-face-mask-3760215877244-1216722956_k64aqh.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786347635/firming-facelift-magic-moss-mask-150667_uubgbb.jpg'
],
toner : [
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783853054/13_1200x_egh4zf.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783853050/Skin_Recovery_Essence_Toner_07751A_2000x_i0h4wo.jpg',
   'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346179/PDP_IMAGES_Watermelon-Glow-PHA_BHA-Pore-Tight-Toner-5_8726c95e-05a9-4c53-af63-80a8b9926ae7_nkmt63.jpg',
   'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346177/ORD-Blog-Glycolic-Product-Spotlight-Thumbnail-updated_nlckkq.jpg',
   'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346177/Acwell_Revamped_Licorice_pH_Balancing_Cleansing_Toner_a0sqci.jpg'
],
moisturizer : [
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1783853095/OEM-ODM-7-in-1-Night-Moisturser-Rich-Vitamin-Night-Face-Cream-Long-lasting-Nourishing-Moisturizing-Facial-Cream_ae6uoi.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346076/31Deep_oweqvd.png',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346063/127291_bbujhq.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346061/glamglow-waterburst-tm-hydrated-glow-moisturser-glamglow-waterburst-tm-hydrated-glow-moisturser_front_photo_original_ilrmt9.jpg',
  'https://res.cloudinary.com/djbvudn3u/image/upload/v1786346061/REVISION_SKINCARE_V__Comfort_Moisturiser_48g_h0d5iq.png'


],



}

function randomInteger(min,max){
  return  Math.floor(Math.random()*( max - min + 1)) + min
}

function randomChoice(arr){
   return arr[randomInteger(0, arr.length-1)]
}
function randomPrice(){
  return Number((Math.random()*4800 + 200).toFixed(2))
}
//name desc price, discount,  category , subcategory, skinType , ingrd,stock,
//ratingAvg,  bestseller, newArrival

function randomCreatedAt(){
  const now = Date.now();
  const fiveYearsMs = 5 * 24 * 365 * 60 * 60 * 1000;
  const ts = now - randomInteger(0,fiveYearsMs);
  const newDate =  new Date(Math.floor(ts/1000)*1000);
  return newDate
}

let index = 0;

function productName(brand , subCategory){
  return `${brand}  ${subCategory} ${index++}`;
}
 

function generateBatch(size){
  const docs  = [];
  for(let i = 0 ; i < size ; i++){
  const createdAt = randomCreatedAt();
  const category = randomChoice(Object.keys(categories));//returns obj key
  const subCategory = randomChoice(categories[category]);
  const brand = randomChoice(brandPrefixes);
  const skinType = randomChoice(skinTypes);
  const name = productName(brand, subCategory);
  const images = productImages[subCategory] || [];
  const image = images.length ? randomChoice(images) : '';

    docs.push({
      name,
      slug : slugify(name, {lower : true , strict : true}),
      description : `A ${productTypeNames[subCategory].toLowerCase()} for ${skinType} skin`,
      discountPercentage : randomInteger(20,50),
      price : randomPrice(),
      category : category,
      subCategory: subCategory,
      skinType ,
      images : image,
      ingredients : [randomChoice(ingredientPool),randomChoice(ingredientPool)],
      stock : randomInteger(0,30),
      ratingAvg : Number((Math.random()*2+3).toFixed(1)),
      numReviews : randomInteger(10,1000) ,
      isBestseller : Math.random() < 0.1,//10%
      isNewArrival : Math.random() <0.15,// 15%
      createdAt
    })
  }
  return docs;

}


async function seed(){
  try{
  await mongoose.connect(MONGO_URL);
  console.log("connected to mongoDb");
  try{
    await Product.collection.drop();
  }catch{}
  
  for(let insertion = 0 ; insertion < TOTAL_PRODUCTS ; insertion += BATCH_SIZE){
    const size = Math.min(BATCH_SIZE, TOTAL_PRODUCTS - insertion);
    const batch = generateBatch(size);
    await Product.insertMany(batch, {ordered : false});
    // This allows MongoDB to continue inserting even if one document fails (for example, due to a duplicate key).
  }

  console.log("DONE");
}finally{
  await mongoose.disconnect();

}

}

seed().catch(console.error);