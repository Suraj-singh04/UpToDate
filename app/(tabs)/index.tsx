import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AcademicCapIcon,
  BanknotesIcon,
  BellIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon,
  DocumentTextIcon,
  SparklesIcon,
  UserGroupIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_TIMETABLE = [
  {
    id: "1",
    time: "09:00 - 10:00",
    subject: "Math",
    icon: BookOpenIcon,
    status: "past",
  },
  {
    id: "2",
    time: "10:00 - 11:00",
    subject: "Lunch",
    icon: ClockIcon,
    status: "past",
  },
  {
    id: "3",
    time: "11:00 - 12:00",
    subject: "Science",
    icon: SparklesIcon,
    status: "live",
  },
  {
    id: "4",
    time: "12:00 - 13:00",
    subject: "English",
    icon: DocumentTextIcon,
    status: "future",
  },
  {
    id: "5",
    time: "13:00 - 14:00",
    subject: "History",
    icon: BuildingLibraryIcon,
    status: "future",
  },
];

const QUICK_ACTIONS = [
  {
    id: "1",
    name: "Progress Report",
    icon: AcademicCapIcon,
    color: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    id: "2",
    name: "Attendance",
    icon: UserGroupIcon,
    color: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    id: "3",
    name: "Homework",
    icon: DocumentTextIcon,
    color: "bg-yellow-100",
    iconColor: "text-yellow-500",
  },
  {
    id: "4.5",
    name: "Timetable",
    icon: ClockIcon,
    color: "bg-indigo-100",
    iconColor: "text-indigo-500",
  },
  {
    id: "4",
    name: "School Calendar",
    icon: CalendarDaysIcon,
    color: "bg-sky-100",
    iconColor: "text-sky-500",
  },
  {
    id: "5",
    name: "Fee Payment",
    icon: BanknotesIcon,
    color: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    id: "6",
    name: "Circulars",
    icon: DocumentMagnifyingGlassIcon,
    color: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    id: "7all",
    name: "Contact Teacher",
    icon: ChatBubbleLeftRightIcon,
    color: "bg-purple-100",
    iconColor: "text-purple-500",
  },
];

const UPCOMING_EVENTS = [
  { id: "1", title: "Maths Unit Test", date: "Fri, Nov 15", type: "Exam" },
  {
    id: "2",
    title: "Holiday (Guru Nanak Jayanti)",
    date: "Mon, Nov 18",
    type: "Holiday",
  },
  { id: "3", title: "PTM (Term 1)", date: "Fri, Nov 22", type: "Event" },
];

const RECENT_CIRCULARS = [
  { id: "1", title: "Winter Uniform Guidelines (2025-26)", date: "Nov 12" },
  { id: "2", title: "PTM Schedule for Class 5-8", date: "Nov 10" },
];

export default function ParentDashboard() {
  const [currentChild, setCurrentChild] = useState("Aarav Sharma");

  const TimetableCard = ({ item }: { item: any }) => {
    const isLive = item.status === "live";
    return (
      <View
        className={`rounded-2xl p-4 w-36 mr-4 ${
          isLive ? "bg-violet-600" : "bg-gray-100"
        }`}
      >
        <item.icon size={24} color={isLive ? "white" : "#7C3AED"} />
        <Text
          className={`text-sm mt-4 ${
            isLive ? "text-violet-100" : "text-gray-500"
          }`}
        >
          {item.time}
        </Text>
        <Text
          className={`text-lg font-bold ${
            isLive ? "text-white" : "text-gray-800"
          }`}
        >
          {item.subject}
        </Text>
      </View>
    );
  };

  const ActionCard = ({ item }: { item: any }) => (
    <TouchableOpacity className="w-1/4 p-2 items-center">
      <View className={`rounded-2xl p-4 ${item.color}`}>
        <item.icon size={30} className={item.iconColor} />
      </View>
      <Text
        className="text-center text-xs font-semibold text-gray-700 mt-2"
        numberOfLines={2}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-violet-600 ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="bg-violet-600 rounded-b-3xl px-6 pb-8 pt-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-white">
              Good Morning, Kavita!
            </Text>
            <TouchableOpacity className="relative">
              <BellIcon size={28} color="white" />
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center border-2 border-violet-600">
                <Text className="text-white text-[10px] font-bold">2</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="flex-row items-center bg-white/20 rounded-full px-4 py-2 mt-4 self-start">
            <Text className="text-base font-semibold text-white">
              {currentChild}
            </Text>
            <ChevronDownIcon size={20} color="white" className="ml-2" />
          </TouchableOpacity>
        </View>

        <View className="px-6 mt-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Today&apos;s Timetable
          </Text>
          <FlatList
            data={MOCK_TIMETABLE}
            renderItem={({ item }) => <TimetableCard item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 2, paddingBottom: 4 }}
          />
        </View>

        <View className="px-6 mt-6">
          <Text className="text-xl font-bold text-gray-800 mb-2">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap -mx-2">
            {QUICK_ACTIONS.map((item) => (
              <ActionCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        <View className="px-6 mt-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Upcoming Events
          </Text>
          <View className="space-y-4">
            {UPCOMING_EVENTS.map((event) => (
              <View
                key={event.id}
                className="flex-row items-center bg-gray-50 rounded-lg p-4"
              >
                <View className="bg-violet-100 p-3 rounded-lg">
                  <CalendarDaysIcon size={24} className="text-violet-600" />
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-base font-semibold text-gray-800">
                    {event.title}
                  </Text>
                  <Text className="text-sm text-gray-500">{event.type}</Text>
                </View>
                <Text className="text-sm font-semibold text-gray-600">
                  {event.date.split(",")[1]}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="px-6 mt-6 mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Recent Circulars
          </Text>
          <View className="space-y-4">
            {RECENT_CIRCULARS.map((item) => (
              <View
                key={item.id}
                className="flex-row items-start bg-gray-50 rounded-lg p-4"
              >
                <View className="bg-orange-100 p-3 rounded-lg">
                  <DocumentMagnifyingGlassIcon
                    size={24}
                    className="text-orange-500"
                  />
                </View>
                <View className="flex-1 ml-4">
                  <Text
                    className="text-base font-semibold text-gray-800"
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <Text className="text-sm text-gray-500">{item.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
