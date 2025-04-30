import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, BackHandler } from 'react-native';

export default function App() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = () => {
    Keyboard.dismiss();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to meters

    if (!w || !h) {
      setBmi(null);
      setCategory('Please enter valid numbers');
      return;
    }

    const bmiValue = w / (h * h);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setCategory('Underweight');
    else if (bmiValue < 24.9) setCategory('Normal weight');
    else if (bmiValue < 29.9) setCategory('Overweight');
    else setCategory('Obese');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>
      <Text style={styles.category}>Weight(kg)</Text>
      <TextInput
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
      />

      <Text style={styles.category}>Height(cm)</Text>
      <TextInput
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        style={styles.input}
      />

      <Button title="Calculate BMI" onPress={calculateBMI} />

      {bmi !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Your BMI: {bmi.toFixed(2)}</Text>
        </View>
      )}
      
    <Button title="Quit" onPress={() => BackHandler.exitApp()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  result: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 18,
    marginTop: 10,
    color: '#666',
  },
});
