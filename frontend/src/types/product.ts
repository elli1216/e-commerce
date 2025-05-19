interface ConnectivityTags {
  wifi: string;
  bluetooth: string;
  ethernet: string;
  usb3: string;
  thunderbolt: string;
  hdmi: string;
}

interface UsageBasedTags {
  gaming: string
  office: string
  programming: string
  videoEditing: string
  streaming: string
  homeUse: string
  business: string
  student: string
}

interface FeaturesTags {
  rgb: string;
  mechanical: string;
  backlit: string;
  ergonomic: string;
  portable: string;
  silent: string;
}

interface MiscellaneousTags {
  newArrival: string;
  limitedEdition: string;
  ecoFriendly: string;
  energyEfficient: string;
}

interface Tags {
  connectivity: ConnectivityTags;
  usageBased: UsageBasedTags;
  features: FeaturesTags;
  miscellaneous: MiscellaneousTags;
}

export interface IProduct {
  id: string;
  category: string;
  productImage: string
  productBrand: string;
  productName: string;
  productPrice: string;
  productStock: string;
  productDescription: string
  tags: Tags;
}