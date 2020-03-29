import React, {useEffect, useState} from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {  View, Image, Text, FlatList, TouchableOpacity  } from 'react-native';

import logoPng from '../../assets/logo.png'

//import api from '../../services/api';

import styles from './styles';

export default function Incidents() {
  const navigation = useNavigation();
  const [incidents, setIncident] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  function navigateToDetail(incident) {
      navigation.navigate('Details', {incident});
  };
  async function loadIncidents() {
    if(total > 0 && incidents.length == total) {
        console.log('Não vai mais')
        return;
    }
    console.log('incidentes' + incidents.length);
    console.log('Total' + total);
    if (loading) {
        console.log('carregando')
        return;
    }

    

    setLoading(true);
    
    const response = await api.get('incidents', {
        params:{ page }
    });
    setIncident([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setLoading(false);
    setPage(page + 1);
    
  };
  useEffect(() => {
    loadIncidents();
  }, []);
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={logoPng} />
            <Text style={styles.headerText}>
                Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
            </Text>
        </View>
        <Text style={styles.title}>
            Bem-vindo!
        </Text>
        <Text style={styles.description}>
            Escolha um dos casos abaixo e salve o dia.
        </Text>

        <FlatList style={styles.incidentList} 
            data={incidents}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={true}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            renderItem={({item: incident}) => (
                <View style={styles.incident}>
                <Text style={styles.incidentProporty}>
                    ONG:
                </Text>
                <Text style={styles.incidentValue}>
                    {incident.name}
                </Text>
                <Text style={styles.incidentProporty}>
                    CASO:
                </Text>
                <Text style={styles.incidentValue}>
                    {incident.title}
                </Text>
                <Text style={styles.incidentProporty}>
                    VALOR:
                </Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(incident.value)}
                </Text>
                <TouchableOpacity style={styles.detailsButton} 
                    onPress={() => navigateToDetail(incident) }>
                    <Text style={styles.detailsButtonText}>
                        Ver mais detalhes
                    </Text>
                    <Feather name="arrow-right" size={16} color="#E02041" />
                </TouchableOpacity>
            </View>
            )}
        />

        
    </View>
  );
}

