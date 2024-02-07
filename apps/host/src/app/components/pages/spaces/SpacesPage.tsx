import React, { useContext, useEffect, useState } from 'react';
import { Fab, Grid, Typography } from '@mui/material';
import { Asset, CreateAssetReq } from '@monorepo/types';
import { Add } from '@mui/icons-material';
import { ServerContext } from '@monorepo/server-provider';
import { axiosErrorToaster } from '@monorepo/react-components';
import { AssetCard } from '@monorepo/react-components';
import { useNavigate } from 'react-router-dom';

const SpacesPage = () => {
  const [myAssets, setMyAssets] = useState<Asset[]>([]);
  const server = useContext(ServerContext);
  const [creating, setCreating] = useState(false);
  const fetchedAssets = async () => {
    try {
      const res = await server?.axiosInstance.get('/api/assets/assets_list');
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
        const res = await server?.axiosInstance.post('api/assets/add_asset', {
          roomNumber: '1213',
          leaseCondition: { dailyPrice: 1, leaseType: 'daily' }
        } as CreateAssetReq);
        const newAssetId = res?.data?.asset?._id.toString();
        newAssetId && navigate('/space/?id=' + newAssetId);
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
          position: 'fixed',
          bottom: '10%',
          right: '5%'
        }}
        onClick={createNew}
      >
        <Add />
      </Fab>
      {myAssets.length > 0 ? (
        <Grid container direction="column" rowSpacing={4}>
          {myAssets.map((asset) => (
            <Grid id={asset._id} item>
              <AssetCard asset={asset} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="primary">No Assets yet</Typography>
      )}
    </>
  );
};

export default SpacesPage;
