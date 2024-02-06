import { AssetCompanyContract, CreateAssetReq } from "@monorepo/types";
import { axiosErrorToaster } from "@monorepo/react-components";
import { useContext, useEffect, useState } from "react";
import { ServerContext } from "@monorepo/server-provider";
import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";

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

  const createNew = async () => {
    if (!creating) {
      setCreating(true);
      try {
        const res = await server?.axiosInstance.post(
          "api/assets/add_company_lease",
          {
            roomNumber: "1213",
            leaseCondition: { dailyPrice: 1, leaseType: "daily" },
          } as CreateAssetReq,
        );
        const newAssetId = res?.data?.asset?._id.toString();
        newAssetId && navigate("/space/?id=" + newAssetId);
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
          {myProfiles.map((asset) => (
            <Grid id={asset._id} item>
              <AssetCard asset={asset} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No Profiles yet</Typography>
      )}
    </>
  );
};

export default ProfilesPage;
