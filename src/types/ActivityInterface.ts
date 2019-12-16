export interface ActivityInterface {
  activityDate: string;
  activityItems: ActivityItemInterface[];

}

export interface ActivityItemInterface {
  iconClass: string;
  description: string;
  datetime: string;
  time: string;
  imgs?: string[];
  comment?: string;
}
