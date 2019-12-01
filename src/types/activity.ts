export interface Activity {
  activityDate: string;
  activityItems: ActivityItem[];

}

export interface ActivityItem {
  iconClass: string;
  description: string;
  datetime: string;
  time: string;
  imgs?: string[];
  comment?: string;
}
