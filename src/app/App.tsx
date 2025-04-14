import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../shared/api/query-client.ts';
import { TodoList } from '../modules/todo-list/todo-list.tsx';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  );
}
