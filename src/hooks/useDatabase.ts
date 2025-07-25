import { useState, useEffect } from 'react';
import { DatabaseService, ChatbotResponse } from '../lib/supabase';

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

// Hook for chatbot responses
export function useChatbotResponses() {
  const [responses, setResponses] = useState<ChatbotResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadResponses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DatabaseService.getChatbotResponses();
      setResponses(data);
    } catch (err) {
      console.error('Error loading chatbot responses:', err);
      setError('Failed to load chatbot responses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResponses();
  }, []);

  return { responses, loading, error, refetch: loadResponses };
}