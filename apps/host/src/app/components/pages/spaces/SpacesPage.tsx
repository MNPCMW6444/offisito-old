import React, { useContext, useEffect, useState } from "react";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Asset,
  axiosErrorToaster,
  CreateEditAssetReq,
  OFAB,
  PrimaryText,
  ServerContext,
} from "@monorepo/shared";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import { ObjectId } from "mongoose";

const SpacesPage = () => {
  const [myAssets, setMyAssets] = useState<Asset[]>([]);
  const server = useContext(ServerContext);
  const [creating, setCreating] = useState(false);
  const fetchedAssets = async () => {
    try {
      const res = await server?.axiosInstance.get(
        "/api/host/asset/assets_list",
      );
      res && setMyAssets(res.data);
    } catch (e) {
      axiosErrorToaster(e);
    }
  };

  useEffect(() => {
    fetchedAssets().then();
  }, [server?.axiosInstance]);

  const navigate = useNavigate();

  const createNew = async () => {
    if (!creating) {
      setCreating(true);
      try {
        const res = await server?.axiosInstance.post<
          any,
          any,
          CreateEditAssetReq
        >("api/host/asset/add_asset", {
          roomNumber: "1213",
          assetType: "office",
          leaseCondition: {},
          leasingCompany: "65c61aca2442a903ee92a23a" as unknown as ObjectId,
        });
        const newAssetId = res?.data?.data?._id.toString();
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
      <OFAB onClick={createNew}>
        <Add />
      </OFAB>
      {myAssets.length > 0 ? (
        <Grid container direction="column" rowSpacing={4}>
          {myAssets.map((asset) => (
            <Grid
              id={asset._id}
              item
              width="100%"
              container
              alignItems="center"
              wrap="nowrap"
            >
              <Grid item>
                <PrimaryText>{JSON.stringify(asset)}</PrimaryText>
              </Grid>
              <Grid item>
                <IconButton onClick={() => navigate("/space/?id=" + asset._id)}>
                  <Edit />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() =>
                    server?.axiosInstance?.delete(
                      "/api/host/asset/delete_asset/" + asset._id.toString(),
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
        <PrimaryText>No Assets yet</PrimaryText>
      )}
    </>
  );
};

export default SpacesPage;
