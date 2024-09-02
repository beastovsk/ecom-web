export const getAllUsers = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getAllUsers`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET'
  }).then((data) => {
    if (!data.ok) {
      return;
    }
    return data.json();
  });
};
