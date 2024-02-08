import { AssetCompanyContract, CreateEditCompanyReq } from "@monorepo/types";
import { AuthContext, axiosErrorToaster } from "@monorepo/react-components";
import { useContext, useEffect, useState } from "react";
import { ServerContext } from "@monorepo/server-provider";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import { OFAB, PrimaryText } from "@monorepo/react-styles";
import { ObjectId } from "mongoose";

const ProfilesPage = () => {
  const [myProfiles, setMyProfiles] = useState<AssetCompanyContract[]>([]);
  const server = useContext(ServerContext);
  const [creating, setCreating] = useState(false);
  const fetchedProfiles = async () => {
    try {
      const res = await server?.axiosInstance.get(
        "/api/host/company/get_company_lease/65c3a27a03f4a55dd5e9da6d",
      );
      res && setMyProfiles([res.data.data]);
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
          CreateEditCompanyReq
        >("api/host/company/add_company_lease", {
          companyName: user?.name as string,
          floorNumber: Math.random().toString(),
          building: "65c3a22c5eda3d1cdd1baafa" as unknown as ObjectId,
        });
        const newAssetId = res?.data?.data?._id.toString();
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
      <OFAB onClick={createNew}>
        <Add />
      </OFAB>
      {myProfiles.length > 0 ? (
        <Grid container direction="column" rowSpacing={4}>
          {myProfiles.map((profile) => (
            <Grid id={profile._id} item>
              <PrimaryText>{JSON.stringify(profile)}</PrimaryText>
            </Grid>
          ))}
        </Grid>
      ) : (
        <PrimaryText>No Profiles yet</PrimaryText>
      )}
    </>
  );
};

export default ProfilesPage;
