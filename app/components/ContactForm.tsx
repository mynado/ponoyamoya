"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import InlineError from "@/components/InlineError";
import LoadingSpinner from "@/components/LoadingSpinner";

type FormField = { value: string; isError: boolean };
type FormData = {
  reason: FormField;
  other: FormField;
  name: FormField;
  email: FormField;
  message: FormField;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    reason: { value: "", isError: false },
    other: { value: "", isError: false },
    name: { value: "", isError: false },
    email: { value: "", isError: false },
    message: { value: "", isError: false },
  });

  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  const dropdownOptions = [
    { value: "", label: "--- Select ---", disabled: true, hidden: true },
    { value: "Consultation", label: "Consultation" },
    { value: "Cleansing", label: "Cleansing and Home Fortification" },
    { value: "Collective", label: "Collective offerings" },
    { value: "Workshop", label: "Workshop" },
    { value: "Other", label: "Other" },
  ];

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: {
        value: e.target.value,
        isError: !e.target.validity.valid,
      },
    }));
    setIsError(false);
  };

  const onOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      reason: { value: e.target.value, isError: !e.target.validity.valid },
    }));
    setIsError(false);
  };

  const onCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
    setIsSuccess(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = Object.values(formData).every((field) => !field.isError);
    console.log("Form validation result:", isValid);
    if (!isValid) {
      setIsError(true);
      return;
    }

    setIsSending(true);
    setIsError(false);

    try {
      console.log("Attempting to send form data to /api/contact");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason: formData.reason.value,
          other: formData.other.value,
          name: formData.name.value,
          email: formData.email.value,
          message: formData.message.value,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setIsSuccess(true);
      setShowSuccessMessage(true);
      setIsError(false);
      setFormData({
        reason: { value: "", isError: false },
        other: { value: "", isError: false },
        name: { value: "", isError: false },
        email: { value: "", isError: false },
        message: { value: "", isError: false },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsError(true);
    } finally {
      console.log("Finished submission attempt");
      setIsSending(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[400px] w-full">
      {showSuccessMessage && (
        <div className="absolute left-4 right-4 p-4 bg-white shadow-md max-w-md rounded-md flex flex-col gap-4 justify-center mx-auto">
          <h3 className="text-spiritblue">Thanks for reaching out!</h3>
          <p>
            We&apos;ve received your message and will reply as soon as possible!
          </p>
          <Button typeStyle="tertiary" onClick={onCloseSuccessMessage}>
            Close
          </Button>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        noValidate
        className="flex flex-col gap-4 w-full font-body"
      >
        <Dropdown
          id="reason"
          name="reason"
          value={formData.reason.value}
          onChange={onOptionChange}
          dropdownOptions={dropdownOptions}
          labelText="Reason for contact"
          error={{
            isError: !isSuccess && formData.reason.isError,
            message: "Please select a reason.",
          }}
          required
        />
        {formData.reason.value === "Other" && (
          <Input
            id="other"
            name="other"
            value={formData.other.value}
            onChange={onInputChange}
            labelText="Specify reason"
            required
            error={{
              isError: !isSuccess && formData.other.isError,
              message: "Please provide a reason.",
            }}
          />
        )}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            id="name"
            name="name"
            value={formData.name.value}
            onChange={onInputChange}
            labelText="Name"
            required
            error={{
              isError: !isSuccess && formData.name.isError,
              message: "Name is required.",
            }}
          />
          <Input
            id="email"
            name="email"
            value={formData.email.value}
            onChange={onInputChange}
            labelText="Email"
            type="email"
            required
            error={{
              isError: !isSuccess && formData.email.isError,
              message: "Invalid email.",
            }}
          />
        </div>
        <TextArea
          id="message"
          name="message"
          value={formData.message.value}
          onChange={onInputChange}
          labelText="Message"
          required
          error={{
            isError: !isSuccess && formData.message.isError,
            message: "Please add more details to your message.",
          }}
          minLength={10}
        />

        <Button
          disabled={isSending || isSuccess}
          className="w-max min-w-[150px] uppercase"
        >
          {isSending ? (
            <LoadingSpinner
              width={20}
              height={20}
              className="invert"
              alt="Loading..."
            />
          ) : (
            "Send Message"
          )}
        </Button>

        {isError && !isSuccess && (
          <InlineError>
            There was an error sending your message. Please try again.
          </InlineError>
        )}
      </form>
    </div>
  );
}
