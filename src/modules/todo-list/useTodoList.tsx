import { useQuery } from '@tanstack/react-query';
import { todoListApi } from '../../shared/api/TodoListApi/todoListApi.ts';

export const useTodoList = () => {
  const {
    data: todoItems,
    error,
    isLoading,
  } = useQuery({
    ...todoListApi.getTodoListQueryOptions(),
    select: (data) => data.reverse(),
  });

  return { error, todoItems, isLoading };
};
