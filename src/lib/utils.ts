export const generateInquiryId = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000); 
  return `INQ-${year}-${randomNum}`;
};