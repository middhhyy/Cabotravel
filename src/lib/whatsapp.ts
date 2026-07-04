export const WHATSAPP_NUMBER = "917736406630";
export const PHONE_DISPLAY = "+91 77364 06630";
export const FOUNDER = "Amal & Meera";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
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
