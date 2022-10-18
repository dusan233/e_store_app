import * as yup from "yup";

export const validationSchema = [
  yup.object({
    fullName: yup.string().required("Full Name is required field"),
    address1: yup.string().required("Address1 is required field"),
    address2: yup.string().required("Address2 is required field"),
    city: yup.string().required("City is required field"),
    state: yup.string().required(),
    zip: yup.string().required("Zip is required field"),
    country: yup.string().required("Country is required field"),
  }),
  yup.object(),
  yup.object({
    nameOnCard: yup.string().required("Card Name is required"),
  }),
];
