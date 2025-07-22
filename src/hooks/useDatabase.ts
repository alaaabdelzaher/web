import { useState, useEffect } from 'react';
import { DatabaseService } from '../lib/supabase';

// Simple hook for loading data
export function useData() {
  const [data, setData] = useState<any>({
    posts: [],
    sections: [],
    messages: [],
    settings: {}
  });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [posts, sections, messages] = await Promise.all([
        DatabaseService.getBlogPosts(),
        DatabaseService.getContentSections(),
        DatabaseService.getContactMessages()
      ]);
      
      setData({
        posts,
        sections,
        messages,
        settings: {}
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, refetch: loadData };
}