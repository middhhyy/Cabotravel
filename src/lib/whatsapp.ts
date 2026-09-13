export const WHATSAPP_NUMBER = "917736406630";
export const PHONE_DISPLAY = "+91 77364 06630";
export const FOUNDER = "Amal & Meera";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildEnquiryWaMessage(data: {
  name: string;
  phone: string;
  email?: string;
  service: string;
  travelDate?: string;
  travelers?: string | number;
  message?: string;
}) {
  let msg = `Hello Cabo Tours & Travels,\n\nI would like to enquire about ${data.service}.\n\nName: ${data.name}\nPhone: ${data.phone}`;
  if (data.email) msg += `\nEmail: ${data.email}`;
  if (data.travelDate) msg += `\nTravel Date: ${data.travelDate}`;
  if (data.travelers) msg += `\nTravelers: ${data.travelers}`;
  msg += `\nService: ${data.service}`;
  if (data.message) msg += `\n\nMessage:\n${data.message}`;
  msg += `\n\nPlease assist me with the details.`;
  return msg;
}

export const waMessages = {
  general: "Hello Cabo Tours & Travels, I would like to know more about your services.",
  package: (name: string) =>
    `Hello Cabo Tours & Travels, I would like more information about the ${name} package.`,
  destination: (name: string) =>
    `Hello Cabo Tours & Travels, I would like more information about ${name} as a destination.`,
  custom: "Hello Cabo Tours & Travels, I would like help planning a customized trip.",
  visa: "Hello Cabo Tours & Travels, I would like assistance with visa processing.",
  cab: (name: string) =>
    `Hello Cabo Tours & Travels, I would like to book or enquire about renting a ${name} cab.`,
};

