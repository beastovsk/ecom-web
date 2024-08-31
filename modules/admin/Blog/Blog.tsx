export const Blog: React.FC = () => {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Блог</h1>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Название статьи</th>
                <th className="text-left p-2">Изображение</th>
                <th className="text-left p-2">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Пост 1</td>
                <td className="p-2">
                  <img src="/images/post1.jpg" alt="Post 1" className="w-32" />
                </td>
                <td className="p-2">
                  <button className="text-blue-600 hover:underline mr-4">Изменить</button>
                  <button className="text-red-600 hover:underline">Удалить</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Добавить новый пост</h2>
            <form>
              <input type="text" placeholder="Название поста" className="border p-2 w-full mb-4" />
              <textarea placeholder="Содержимое" className="border p-2 w-full h-40 mb-4"></textarea>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Сохранить
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  