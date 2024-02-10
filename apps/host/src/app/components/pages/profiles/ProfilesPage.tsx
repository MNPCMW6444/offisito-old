import { AuthContext, axiosErrorToaster, Company, CreateEditCompanyReq, OFAB, PrimaryText } from '@monorepo/shared';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, IconButton } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import { ObjectId } from 'mongoose';
import { ServerContext } from'@monorepo/shared'";

const ProfilesPage = () => {
  const [myProfiles, setMyProfiles] = useState<Company[]>([]);
  const server = useContext(ServerContext);
  const [creating, setCreating] = useState(false);
  const fetchedProfiles = async () => {
    try {
      const res = await server?.axiosInstance.get(
        "/api/host/company/get_companies_list/",
      );
      res && setMyProfiles(res.data.data);
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
          building: "65c4effce94c48740a510f5a" as unknown as ObjectId,
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
            <Grid
              id={profile._id}
              item
              width="100%"
              container
              alignItems="center"
              wrap="nowrap"
            >
              <Grid item>
                <PrimaryText>{JSON.stringify(profile)}</PrimaryText>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => navigate("/profile/?id=" + profile._id)}
                >
                  <Edit />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() =>
                    server?.axiosInstance?.delete(
                      "/api/host/company/delete_company_lease" +
                        profile._id.toString(),
                    )
                  }
                >
                  <Delete />
                </IconButton>
              </Grid>
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
