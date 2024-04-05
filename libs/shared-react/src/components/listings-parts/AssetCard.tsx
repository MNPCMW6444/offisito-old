import { Asset } from "@offisito/shared";
import { Grid } from "@mui/material";
import { PrimaryText } from "../../styled-components";
import { useNavigate } from "react-router-dom";
import { Img } from "..";
import { mock1 } from "../../assets";

interface AssetCardProps {
  asset: Asset;
}

export const AssetCard = ({ asset }: AssetCardProps) => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="column"
      width="96%"
      marginLeft="2%"
      padding="10%"
      rowSpacing={1}
      onClick={() => navigate("/?space=" + asset._id.toString())}
      borderRadius="10px"
      border="1px solid #C5C5C5"
    >
      <Grid item width="100%" height="31.65%">
        <Img
          width="auto"
          height="100%"
          src={(asset.photoURLs && asset.photoURLs[0]) || mock1}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </Grid>
      <Grid item>
        <PrimaryText>{asset.assetDescription}</PrimaryText>
      </Grid>
      <Grid item container alignItems="center" wrap="nowrap" width="100%">
        <Grid item width="50%">
          <PrimaryText>{asset.assetAmenities?.join(", ")}</PrimaryText>
        </Grid>
        <Grid item width="50%">
          <PrimaryText>{asset.leaseCondition?.monthlyPrice}$/Month</PrimaryText>
        </Grid>
      </Grid>
    </Grid>
  );
};
