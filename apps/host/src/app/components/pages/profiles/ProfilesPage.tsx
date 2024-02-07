import {
  AssetCompanyContract,
  CreateBuildingReq,
  CreateCompanyReq,
} from "@monorepo/types";
import { AuthContext, axiosErrorToaster } from "@monorepo/react-components";
import { useContext, useEffect, useState } from "react";
import { ServerContext } from "@monorepo/server-provider";
import { useNavigate } from "react-router-dom";
import { Fab, Grid, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import mongoose from "mongoose";

const ProfilesPage = () => {
  const [myProfiles, setMyProfiles] = useState<AssetCompanyContract[]>([]);
  const server = useContext(ServerContext);
  const [creating, setCreating] = useState(false);
  const fetchedProfiles = async () => {
    try {
      const res = await server?.axiosInstance.get(
        "/api/host/company/get_company_lease/",
      );

      //TODO from here
      res && setMyProfiles(res.data);
    } catch (e) {
      axiosErrorToaster(e);
    }
  };

  useEffect(() => {
    fetchedProfiles().then();
  }, [server?.axiosInstance]);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const createNew = async () => {
    if (!creating) {
      setCreating(true);
      try {
        const res = await server?.axiosInstance.post<
          any,
          any,
          CreateCompanyReq
        >("api/host/company/add_company_lease", {
          companyName: user?.name as string,
          floorNumber: Math.random().toString(),
          building: new mongoose.Types.ObjectId(
            "65c3a22c5eda3d1cdd1baafa",
          ) as any,
        });
        const newAssetId = res?.data?.AssetCompany?._id.toString();
        debugger;
        newAssetId && navigate("/profile/?id=" + newAssetId);
      } catch (e) {
        axiosErrorToaster(e);
      } finally {
        setCreating(false);
      }
    }
  };

  return (
    <>
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: "10%",
          right: "5%",
        }}
        onClick={createNew}
      >
        <Add />
      </Fab>
      {myProfiles.length > 0 ? (
        <Grid container direction="column" rowSpacing={4}>
          {myProfiles.map((profile) => (
            <Grid id={profile._id} item>
              {JSON.stringify(profile)}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="primary">No Profiles yet</Typography>
      )}
    </>
  );
};

export default ProfilesPage;
