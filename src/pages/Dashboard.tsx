import React, { useState, useEffect } from 'react';
import { 
  Home, FileText, MessageSquare, Settings, Users, Shield, 
  Edit3, Save, X, Plus, Trash2, Eye, EyeOff, Moon, Sun,
  Phone, Mail, MapPin, Star, Award, CheckCircle, Globe,
  Calendar, User, Tag, Search, ArrowRight, Target, Flame,
  AlertTriangle, LogOut, Upload, Image as ImageIcon
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService } from '../lib/supabase';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { language, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState('services');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Content states
  const [services, setServices] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [aboutContent, setAboutContent] = useState<any>({});
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);

  // Form states
  const [editingService, setEditingService] = useState<any>(null);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [editingCert, setEditingCert] = useState<any>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<any>(null);

  // Load data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [
        servicesData,
        postsData,
        certificationsData,
        teamData,
        aboutData
      ] = await Promise.all([
        DatabaseService.getContentSection('home_content'),
        DatabaseService.getCertifications(),
        DatabaseService.getServices(),
        DatabaseService.getTestimonials(),
        DatabaseService.getStats(),
        DatabaseService.getTeamMembers(),
        DatabaseService.getContentSection('about_content')
      ]);
      
      const [servicesData2, postsData2, certsData, teamData2, messagesData, aboutData2] = await Promise.all([
        DatabaseService.getServices(),
        DatabaseService.getBlogPosts(),
        DatabaseService.getHomepageContent(),
        DatabaseService.getCertifications(),
        DatabaseService.getTeamMembers(),
        DatabaseService.getContactMessages(),
        DatabaseService.getContentSection('about_content')
      ]);

      setServices(servicesData2);
      setBlogPosts(postsData2);
      setCertifications(certsData);
      setTeamMembers(teamData2);
      setContactMessages(messagesData);
      
      if (aboutData2?.content) {
        try {
          setAboutContent(JSON.parse(aboutData2.content));
        } catch {
          setAboutContent({});
        }
      }
    } catch (error) {
      console.error('Error loading data:',