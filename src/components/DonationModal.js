import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StyledText, Button } from './common/StyledComponents';
import { colors, spacing, borderRadius, shadows } from '../theme/theme';

const PRESET_AMOUNTS = [5, 10, 25, 50, 100];

const DonationModal = ({ visible, onClose, onDonationComplete, project }) => {
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handleDonate = () => {
    if (!amount || !selectedPaymentMethod) {
      Alert.alert('Error', 'Please select an amount and payment method');
      return;
    }

    Alert.alert(
      'Confirm Donation',
      `Donate $${amount} to ${project.title}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Donate',
          onPress: () => {
            // Process payment here
            onDonationComplete(amount);
            setAmount('');
            setSelectedPaymentMethod(null);
            Alert.alert('Success', 'Thank you for your donation!');
          },
        },
      ]
    );
  };

  const PaymentOption = ({ method, icon, selected, onSelect }) => (
    <TouchableOpacity
      style={[
        styles.paymentOption,
        selected && styles.paymentOptionSelected,
      ]}
      onPress={onSelect}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={selected ? colors.primary : colors.text.secondary}
      />
      <StyledText
        style={[
          styles.paymentMethodText,
          selected && styles.paymentMethodTextSelected,
        ]}
      >
        {method}
      </StyledText>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <StyledText variant="h2">Make a Donation</StyledText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <StyledText variant="h3" style={styles.projectTitle}>
              {project.title}
            </StyledText>

            <View style={styles.amountContainer}>
              <StyledText style={styles.label}>Select Amount</StyledText>
              <View style={styles.presetAmounts}>
                {PRESET_AMOUNTS.map((preset) => (
                  <TouchableOpacity
                    key={preset}
                    style={[
                      styles.presetButton,
                      amount === preset.toString() && styles.presetButtonSelected,
                    ]}
                    onPress={() => setAmount(preset.toString())}
                  >
                    <StyledText
                      style={[
                        styles.presetButtonText,
                        amount === preset.toString() && styles.presetButtonTextSelected,
                      ]}
                    >
                      ${preset}
                    </StyledText>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.customAmount}>
                <StyledText style={styles.currencySymbol}>$</StyledText>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="decimal-pad"
                  placeholder="Enter amount"
                  placeholderTextColor={colors.text.light}
                />
              </View>
            </View>

            <View style={styles.paymentMethodContainer}>
              <StyledText style={styles.label}>Payment Method</StyledText>
              <PaymentOption
                method="Credit Card"
                icon="credit-card"
                selected={selectedPaymentMethod === 'card'}
                onSelect={() => setSelectedPaymentMethod('card')}
              />
              <PaymentOption
                method="PayPal"
                icon="payment"
                selected={selectedPaymentMethod === 'paypal'}
                onSelect={() => setSelectedPaymentMethod('paypal')}
              />
              <PaymentOption
                method="Apple Pay"
                icon="phone-iphone"
                selected={selectedPaymentMethod === 'apple'}
                onSelect={() => setSelectedPaymentMethod('apple')}
              />
            </View>

            <Button
              onPress={handleDonate}
              style={styles.donateButton}
            >
              <StyledText style={styles.donateButtonText}>
                Donate ${amount || '0'}
              </StyledText>
            </Button>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '90%',
    ...shadows.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  closeButton: {
    padding: spacing.xs,
  },
  content: {
    padding: spacing.md,
  },
  projectTitle: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  amountContainer: {
    marginBottom: spacing.lg,
  },
  presetAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  presetButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.text.light,
  },
  presetButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  presetButtonText: {
    color: colors.text.primary,
    fontWeight: '500',
  },
  presetButtonTextSelected: {
    color: colors.surface,
  },
  customAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.text.light,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
  },
  currencySymbol: {
    fontSize: 20,
    color: colors.text.secondary,
  },
  amountInput: {
    flex: 1,
    fontSize: 20,
    padding: spacing.md,
  },
  paymentMethodContainer: {
    marginBottom: spacing.lg,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.text.light,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  paymentOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  paymentMethodText: {
    marginLeft: spacing.md,
    color: colors.text.primary,
  },
  paymentMethodTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  donateButton: {
    marginBottom: spacing.xl,
  },
  donateButtonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DonationModal; 