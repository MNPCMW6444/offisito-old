import { Router } from "express";
import { addCompanyLease, getCompanyDetail, editCompanyDetail } from "./companyController";

const companyRouter =  Router();



// Company Routers
companyRouter.post("/add_company_lease", addCompanyLease);
companyRouter.get("/get_company_lease/:company_id", getCompanyDetail);
companyRouter.put("/edit_company_lease/:company_id", editCompanyDetail);
companyRouter.delete("/delete_company_lease", );

export default companyRouter;
