import { Response } from "express";
import { Request } from "../../../middleware";
import { isValidObjectId } from "mongoose";

import { Company, CreateEditCompanyReq } from "@monorepo/shared";
import BuildingModel from "../../../../mongo/assets/buildingModel";
import CompanyContractModel from "../../../../mongo/assets/companyContractModel";
import { crudResponse } from "../crudResponse";

export const addCompanyLease = async (req: Request, res: Response) => {
  const assetCompanyModel = CompanyContractModel();
  const host = req.user;

  try {
    const {
      companyName,
      companyInHold,
      floorNumber,
      fullFloor,
      contractEndDate,
      subleasePermission,
      building,
    } = req.body as CreateEditCompanyReq;

    if (!isValidObjectId(host._id)) {
      const response: crudResponse<null> = {
        success: false,
        error: "Not A valid Host Id",
      };
      return res.status(400).json(response);
    }

    if (!building) {
      const response: crudResponse<null> = {
        success: false,
        error: "Please add building first",
      };
      return res.status(400).json(response);
    }
    const newCompnay = new assetCompanyModel({
      // host: host._id,
      host,
      companyName,
      companyInHold,
      floorNumber,
      fullFloor,
      contractEndDate,
      subleasePermission,
      building,
    });

    const savedCompany = await newCompnay.save();

    const response: crudResponse<typeof savedCompany> = {
      success: true,
      data: savedCompany,
      msg: "Company Added successfully",
    };

    res.status(201).json(response);
  } catch (err) {
    console.error("Error in creating New AssetCompany", err);
    const response: crudResponse<null> = {
      success: false,
      error: "Internal Server Error, Company Not added",
      msg: err.message,
    };
    res.status(500).json(response);
  }
};

export const getCompanyDetail = async (req: Request, res: Response) => {
  const companyContract = CompanyContractModel();
  const companyBuilding = BuildingModel();

  const { company_id } = req.params;

  try {
    if (!isValidObjectId(company_id)) {
      const response: crudResponse<null> = {
        success: false,
        error: "Not valid company ID",
      };
      return res.status(400).json(response);
    }

    const findCompany = await companyContract.findById(company_id);

    if (!findCompany) {
      const response: crudResponse<null> = {
        success: false,
        error: "Company Not found",
      };
      return res.status(404).json(response);
    }

    const building_id = findCompany.building;
    const findBuilding = await companyBuilding.findById(building_id);

    if (!findBuilding) {
      const response: crudResponse<typeof findBuilding> = {
        success: true,
        error: "Unable to ge the Building ID",
      };
      return res.status(200).json(response);
    }

    const response: crudResponse<{
      findCompany: typeof findCompany;
      building: typeof findBuilding;
    }> = {
      success: true,
      data: { findCompany: findCompany, building: findBuilding },
      msg: "Success fetching",
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Internal request Error, Company Detail", error);
    const response: crudResponse<null> = {
      success: false,
      error: "Internal Server error",
      msg: error.message,
    };
    res.status(500).json(response);
  }
};

export const editCompanyDetail = async (req: Request, res: Response) => {
  const companyModel = CompanyContractModel();

  try {
    const user = req.user;
    const company_id = req.params.company_id;

    if (user.type !== "host") {
      const response: crudResponse<null> = {
        success: false,
        error: "edit not allowed",
      };
      return res.status(401).json(response);
    } else if (!isValidObjectId(company_id)) {
      const response: crudResponse<null> = {
        success: false,
        error: "not Valid Company ID",
      };
      return res.status(401).json(response);
    }

    const uppdatedCompanyData: Partial<Company> = req.body;

    const updateCompanyContract = await companyModel.findByIdAndUpdate(
      { _id: company_id },
      uppdatedCompanyData,
      { new: true },
    );

    if (!updateCompanyContract) {
      const response: crudResponse<null> = {
        success: false,
        error: "Company not found",
      };
      return res.status(404).json(response);
    }

    const response: crudResponse<typeof updateCompanyContract> = {
      success: true,
      data: updateCompanyContract,
      msg: "Company updated with Success",
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in updating ", error);
    const response: crudResponse<null> = {
      success: false,
      error: "Internal Error Edit Company",
    };
    res.status(500).json(response);
  }
};

export const companiesList = async (req: Request, res: Response) => {
  const companyModel = CompanyContractModel();

  try {
    const host = req.user._id;
    console.log("host YY", host);

    const getCompanyList = await companyModel.find({ host: host }).exec();
    console.log("host", host);
    console.log("getCompanyList", getCompanyList);

    const response: crudResponse<typeof getCompanyList> = {
      success: true,
      data: getCompanyList,
    };
    res.status(201).json(response);
  } catch (error) {
    const response: crudResponse<null> = {
      success: false,
      error: "internal Error Issue Company List",
    };
    res.status(500).json(response);
  }
};
