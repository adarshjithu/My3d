import mongoose from "mongoose";


const bannerSchema =  new mongoose.Schema({
    banners:{type:Array,default:[]},
    time:{type:Number,default:0},
    isSlide:{type:Boolean,default:true}
},{timestamps:true})

const Banner = mongoose.model("Banner",bannerSchema);
export default Banner;