import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, CreditCard, Clock, CheckCircle2, ChevronRight } from 'lucide-react-native';
import axios from 'axios';

const PortalScreen = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        // Point to our Next.js backend API
        const response = await axios.get(`http://192.168.1.100:3000/api/portal/data?userId=${user?.id}`);
        setProjects(response.data.projects);
      } catch (error) {
        console.error('Portal data error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchPortalData();
  }, [user]);

  const renderProject = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <Text style={styles.projectName}>{item.name}</Text>
        <View style={[styles.statusBadge, {
          backgroundColor: item.status === 'COMPLETED' ? '#22c55e20' : '#eab30820'
        }]}>
          <Text style={[styles.statusText, {
            color: item.status === 'COMPLETED' ? '#22c55e' : '#eab308'
          }]}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.projectFooter}>
        <Text style={styles.projectLocation}>{item.location}</Text>
        <ChevronRight size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00b4ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome back,</Text>
        <Text style={styles.userName}>{user?.name} 👋</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <LayoutDashboard size={24} color="#00b4ff" />
          <Text style={styles.statValue}>{projects.length}</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.statCard}>
          <Clock size={24} color="#eab308" />
          <Text style={styles.statValue}>
            {projects.filter((p: any) => p.status === 'IN_PROGRESS').length}
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Projects</Text>
        </View>
        {projects.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No projects found</Text>
          </View>
        ) : (
          <FlatList
            data={projects}
            renderItem={renderProject}
            keyExtractor={(item: any) => item.id}
            scrollEnabled={false}
          />
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0b',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0a0a0b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  welcome: {
    fontSize: 16,
    color: '#888',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    padding: 24,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1c',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  section: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  projectCard: {
    backgroundColor: '#1a1a1c',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 12,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectLocation: {
    color: '#888',
    fontSize: 14,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
  },
  logoutButton: {
    margin: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#ef444420',
    alignItems: 'center',
  },
  logoutText: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
});

export default PortalScreen;
