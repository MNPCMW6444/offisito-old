import { Router } from "express";
import { AddCompanyLease } from "./companyController";

const companyRouter =  Router();



// Company Routers
companyRouter.post("/add_company_lease", AddCompanyLease);

export default companyRouter;