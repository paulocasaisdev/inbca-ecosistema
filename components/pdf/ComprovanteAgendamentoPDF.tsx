'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  header: { borderBottom: '2px solid #ca8a04', paddingBottom: 10, marginBottom: 20 },
  title: { fontSize: 24, color: '#ca8a04', fontWeight: 'bold' },
  subtitle: { fontSize: 12, color: '#6b7280', marginTop: 5 },
  box: { padding: 20, border: '1px solid #e5e7eb', borderRadius: 8, marginBottom: 20, backgroundColor: '#fafaf9' },
  label: { fontSize: 10, color: '#6b7280', marginBottom: 4 },
  value: { fontSize: 14, fontWeight: 'bold', marginBottom: 15, color: '#1f2937' },
  qrContainer: { alignItems: 'center', marginTop: 20 },
  qrImage: { width: 120, height: 120 },
  footer: { position: 'absolute', bottom: 40, left: 40, right: 40, textAlign: 'center', fontSize: 10, color: '#9ca3af', borderTop: '1px solid #e5e7eb', paddingTop: 10 },
});

interface ComprovanteProps {
  codigo: string;
  pacienteNome: string;
  servico: string;
  dataGeracao: string;
}

export const ComprovanteAgendamentoPDF = ({ codigo, pacienteNome, servico, dataGeracao }: ComprovanteProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>INBCA - Agendamento Comunitário</Text>
        <Text style={styles.subtitle}>Comprovante Oficial de Marcação</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>CÓDIGO DE ATENDIMENTO</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#b45309', marginBottom: 15 }}>{codigo}</Text>
        
        <Text style={styles.label}>NOME DO PACIENTE / ALUNO</Text>
        <Text style={styles.value}>{pacienteNome}</Text>

        <Text style={styles.label}>SERVIÇO SOLICITADO</Text>
        <Text style={styles.value}>{servico}</Text>

        <Text style={styles.label}>DATA DA EMISSÃO</Text>
        <Text style={styles.value}>{dataGeracao}</Text>
      </View>

      <View style={styles.qrContainer}>
        <Text style={{ fontSize: 12, marginBottom: 10, color: '#4b5563' }}>Apresente o QR Code abaixo na recepção:</Text>
        {/* A API do qrserver converte texto dinamicamente para uma imagem PNG em tempo real */}
        <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${codigo}`} style={styles.qrImage} />
      </View>

      <Text style={styles.footer}>
        Instituto Nilson Bispo. Por favor, chegue com 15 minutos de antecedência.
      </Text>
    </Page>
  </Document>
);
