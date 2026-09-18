import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { Colors, Radius, Spacing, TouchTarget, FontSize } from '../constants';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  icon?: string; // emoji opcional a la izquierda del texto
}

export function Button({ title, variant = 'primary', loading, disabled, icon, style, ...props }: ButtonProps) {
  const isSecondary = variant === 'secondary';
  const isDanger = variant === 'danger';
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.btn,
        isSecondary && styles.btnSecondary,
        isDanger && styles.btnDanger,
        isDisabled && styles.btnDisabled,
        style,
      ]}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={isSecondary ? Colors.primary : Colors.surface} />
      ) : (
        <Text
          style={[
            styles.text,
            isSecondary && styles.textSecondary,
            isDanger && styles.textDanger,
            isDisabled && styles.textDisabled,
          ]}
        >
          {icon ? `${icon}  ${title}` : title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    minHeight: TouchTarget.lg,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  btnSecondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  btnDanger: {
    backgroundColor: Colors.error,
  },
  btnDisabled: {
    backgroundColor: Colors.border,
    borderColor: Colors.border,
  },
  text: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.surface,
    letterSpacing: 0.2,
  },
  textSecondary: {
    color: Colors.primary,
  },
  textDanger: {
    color: Colors.surface,
  },
  textDisabled: {
    color: Colors.textMuted,
  },
});
