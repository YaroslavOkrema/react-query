import { useQuery } from '@tanstack/react-query';
import { todoListApi } from '../../shared/api/TodoListApi';

export const TodoList = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ['tasks', 'list'],
    queryFn: todoListApi.getTodoList,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>List</h1>
      {data?.map((todo) => <div key={todo.id}>{todo.text}</div>)}
    </div>
  );
};
