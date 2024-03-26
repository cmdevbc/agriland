"use client";
import { toast } from "react-toastify";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm as useFormSpree, ValidationError } from "@formspree/react";
import { useEffect } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const schema = yup
  .object({
    name: yup.string().required().label("Name"),
    email: yup.string().required().email().label("Email"),
    message: yup.string().required().label("Message"),
  })
  .required();

const DocumentForm = () => {
  const [state, handleSubmitSpree] = useFormSpree("xrgnybyj");
  // const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
  // const onSubmit = (data: FormData) => {
  //    handleSubmitSpree(data);
  //    const notify = () => toast('Message sent successfully', { position: 'top-center' });
  //    notify();
  //    reset();
  // };

  useEffect(() => {
    if (state.succeeded) {
      toast("Message sent successfully", { position: "top-center" });
    }
  }, [state]);

  return (
    <form onSubmit={handleSubmitSpree}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-grp">
            <input type="text" name="name" id="name" placeholder="Your Name" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-grp">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
        </div>
      </div>
      <div className="form-grp">
        <textarea
          id="message"
          name="message"
          placeholder="Enter you message....."
        ></textarea>
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>
      <button type="submit" className="btn">
        Send Message
      </button>
    </form>
  );
};

export default DocumentForm;
