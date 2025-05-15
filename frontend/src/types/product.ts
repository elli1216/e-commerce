interface ConnectivityTags {
  wifi: boolean;
  blueetooth: boolean;
  ethernet: boolean;
  usb3: boolean;
  thunderbolt: boolean;
  hdmi: boolean;
}

interface UsageBasedTags {
  gaming: boolean
  office: boolean
  programming: boolean
  videoEditing: boolean
  streaming: boolean
  homeUse: boolean
  business: boolean
  student: boolean
}

interface FeaturesTags {
  rgb: boolean;
  mechanical: boolean;
  backlit: boolean;
  ergonomic: boolean;
  portable: boolean;
  silent: boolean;
}

interface MiscellaneousTags {
  newArrival: boolean;
  limitedEdition: boolean;
  ecoFriendly: boolean;
  energyEfficient: boolean;
}

interface ProductTags {
  connectivity: ConnectivityTags;
  usageBased: UsageBasedTags;
  features: FeaturesTags;
  miscellaneous: MiscellaneousTags;
}

export interface IProduct {
  id: string;
  category: string;
  productImage: string
  productName: string;
  productPrice: string;
  productQuantity: string;
  productDescription: string
  tags: ProductTags
}