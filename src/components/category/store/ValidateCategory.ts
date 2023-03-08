import * as Yup from "yup";

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
  ];

export const CreateCategoryValidatorShema = Yup.object().shape({
    name: Yup.string().required("Required").label("Name"),
    description: Yup.string().required("Required").label("Description"),
    // image: Yup.mixed().required("Image must be selected").label("Image"),

});
