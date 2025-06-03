import React from 'react';
import { FlatList, View, Text, Linking, Button } from 'react-native';
import seguradoras from '../seguradoras.json'; // Caminho relativo ao arquivo

const SeguradorasList = () => (
  <FlatList
    data={seguradoras}
    keyExtractor={(item) => item.entcodigofip}
    renderItem={({ item }) => (
      <View style={{ margin: 10, padding: 10, backgroundColor: '#f4f4f4' }}>
        <Text style={{ fontWeight: 'bold' }}>{item.entnome}</Text>
        <Text>Telefone: {item.telefone}</Text>
        <Text>Endereços: {item.endereco}</Text>
        {item.entsite ? (
          <Button title="Visitar site" onPress={() => Linking.openURL(item.entsite)} />
        ) : null}
      </View>
    )}
  />
);

export default SeguradorasList;
