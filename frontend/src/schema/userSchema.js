import * as yup from "yup";

export const signupSchema = yup
  .object({
    userName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required("Plz Enter Youre Password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .max(10, "Password Must Contain 10 Characters")
      .min(10, "Password Must Contain 10 Characters"),
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required("Plz Enter Youre Password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .max(10, "Password Must Contain 10 Characters")
      .min(10, "Password Must Contain 10 Characters"),
  })
  .required();

export const userProfileSchema = yup.object().shape({
  currentpassword: yup
    .string()
    .required("Current Password is required")
    .max(10, "Password Must Contain 10 Characters")
    .min(10, "Password must be at least 10 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/,
      "Must Contain 10 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  password: yup
    .string()
    .required("New Password is required")
    .max(10, "Password Must Contain 10 Characters")
    .min(10, "Password must be at least 10 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/,
      "Must Contain 10 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .max(10, "Password Must Contain 10 Characters")
    .oneOf([yup.ref("password")], "Password dosen't match"),
});
