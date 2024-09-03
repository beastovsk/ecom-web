export const createBanner = async (bannerData) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/createBanner`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(bannerData)
  }).then((data) => {
    if (!data.ok) {
      throw new Error('Ошибка при создании баннера');
    }
    return data.json();
  });
};
export const deleteBanner = async (id) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/deleteBanner/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  }).then((data) => {
    if (!data.ok) {
      throw new Error('Ошибка при удалении баннера');
    }
    return data.json();
  });
};
export const getBanners = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/getBanners`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then((data) => {
    if (!data.ok) {
      throw new Error('Ошибка при получении списка баннеров');
    }
    return data.json();
  });
};
