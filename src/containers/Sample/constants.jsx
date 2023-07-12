import keyMirrorRecursive from "fbjs/lib/keyMirrorRecursive";

export const pageName = "SamplePage";

export const ActionTypes = keyMirrorRecursive(
    {
        CLASS_DTO: undefined,
        VALIDATION_ERROR_DTO: undefined,
    },
    pageName
);
