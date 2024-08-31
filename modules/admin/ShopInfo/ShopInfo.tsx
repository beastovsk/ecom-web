import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const ShopInfo: React.FC = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Информация о магазине</h1>
      <div className=' p-4 shadow-md rounded-lg'>
        <form>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Название магазина</label>
            <Input type='text' placeholder='Название магазина' className='border p-2 w-full' />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Описание</label>
            <Textarea placeholder='Описание магазина' className='border p-2 w-full h-24'/>
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Логотип</label>
            <Input type='file' className='border p-2 w-full' />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>SEO теги</label>
            <Input type='text' placeholder='SEO теги' className='border p-2 w-full' />
          </div>
          <Button type='submit' className='px-4 py-2 rounded-md'>
            Сохранить
          </Button>
        </form>
      </div>
    </div>
  );
};
