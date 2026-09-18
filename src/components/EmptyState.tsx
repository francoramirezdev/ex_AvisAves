import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize } from '../constants';
import { Button } from './Button';

interface EmptyStateProps {
  message: string;
  subMessage?: string;
  actionTitle?: string;
  onAction?: () => void;
}

export function EmptyState({ message, subMessage, actionTitle, onAction }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🪶</Text>
      <Text style={styles.message}>{message}</Text>
      {subMessage && <Text style={styles.subMessage}>{subMessage}</Text>}
      {actionTitle && onAction && (
        <View style={styles.actionContainer}>
          <Button title={actionTitle} onPress={onAction} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    minHeight: 300,
  },
  icon: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  message: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subMessage: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  actionContainer: {
    marginTop: Spacing.xl,
    width: '100%',
    maxWidth: 300,
  },
});
