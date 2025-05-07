import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { useState } from 'react';
import { supabase } from '../supabase';

interface QueryOptions {
  table: string;
  select?: string;
  eq?: { column: string; value: any };
  limit?: number;
  order?: { column: string; ascending: boolean };
  single?: boolean;
}

export const useSupabaseQuery = <T>({
  table,
  select = '*',
  eq,
  limit,
  order,
  single,
}: QueryOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const baseQuery = supabase.from(table).select(select);
      let query: PostgrestFilterBuilder<any, any, any> = baseQuery;

      if (eq) {
        query = query.eq(eq.column, eq.value);
      }

      if (limit) {
        query = query.limit(limit);
      }

      if (order) {
        query = query.order(order.column, { ascending: order.ascending });
      }

      if (single) {
        const { data: result, error: queryError } = await query.single();
        if (queryError) {
          setError(queryError.message);
          return;
        }
        setData(result as T);
        return;
      }

      const { data: result, error: queryError } = await query;

      if (queryError) {
        setError(queryError.message);
        return;
      }

      setData(result as T);
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};
