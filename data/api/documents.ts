export const createDocument = async (documentData) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/createDocument`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(documentData)
  }).then((data) => {
    if (!data.ok) {
      throw new Error('Ошибка при создании документа');
    }
    return data.json();
  });
};
export const updateDocument = async (id, documentData) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/updateDocument/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(documentData)
  }).then((data) => {
    if (!data.ok) {
      throw new Error('Ошибка при обновлении документа');
    }
    return data.json();
  });
};
export const deleteDocument = async (id) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/deleteDocument/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  }).then((data) => {
    if (!data.ok) {
      throw new Error('Ошибка при удалении документа');
    }
    return data.json();
  });
};
export const getDocuments = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/getDocuments`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then((data) => {
    if (!data.ok) {
      throw new Error('Ошибка при получении списка документов');
    }
    return data.json();
  });
};
