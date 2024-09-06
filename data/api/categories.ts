export const createCategory = async ({name}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/createCategory`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({name})
  });

  if (!response.ok) {
    throw new Error('Failed to create category');
  }

  return response.json();
};
export const deleteCategory = async (id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/deleteCategory/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete category');
  }

  return response.json();
};
export const updateCategory = async ({id, name}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/updateCategory/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST', // Используем PUT для обновления ресурса
    body: JSON.stringify({name})
  });

  if (!response.ok) {
    throw new Error('Failed to update category');
  }

  return response.json();
};
export const getCategories = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/getCategories`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
};
