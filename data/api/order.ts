import {getCookie} from 'cookies-next';

export const createOrder = async ({products, phoneNumber, firstName, lastName, additionalInfo}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/createOrder`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'POST',
    body: JSON.stringify({
      products,
      phone_number: phoneNumber,
      first_name: firstName,
      last_name: lastName,
      additional_info: additionalInfo || ''
    })
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const getAllOrders = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/getAllOrders`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const getOrderById = async ({id}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/getOrderById/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};
export const getUserOrders = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/getUserOrders`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'GET'
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};
