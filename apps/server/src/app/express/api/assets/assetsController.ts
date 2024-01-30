import { Request, Response } from "express";

import assetModel from "../../../mongo/assets/assetModel";
import { isValidObjectId } from "mongoose";
import geoJsonModel from "../../../mongo/geoJson/geoJsonModel";


// #TODO: Front end will add a coordinate Array with longitude, longitude in req.body

export const createAsset = async (req: Request, res: Response) => {
  console.log("in the create asset");
  const Assets = assetModel();    
  let geoJson_id;

  try {
    const {
      host,
      officeName,
      desc,
      amenities,
      companyInHold,
      floor,
      availability,
      photoURLs,
      status,
      coordinates
    } = req.body;

    if (!isValidObjectId(host)) {
      return res.status(500).json({ msg: "Not Vlaid User" });
    }

    const GeoJSONModel = geoJsonModel();
    const assetLocation = new GeoJSONModel({
      type:'Point',
     coordinates
    });


    try{
      const savedLocation = await assetLocation.save();

       geoJson_id = savedLocation._id;
    }
    catch(locationError){
      console.log("error Saving Location:", locationError);
      res.status(500).json({error:"error Saving Location"})
    }
   
    
    const newAsset = new Assets({
      host,
      officeName,
      desc,
      amenities,
      companyInHold,
      floor,
      availability,
      photoURLs,
      status,
      location : geoJson_id
    });

    const savedNewAsset = await newAsset.save();

    res.status(201).json({
      message: "Asset Created with Success!!",
      asset: savedNewAsset,
    });
  } catch (err) {
    console.error("error in creating New Asset", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// here Req Need to hold host_id in order to retrieve the host listing

export const getAssetsList = async (req:Request, res: Response)=>{

  console.log("***req", req );
  console.log("***res", res );
    
  const host_id = req.params.host_id

  try{
    const assetList = await assetModel().find({host : host_id});
    
    if(assetList.lenght < 0 ){
      console.log("there s no list for this host ");
      res.status(401).json({"msg": "nothing in your listing yet"})
      
    }else{
     res.status(200).json(assetList)
    }


  }
  catch(err){
    res.status(500).json({"msg":"Internal Error in Fetching Users Assets"})
}
}


export const getAssetDetail = async(req:Request, res: Response)=>{
  console.log("getting host assets detail - res", res)
  console.log("getting host assets details - req", req)


}







// assetsRouter.get<{ _id: string; location: string }, Asset[]>(
//   "/:_id",
//   async (req, res) => {
//     try {
//       const Asset = assetModel();
//       const assets = req.params._id
//         ? [await Asset.findById(req.params._id)]
//         : await Asset.find(/*{ params }*/);
//       if (!assets) {
//         return res.status(404).send();
//       }
//       res.json(assets);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send();
//     }
//   },
// );

// export default assetsRouter;
