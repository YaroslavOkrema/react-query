import { useInfiniteQuery } from '@tanstack/react-query';
import { todoListApi } from '../../shared/api/TodoListApi/todoListApi.ts';
import { useCallback, useRef, useState } from 'react';

export const TodoList = () => {
  const [enabled, setEnabled] = useState(false);

  const {
    data: todoItems,
    error,
    isLoading,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...todoListApi.getTodoListInfinityQueryOptions(),
    enabled: enabled,
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="text-3xl font-bold underline mb-5">List</h1>
      <button onClick={() => setEnabled((prev) => !prev)}>
        Toggle enabled
      </button>
      <div
        className={
          'flex flex-col gap-4' + (isPlaceholderData ? ' opacity-50' : '')
        }
      >
        {todoItems?.map((todo) => (
          <div className="border border-slate-300 rounded p-3" key={todo.id}>
            {todo.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4" ref={cursorRef}>
        {!hasNextPage && <div>No data</div>}
        {isFetchingNextPage && <div>Loading...</div>}
      </div>
    </div>
  );
};

export const useIntersection = (onIntersect: () => void) => {
  const unsubscribe = useRef(() => {});

  return useCallback((el: HTMLDivElement | null) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((intersection) => {
        if (intersection.isIntersecting) {
          onIntersect();
        }
      });
    });

    if (el) {
      observer.observe(el);
      unsubscribe.current = () => observer.disconnect();
    } else {
      unsubscribe.current();
    }
  }, []);
};
