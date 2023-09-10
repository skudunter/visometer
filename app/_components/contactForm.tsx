"use client";
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import LoadingSpinner from "./loadingSpinner";

interface FormData {
  name: string;
  email: string;
  message: string;
  sent: boolean;
}

interface FormErrors {
  nameError: string;
  emailError: string;
  messageError: string;
}

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);

  const [sending, setSending] = useState<Boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    sent: false,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    nameError: "",
    emailError: "",
    messageError: "",
  });

  const validateForm = (): boolean => {
    let validated = true;
    const newErrors: FormErrors = {
      nameError: "",
      emailError: "",
      messageError: "",
    };

    if (formData.name.length < 3) {
      validated = false;
      newErrors.nameError = "Length must be at least 3";
    }
    if (formData.email.length < 5) {
      validated = false;
      newErrors.emailError = "Length must be at least 5";
    }
    if (formData.message.length < 5) {
      validated = false;
      newErrors.messageError = "Length must be at least 5";
    }
    if (!formData.email.includes("@")) {
      validated = false;
      newErrors.emailError = "Email must be valid";
    }

    setFormData((prevData) => ({
      ...prevData,
    }));

    setFormErrors(newErrors);
    return validated;
  };

  async function sendEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateForm()) {
      setSending(true);
      await connectToApiEndPointSendEmail(
        formData.email,
        formData.name,
        formData.message
      )
        .then(() => {
          setSending(false);
        })
        .catch((error) => {
          console.error(error);
        });
      setFormData({
        name: "",
        email: "",
        message: "",
        sent: true,
      });
    } else {
      setFormData({
        ...formData,
        sent: false,
      });
    }
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 z-10 text-sm md:text-md lg:text-lg mb-10 mx-auto p-1 mt-10"
      >
        <label
          htmlFor="from_name"
          className="block font-medium text-tersiary mb-2"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="from_name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full px-2 py-1 text-primary rounded-sm focus:outline-none ${
            formData.sent ? "border-quad border-4" : ""
          } ${formErrors.nameError ? "border-4 border-quint" : ""}`}
        />
        <label
          htmlFor="from_email"
          className="block font-medium text-tersiary mb-2"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="from_email"
          placeholder="somebody@example.com"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-2 py-1 text-primary rounded-sm focus:outline-none ${
            formData.sent ? "border-quad border-4" : ""
          } ${formErrors.emailError ? "border-4 border-quint" : ""}`}
        />
        <label
          htmlFor="message"
          className="block font-medium text-tersiary mb-2"
        >
          Message
        </label>
        <textarea
          name="message"
          id="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleInputChange}
          className={`w-full px-2 py-1 text-primary rounded-sm focus:outline-none ${
            formData.sent ? "border-quad border-4" : ""
          } ${formErrors.messageError ? "border-4 border-quint" : ""}`}
          maxLength={50}
        ></textarea>
        <div className="text-center mt-6">
          {sending ? (
            <button
              type="submit"
              className={`relative text-tersiary text-center font-bold border-4 border-tersiary bg-transparent p-2 ${
                sending ? "w-20 h-20" : "w-40 h-12"
              }`}
              style={{ width: sending ? "80px" : "160px" }}
              disabled
            >
              <LoadingSpinner />
            </button>
          ) : (
            <button
              type="submit"
              className={`hover:text-primary hover:bg-tersiary transition ease-in-out duration-300 text-tersiary text-center font-bold border-4 border-tersiary bg-transparent p-2 ${
                sending ? "w-20 h-20" : "w-40 h-12"
              }`}
              style={{ width: sending ? "80px" : "160px" }}
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

async function connectToApiEndPointSendEmail(
  fromEmail: string,
  name: string,
  message: string
) {
  try {
    // Define the data to send in the request body
    const dataToSend = {
      fromEmail,
      name,
      message,
    };
    const queryParams = new URLSearchParams(dataToSend).toString();
    const response: Response = await fetch(`/api/sendEmail?${queryParams}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type
      },
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
