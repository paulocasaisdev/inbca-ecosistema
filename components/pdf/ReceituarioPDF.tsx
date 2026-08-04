'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  header: { borderBottom: '2px solid #047857', paddingBottom: 10, marginBottom: 20 },
  title: { fontSize: 24, color: '#047857', fontWeight: 'bold' },
  subtitle: { fontSize: 12, color: '#6b7280', marginTop: 5 },
  patientInfo: { marginBottom: 20, padding: 15, backgroundColor: '#f3f4f6', borderRadius: 4 },
  label: { fontSize: 10, color: '#6b7280', marginBottom: 2 },
  value: { fontSize: 12, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#374151', marginBottom: 10, marginTop: 10 },
  prescriptionText: { fontSize: 12, lineHeight: 1.5, color: '#1f2937' },
  footer: { position: 'absolute', bottom: 40, left: 40, right: 40, textAlign: 'center', fontSize: 10, color: '#9ca3af', borderTop: '1px solid #e5e7eb', paddingTop: 10 },
  signature: { marginTop: 80, borderTop: '1px solid #000', width: 250, textAlign: 'center', paddingTop: 5, fontSize: 12, alignSelf: 'center' }
});

interface ReceituarioProps {
  pacienteNome: string;
  cns: string;
  prescricao: string;
  data: string;
}

export const ReceituarioDoc = ({ pacienteNome, cns, prescricao, data }: ReceituarioProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>INBCA - Núcleo de Saúde</Text>
        <Text style={styles.subtitle}>Instituto Nilson Bispo | Receituário Médico Comunitário</Text>
      </View>

      <View style={styles.patientInfo}>
        <Text style={styles.label}>PACIENTE</Text>
        <Text style={styles.value}>{pacienteNome}</Text>
        
        <Text style={styles.label}>CARTÃO SUS (CNS)</Text>
        <Text style={styles.value}>{cns}</Text>
        
        <Text style={styles.label}>DATA DO ATENDIMENTO</Text>
        <Text style={styles.value}>{data}</Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>PRESCRIÇÃO / CONDUTA MÉDICA</Text>
        <Text style={styles.prescriptionText}>{prescricao || "Nenhuma medicação ou conduta registrada."}</Text>
      </View>

      <View style={styles.signature}>
        <Text>Assinatura e Carimbo do Profissional</Text>
      </View>

      <Text style={styles.footer}>
        Documento gerado eletronicamente pelo Ecossistema INBCA. Validade em todo o território nacional.
      </Text>
    </Page>
  </Document>
);
