import React, { useState } from "react";
import {
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
}

export const Input = ({
  label,
  error,
  icon,
  isPassword = false,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-medium mb-2 ml-1">{label}</Text>
      <View
        className={`flex-row items-center border rounded-2xl px-4 py-3 bg-gray-50 ${
          error
            ? "border-red-500 bg-red-50"
            : isFocused
            ? "border-violet-600 bg-violet-50"
            : "border-gray-200"
        }`}
      >
        {icon && <View className="mr-3">{icon}</View>}
        <TextInput
          className="flex-1 text-gray-800 text-base font-medium"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeIcon size={22} color="#6B7280" />
            ) : (
              <EyeSlashIcon size={22} color="#6B7280" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>}
    </View>
  );
};
