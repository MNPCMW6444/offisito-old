import React, {
  ChangeEvent,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Button,
  FormLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Asset, ListAssetReq } from "@monorepo/types";
import { Add } from "@mui/icons-material";
import { ServerContext } from "@monorepo/server-provider";
import debounce from "lodash.debounce";
import { formatLabel, renderSwitchesHOC } from "@monorepo/react-components";
import toast from "react-hot-toast";

interface SpacesPageProps {}

const SpacesPage = ({}: SpacesPageProps) => {
  const [myAssets, setMyAssets] = useState<Asset[]>([]);
  const server = useContext(ServerContext);

  const fetchedAssets = async () => {
    try {
      const res = await server?.axiosInstance.get("/api/assets/assets_list");
      res && setMyAssets(res.data);
    } catch (e) {
      toast.error((e as any)?.response?.message || (e as any)?.response || e);
    }
  };

  useEffect(() => {
    fetchedAssets().then();
  }, [server?.axiosInstance]);

  return myAssets.length > 0 ? (
    <Grid
      container
      direction="column"
      rowSpacing={4}
      width="92%"
      height="80%"
      padding="10% 4%"
      sx={{ overflowX: "scroll" }}
    >
      {myAssets.map((asset) => (
        <Grid item>
          <Typography>{JSON.stringify(asset)}</Typography>
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography>No Assets yet</Typography>
  );
};

export default SpacesPage;
