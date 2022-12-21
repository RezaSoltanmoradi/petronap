const UPLOADER_URL = process.env.REACT_APP_API_UPLOADER_URL;

export const BASE_URL = process.env.REACT_APP_API_URL;

export const IMAGE_URL = `${UPLOADER_URL}uploader/`;

export const imageHandler = imageId => {
    return `${IMAGE_URL}${imageId}/download/`;
};
