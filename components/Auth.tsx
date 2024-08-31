"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface FormData {
  name: string;
  jobTitle: string;
  aboutMe: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  jobTitle: Yup.string()
    .required("Job Title is required")
    .min(2, "Job Title must be at least 2 characters"),
  aboutMe: Yup.string()
    .required("About Me is required")
    .max(500, "About Me must be less than 500 characters"),
});

const Auth: React.FC = () => {
  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState({ name: "", jobTitle: "", aboutMe: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormData) => {
    localStorage.setItem("user", JSON.stringify(data));
    setIsUser(true);
  };
  const handlLogout = () => {
    localStorage.removeItem("user");
    setIsUser(false);
  };
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
      setIsUser(true);
    }
  }, [isUser]);

  if (user && isUser)
    return (
      <div className="flex flex-col items-center justify-center mt-24">
        <h1 className="text-5xl font-bold text-gray-500 mb-4 animate-fadeIn">
          Welcome, {user.name}!
        </h1>
        <p className="text-lg text-center text-gray-600 mb-4">
          We are glad to see you here!
        </p>
        <p className="text-lg text-center text-gray-600 mb-4">
          You can go to Jobs to see the recommendations
        </p>
        <button
          onClick={handlLogout}
          className="bg-blue-600 hover:bg-blue-500 text-white rounded p-2"
        >
          Logout
        </button>
      </div>
    );
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={`w-full px-3 py-2 border rounded ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="jobTitle"
          className="block text-gray-700 font-bold mb-2"
        >
          Desired Job Title
        </label>
        <input
          id="jobTitle"
          type="text"
          {...register("jobTitle")}
          className={`w-full px-3 py-2 border rounded ${
            errors.jobTitle ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="aboutMe" className="block text-gray-700 font-bold mb-2">
          About Me
        </label>
        <textarea
          id="aboutMe"
          {...register("aboutMe")}
          className={`w-full px-3 py-2 border rounded ${
            errors.aboutMe ? "border-red-500" : "border-gray-300"
          }`}
        ></textarea>
        {errors.aboutMe && (
          <p className="text-red-500 text-sm mt-1">{errors.aboutMe.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
      >
        Register
      </button>
    </form>
  );
};

export default Auth;

// переделать на Формик!
// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// interface FormValues {
//   name: string;
//   jobTitle: string;
//   aboutMe: string;
// }

// const validationSchema = Yup.object({
//   name: Yup.string()
//     .min(2, 'Name must be at least 2 characters')
//     .max(50, 'Name must be 50 characters or less')
//     .required('Name is required'),
//   jobTitle: Yup.string()
//     .min(2, 'Job Title must be at least 2 characters')
//     .max(50, 'Job Title must be 50 characters or less')
//     .required('Job Title is required'),
//   aboutMe: Yup.string()
//     .min(10, 'About Me must be at least 10 characters')
//     .max(300, 'About Me must be 300 characters or less')
//     .required('About Me is required'),
// });

// const UserProfileForm: React.FC = () => {
//   const initialValues: FormValues = {
//     name: '',
//     jobTitle: '',
//     aboutMe: '',
//   };

//   const handleSubmit = (values: FormValues) => {
//     console.log(values);
//     // Здесь можно добавить логику для сохранения данных
//   };

//   return (
//     <div className="w-full max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Create Profile</h2>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-gray-700">
//                 Name
//               </label>
//               <Field
//                 type="text"
//                 id="name"
//                 name="name"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="jobTitle" className="block text-gray-700">
//                 Job Title
//               </label>
//               <Field
//                 type="text"
//                 id="jobTitle"
//                 name="jobTitle"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <ErrorMessage name="jobTitle" component="div" className="text-red-500 text-sm mt-1" />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="aboutMe" className="block text-gray-700">
//                 About Me
//               </label>
//               <Field
//                 as="textarea"
//                 id="aboutMe"
//                 name="aboutMe"
//                 rows={4}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <ErrorMessage name="aboutMe" component="div" className="text-red-500 text-sm mt-1" />
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {isSubmitting ? 'Submitting...' : 'Submit'}
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default UserProfileForm;