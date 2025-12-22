import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  className?: string; // Allow overriding styles
  disabled?: boolean;
}

export const Button = ({
  title,
  onPress,
  isLoading = false,
  variant = "primary",
  className = "",
  disabled = false,
}: ButtonProps) => {
  const baseStyles = "rounded-2xl p-4 flex-row justify-center items-center shadow-sm";
  
  const variants = {
    primary: "bg-violet-600",
    secondary: "bg-gray-800",
    outline: "bg-transparent border-2 border-violet-600",
  };

  const textStyles = {
    primary: "text-white font-bold text-lg",
    secondary: "text-white font-bold text-lg",
    outline: "text-violet-600 font-bold text-lg",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading || disabled}
      activeOpacity={0.8}
      className={`${baseStyles} ${variants[variant]} ${
        disabled || isLoading ? "opacity-70" : ""
      } ${className}`}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === "outline" ? "#7C3AED" : "white"} />
      ) : (
        <Text className={textStyles[variant]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
