import React, { useContext, useEffect, useState } from "react";
import { Asset, CreateEditAssetReq } from "@monorepo/types";
import { Add } from "@mui/icons-material";
import { ServerContext } from "@monorepo/server-provider";
import { axiosErrorToaster } from "@monorepo/react-components";
import { AssetCard } from "@monorepo/react-components";
import { useNavigate } from "react-router-dom";
import { OFAB, PrimaryText } from "@monorepo/react-styles";
import { Grid } from "@mui/material";
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
          leasingCompany: "65c527ef7c116ba110f11cdc" as unknown as ObjectId,
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
            <Grid id={asset._id} item>
              <AssetCard asset={asset} />
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
