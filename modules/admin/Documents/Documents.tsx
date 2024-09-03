'use client';
import React, {useState} from 'react';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {CustomEditor} from '@/components/CustomEditor';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {createDocument, updateDocument, getDocuments} from '@/data/api/documents';

export const Documents: React.FC = () => {
  const queryClient = useQueryClient();
  const [newDocument, setNewDocument] = useState({name: '', content: ''});
  const [editDocument, setEditDocument] = useState<{id: number; name: string; content: string} | null>(null);

  // Fetch documents
  const {data, isLoading, isError} = useQuery('documents', getDocuments);

  // Create document mutation
  const createMutation = useMutation(createDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries('documents');
      setNewDocument({name: '', content: ''});
    }
  });

  // Update document mutation
  const updateMutation = useMutation(
    ({id, data}: {id: number; data: {name: string; content: string}}) => updateDocument(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('documents');
        setEditDocument(null);
      }
    }
  );

  // Delete document mutation
  // const deleteMutation = useMutation((id: number) => deleteDocument(id), {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('documents');
  //   }
  // });

  // Handlers
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(newDocument);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editDocument) {
      updateMutation.mutate({id: editDocument.id, data: {name: editDocument.name, content: editDocument.content}});
    }
  };

  const handleDelete = (id: number) => {
    // deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading documents.</p>;

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Документы</h1>
      <div className='p-4 shadow-md rounded-lg'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left p-2'>Тип документа</th>
              <th className='text-left p-2'>Действия</th>
            </tr>
          </thead>
          <tbody>
            {data?.documents?.map((document) => (
              <tr key={document.id}>
                <td className='p-2'>{document.name}</td>
                <td className='p-2'>
                  <Dialog>
                    <DialogTrigger>
                      <button
                        className='text-blue-600 hover:underline mr-4'
                        onClick={() =>
                          setEditDocument({id: document.id, name: document.name, content: document.content})
                        }
                      >
                        Изменить
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Изменить документ</DialogTitle>
                      <Input
                        type='text'
                        placeholder='Название документа'
                        value={editDocument?.name || ''}
                        onChange={(e) => setEditDocument((prev) => (prev ? {...prev, name: e.target.value} : null))}
                        className='border p-2 w-full mb-4'
                      />
                      <CustomEditor
                        getValue={(value) => setEditDocument((prev) => (prev ? {...prev, content: value} : null))}
                        propsValue={editDocument?.content || ''}
                      />
                      <DialogFooter>
                        <Button className='mt-10' onClick={handleUpdate}>
                          Сохранить
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger>
                      <button className='text-red-500 hover:underline' onClick={() => handleDelete(document.id)}>
                        Удалить
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Удалить документ?</DialogTitle>
                      <DialogFooter>
                        <Button variant='destructive' onClick={() => handleDelete(document.id)}>
                          Подтвердить
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-4'>
          <h2 className='text-xl font-semibold mb-2'>Добавить новый документ</h2>
          <form onSubmit={handleCreate}>
            <Input
              type='text'
              placeholder='Название документа'
              value={newDocument.name}
              onChange={(e) => setNewDocument((prev) => ({...prev, name: e.target.value}))}
              className='border p-2 w-full mb-4'
            />
            <CustomEditor getValue={(value) => setNewDocument((prev) => ({...prev, content: value}))} propsValue='' />
            <Button type='submit' className='px-4 py-2 rounded-md mt-4'>
              Сохранить
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
