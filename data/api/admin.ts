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

export const createMain = async (mainData) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/createMain`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(mainData),
  }).then((data) => {
    if (!data.ok) {
      throw new Error('Ошибка при создании записи "Главная"');
    }
    return data.json();
  });
};
export const updateMain = async ({id, mainData}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/updateMain/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(mainData),
  }).then((data) => {
    if (!data.ok) {
      throw new Error('Ошибка при обновлении записи "Главная"');
    }
    return data.json();
  });
};
export const getMain = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/getMain`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then((data) => {
    if (!data.ok) {
      throw new Error('Ошибка при получении записей "Главная"');
    }
    return data.json();
  });
};
