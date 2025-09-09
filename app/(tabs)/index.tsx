import { createHomeStyles } from '@/assets/styles/home.styles';
import { EmptyState, Header, LoaderSpinner, TodoInput } from '@/components';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import useTheme from '@/hooks/useTheme';
import { Todo, TodoType } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { colors } = useTheme();

  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const todos: TodoType[] | undefined = useQuery(api.todos.getTodos);

  const isLoading: boolean = todos === undefined;

  const handleToggleTodo = async (id: Id<'todos'>) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      Alert.alert('Error', 'Failed to update todo status');
      console.log('Error toggling todo:', error);
    }
  };

  const handleDeleteTodo = async (id: Id<'todos'>) => {
    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTodo({ id });
          } catch (error) {
            Alert.alert('Error', 'Failed to delete todo');
            console.log('Error deleting todo:', error);
          }
        },
      },
    ]);
  };

  const homeStyles = createHomeStyles(colors);

  const renderTodoItem = ({ item }: { item: Todo }) => {
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? 'transparent' : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name='checkmark' size={18} color='#fff' />
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={homeStyles.todoTextContainer}>
            <Text
              style={[
                homeStyles.todoText,
                item.isCompleted && {
                  textDecorationLine: 'line-through',
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>
            <View style={homeStyles.todoActions}>
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name='pencil' size={14} color='#fff' />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteTodo(item._id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name='trash' size={14} color='#fff' />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  if (isLoading) return <LoaderSpinner />;

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
