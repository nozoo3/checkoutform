export const formatPhoneNumber = (phoneNumber: string): string => {
  const match = phoneNumber.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

export const formatPostCode = (postCode: string): string => {
  const match = postCode.match(/^(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}`;
  }
  return postCode;
};
