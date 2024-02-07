import { Router } from "express";
import { AddCompanyLease } from "./companyController";

const companyRouter =  Router();



// Company Routers
companyRouter.post("/add_company_lease", AddCompanyLease);
companyRouter.get("/get_company_lease/:company_id", );
companyRouter.put("/edit_company_lease/:company_id", );
companyRouter.delete("/delete_company_lease", );

export default companyRouter;
