// Create a new blog
export const createBlog = async (form) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/createBlog`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании блога');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get all blogs
export const getAllBlogs = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/getAllBlogs`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении списка блогов');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Update a blog
export const updateBlog = async (id, title, content, images) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/updateBlog/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, content, images})
    });

    if (!response.ok) {
      throw new Error('Ошибка при обновлении блога');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete a blog
export const deleteBlog = async (id) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/deleteBlog/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Ошибка при удалении блога');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
