import {getCookie} from 'cookies-next';

export const getProductById = async ({id}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/getProductById/${id}`, {
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

export const getAllProducts = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/getAllProducts`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET'
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const createProduct = async (args) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/createProduct`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'POST',
    body: JSON.stringify(args)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const updateProduct = async ({id, name, description, detailed_description, price, tags, category, images}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/updateProduct/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'PUT',
    body: JSON.stringify({name, description, detailed_description, price, tags, category, images})
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const deleteProduct = async ({id}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/deleteProduct/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'DELETE'
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};
