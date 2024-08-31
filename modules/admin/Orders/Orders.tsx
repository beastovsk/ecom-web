export const Orders: React.FC = () => {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Заказы</h1>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Номер заказа</th>
                <th className="text-left p-2">Имя клиента</th>
                <th className="text-left p-2">Телефон</th>
                <th className="text-left p-2">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">#12345</td>
                <td className="p-2">Иван Иванов</td>
                <td className="p-2">+7 (900) 123-45-67</td>
                <td className="p-2">
                  <button className="text-blue-600 hover:underline mr-4">Посмотреть</button>
                  <button className="text-red-600 hover:underline">Удалить</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  