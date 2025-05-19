export interface Tag {
    connectivity: {
        wifi: boolean;
        bluetooth: boolean;
        ethernet: boolean;
        usb3: boolean;
        thunderbolt: boolean;
        hdmi: boolean;
    };
    usageBased: {
        gaming: boolean;
        office: boolean;
        programming: boolean;
        videoEditing: boolean;
        streaming: boolean;
        homeUse: boolean;
        business: boolean;
        student: boolean;
    };
    features: {
        rgb: boolean;
        mechanical: boolean;
        backlit: boolean;
        ergonomic: boolean;
        portable: boolean;
        silent: boolean;
    };
    miscellaneous: {
        newArrival: boolean;
        limitedEdition: boolean;
        ecoFriendly: boolean;
        energyEfficient: boolean;
    };
}