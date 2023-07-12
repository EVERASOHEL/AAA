import keyMirrorRecursive from "fbjs/lib/keyMirrorRecursive";

export const pageName = "SampleFunctionalPage";

export const ActionTypes = keyMirrorRecursive(
    {
        CLASS_DTO: undefined,
        RESET_DATA: undefined,
        RESPONSE_DTO: undefined,
    },
    pageName
);
