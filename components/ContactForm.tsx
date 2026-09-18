"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "./ui/Dropdown";
import Input from "./ui/Input";
import TextArea from "./ui/TextArea";
import InlineError from "./ui/InlineError";
import LoadingSpinner from "./ui/LoadingSpinner";
import Button from "./ui/Button";
import { Offering } from "@/lib/sanity/types/offering";
import { clsx } from "clsx";

type FormField = { value: string; isError: boolean };
type FormFieldNumber = { value: number | null; isError: boolean };
type FormData = {
  reason: FormField;
  other: FormField;
  pricing: FormFieldNumber;
  name: FormField;
  email: FormField;
  message: FormField;
};

export default function ContactForm({
  selectedOffering,
}: {
  selectedOffering: Offering | undefined;
}) {
  const [formData, setFormData] = useState<FormData>({
    reason: { value: selectedOffering?.slug?.current ?? "", isError: false },
    other: { value: "", isError: false },
    pricing: { value: null, isError: false },
    name: { value: "", isError: false },
    email: { value: "", isError: false },
    message: { value: "", isError: false },
  });

  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (selectedOffering) {
      setFormData((prev) => ({
        ...prev,
        reason: { value: selectedOffering.slug.current, isError: false },
      }));
    }
  }, [selectedOffering]);

  const dropdownOptions = [
    { value: "", label: "--- Select ---", disabled: true, hidden: true },
    { value: "connection-call", label: "Connection Call" },
    { value: "consultation", label: "Consultation" },
    {
      value: "cleansing-and-home-fortification",
      label: "Cleansing and Home Fortification",
    },
    {
      value: "space-clearing-and-blessings",
      label: "Space Clearing and Blessings",
    },
    { value: "collective-offerings", label: "Collective Offerings" },
    { value: "other", label: "Other" },
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

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Radio button changed:", e.target.name, e.target.value);
    setFormData((prev) => ({
      ...prev,
      pricing: {
        value: e.target.value ? parseFloat(e.target.value) : null,
        isError: !e.target.validity.valid,
      },
    }));
    setIsError(false);
  };

  const onCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
    setIsSuccess(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all required fields before sending
    const validateEmail = (email: string) =>
      /^\S+@\S+\.\S+$/.test(email.trim());

    const messageMinLength = 10;

    const newFormData: FormData = {
      reason: {
        value: formData.reason.value,
        isError: formData.reason.value.trim() === "",
      },
      other: {
        value: formData.other.value,
        isError:
          formData.reason.value === "other" &&
          formData.other.value.trim() === "",
      },
      pricing: {
        value: formData.pricing.value,
        isError:
          formData.reason.value === "consultation" &&
          formData.pricing.value === null,
      },
      name: {
        value: formData.name.value,
        isError: formData.name.value.trim() === "",
      },
      email: {
        value: formData.email.value,
        isError:
          formData.email.value.trim() === "" ||
          !validateEmail(formData.email.value),
      },
      message: {
        value: formData.message.value,
        isError: formData.message.value.trim().length < messageMinLength,
      },
    };
    console.log("Validated form data:", newFormData);
    setFormData(newFormData);

    const isValid = Object.values(newFormData).every((field) => !field.isError);
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
          pricing: formData.pricing.value,
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
        pricing: { value: null, isError: false },
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
    <div className="relative flex flex-col items-center justify-center min-h-100 w-full">
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
        className="flex flex-col gap-4 w-full"
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
        {formData.reason.value === "other" && (
          <Input
            id="other"
            name="other"
            value={formData.other.value}
            onChange={onInputChange}
            labelText="Specify reason"
            error={{
              isError: !isSuccess && formData.other.isError,
              message: "Please provide a reason.",
            }}
          />
        )}
        {formData.reason.value === "consultation" && (
          <fieldset>
            <legend className="mb-4">Select a pricing option:</legend>
            {selectedOffering?.pricing?.length &&
            selectedOffering.pricing.length > 1 ? (
              <ul className="flex flex-col md:flex-row md:flex-wrap gap-2 justify-between w-full">
                {selectedOffering.pricing.map((priceOption) => (
                  <li
                    key={priceOption._key}
                    className={clsx(
                      "border p-2 w-full md:max-w-[calc(50%-0.5rem)] flex flex-col gap-1 transform transition-all duration-200 hover:cursor-pointer hover:scale-102",
                      formData.pricing.value === priceOption.amount
                        ? "bg-spirityellow/40 scale-102 border-spiritblue"
                        : "bg-spiritwhite",
                    )}
                  >
                    <input
                      type="radio"
                      id={priceOption._key}
                      name="pricing"
                      value={priceOption.amount}
                      onChange={onRadioChange}
                      checked={formData.pricing.value === priceOption.amount}
                      className="opacity-0 absolute w-0 h-0"
                    />
                    <label
                      htmlFor={priceOption._key}
                      className="flex flex-col gap-2"
                    >
                      <span className="text-lg text-foreground font-semibold font-display">
                        {priceOption.amount
                          ? `${priceOption.amount} ${priceOption.currency || "$"}`
                          : ""}
                      </span>
                      <span className="font-sm text-sm uppercase tracking-widest text-spiritred">
                        {priceOption.label}
                      </span>
                      <span className="text-sm">{priceOption.description}</span>
                    </label>
                  </li>
                ))}
              </ul>
            ) : null}
          </fieldset>
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

        <Button disabled={isSending || isSuccess} className="w-full uppercase">
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
