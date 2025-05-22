export interface FormData {
  category: string;
  productImage: string;
  productBrand: string;
  productName: string;
  productPrice: string;
  productStock: string;
  productDescription: string;
  productTags: {
    connectivity: {
      wifi: string;
      bluetooth: string;
      ethernet: string;
      usb3: string;
      thunderbolt: string;
      hdmi: string;
    };
    usageBased: {
      gaming: string;
      office: string;
      programming: string;
      videoEditing: string;
      streaming: string;
      homeUse: string;
      business: string;
      student: string;
    };
    features: {
      rgb: string;
      mechanical: string;
      backlit: string;
      ergonomic: string;
      portable: string;
      silent: string;
    };
    miscellaneous: {
      newArrival: string;
      limitedEdition: string;
      ecoFriendly: string;
      energyEfficient: string;
    };
  };
}

export const initialFormData: FormData = {
  category: "",
  productImage: "",
  productBrand: "",
  productName: "",
  productPrice: "",
  productStock: "",
  productDescription: "",
  productTags: {
    connectivity: {
      wifi: "false",
      bluetooth: "false",
      ethernet: "false",
      usb3: "false",
      thunderbolt: "false",
      hdmi: "false",
    },
    usageBased: {
      gaming: "false",
      office: "false",
      programming: "false",
      videoEditing: "false",
      streaming: "false",
      homeUse: "false",
      business: "false",
      student: "false",
    },
    features: {
      rgb: "false",
      mechanical: "false",
      backlit: "false",
      ergonomic: "false",
      portable: "false",
      silent: "false",
    },
    miscellaneous: {
      newArrival: "false",
      limitedEdition: "false",
      ecoFriendly: "false",
      energyEfficient: "false",
    },
  },
};
