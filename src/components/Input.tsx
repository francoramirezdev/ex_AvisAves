import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Colors, Radius, Spacing, FontSize } from '../constants';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Oculta el label si está vacío para evitar espacio muerto */}
      {label.length > 0 && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          props.multiline && styles.inputMultiline,
        ]}
        placeholderTextColor={Colors.textMuted}
        {...props}
      />
      {error && <Text style={styles.errorText}>⚠ {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: Spacing.xs,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    minHeight: 50,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorLight,
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSize.sm,
  },
});
