import React from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {
    ArrowRightStartOnRectangleIcon,
    BellIcon,
    BookOpenIcon,
    CalendarDaysIcon,
    ChevronDownIcon,
    ClipboardDocumentCheckIcon,
    ClockIcon,
    EllipsisHorizontalIcon,
    UsersIcon
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";

const QUICK_ACTIONS = [
  {
    id: "1",
    name: "Attendance",
    icon: ClipboardDocumentCheckIcon,
    color: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "2",
    name: "My Classes",
    icon: UsersIcon,
    color: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    id: "3",
    name: "Timetable",
    icon: ClockIcon,
    color: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "4",
    name: "Planner",
    icon: CalendarDaysIcon,
    color: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

const TODAY_CLASSES = [
  {
    id: "1",
    class: "Class 5-A",
    subject: "Mathematics",
    time: "09:00 - 10:00",
    room: "Room 101",
    status: "done",
  },
  {
    id: "2",
    class: "Class 6-B",
    subject: "Science",
    time: "10:00 - 11:00",
    room: "Lab 2",
    status: "live",
  },
  {
    id: "3",
    class: "Class 5-C",
    subject: "Mathematics",
    time: "11:30 - 12:30",
    room: "Room 103",
    status: "upcoming",
  },
  {
    id: "4",
    class: "Class 7-A",
    subject: "Physics",
    time: "14:00 - 15:00",
    room: "Lab 1",
    status: "upcoming",
  },
];

export const TeacherDashboard = () => {
  const { profile, logout } = useAuth();
  const userName = profile?.name || "Teacher";

  const ClassCard = ({ item }: { item: any }) => {
    const isLive = item.status === "live";
    return (
      <View
        className={`p-4 mb-3 rounded-2xl border ${
          isLive ? "bg-violet-600 border-violet-600" : "bg-white border-gray-100"
        } shadow-sm`}
      >
        <View className="flex-row justify-between items-start">
          <View>
            <Text
              className={`text-lg font-bold ${
                isLive ? "text-white" : "text-gray-800"
              }`}
            >
              {item.class}
            </Text>
            <Text
              className={`text-sm ${
                isLive ? "text-violet-100" : "text-gray-500"
              }`}
            >
              {item.subject} • {item.room}
            </Text>
          </View>
          <View
            className={`px-3 py-1 rounded-full ${
              isLive ? "bg-white/20" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                isLive ? "text-white" : "text-gray-600"
              }`}
            >
              {item.time}
            </Text>
          </View>
        </View>
        {isLive && (
            <View className="mt-4 flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                <Text className="text-white text-sm font-medium">Class in Progress</Text>
            </View>
        )}
      </View>
    );
  };

  const ActionCard = ({ item }: { item: any }) => (
    <TouchableOpacity className="w-1/4 p-2 items-center">
      <View className={`rounded-2xl p-4 ${item.color} mb-2 shadow-sm`}>
        <item.icon size={28} className={item.iconColor} />
      </View>
      <Text className="text-xs font-semibold text-gray-700 text-center">
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="px-6 pt-2 pb-6 flex-row justify-between items-center bg-white">
            <View>
                <Text className="text-gray-500 text-sm font-medium">Welcome back,</Text>
                <Text className="text-2xl font-bold text-gray-900">{userName}</Text>
            </View>
            <View className="flex-row items-center space-x-2">
                <TouchableOpacity onPress={logout} className="p-2 bg-gray-50 rounded-full border border-gray-100 mr-2">
                    <ArrowRightStartOnRectangleIcon size={24} color="#374151" />
                </TouchableOpacity>
                <TouchableOpacity className="relative p-2 bg-gray-50 rounded-full border border-gray-100">
                    <BellIcon size={24} color="#374151" />
                    <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                </TouchableOpacity>
            </View>
        </View>

        {/* Quick Stats / Overview */}
        <View className="mx-6 p-6 bg-violet-600 rounded-3xl shadow-lg shadow-violet-200">
            <View className="flex-row items-center justify-between mb-6">
                <View>
                    <Text className="text-violet-100 text-sm font-medium">Next Period</Text>
                    <Text className="text-white text-xl font-bold mt-1">Class 6-B (Science)</Text>
                    <Text className="text-violet-200 text-sm mt-1">Room 101 • 10:00 AM</Text>
                </View>
                <View className="bg-white/20 p-3 rounded-xl">
                    <BookOpenIcon size={28} color="white" />
                </View>
            </View>
            <View className="h-[1px] bg-white/20 w-full mb-4" />
            <TouchableOpacity className="flex-row items-center justify-center">
                <Text className="text-white font-semibold mr-2">View Full Schedule</Text>
                <ChevronDownIcon size={16} color="white" />
            </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View className="mt-8 px-4">
            <Text className="text-lg font-bold text-gray-900 px-2 mb-2">Quick Actions</Text>
            <View className="flex-row flex-wrap">
                {QUICK_ACTIONS.map((action) => (
                    <ActionCard key={action.id} item={action} />
                ))}
            </View>
        </View>

        {/* Today's Classes */}
        <View className="mt-6 px-6">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold text-gray-900">Today's Classes</Text>
                <TouchableOpacity>
                    <EllipsisHorizontalIcon size={24} color="#9CA3AF" />
                </TouchableOpacity>
            </View>
            {TODAY_CLASSES.map((item) => (
                <ClassCard key={item.id} item={item} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
