import {
  AuthContext,
  axiosErrorToaster,
  Company,
  CreateEditCompanyReq,
  OFAB,
  PrimaryText,
} from "@monorepo/shared";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { ObjectId } from "mongoose";
import { ServerContext } from "@monorepo/shared";
import toast from "react-hot-toast";

const ProfilesPage = () => {
  const [myProfiles, setMyProfiles] = useState<Company[]>();
  const server = useContext(ServerContext);
  const [creating, setCreating] = useState(false);

  const [buildings, setBuildings] = useState<
    { value: string; label: string }[]
  >([]);

  const fetchBuildings = useCallback(async () => {
    try {
      const res = await server?.axiosInstance.get(
        "/api/host/building/autocomplete_building_add",
      );
      setBuildings([
        {
          label: res?.data?.data?.address?.street,
          value: res?.data?.data?._id,
        },
      ]);
    } catch (e) {
      axiosErrorToaster(e);
    }
  }, [server?.axiosInstance]);

  useEffect(() => {
    fetchBuildings().then();
  }, [fetchBuildings]);

  const fetchedProfiles = useCallback(async () => {
    try {
      const res = await server?.axiosInstance.get(
        "/api/host/company/get_companies_list/",
      );
      res &&
        setMyProfiles(
          res.data.data.map((company: Company) => {
            const building = buildings.find(
              ({ value }) => value.toString() === company.building.toString(),
            );
            return {
              ...company,
              building: building?.label || building?.value || company.building,
            };
          }),
        );
    } catch (e) {
      axiosErrorToaster(e);
    }
  }, [buildings]);

  useEffect(() => {
    fetchedProfiles().then();
  }, [fetchedProfiles]);

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
      {myProfiles ? (
        myProfiles.length > 0 ? (
          <Grid container direction="column" padding="5%">
            {myProfiles.map((profile) => (
              <Grid
                id={profile._id}
                item
                width="100%"
                container
                alignItems="center"
                border="1px solid black"
                borderRadius="5px"
                bgcolor={(theme) => theme.palette.background.default}
                wrap="nowrap"
                margin="2%"
              >
                <Grid
                  item
                  container
                  direction="column"
                  rowSpacing={2}
                  justifyContent="center"
                  alignItems="center"
                  padding="1%"
                >
                  <Grid item>
                    <PrimaryText>
                      {profile.companyInHold || profile.companyName}
                    </PrimaryText>
                  </Grid>
                  <Grid item>
                    <PrimaryText>
                      Building: {profile.building.toString()}
                    </PrimaryText>
                  </Grid>
                  <Grid item>
                    <PrimaryText>
                      Floor Number: {profile.floorNumber}
                    </PrimaryText>
                  </Grid>
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
                      server?.axiosInstance
                        ?.delete(
                          "/api/host/company/delete_company_lease/" +
                            profile._id.toString(),
                        )
                        .then(() => toast.success("Successfuly Deleted"))
                        .catch((e) => axiosErrorToaster(e))
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
        )
      ) : (
        <PrimaryText>Loading you Profiles...</PrimaryText>
      )}
    </>
  );
};

export default ProfilesPage;
