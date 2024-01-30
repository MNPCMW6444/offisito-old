import { Asset } from "@monorepo/types";

interface AssetCardProps {
  asset: Asset;
}

const AssetCard = ({ asset }: AssetCardProps) => {
  return JSON.stringify(asset);
};

export default AssetCard;
