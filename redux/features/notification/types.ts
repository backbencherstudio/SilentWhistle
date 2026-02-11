export interface GroupedNotifications {
  title: string; // Today | Yesterday | Jan 24, 2026
  items: NotificationItem[];
}

export interface NotificationEvent {
  id: string;
  type: string;
  text: string;
}

export interface NotificationItem {
  id: string;
  sender_id: string | null;
  receiver_id: string | null;
  entity_id: string;
  created_at: string;
  sender: { name?: string; avatar?: string } | null;
  receiver: { name?: string; avatar?: string } | null;
  notification_event: NotificationEvent;
}
