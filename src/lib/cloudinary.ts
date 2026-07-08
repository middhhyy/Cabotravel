const CLOUD_NAME = "hvguispl";

export function cld(publicId: string, width = 1200) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${publicId}`;
}
